import {CGFobject} from '../../lib/CGF.js';
/**
 * MySphere
 * Has unit size of 1(radius) and is centered at the origin
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 * @param inverted - true if the sphere is to be visible on the inside, false otherwise
 * @param perturb - if true, the vertices are displaced along their normals, used for rocks and pollen
 * @param xTexOffset - value by which the horizontal texture coordinates are multiplied (if the texture we have is not wide enough, we can use a value higher than 1 to repeat it along the sphere)
 * @param bottomOffset - offset used to displace the vertices on the bottom hemisphere, to create an ellipsoid shape
 * @param topOffset - offset used to displace the vertices on the top hemisphere, to create an ellipsoid shape
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, inverted, perturb, xTexOffset, bottomOffset=1.0, topOffset=1.0) {
		super(scene);

        this.perturb = perturb;
		this.slices = slices;
        this.xTexOffset = xTexOffset;
		this.stacks = stacks;
        this.topOffset = topOffset;
        this.bottomOffset = bottomOffset;
        this.inverted = inverted;

		this.initBuffers();
	}


    /**
     * Builds the vertex array for the object, along with normals and texture coordinates
     */
    constructVertices() {
        const firstLastPerturb = Math.random()*0.3+0.85;
        const jPart = Math.PI/this.stacks;
        const iPart = 2*Math.PI/this.slices;
        for (let i = 0; i < this.slices; i++) {
            const phi = iPart*i;
            for (let j = 1; j < this.stacks; j++) {
                const theta = jPart*j;
                const thetaSin = Math.sin(theta);
                const eggOffset = Math.cos(theta) > 0 ? this.topOffset : this.bottomOffset;
                let vertex = [thetaSin*Math.sin(phi), Math.cos(theta) * eggOffset, thetaSin*Math.cos(phi)];
                if (this.perturb) {
                    const random = i == 0 ? firstLastPerturb : Math.random()*0.3+0.85;
                    vertex = vertex.map(v => random*v);
                }
                this.vertices.push(...vertex);
                if (this.inverted)
                    this.normals.push(-vertex[0], -vertex[1], -vertex[2]);
                else
                    this.normals.push(...vertex);
                this.texCoords.push(this.xTexOffset*i/this.slices, j/this.stacks);
            }
        }
        const phi = 0;
        for (let j = 1; j < this.stacks; j++) {
            const theta = jPart*j;
            const thetaSin = Math.sin(theta);
            const eggOffset = Math.cos(theta) > 0 ? this.topOffset : this.bottomOffset;
            let vertex = [thetaSin*Math.sin(phi), Math.cos(theta)*eggOffset, thetaSin*Math.cos(phi)];
            if (this.perturb) {
                vertex = vertex.map(v => firstLastPerturb*v);
            }
            this.vertices.push(...vertex);
            if (this.inverted)
                this.normals.push(-vertex[0], -vertex[1], -vertex[2]);
            else
                this.normals.push(...vertex);
            //this.vertices.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            //this.normals.push(Math.sin(theta)*Math.sin(phi),Math.cos(theta),Math.sin(theta)*Math.cos(phi));
            this.texCoords.push(this.xTexOffset*1, j/this.stacks);
        }
        const topPerturb = Math.random()*0.3+0.85;
        const bottomPerturb = Math.random()*0.3+0.85;
        for (let i = 0; i < this.slices; i++) {
            if (this.perturb)
                this.vertices.push(0,topPerturb*this.topOffset,0);
            else
                this.vertices.push(0,this.topOffset,0);
            if (this.inverted)
                this.normals.push(0,-this.topOffset,0);
            else 
                this.normals.push(0,this.topOffset,0);
            this.texCoords.push(this.xTexOffset*(i+0.5)/this.slices, 0);
        }
        for (let i = 0; i < this.slices; i++) {
            if (this.perturb)
                this.vertices.push(0,-bottomPerturb*this.bottomOffset,0);
            else
                this.vertices.push(0,-this.bottomOffset,0);
            if (this.inverted)
                this.normals.push(0,this.bottomOffset,0);
            else
                this.normals.push(0,-this.bottomOffset,0);
            this.texCoords.push(this.xTexOffset*(i+0.5)/this.slices, 1);
        }
    }

    /**
     * Builds the index array for the object
     */
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

