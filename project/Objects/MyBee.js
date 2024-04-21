import {CGFappearance, CGFobject} from '../../lib/CGF.js';
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
        this.sinThird = Math.sin(Math.PI/3);
        this.cosThird = Math.cos(Math.PI/3);
        this.sphere = new MySphere(scene, 20, 20, false, false);
        this.cylinder = new MyCylinder(scene, 10, 10);
		this.initMaterial();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.25,0.25,0.25,1);
        this.appearance.setDiffuse(0.25,0.25,0.25,1);
        this.appearance.setSpecular(0,0,0,1);
    }

    display() {
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, this.sinThird, this.cosThird);
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.sinThird, -this.cosThird);
        this.scene.rotate(-2*Math.PI/3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();

        this.sphere.display();
        this.scene.pushMatrix();
        this.scene.translate(this.sin*this.cos, this.sin*this.sin, this.cos);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(this.sin*this.cos, this.sin*this.sin, -this.cos);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-1.1, 0, 0);
        this.scene.pushMatrix(); //START WINGS

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
        this.scene.scale(1.1, 1.1, 1.1);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-3,-1,0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(2, 1, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }

}