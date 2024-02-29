import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0, -0.5, //0 this
			0.5, 0, -0.5,  //1 this
			-0.5, 0, 0.5,  //2 this
			0.5, 0, 0.5,    //3 this
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2,3,0,
            3,1,0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

