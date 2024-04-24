import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyPanorama } from "./Objects/MyPanorama.js";
import { MyFlower } from "./Flower/MyFlower.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./Objects/MyRockSet.js";
import {MyBee} from "./Objects/MyBee.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();


    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 50, 50, true, 1);
    //this.gui.initKeys();

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.gardenRows = 3;
    this.gardenCols = 3;
    this.lastTime=0;
    this.scaleFactor=1;
    this.speedFactor = 0.1;
    this.enableTextures(true);
    this.petalTextures = [new CGFtexture(this, "images/petal1.jpg"), new CGFtexture(this, "images/petal2.jpg"),
                  new CGFtexture(this, "images/petal3.jpg")];

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, "images/landscape.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.earthppearance = new CGFappearance(this);
    this.earthppearance.setTexture(this.earth);
    this.earthppearance.setTextureWrap('REPEAT', 'REPEAT');
   
    this.panorama = new MyPanorama(this, this.earth);
    this.rockSet = new MyRockSet(this, 1, 1);
    this.bee = new MyBee(this);

    this.flatShader = new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag");
    this.rockShader = new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag");
    this.beeShader = new CGFshader(this.gl, "shaders/beeAnimation.vert", "shaders/beeAnimation.frag");
    this.garden = new MyGarden(this,this.gardenRows,this.gardenCols);
    this.beeShader.setUniformsValues({uSampler: 0, timeFactor: 0,normScale:1,transitionSpeed:1,flyOffset:1});
    this.setUpdatePeriod(1000/60);

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      Math.PI/2,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  update(t) {
		// only shader 6 is using time factor
			// Dividing the time by 100 "slows down" the variation (i.e. in 100 ms timeFactor increases 1 unit).
			// Doing the modulus (%) by 100 makes the timeFactor loop between 0 and 99
			// ( so the loop period of timeFactor is 100 times 100 ms = 10s ; the actual animation loop depends on how timeFactor is used in the shader )
			//this.beeShader.setUniformsValues({ timeFactor: t / 400 % 100 });
      let deltaTime = 0;
      if(this.lastTime!=0){
        deltaTime = t-this.lastTime;
      }
      this.lastTime = t;
      this.checkKeys();
      this.bee.update(deltaTime);
      this.bee.animate(t,3,0.005,0.06);
      this.bee.scale(this.scaleFactor);

	}
  checkKeys() {
      let text="Keys pressed: ";
      let keysPressed=false;
      // Check for key codes e.g. in https://keycode.info/
      if (this.gui.isKeyPressed('KeyW')) {

              text+=" W ";
              this.bee.accelerate(0.005*this.speedFactor);
              keysPressed=true;
      }


      if (this.gui.isKeyPressed("KeyS"))        {

              text+=" S ";
              this.bee.accelerate(-0.005*this.speedFactor);
              keysPressed=true;

      }
      if (this.gui.isKeyPressed("KeyA"))        {

              text+=" A ";
              this.bee.turn(Math.PI/12*this.speedFactor)
              keysPressed=true;

      }
      if (this.gui.isKeyPressed("KeyD"))        {

              text+=" D ";
              this.bee.turn(-Math.PI/12*this.speedFactor);
              keysPressed=true;

      }
      if (this.gui.isKeyPressed("KeyR")){
          text+=" R ";
          this.bee.reset();
          keysPressed=true;
      }
      if (keysPressed){
          console.log(text);
      }
      else{
        this.bee.accelerate(0);
      }
      

  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    //this.bee.display();

    //this.rockSet.display();
    //this.garden.display();
    /*this.receptale.display();
    this.stem.display();*/
    this.pushMatrix();
    this.panorama.display(this.camera.position);
    this.popMatrix();
    
    this.pushMatrix();
    this.translate(0,3,0);
    //this.setActiveShader(this.beeShader);
    this.bee.display();
    //this.setActiveShaderSimple(this.defaultShader);
    this.popMatrix();

    /*this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();*/


    // ---- END Primitive drawing section
  }

}
