import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	constructSlice(z) {
		const slice = []
		const twoPi = 2*Math.PI;
		for (let i = 0; i < this.slices; i++) {
			const vertex = [Math.cos(twoPi * (i/this.slices)), Math.sin(twoPi * (i/this.slices)), z] 
			slice.push(...vertex)
			slice.push(...vertex)
		}

		return slice;
	}

	extendVertices(index) {
		const offset = 2*this.slices*index;
		for (let i = 0; i < 2*this.slices -2; i=i+2) {
			const start = i+offset;
			this.indices.push(...[start, start+2, start+2*this.slices]);
			this.indices.push(...[(start+2+2*this.slices), start+2*this.slices, start+2]);
		}
		const final = 2*this.slices - 2;
		this.indices.push(...[final, offset, final+2*this.slices]);
		this.indices.push(...[offset+2*this.slices, final+2*this.slices, offset]);
	}

	initBuffers() {

		this.vertices = this.constructSlice(0);
		this.indices = [];
		
		for (let i = 0; i < this.stacks; i++) {
			this.vertices.push(...this.constructSlice((i+1)/this.stacks));
			this.extendVertices(i);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

