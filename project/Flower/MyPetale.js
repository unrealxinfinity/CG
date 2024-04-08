import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from '../Objects/MyTriangle.js';
/**
 * MyPetale
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetale extends CGFobject {
	constructor(scene) {
		super(scene);
		this.triangle = new MyTriangle(scene);
	}
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 1, 1);
        this.triangle.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(0.5, 1, 1);
        this.triangle.display();
        this.scene.popMatrix();
	}
}
