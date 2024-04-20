import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCylinder
 * Has unit size (length 1) and it starts at origin and grows downwards.
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyCylinder extends CGFobject {
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
			const angle = twoPi * (i/this.slices);
			const vertex = [Math.cos(angle), Math.sin(angle), z]; 
			slice.push(...vertex);
			this.normals.push(Math.cos(angle ), Math.sin(angle ), 0);
			
		}

		return slice;
	}

	extendIndices(index) {
		const offset = this.slices*index;
		for (let i = 0; i < this.slices-1; i++) {
			const start = i+offset;
			this.indices.push(start, start+1,start+this.slices);
			this.indices.push(start+1, start+1+this.slices, start+this.slices);
		}

		const start=this.slices-1+offset;
		const final1 = start-this.slices+1;
		const final2 = start+this.slices;
		const final3 = final1+this.slices;
		this.indices.push(start, final1, final2);
		this.indices.push(final3, final2, final1);
	}

	initBuffers() {
		this.normals = [];
		this.vertices = this.constructSlice(0);
		this.indices = [];
		
		for (let i = 0; i < this.stacks; i++) {
			this.vertices.push(...this.constructSlice((i+1)/this.stacks));
			this.extendIndices(i);
		}
		this.vertices.push(0,0,0,0,0,1);
		this.normals.push(0,0,-1,0,0,1);
		const bottom = this.slices*(this.stacks+1);
		const top = bottom+1;
		const offset = this.stacks*this.slices;
		for (let i = 0; i < this.slices; i++) {
			this.indices.push((i+1) % this.slices, i, bottom);
			this.indices.push(offset+i, offset+((i+1) % this.slices), top);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

