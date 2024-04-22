import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
 */
export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sin = Math.sin(Math.PI/4);
        this.cos = Math.cos(Math.PI/4);
        this.sphere = new MySphere(scene, 20, 20, false, false, 1);
        this.sinThird = Math.sin(Math.PI/3);
        this.cosThird = Math.cos(Math.PI/3);
        this.cosThetaLeg = Math.cos(3*Math.PI/4);
        this.sinThetaLeg = Math.sin(3*Math.PI/4);
        this.cylinder = new MyCylinder(scene, 10, 10);
		this.initMaterials();
	}

    initMaterials() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.25,0.25,0.25,1);
        this.appearance.setDiffuse(0.25,0.25,0.25,1);
        this.appearance.setSpecular(0,0,0,1);

        this.stripedApp = new CGFappearance(this.scene);
        this.stripedTex = new CGFtexture(this.scene, "images/beestripe.jpg");
        this.stripedApp.setTexture(this.stripedTex);
        this.stripedApp.setAmbient(0.75,0.75,0.75,1);
        this.stripedApp.setDiffuse(0.75,0.75,0.75,1);
        this.stripedApp.setSpecular(0,0,0,1);
        this.stripedApp.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeApp = new CGFappearance(this.scene);
        this.eyeTex = new CGFtexture(this.scene, "images/beeeye.jpg");
        this.eyeApp.setTexture(this.eyeTex);
        this.eyeApp.setAmbient(0.75,0.75,0.75,1);
        this.eyeApp.setDiffuse(0.75,0.75,0.75,1);
        this.eyeApp.setSpecular(0,0,0,1);
        this.eyeApp.setTextureWrap('REPEAT', 'REPEAT');

        this.headApp = new CGFappearance(this.scene);
        this.headApp.setAmbient(1,1,0.06,1);
        this.headApp.setDiffuse(1,1,0.06,1);
        this.headApp.setSpecular(0,0,0,1);

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
    }

    display() {
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
        this.scene.translate(-3,-1,0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(1, 2, 1);
        this.stripedApp.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.1, 0, 0);
        this.scene.pushMatrix();
        this.appearance.apply();
        
        this.scene.scale(1.1, 1.1, 1.1);
        this.appearance.apply();
        this.sphere.display();

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

        this.scene.popMatrix();
        this.scene.pushMatrix(); //START WINGS

        this.wingApp.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.1*this.sin, 1.1*this.cos + 1.5);
        this.scene.scale(0.5, 0.1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 1.1*this.sin, 1.1*this.cos + 1.5);
        this.scene.scale(0.5, 0.1, 2);
        this.sphere.display();
        this.scene.popMatrix();


        this.scene.popMatrix(); //END WINGS

        this.scene.popMatrix();
    }

}