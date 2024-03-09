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
		let normal_offset = 1;
		const normal_angle_offset = Math.PI/this.slices;
		for (let i = 0; i < this.slices; i++) {
			const angle = twoPi * (i/this.slices);
			const vertex = [Math.cos(angle), Math.sin(angle), z]; 
			slice.push(...vertex);
			this.normals.push(...[Math.cos(angle + normal_offset*normal_angle_offset), Math.sin(angle + normal_offset*normal_angle_offset), 0]);
			this.normals.push(...[Math.cos(angle - normal_offset*normal_angle_offset), Math.sin(angle - normal_offset*normal_angle_offset), 0]);
			slice.push(...vertex);
			normal_offset = -normal_offset;
		}

		return slice;
	}

	extendVertices(index) {
		const offset = 2*this.slices*index;
		let vertex_offset = 0;
		for (let i = 0; i < 2*this.slices -2; i=i+2) {
			const start = i+offset + vertex_offset;
			this.indices.push(...[start, start+2, start+2*this.slices]);
			this.indices.push(...[(start+2+2*this.slices), start+2*this.slices, start+2]);
			vertex_offset = (vertex_offset == 0) ? 1 : 0;
		}
		const final = 2*this.slices - 2;
		this.indices.push(...[final, offset+1, final+2*this.slices]);
		this.indices.push(...[offset+2*this.slices+1, final+2*this.slices, offset+1]);
	}

	initBuffers() {
		this.normals = [];
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

