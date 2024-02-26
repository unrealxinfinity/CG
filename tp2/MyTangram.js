import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.triangle = new MyTriangleSmall(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.diamond = new MyDiamond(this.scene);

		this.vertices = [
		];

		//Counter-clockwise reference of vertices
		this.indices = [
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display() {
		this.scene.pushMatrix();
		var m = [1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		-1,0,0,1];
		this.scene.multMatrix(m);
		this.diamond.display();
		this.scene.popMatrix();
		
		//Triangle Small
		this.scene.pushMatrix();
		this.scene.translate(1,0,0);
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Big
		this.scene.pushMatrix();
		this.scene.translate(0,-2,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(2,2,2);
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Big 2
		this.scene.pushMatrix();
		this.scene.translate(0,-2,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.scale(2,2,2);
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Small 2
		this.scene.pushMatrix();
		this.scene.translate(-2,-1,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.triangle.display();
		this.scene.popMatrix();
		// Triangle medium 
		this.scene.pushMatrix();
		this.scene.translate(1,-1,0);
		this.scene.rotate(-Math.PI/4,0,0,1);
		this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/1.5,0,0,1);
		this.scene.scale(1,-1,1);
		this.parallelogram.display();
		this.scene.popMatrix();
	}
}

