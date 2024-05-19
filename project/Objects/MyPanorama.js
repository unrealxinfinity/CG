import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

		this.texture = texture
        this.sphere = new MySphere(scene, 200, 200, true, false, 1);

		this.initMaterial();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0,0,0,1);
        this.appearance.setDiffuse(0,0,0,1);
        this.appearance.setSpecular(0,0,0,1);
        this.appearance.setEmission(1,1,1,1);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(cameraPosition) {
        this.scene.pushMatrix();
        this.scene.translate(...cameraPosition);
        this.scene.scale(200, 200, 200);
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

}