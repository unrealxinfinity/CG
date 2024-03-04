import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5, //0
			0.5, 0.5, -0.5,	  //1
			0.5, -0.5, -0.5,  //2
			-0.5, 0.5, -0.5,  //3
			-0.5, -0.5, 0.5,  //4
			0.5, 0.5, 0.5,	  //5
			0.5, -0.5, 0.5,	  //6
			-0.5, 0.5, 0.5,   //7
			-0.5, -0.5, -0.5, //0
			0.5, 0.5, -0.5,	  //1
			0.5, -0.5, -0.5,  //2
			-0.5, 0.5, -0.5,  //3
			-0.5, -0.5, 0.5,  //4
			0.5, 0.5, 0.5,	  //5
			0.5, -0.5, 0.5,	  //6
			-0.5, 0.5, 0.5,   //7
			-0.5, -0.5, -0.5, //0
			0.5, 0.5, -0.5,	  //1
			0.5, -0.5, -0.5,  //2
			-0.5, 0.5, -0.5,  //3
			-0.5, -0.5, 0.5,  //4
			0.5, 0.5, 0.5,	  //5
			0.5, -0.5, 0.5,	  //6
			-0.5, 0.5, 0.5,   //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2, //1
			1, 2, 3,
			11, 7, 9, //2
			9, 7, 13,
			5, 15, 6, //3
			4, 6, 15,
			8, 10, 14, //4
			8, 14, 12,
			17, 21, 22, //5
			18, 17, 22,
			23, 19, 20, //6
			16, 20, 19
		];

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 1, 0,
			0, -1, 0,
			0, 1, 0, // 9
			0, -1, 0,
			0, 1, 0, //11
			0, -1, 0,
			0, 1, 0, //13
			0, -1, 0,
			0, 0, 1, //15
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0, //21
			1, 0, 0,
			-1, 0, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

