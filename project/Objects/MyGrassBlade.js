import {CGFobject, CGFshader} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyGrassBlade extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.offsetDecay = 0.9;
        this.offset = 0.1;
        const sixthPi = Math.PI/6;
        this.initialAngle = Math.random()*sixthPi*2.5 + sixthPi;
        this.angleAmplitude = Math.PI/2 - this.initialAngle;
        this.initBuffers();
        this.initShader();
    }

    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/pollen.frag");
    }

    update(t) {
        const angle = Math.cos(0.01*t)*this.angleAmplitude;
        this.shader.setUniformsValues({'angle': angle});
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.direction = Math.floor(Math.random()*2);
        if (this.direction == 0) this.direction = -1;

        const totalVertices = 2*this.slices+1;

        this.vertices.push(0,0,-0.25,0,0,0.25);
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
            this.normals.push(1,0,0,1,0,0);
            this.indices.push(currIndex,currIndex+1,currIndex+2,currIndex+2,currIndex+1,currIndex+3);
            this.indices.push(currIndex+1+totalVertices,currIndex+totalVertices,currIndex+2+totalVertices,currIndex+1+totalVertices,currIndex+2+totalVertices,currIndex+3+totalVertices);
            this.indices.push()
            currIndex += 2;
            this.offset *= this.offsetDecay;
        }

        this.vertices.push(0,1,center);
        this.normals.push(1,0,0);
        this.indices.push(currIndex,currIndex+1,currIndex+2,currIndex+1+totalVertices,currIndex+totalVertices,currIndex+2+totalVertices);

        const len = this.vertices.length;

        this.vertices.push(...this.vertices);
        for (let i = 0; i < len; i++) {
            this.normals.push(-this.normals[i])
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


