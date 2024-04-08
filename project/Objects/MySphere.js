import {CGFobject} from '../../lib/CGF.js';
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

    constructVertices() {
        for (let i = 0; i < this.slices; i++) {
            const phi = (2*Math.PI/this.slices)*i;
            for (let j = 1; j < this.stacks; j++) {
                //const theta = (-Math.PI/2) + (2*Math.PI/this.stacks)*j;
                const theta = (Math.PI/this.stacks)*j;
                this.vertices.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
                this.normals.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
                this.texCoords.push(i/this.slices, j/this.stacks);
            }
        }
        const phi = 0;
        for (let j = 1; j < this.stacks; j++) {
            const theta = (Math.PI/this.stacks)*j;
            this.vertices.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            this.normals.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            this.texCoords.push(1, j/this.stacks);
        }
        this.vertices.push(0,1,0,0,-1,0);
        this.normals.push(0,1,0,0,-1,0);
    }

    constructIndices() {
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks-2; j++) {
                this.indices.push((this.stacks-1)*i + j, (this.stacks-1)*i + j+1, (this.stacks-1)*(i+1) + j+1);
                this.indices.push((this.stacks-1)*(i+1) + j+1, (this.stacks-1)*(i+1) + j, (this.stacks-1)*i + j);
            }
        }

        const top = (this.slices+1) * (this.stacks-1);
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(top, (this.stacks-1)*i, ((this.stacks-1)*(i+1)));
            this.indices.push((this.stacks-1)*(i+1)-1, top+1, ((this.stacks-1)*(i+2)-1));
        }
    }

	initBuffers() {
		this.normals = [];
		this.vertices = []
		this.indices = [];
		this.texCoords = [];
		
        this.constructVertices();
        this.constructIndices();

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

