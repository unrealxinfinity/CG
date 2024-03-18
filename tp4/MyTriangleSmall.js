import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	setTexCoords(texCoords) {
		this.texCoords = texCoords;
		this.updateTexCoordsGLBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1,0,0, //0
			1,0,0, //1
			0,1,0 //2
		];

		this.texCoords = []

		//Counter-clockwise reference of vertices
		this.indices = [
			1,2,0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]
		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}