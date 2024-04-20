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

        this.rocks = stages*stages;
        this.stages = stages;
        this.radius = radius;
        this.rock = new MyRock(scene, radius, null, null);
        
	}

    initParams() {
        this.scales = [];
        this.angles = [];
        for (let i = 0; i < 3; i++) {
            this.scales.push(Math.random()*0.5 + 0.7);
            this.angles.push(Math.random());
        }
    }

    display() {
        for (let i = 0; i < this.stages; i++) {
            const len = 1 + 2*i;
            this.scene.pushMatrix();
            this.scene.translate(Math.ceil(-len/2)*this.radius, -i*this.radius, Math.ceil(-len/2)*this.radius);
            for (let x = 0; x < len; x++) {
                for (let y = 0; y < len; y++) {
                    this.scene.pushMatrix();
                    this.scene.translate(x*this.radius, 0, y*this.radius);
                    this.rock.display();
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();
        }
    }

}