import {CGFappearance, CGFobject} from '../../lib/CGF.js';
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
        this.sphere = new MySphere(scene, 10, 10, false, true);
		this.initMaterial();
        if (scales) this.scales = scales;
        if (angles) this.angles = angles;
        this.initParams();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.25,0.25,0.25,1);
        this.appearance.setDiffuse(0.25,0.25,0.25,1);
        this.appearance.setSpecular(0,0,0,1);
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
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.scale(...scales);
        this.scene.rotate(Math.PI/2, ...this.angles);
        this.sphere.display();
        this.scene.popMatrix();
    }

}