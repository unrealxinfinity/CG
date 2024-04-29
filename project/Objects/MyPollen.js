import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
 */
export class MyPollen extends CGFobject {
	constructor(scene, radius) {
		super(scene);

        this.sphere = new MySphere(scene, 10, 10, false, false, 1, 1.5, 1);
	}

    display() {
        this.scene.pushMatrix();
        this.sphere.display();
        this.scene.popMatrix();
    }

}