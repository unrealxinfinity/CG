import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MySphere } from './MySphere.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
 */
export class MyRockSet extends CGFobject {
	constructor(scene, radius, stages) {
		super(scene);

        this.rocks = 0;
        for (let stage = 0; stage < stages; stage++) {
            const len = 1 + stage*2;
            this.rocks += len*len;
        }
        this.stages = stages;
        this.radius = radius;
        this.rock = new MyRock(scene, radius, null, null);
        
        this.initParams();
	}

    initParams() {
        this.scales = [];
        this.angles = [];
        const twoPi = 2*Math.PI;
        for (let i = 0; i < this.rocks; i++) {
            this.scales.push([Math.random()*0.5 + 0.6, Math.random()*0.5 + 0.6, Math.random()*0.5 + 0.6]);
            this.angles.push([Math.random() * twoPi, Math.random(), Math.random(), Math.random()]);
            
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, (this.stages-1)*this.radius, 0);
        let rockIndex = 0;
        for (let i = 0; i < this.stages; i++) {
            const len = 1 + 2*i;
            this.scene.pushMatrix();
            this.scene.translate(Math.ceil(-len/2)*this.radius, -i*this.radius, Math.ceil(-len/2)*this.radius);
            for (let x = 0; x < len; x++) {
                for (let y = 0; y < len; y++) {
                    this.scene.pushMatrix();
                    this.scene.translate(x*this.radius, 0, y*this.radius);
                    this.rock.display(this.scales[rockIndex], this.angles[rockIndex]);
                    rockIndex++;
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }

}