import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
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
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI,1,0,0);
		this.quad.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.quad.display();
		this.scene.popMatrix();

		
	}
}

