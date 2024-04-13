import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from '../Objects/MyTriangle.js';
/**
 * MyPetale
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, angle) {
		super(scene);
                this.angle = angle;
		this.triangle = new MyTriangle(scene);
	}
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 1, 1);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.triangle.display();
        this.scene.popMatrix(); 
        this.scene.translate(0, 1, 0);
        this.scene.rotate(this.angle, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
	}

        enableNormalViz() {
                this.triangle.enableNormalViz();
        }
}
