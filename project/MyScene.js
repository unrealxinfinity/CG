import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPetal } from "./Flower/MyPetal.js";
import { MyReceptale } from "./Flower/MyReceptale.js";
import { MyStem } from "./Flower/MyStem.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyPanorama } from "./Objects/MyPanorama.js";
import { MyFlower } from "./Flower/MyFlower.js";
import { MyLeaf } from "./Flower/MyLeaf.js";

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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.receptale = new MyReceptale(this, 10, 10, 1);
    
    this.sphere = new MySphere(this, 50, 50, true);
    this.petalTest = new MyPetal(this,1,2);
    
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);
    this.petalTextures = [new CGFtexture(this, "images/petal1.jpg"), new CGFtexture(this, "images/petal2.jpg"),
                  new CGFtexture(this, "images/petal3.jpg")];

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, "images/landscape.jpg");
    this.petal = new CGFtexture(this, "images/petal.jpg");
    this.leafTexture = new CGFtexture(this, "images/leaf.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.earthppearance = new CGFappearance(this);
    this.earthppearance.setTexture(this.earth);
    this.earthppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.petalppearance = new CGFappearance(this);
    this.petalppearance.setTexture(this.petalTextures[Math.floor(Math.random()*this.petalTextures.length)]);
    this.petalppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.leafappearance = new CGFappearance(this);
    this.leafappearance.setTexture(this.leafTexture);
    this.leafappearance.setTextureWrap('REPEAT', 'REPEAT');
    this.panorama = new MyPanorama(this, this.earth);

    this.flower = new MyFlower(this, 16,5, 2, 8, this.petalppearance,this.leafTexture, [0.5, 0.17, 0], [0.6, 1,0.4]);
    this.myLeaf = new MyLeaf(this, 10, 10, 7);
    this.stem = new MyStem(this, 10, 10,3,0.2,3,4,this.leafTexture,[0.6, 1,0.4]);


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
    this.flower.display();
    //this.petalTest.display(Math.PI/4, [0, 1]);
    /*this.receptale.display();*/
    //this.stem.display();
    //this.myLeaf.display(Math.PI/4);
    this.pushMatrix();
    this.panorama.display(this.camera.position);
    /*this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();*/
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
