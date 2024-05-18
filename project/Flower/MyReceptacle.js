import {CGFobject,CGFtexture,CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Objects/MySphere.js';

/**
 * MyReceptale
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the receptacle
 * @param objects - objects to be used in the receptacle
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius,receptaleColor, objects,textures) {
        super(scene);
        this.radius = radius;
        this.sphere = objects.sphere;
        this.texture = textures.receptaleTexture;
		this.receptaleApp = new CGFappearance(scene);
		this.receptaleApp.setTexture(this.texture);
		this.receptaleApp.setTextureWrap('REPEAT', 'REPEAT');
		this.receptaleApp.setAmbient(...receptaleColor, 1);
		this.receptaleApp.setDiffuse(...receptaleColor, 1);
		this.receptaleApp.setSpecular(0, 0, 0, 0);
		this.receptaleApp.setShininess(10);
    }
    

    display() {
        this.receptaleApp.apply();
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();
    }
}