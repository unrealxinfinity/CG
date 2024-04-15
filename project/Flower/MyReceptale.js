import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptale extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.radius = radius;
        this.sphere = new MySphere(scene, slices, stacks, false);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}