import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to apply
 */
export class MyPollen extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 10, 10, false, false, 1, 1.5, 1);
        this.initMaterial();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        const texture = new CGFtexture(this.scene, "images/pollen.jpg");
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1,1,1,1);
        this.appearance.setDiffuse(1,1,1,1);
        this.appearance.setSpecular(0,0,0,1);
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

}