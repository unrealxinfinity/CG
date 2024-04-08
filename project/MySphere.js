import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MySphere object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MySphere extends CGFobject {
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
		const final = 2*this.slices*(index+1) - 2;
		console.log([final, offset+1, final+2*this.slices])
		console.log([offset+2*this.slices+1, final+2*this.slices, offset+1])
		this.indices.push(...[final, offset+1, final+2*this.slices]);
		this.indices.push(...[offset+2*this.slices+1, final+2*this.slices, offset+1]);
	}

    constructVertices() {
        for (let i = 0; i < this.slices; i++) {
            const phi = (2*Math.PI/this.slices)*i;
            for (let j = 1; j < this.stacks; j++) {
                //const theta = (-Math.PI/2) + (2*Math.PI/this.stacks)*j;
                const theta = (Math.PI/this.stacks)*j;
                this.vertices.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
                this.normals.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            }
        }
        this.vertices.push(0,1,0,0,-1,0);
        this.normals.push(0,1,0,0,-1,0);
    }

    constructIndices() {
        for (let i = 0; i < this.slices-1; i++) {
            for (let j = 0; j < this.stacks-2; j++) {
                this.indices.push((this.stacks-1)*i + j, (this.stacks-1)*i + j+1, (this.stacks-1)*(i+1) + j+1);
                this.indices.push((this.stacks-1)*(i+1) + j+1, (this.stacks-1)*(i+1) + j, (this.stacks-1)*i + j);
            }
        }
        for (let j = 0; j < this.stacks-2; j++) {
            const i = this.slices-1;
            this.indices.push((this.stacks-1)*i + j, (this.stacks-1)*i + j+1, j+1);
            this.indices.push(j+1, j, (this.stacks-1)*i + j);
        }

        const top = this.slices * (this.stacks-1);
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(top, (this.stacks-1)*i, ((this.stacks-1)*(i+1)) % top);
            this.indices.push((this.stacks-1)*(i+1)-1, top+1, ((this.stacks-1)*(i+2)-1) % top);
        }
    }

	initBuffers() {
		this.normals = [];
		this.vertices = []
		this.indices = [];
		
        this.constructVertices();
        this.constructIndices();

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

