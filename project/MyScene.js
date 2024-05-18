import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyPanorama } from "./Objects/MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./Objects/MyRockSet.js";
import {MyBee} from "./Objects/MyBee.js";
import {MyHive} from "./Objects/MyHive.js";
import {MyPollen} from "./Objects/MyPollen.js";
import { MyGrassSet } from "./Objects/MyGrassSet.js";
import { MyGardenRockSet } from "./Objects/MyGardenRockSet.js";
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
    this.lockCamera = true;
    this.scaleFactor = 1;
    this.gardenRows = 3;
    this.gardenCols = 3;
    this.lastTime=0;
    this.scaleFactor=1;
    this.speedFactor = 0.1;
    this.cloudMoveSpeedFactor = 0.1;

    this.grassFieldWidth=80;
    this.grassHeight=1;

    this.hiveX=-70;
    this.hiveY=-70;
    this.hiveSize=5;

    this.enableTextures(true);
    this.descending=false;
    this.petalTextures = [new CGFtexture(this, "images/petal1.jpg"), new CGFtexture(this, "images/petal2.jpg"),
                  new CGFtexture(this, "images/petal3.jpg")];

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, "images/landscape.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setAmbient(1,1,1,1);
    this.appearance.setDiffuse(1,1,1,1);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.earthppearance = new CGFappearance(this);
    this.earthppearance.setTexture(this.earth);
    this.earthppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.cloudText = new CGFtexture(this, "images/cloud.jpg");
    this.cloudApp = new CGFappearance(this.cloudText);
    this.cloudApp.setTextureWrap('REPEAT', 'REPEAT');

    this.panorama = new MyPanorama(this, this.earth);
    this.rockSet = new MyRockSet(this, 1 , 3, 8);
    this.hive = new MyHive(this,[this.hiveX,this.hiveSize*6,this.hiveY]);
    this.bee = new MyBee(this, this.hive);
    this.bee.setBeeHeight(this.hiveSize*6);
    this.bee.setHivePosition([this.hiveX+this.hiveSize*6/2-2,this.hiveSize*6-2,this.hiveY+this.hiveSize*6/2-2]);
    this.pollen = new MyPollen(this);
    this.flatShader = new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag");
    this.rockShader = new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag");
    this.beeShader = new CGFshader(this.gl, "shaders/beeAnimation.vert", "shaders/beeAnimation.frag");
    this.cloudShader = new CGFshader(this.gl, "shaders/cloud.vert", "shaders/cloud.frag");
    this.garden = new MyGarden(this,this.gardenRows,this.gardenCols,10,this.bee.getPosition()[1]);
    this.grass = new MyGrassSet(this, this.grassFieldWidth, this.grassFieldWidth);
    this.gardenRocks = new MyGardenRockSet(this,this.garden.getWidth(), 60, 10);

    //this.beeShader.setUniformsValues({uSampler: 0, timeFactor: 0,normScale:1,transitionSpeed:1,flyOffset:1});
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
      //Camera section
      if (this.lockCamera) {
        let beePosition = this.bee.getPosition();
        let beeOrientation = this.bee.getOrientation();
        let distance = 5; // Distance from the bee to the camera
        let height = 2; // Height of the camera above the bee
        let cameraPosition = [
            beePosition[0] - beeOrientation[0] * distance,
            beePosition[1] + height,
            beePosition[2] - beeOrientation[2] * distance
        ];
        // Set the camera's position behind the bee 
        this.camera.setPosition(cameraPosition);
        // Sets the camera target as the bee
        let cameraTarget = vec3.clone(beePosition);
        // Set the camera's target
        this.camera.setTarget(cameraTarget);
      }
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
      this.grass.update(t);
      this.bee.animate(t,3,0.005,0.06);
      this.bee.scale(this.scaleFactor);
      this.hive.getAnimationBee().update(deltaTime);
      this.hive.getAnimationBee().animate(t,3,0.005,0.06);
      if(this.descending){
        if(this.bee.detectPollen(this.garden)){
          this.descending=false;
          console.log("Pollen detected");
        };
      }
       // let timeFactor = t / 100000 ;
      let timeFactor = t % (100000/this.cloudMoveSpeedFactor) / (100000/this.cloudMoveSpeedFactor);
      this.cloudShader.setUniformsValues({timeFactor: timeFactor, uSampler1: 1});

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
          this.descending=false;
      }
      if(this.gui.isKeyPressed("KeyF")){
          text+=" F ";
          this.bee.descend();
          this.descending=true;
          keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyP")){
          text+=" P ";
          this.descending=false;
          this.bee.ascend();
          keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyO")){
        text+=" O ";
        this.bee.returnHome();
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

    this.pushMatrix();//GARDEN BEGIN
    this.garden.display([-this.garden.getWidth()/2 , 0 , -this.garden.getWidth()/2]);
    this.translate(-this.garden.getWidth()/2,0,-this.garden.getWidth()/2);
    console.log(this.gardenRocks);
    this.gardenRocks.display();
    this.popMatrix();// GARDEN END
  
    this.pushMatrix();//PANORAM BEGIN
    this.setActiveShader(this.defaultShader);
    this.setActiveShader(this.cloudShader);
    this.cloudText.bind(1);
    this.panorama.display(this.camera.position);
    this.popMatrix();// PANORAM END

    this.pushMatrix();//GRASS BEGIN
    this.scale(1,this.grassHeight,1);
    this.translate(-this.grassFieldWidth/2,0,-this.grassFieldWidth/2)
    this.grass.display();
    this.popMatrix();//GRASS END

    this.pushMatrix();//HIVE BEGIN
    this.translate(this.hiveX,this.hiveSize*6,this.hiveY);
    this.scale(this.hiveSize,this.hiveSize,this.hiveSize);
    this.rotate(Math.PI/4,0,1,0);
    this.hive.display([this.hiveSize,this.hiveSize,this.hiveSize]);
    this.popMatrix();//HIVE END

    this.pushMatrix();//ROCKS BEGIN
    this.translate(this.hiveX,0,this.hiveY);
    this.scale(this.hiveSize,this.hiveSize,this.hiveSize);
    this.rotate(Math.PI/4,0,1,0);
    this.rockSet.display(4);
    this.popMatrix();//ROCKS END

    this.appearance.apply();
    this.pushMatrix();
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.popMatrix();

    this.bee.display(); //BEE
    this.hive.getAnimationBee().display(); // HOUSING BEE


    // ---- END Primitive drawing section
  }

}
