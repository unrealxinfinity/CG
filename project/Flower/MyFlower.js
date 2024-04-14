import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptale } from './MyReceptale.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, petals, innerRadius, outerRadius) {
        super(scene);
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.petals = petals;
        this.receptacle = new MyReceptale(this.scene, 20, 20, innerRadius);
        this.petal = new MyPetal(this.scene, 0);
        this.angles = [];
        const halfPi = Math.PI/2;
        const quarterPi = Math.PI/4;
        for (let i = 0; i < petals; i++) {
            this.angles.push(Math.random()*halfPi - quarterPi);
        }
    }

    display() {
        const rotationStep = 2*Math.PI/this.petals;
        for (let i = 0; i < this.petals; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(rotationStep*i, 0, 0, 1);
            this.scene.translate(0, this.outerRadius - 2, 0);
            this.petal.display(this.angles[i]);
            this.scene.popMatrix();
        }
        this.receptacle.display();
    }
}