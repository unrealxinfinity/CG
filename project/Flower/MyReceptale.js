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
        this.sphere = new MySphere(scene, slices, stacks, radius);
    }

    display() {
        this.sphere.display();
    }
}