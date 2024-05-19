import {CGFobject, CGFshader} from '../../lib/CGF.js';
/**
* MyGrassBlade
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param material - material to be applied
*/
export class MyGrassBlade extends CGFobject {
    constructor(scene, slices, material) {
        super(scene);
        this.slices = slices;
        this.offsetDecay = 0.9;
        this.offset = 0.1;
        this.material = material;
        const sixthPi = Math.PI/6;
        this.angle = Math.random()*sixthPi*2.5 + sixthPi;
        this.angleAmplitude = Math.PI/2 - this.angle;
        this.initBuffers();
    }
    /**
     * Updates the angle of the grass blade according to time
     * @param {Number} t 
     */
    update(t) {
        this.angle = Math.cos(0.01*t)*this.angleAmplitude;
        
    }
    /**
     * Applies the shader to the grass blade
     * @param {CGFshader} shader 
     */
    apply(shader) {
        this.material.apply();
        shader.setUniformsValues({'angle': this.angle});
    }
  
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.direction = Math.floor(Math.random()*2);
        if (this.direction == 0) this.direction = -1;

        const totalVertices = 2*this.slices+1;

        this.vertices.push(0,0,-0.25,0,0,0.25);
        this.texCoords.push(0,1,1,1);
        this.normals.push(1,0,0,1,0,0);
        let center = 0;
        let amplitude = 0.25;
        let currIndex = 0;
        for (let i = 1; i < this.slices; i++) {
            const sliceOffset = Math.random()*this.offset*this.direction;
            center += sliceOffset;
            amplitude *= 0.75;
            const y = i/this.slices;
            this.vertices.push(0,y,center-amplitude,0,y,center+amplitude);
            this.texCoords.push(0, 1 - y, 1, 1 - y);
            this.normals.push(1,0,0,1,0,0);
            this.indices.push(currIndex,currIndex+1,currIndex+2,currIndex+2,currIndex+1,currIndex+3);
            this.indices.push(currIndex+1+totalVertices,currIndex+totalVertices,currIndex+2+totalVertices,currIndex+1+totalVertices,currIndex+2+totalVertices,currIndex+3+totalVertices);
            this.indices.push()
            currIndex += 2;
            this.offset *= this.offsetDecay;
        }

        this.vertices.push(0,1,center);
        this.texCoords.push(0.5,0);
        this.normals.push(1,0,0);
        this.indices.push(currIndex,currIndex+1,currIndex+2,currIndex+1+totalVertices,currIndex+totalVertices,currIndex+2+totalVertices);

        const len = this.vertices.length;

        this.vertices.push(...this.vertices);
        this.texCoords.push(...this.texCoords);
        for (let i = 0; i < len; i++) {
            this.normals.push(-this.normals[i])
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


