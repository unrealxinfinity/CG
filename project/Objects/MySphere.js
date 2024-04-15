import {CGFobject} from '../../lib/CGF.js';
/**
 * MySphere
 * Has unit size of 1(radius) and is centered at the origin
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, inverted) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
        this.inverted = inverted;

		this.initBuffers();
	}

    constructVertices() {
        const jPart = Math.PI/this.stacks;
        const iPart = 2*Math.PI/this.slices;
        for (let i = 0; i < this.slices; i++) {
            const phi = iPart*i;
            for (let j = 1; j < this.stacks; j++) {
                const theta = jPart*j;
                const thetaSin = Math.sin(theta);
                const vertex = [thetaSin*Math.sin(phi), Math.cos(theta), thetaSin*Math.cos(phi)];
                this.vertices.push(...vertex);
                if (this.inverted)
                    this.normals.push(-vertex[0], -vertex[1], -vertex[2]);
                else
                    this.normals.push(...vertex);
                this.texCoords.push(i/this.slices, j/this.stacks);
            }
        }
        const phi = 0;
        for (let j = 1; j < this.stacks; j++) {
            const theta = jPart*j;
            const thetaSin = Math.sin(theta);
            const vertex = [thetaSin*Math.sin(phi), Math.cos(theta), thetaSin*Math.cos(phi)];
            this.vertices.push(...vertex);
            if (this.inverted)
                this.normals.push(-vertex[0], -vertex[1], -vertex[2]);
            else
                this.normals.push(...vertex);
            //this.vertices.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            //this.normals.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            this.texCoords.push(1, j/this.stacks);
        }
        for (let i = 0; i < this.slices; i++) {
            this.vertices.push(0,1,0);
            if (this.inverted)
                this.normals.push(0,-1,0);
            else 
                this.normals.push(0,1,0);
            this.texCoords.push((i+0.5)/this.slices, 0);
        }
        for (let i = 0; i < this.slices; i++) {
            this.vertices.push(0,-1,0);
            if (this.inverted)
                this.normals.push(0,1,0);
            else
                this.normals.push(0,-1,0);
            this.texCoords.push((i+0.5)/this.slices, 1);
        }
    }

    constructIndices() {
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks-2; j++) {
                if (this.inverted) {
                    this.indices.push((this.stacks-1)*i + j+1, (this.stacks-1)*i + j, (this.stacks-1)*(i+1) + j+1);
                    this.indices.push((this.stacks-1)*(i+1) + j, (this.stacks-1)*(i+1) + j+1, (this.stacks-1)*i + j);
                }
                else {
                    this.indices.push((this.stacks-1)*i + j, (this.stacks-1)*i + j+1, (this.stacks-1)*(i+1) + j+1);
                    this.indices.push((this.stacks-1)*(i+1) + j+1, (this.stacks-1)*(i+1) + j, (this.stacks-1)*i + j);
                }
            }
        }

        const top = (this.slices+1) * (this.stacks-1);
        for (let i = 0; i < this.slices; i++) {
            if (this.inverted) {
                this.indices.push((this.stacks-1)*i, top+1, ((this.stacks-1)*(i+1)));
                this.indices.push(top+this.slices+i, (this.stacks-1)*(i+1)-1, ((this.stacks-1)*(i+2)-1));
            }
            else {
                this.indices.push(top+i, (this.stacks-1)*i, ((this.stacks-1)*(i+1)));
                this.indices.push((this.stacks-1)*(i+1)-1, top+this.slices+i, ((this.stacks-1)*(i+2)-1));
            }
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

