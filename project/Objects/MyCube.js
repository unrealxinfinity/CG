import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 * @note the remaining params are the textures to be used in each face
 */
export class MyCube extends CGFobject {
	constructor(scene,textura1,texture,texture3,textura4,textura5,textura6) {
		super(scene);
		this.initBuffers();
		this.texture1=textura1;
		this.texture2=texture;
		this.texture3=texture3;
		this.texture4=textura4;
		this.texture5=textura5;
		this.texture6=textura6;
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
	}
	
	initBuffers() {
		this.quad = new MyQuad(this.scene);
		this.vertices = [];
		//Counter-clockwise reference of vertices
		this.indices = [];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	display(){
		
		this.material.setTexture(this.texture6);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI,1,0,0);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.material.setTexture(this.texture1);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.material.setTexture(this.texture2);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.quad.updateTexCoords([0,0,1,0,0,1,1,1]);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.material.setTexture(this.texture4);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quad.updateTexCoords([1,1,0,1,1,0,0,0]);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.material.setTexture(this.texture5);
		this.material.apply();	
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.quad.updateTexCoords([0,1,0,0,1,1,1,0]);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.material.setTexture(this.texture3);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.quad.updateTexCoords([1,0,1,1,0,0,0,1]);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		
	}
}

