import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptale } from './MyReceptale.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, petals, innerRadius, outerRadius, petalTex, receptacleColor) {
        super(scene);
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.petals = petals;
        this.receptacleApp = new CGFappearance(scene);
        this.receptacleApp.setAmbient(...receptacleColor, 1);
        this.receptacleApp.setDiffuse(...receptacleColor, 1);
        this.receptacleApp.setSpecular(0, 0, 0, 1);
        this.receptacleApp.setShininess(10);
        this.receptacle = new MyReceptale(this.scene, 20, 20, innerRadius);
        this.petal = new MyPetal(this.scene, 0);
        this.angles = [];
        this.baseAngles = [];
        this.texCoords = [];
        this.petalTex = petalTex;
        const halfPi = Math.PI/2;
        const quarterPi = Math.PI/4;
        for (let i = 0; i < petals; i++) {
            this.angles.push(Math.random()*halfPi - quarterPi);
            this.baseAngles.push(Math.random()*halfPi - quarterPi);
            this.texCoords.push(MyFlower.generateTexCoords());
        }
    }

    static generateTexCoords() {
        const x = Math.random()*0.85;
        const y = Math.random()*Math.sqrt(3)/20;
        const texCoordsA = [x+0.05, y+Math.sqrt(3)/20, x+0.1, 0, x, y];
        texCoordsA.push(...texCoordsA);
        const texCoordsB = [x+0.1, 0, x+0.05, y+Math.sqrt(3)/20, x+0.15, y+Math.sqrt(3)/20];
        texCoordsB.push(...texCoordsB);
        return [texCoordsA, texCoordsB];
    }

    display() {
        const rotationStep = 2*Math.PI/this.petals;
        this.petalTex.apply();
        for (let i = 0; i < this.petals; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(rotationStep*i, 0, 0, 1);
            this.scene.translate(0, this.outerRadius - 2, 0);
            this.scene.rotate(this.baseAngles[i], 1, 0, 0);
            this.petal.display(this.angles[i], this.texCoords[i]);
            this.scene.popMatrix();
        }
        this.receptacleApp.apply();
        this.receptacle.display();
    }
}