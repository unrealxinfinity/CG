import { CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../lib/CGF.js';
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

        this.sphere = new MySphere(scene, 40, 40, false, false, 1, 1.5, 1);
        this.initMaterial();
        this.initShader();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        const texture = new CGFtexture(this.scene, "images/pollen.jpg");
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1,1,1,1);
        this.appearance.setDiffuse(1,1,1,1);
        this.appearance.setSpecular(0,0,0,1);

        this.texture = new CGFtexture(this.scene, "images/pollenMap.jpg");
    }

    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/pollen.vert", "shaders/pollen.frag");
        this.shader.setUniformsValues({'uSampler2': 1});
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.texture.bind(1);
        //this.scene.setActiveShader(this.shader);
        this.sphere.display();
        //this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }

}