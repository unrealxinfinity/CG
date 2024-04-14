import {CGFobject} from '../../lib/CGF.js';
import { MyPetale } from './MyPetale.js';
import { MyReceptale } from './MyReceptale.js';
import { MyStem } from './MyStem.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.petale = new MyPetale(scene);
        this.receptale = new MyReceptale(scene, 10, 10);
        this.stem = new MyStem(scene, 10, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.receptale.display();
        this.scene.popMatrix();
            
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.petale.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0);
        this.scene.stem.display();
        this.scene.popMatrix();
    }
}