import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
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
        for (let i = 0; i < 3; i++) {
            this.scales.push(Math.random()*0.5 + 0.7);
            this.angles.push(Math.random());
        }
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

}