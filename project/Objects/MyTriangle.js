import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * Has unit size 1 (edge) with base at origin and top at (0,1,0)
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	updateTexCoords(texCoords) {
		this.texCoords = texCoords;
		this.updateTexCoordsGLBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			1,0,0, //0
            -1,0,0,//1
            0,1,0, //2
			1,0,0,
			-1,0,0,
			0,1,0,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2,1,0,
			5,3,4,
		];
		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
		]

		this.texCoords = []

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
