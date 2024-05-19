import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the rock
 * @param scales - Scaling with which to display the rock
 * @param angles - Rotation with which to display the rock
 */
export class MyRock extends CGFobject {
	constructor(scene, radius, scales, angles) {
		super(scene);

        this.radius = radius;
        this.sphere = new MySphere(scene, 10, 10, false, true, 2);
        if (scales) this.scales = scales;
        if (angles) this.angles = angles;
        this.initParams();
	}

    initParams() {
        this.scales = [];
        this.angles = [];
        const twoPi = 2*Math.PI;
        this.scales = [Math.random()*0.5 + 0.6, Math.random()*0.5 + 0.6, Math.random()*0.5 + 0.6];
        this.angles = [Math.random() * twoPi, Math.random(), Math.random(), Math.random()];
    }

    display(scales, angles) {
        if (!angles) angles = this.angles;
        if (!scales) scales = this.scales;
        this.scene.pushMatrix();
        this.scene.scale(...scales);
        this.scene.rotate(...angles);
        this.sphere.display();
        this.scene.popMatrix();
    }
    getScale(){
        return this.scales;
    }

}