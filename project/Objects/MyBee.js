import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
import { MyCone } from './MyCone.js';
import { MyPollen } from './MyPollen.js';

const BeeStates = Object.freeze({
    READY:   0,
    RETURNING:  1,
    STOPPED: 2,
    LANDED: 3,
});

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param hive - Reference to MyHive object
 */
export class MyBee extends CGFobject {
	constructor(scene, hive) {
		super(scene);

        this.sin = Math.sin(Math.PI/4);
        this.cos = Math.cos(Math.PI/4);
        this.hive = hive;
        this.sphere = new MySphere(scene, 20, 20, false, false, 1);
        this.torax = new MySphere(scene, 20, 20, false, false, 2);
        this.sinThird = Math.sin(Math.PI/3);
        this.cosThird = Math.cos(Math.PI/3);
        this.cosThetaLeg = Math.cos(3*Math.PI/4);
        this.sinThetaLeg = Math.sin(3*Math.PI/4);
        this.cylinder = new MyCylinder(scene, 10, 10);
        this.cone = new MyCone(scene, 10, 10);
        this.wingRotationY = -Math.PI/6;
        this.wingRotationZ = 0;
        this.yAllocation = 0;
        this.pollen =null
        this.position=[0,0,0];
        this.hivePosition=[-20,12,-20];
        this.hiveEntrancePos=[0,0,0];
        this.initialHeight=30;
        this.velocity = 0;
        this.tempVelocity = null;
        this.yVelocity = 0.01;
        this.orientation = [1,0,0];
        this.angle = 0;
        this.scaleFactor=1;
        this.state = BeeStates.READY;
        this.detected=false;
        this.stopped = false;
        this.returning = false;
        this.landed = false;
        this.colisionDetectionDistanceMultiplier = 4;
		this.initMaterials();
        this.destination = undefined;
        this.destinations = undefined;
	}

    initMaterials() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.25,0.25,0.25,1);
        this.appearance.setDiffuse(0.25,0.25,0.25,1);
        this.appearance.setSpecular(0,0,0,1);

        this.stripedApp = new CGFappearance(this.scene);
        this.stripedTex = new CGFtexture(this.scene, "images/beestripe.jpg");
        this.stripedApp.setTexture(this.stripedTex);
        this.stripedApp.setAmbient(0.5,0.5,0.06,1);
        this.stripedApp.setDiffuse(1,1,0.06,1);
        this.stripedApp.setSpecular(1,1,0.06,1);
        this.stripedApp.setTextureWrap('REPEAT', 'REPEAT');

        this.stingerApp = new CGFappearance(this.scene);
        this.stingerApp.setAmbient(1,1,1,1);
        this.stingerApp.setDiffuse(1,1,1,1);
        this.stingerApp.setSpecular(1,1,1,1);

        this.eyeApp = new CGFappearance(this.scene);
        this.eyeTex = new CGFtexture(this.scene, "images/beeeye.jpg");
        this.eyeApp.setTexture(this.eyeTex);
        this.eyeApp.setAmbient(0.75,0.75,0.75,1);
        this.eyeApp.setDiffuse(0.75,0.75,0.75,1);
        this.eyeApp.setSpecular(0,0,0,1);
        this.eyeApp.setTextureWrap('REPEAT', 'REPEAT');

        this.toraxApp = new CGFappearance(this.scene);
        this.toraxTex = new CGFtexture(this.scene, "images/beetorax.jpg");
        this.toraxApp.setTexture(this.toraxTex);
        this.toraxApp.setAmbient(0.9,0.9,0,1);
        this.toraxApp.setDiffuse(0.9,0.9,0,1);
        this.toraxApp.setSpecular(0,0,0,1);
        this.toraxApp.setTextureWrap('REPEAT', 'REPEAT');

        this.headApp = new CGFappearance(this.scene);
        this.headApp.setAmbient(0.5,0.5,0.06,1);
        this.headApp.setDiffuse(1,1,0.06,1);
        this.headApp.setSpecular(1,1,0.06,1);

        this.legApp = new CGFappearance(this.scene);
        this.legApp.setAmbient(0.1,0.1,0.1,1);
        this.legApp.setDiffuse(0.1,0.1,0.1,1);
        this.legApp.setSpecular(0,0,0,1);

        this.wingApp = new CGFappearance(this.scene);
        this.wingApp.setAmbient(0.66,1,1,0.1);
        this.wingApp.setDiffuse(0.66,1,1,0.1);
        this.wingApp.setSpecular(0.66,1,1,0.6);
        const emission = this.wingApp.emission;
        this.wingApp.setEmission(emission[0],emission[1],emission[2],0);

        this.needleApp = new CGFappearance(this.scene);
        this.needleApp.setAmbient(0.8,0.82,0.83,1); //206,211,212
        this.needleApp.setDiffuse(0.8,0.82,0.83,1,1); //206,211,212
        this.needleApp.setSpecular(0,0,0,1);
        
    }
    /**
     * Set the bee's position
     * @param height - the height of the bee
     */
    
    setBeeHeight(height){
        this.position[1] = height;
        this.initialHeight = height;
    }

    display() {
        this.scene.pushMatrix();//BEGIN ANIMATE Y
        this.scene.translate(this.position[0], this.position[1], this.position[2]); //update bee position
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);// update bee scale
        this.scene.rotate(this.angle, 0, 1, 0); // update bee orientation

        if (this.state != BeeStates.STOPPED && this.state != BeeStates.LANDED) this.scene.translate(0, this.yAllocation, 0);
        this.appearance.apply();

        this.legApp.apply();
        this.scene.pushMatrix(); //BEGIN ANTENNAE

        this.scene.translate(0, 0.95*this.sinThird, 0.95*this.cosThird);
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.95*this.sinThird, -0.95*this.cosThird);
        this.scene.rotate(-2*Math.PI/3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.5);
        this.cylinder.display();
        this.scene.popMatrix(); //END ANTENNAE

        this.headApp.apply();
        this.sphere.display();
        this.scene.pushMatrix();
        this.scene.translate(0.95*this.sin*this.cos, 0.95*this.sin*this.sin, 0.95*this.cos);
        this.scene.scale(0.1,0.1,0.1);
        this.eyeApp.apply();
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.95*this.sin*this.cos, 0.95*this.sin*this.sin, -0.95*this.cos);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        if (this.state != BeeStates.LANDED) {
            this.scene.translate(-3,-1,0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
        }
        else {
            this.scene.translate(-3,0,0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
        }
        this.scene.scale(1, 2, 1);
        this.stripedApp.apply();
        this.sphere.display();
        this.scene.pushMatrix(); //BEGIN NEEDLE
        this.scene.translate(0,-0.8,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(0.2,0.5,0.2);
        this.stingerApp.apply();
        this.cone.display();
        this.scene.popMatrix(); //END NEEDLE
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.1, 0, 0);
        this.scene.pushMatrix();
        this.appearance.apply();
        
        this.scene.scale(1.1, 1.1, 1.1);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.toraxApp.apply();
        this.torax.display();
        this.scene.popMatrix();

        // BEGIN LEGS
        this.legApp.apply();
        for (let i = 0; i < 3; i++) {
            const phi = ((8+i)*Math.PI)/6;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
            this.scene.pushMatrix();
            this.scene.translate(0.9*this.sinThetaLeg*cosPhi, 0.9*this.sinThetaLeg*sinPhi, 0.9*this.cosThetaLeg);
            this.scene.rotate(-5*Math.PI/4, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 0.5);
            this.cylinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.9*this.sinThetaLeg*cosPhi, 0.9*this.sinThetaLeg*sinPhi, -0.9*this.cosThetaLeg);
            this.scene.rotate(Math.PI/4, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 0.5);
            this.cylinder.display();
            this.scene.popMatrix();
        }
        //END LEGS
        this.scene.pushMatrix();//BEGIN POLLEN
        if(this.pollen){
            this.scene.translate(0, -1.5,0);
            this.scene.scale(0.5,0.5,0.5)
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.pollen.display();
        }
        this.scene.popMatrix();//END POLLEN

        this.scene.popMatrix();
        this.scene.pushMatrix(); //START WINGS

        this.wingApp.apply(); //BEGIN WINGS
        this.scene.pushMatrix();
        this.scene.translate(0, 1.1*this.sin, 1.1*this.cos);
        this.scene.rotate(this.wingRotationZ, 0, 0, 1);
        this.scene.rotate(this.wingRotationY, 0, 1, 0);
        this.scene.translate(0,0,2);
        this.scene.scale(0.5, 0.1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(0, 1.1*this.sin, 1.1*this.cos);
        this.scene.rotate(this.wingRotationZ, 0, 0, 1);
        this.scene.rotate(this.wingRotationY, 0, 1, 0);
        this.scene.translate(0,0,2);
        this.scene.scale(0.5, 0.1, 2);
        this.sphere.display();
        this.scene.popMatrix(); 

        this.wingApp.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.1*this.sin*this.cos, 1.1*this.sin*this.sin, 1.1*this.cos);
        this.scene.rotate(-this.wingRotationZ, 0, 0, 1);
        this.scene.rotate(2*this.wingRotationY, 0, 1, 0);
        this.scene.translate(0,0,1);
        this.scene.scale(0.25, 0.05, 1);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(-1.1*this.sin*this.cos, 1.1*this.sin*this.sin, 1.1*this.cos);
        this.scene.rotate(-this.wingRotationZ, 0, 0, 1);
        this.scene.rotate(2*this.wingRotationY, 0, 1, 0);
        this.scene.translate(0,0,1);
        this.scene.scale(0.25, 0.05, 1);
        this.sphere.display();
        this.scene.popMatrix();

        
        this.scene.popMatrix(); //END WINGS
        
        this.scene.popMatrix()
        
        this.scene.popMatrix(); //END ANIMATE Y

    }
    /**
     * Update function for bee for animation and movement
     * @param {Number} deltaTime - time passed since last update
     */
    update(deltaTime){
        const deltax = this.orientation[0]*this.velocity*deltaTime;
        const deltaz = this.orientation[2]*this.velocity*deltaTime;
        this.position[0] += deltax;
        let y = this.orientation[1]*this.yVelocity*deltaTime;
        if (this.state === BeeStates.RETURNING) {
            const proportion = this.currMagnitude/this.returnMagnitude;
            if (proportion >= 1) {
                this.returning = false;
                this.velocity = 0;
                if (this != this.hive.animationBee) {
                    console.log("addPollen called");
                    this.hive.addPollen(this.pollen,deltaTime);
                    this.state = BeeStates.LANDED;
                }
                this.pollen = null;
                if (this.destinations) {
                    this.goToPosition(this.destinations.shift())
                    if (this.destinations.length === 0) this.destinations = undefined;
                }
            }
            this.currMagnitude += Math.sqrt(deltax*deltax + deltaz*deltaz);
                        this.position[1] = this.returnHeight - (this.returnHeight - this.destination[1])*proportion;
                    }
        else if(this.position[1] + y < this.initialHeight){
            this.position[1] += this.orientation[1]*this.yVelocity*deltaTime;
        }
        else{
            this.position[1] = this.initialHeight;
        }
        this.position[2] += deltaz;

        if (this.state != BeeStates.STOPPED && this.position[1] < 0.55) {
            this.position[1] = 0.55;
            this.orientation[1] = 0;
            this.tempVelocity = this.velocity;
            this.velocity = 0;
            this.state = BeeStates.LANDED;
        }
    }
    /**
     * Turns the bee orientation
     * @param {Number} a- angle to turn  
     */
    turn(a){
       if (this.state != BeeStates.READY) return;
       this.angle += a;
        let orientationX = Math.cos(this.angle);
        let orientationZ = Math.sin(this.angle);
        this.orientation = [orientationX,this.orientation[1],-orientationZ];
    }
    /**
     * Accelerates the bee
     * @param {Number} v 
     */
    accelerate(v){
      if (this.state != BeeStates.READY) return;
      this.velocity += v;
      if(this.velocity < 0){
          this.velocity = 0;
      }
      
        
    }
    /**
     * Detects pollen in the garden
     * @param {MyGarden} garden - the garden to detect pollen in
     * @returns {boolean} - true if pollen is detected
     */
    detectPollen(garden){
        let flowers = garden.getFlowers();
        for(let i=0; i<flowers.length;i++){
            if(this.getPollen(flowers[i])) return true;
        }
        return false;
    }
    /**
     * Detects pollen in the flower and removes the reference from the flower, adding it to the bee
     * @param {MyFlower} flower - the flower to detect pollen in
     * @returns {boolean} - true if pollen is detected
     */
    getPollen(flower){
        if(this.detectCollision(flower) && flower.getPollen()){
            this.tempVelocity = this.velocity;
            this.velocity = 0;
            this.pollen = flower.getPollen();
            flower.removePollen();
            this.orientation[1] = 0;
            this.position = [flower.position[0], flower.position[1]+flower.getInnerRadius()*2, flower.position[2]]
            this.state = BeeStates.STOPPED;
            return true;
        }
        return false;
    }
    /**
     * Sets the pollen in the bee
     * @param {MyPollen} pollen - reference to the pollen
     */
    getPollen2(pollen){
        this.pollen=pollen;
    }
    /**
     * Makes the bee descend
     */
    descend(){
        if (this.state != BeeStates.READY) return;
        this.orientation[1] = -1;
    }
    /**
     * Makes the bee ascend 
     */
    ascend(){
        if (this.state != BeeStates.STOPPED && this.state != BeeStates.LANDED) return;
        this.state = BeeStates.READY;
        if(this.tempVelocity){
            this.velocity = this.tempVelocity;
            this.tempVelocity = null;
        }
        if(this.position[1] < this.initialHeight){
            this.orientation[1] = 1;
        }
        else{
            this.orientation[1] = 0;
        }
    }
    /**
     * Makes the bee return to the hive
     */
    returnHome() {
        if (!this.pollen || this.state != BeeStates.READY) return;
        this.goToPosition(this.hivePosition);
    }
   
    /**
     * Go to a certain position
     * @param {Array} destination - array of x y z coords to go to
     */
    goToPosition(destination) {
        this.destination = destination;
        this.returnHeight = this.position[1];
        const entranceVector = [this.destination[0]-this.position[0], this.destination[2]-this.position[2]];
        this.returnMagnitude = Math.sqrt(entranceVector[0]*entranceVector[0] + entranceVector[1]*entranceVector[1]);
        this.currMagnitude = 0;
        this.orientation = [entranceVector[0]/this.returnMagnitude, 0, entranceVector[1]/this.returnMagnitude];
        this.angle = Math.PI + Math.atan2(entranceVector[1], -entranceVector[0]);
        this.velocity=0.02;
        
        this.state = BeeStates.RETURNING;
    } 
    /**
     * Go to a list of destinations
     * @param {Array} destinations - array of x y z coords to go to
     */
    goToDestinations(destinations) {
        this.destinations = destinations;
        this.goToPosition(destinations.shift());
    }
    /**
     * Set the entrance position of the hive
     * @param {Array} pos - array of x y z coords
     */
    setEntrancePos(pos){
        this.hiveEntrancePos=pos;
    }
    /**
     * Reset the bee's position
     */
    reset(){
        this.position=[0,this.initialHeight,0];
        this.velocity = 0;
        this.orientation = [1,0,0];
        this.angle = 0;
    }
    /**
     * Set the scale of the bee
     * @param {Number} s - scale factor
     */
    scale(s){
        this.scaleFactor = s;
    }
    /**
     * Animate the bee
     * @param {Number} t - time
     * @param {Number} flyOffset - offset for flying
     * @param {Number} transitionSpeed - speed of transition
     * @param {Number} wingFlapSpeed - speed of wing flapping
     */
    animate(t,flyOffset,transitionSpeed,wingFlapSpeed){
        this.wingRotationZ = Math.sin(t*wingFlapSpeed)*Math.PI/6;
        let progress = (Math.sin(t * transitionSpeed) + 1) / 2;
        if (progress < 0.5) {
            this.yAllocation = 4 * progress * progress * progress * flyOffset;
        } else {
            progress = progress - 1;
            this.yAllocation = (4 * progress * progress * progress + 1) * flyOffset;
        }
    }
    /**
     * Detects collision with a flower
     * @param {MyFlower} flower - the flower to detect collision with
     * @returns {boolean} - true if collision is detected
     */
    detectCollision(flower){
        let x = this.position[0];
        let z = this.position[2];
        let y = this.position[1];
        let x1 = flower.position[0];
        let y1 = flower.position[1];
        let z1 = flower.position[2];
        let distance = Math.sqrt((x-x1)*(x-x1) +(y-y1)*(y-y1)+(z-z1)*(z-z1));
        if(distance <= flower.getInnerRadius()*this.colisionDetectionDistanceMultiplier){
            return true;
        }
        return false;
    }
    /**
     * Get the bee's position
     * @returns {Array} - array of x y z coords
     */
    getPosition(){
        return this.position;
    }
    /**
     * Sets the bee's position
     * @param {Array} pos - array of x y z coords
     */
    setPosition(pos){
        this.position=pos
    }
    /**
     * Gets the bee's orientation
     * @returns {Array} - array of x y z orientation
     
     */
    getOrientation(){
        return this.orientation;
    }
    /**
     * Sets the bee's orientation
     * @param {Array} orientation - array of x y z orientation
     */
    setOrientation(orientation){
        this.orientation=orientation;
    }
    /**
     * Set's the position of the Hive for the bee
     * @param {Array} position 
     */
    setHivePosition(position){
        this.hivePosition=position;
    }

}