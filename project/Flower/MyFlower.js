import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptale } from './MyReceptale.js';
import { MyStem } from './MyStem.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, petals,stems, innerRadius, outerRadius, petalTex,leafText, receptacleColor,leafColor) {
        super(scene);
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.petals = petals;
        this.receptacleApp = new CGFappearance(scene);
        this.receptacleApp.setAmbient(...receptacleColor, 1);
        this.receptacleApp.setDiffuse(...receptacleColor, 1);
        this.receptacleApp.setSpecular(0, 0, 0, 0);
        this.receptacleApp.setShininess(10);
        this.receptacle = new MyReceptale(this.scene, 20, 20, innerRadius);
        this.petal = new MyPetal(this.scene, innerRadius, outerRadius);
        this.stem = new MyStem(this.scene, 10, 10,stems,0.3,outerRadius,outerRadius+2,this.leafTexture,leafColor);
        this.angles = [];
        this.baseAngles = [];
        this.texCoords = [];
        this.petalTex = petalTex;
        this.receptacleAngle = Math.random()*Math.PI/2 + Math.PI/4; 
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
        this.scene.pushMatrix();
        this.scene.rotate(this.receptacleAngle, 1, 0, 0);
        for (let i = 0; i < this.petals; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(rotationStep*i, 0, 0, 1);
            this.scene.translate(0, this.innerRadius, 0);
            this.scene.rotate(this.baseAngles[i], 1, 0, 0);
            this.petal.display(this.angles[i], this.texCoords[i]);
            this.scene.popMatrix();
        }
        this.receptacleApp.apply();
        this.receptacle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -this.innerRadius, 0);
        this.stem.display();
        this.scene.popMatrix();
    }
}