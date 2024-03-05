import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
		this.initMaterial();
	}

	initMaterial() {
		this.material = new CGFappearance(this.scene);
		this.material.setDiffuse(0,0,0,1);
		this.material.setShininess(10.0);
	}

	setColor(r, g, b) {
		this.material.setAmbient(r, g, b, 1);
		this.material.setSpecular(r, g, b, 1);
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

	display(parallelogramMaterial) {
		this.scene.pushMatrix();
		var m = [1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		-1,0,0,1];
		this.scene.multMatrix(m);
		this.setColor(0.25, 1, 0);
		this.material.apply();
		this.diamond.display();
		this.scene.popMatrix();
		
		//Triangle Small
		this.scene.pushMatrix();
		this.scene.translate(1,0,0);
		this.setColor(0.616, 0.208, 0.702);
		this.material.apply();
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Big
		this.scene.pushMatrix();
		this.scene.translate(0,-2,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(2,2,2);
		this.setColor(0.851, 0.494, 0.031);
		this.material.apply();
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Big 2
		this.scene.pushMatrix();
		this.scene.translate(0,-2,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.scale(2,2,2);
		this.setColor(0.173, 0.643, 0.941);
		this.material.apply();
		this.triangle.display();
		this.scene.popMatrix();
		//Triangle Small 2
		this.scene.pushMatrix();
		this.scene.translate(-2,-1,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.setColor(0.941, 0.059, 0.059);
		this.material.apply();
		this.triangle.display();
		this.scene.popMatrix();
		// Triangle medium 
		this.scene.pushMatrix();
		this.scene.translate(1,-1,0);
		this.scene.rotate(-Math.PI/4,0,0,1);
		this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
		this.setColor(1, 0.694, 0.843);
		this.material.apply();
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/1.5,0,0,1);
		this.scene.scale(1,-1,1);
		this.setColor(0.996, 1, 0);
		parallelogramMaterial.apply();
		this.parallelogram.display();
		this.scene.popMatrix();
	}

	enableNormalVizT() {
		this.triangle.enableNormalViz();
		this.diamond.enableNormalViz();
		this.parallelogram.enableNormalViz();
	}

	disableNormalVizT() {
		this.triangle.disableNormalViz();
		this.diamond.disableNormalViz();
		this.parallelogram.disableNormalViz();
	}
}

