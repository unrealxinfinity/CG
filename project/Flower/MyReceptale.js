import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';

/**
 * MyReceptale
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the receptacle
 * @param objects - objects to be used in the receptacle
 */
export class MyReceptale extends CGFobject {
    constructor(scene, radius, objects) {
        super(scene);
        this.radius = radius;
        this.sphere = objects.sphere;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}