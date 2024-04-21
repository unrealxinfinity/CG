import {CGFobject,CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numStems - number of stems to be created
 * @innerRadius - inner radius of the stem
 * @outterRadius - outter radius of the flower
 * @maxLength - maximum length of the stem, > outterRadius
 * @stemColor - color of the stem
 * @leafColor - color of the leaf
 * @objects - objects to be used in the stem
 */
export class MyStem extends CGFobject {
	constructor(scene, numStems,innerRadius,outterRadius,maxLength,stemColor,leafColor,objects) {
		super(scene);
		this.numberOfStems=numStems;
		this.stemApp = new CGFappearance(scene);
		this.stemTex = new CGFtexture(this.scene, "images/stem.jpg");
		this.stemApp.setTexture(this.stemTex);
		this.stemApp.setTextureWrap('REPEAT', 'REPEAT');
        this.stemApp.setAmbient(...stemColor, 1);
        this.stemApp.setDiffuse(...stemColor, 1);
        this.stemApp.setSpecular(0, 0, 0, 0);
        this.stemApp.setShininess(10);
		//stem related attributes
		this.stemLength = maxLength;
		this.radius = innerRadius;
		this.outterRadius=outterRadius;
		this.maxStemAngleZ = Math.asin((outterRadius)/this.stemLength) * 0.5;
		this.minStemAngleZ = 0;
		this.maxStemLength = maxLength;
		this.minStemLength = 1;
		this.maxStemAngleY = Math.PI*2;
		this.stemEndCoords=[[0,0,0]];
		this.stemAngles=[];
		this.stemLengths=[];
		//leaf related attributes
		this.maxLeafAngleZ = Math.PI/1.5;
		this.minLeafAngleZ = Math.PI/4;
		this.maxStemAngleY = 2*Math.PI;
		this.maxLeafLength = this.stemLength * 0.7;
		this.minLeafLength = this.stemLength * 0.3;
		this.leafLengths = [];
		this.leafAnglesZ = [];
		this.leafAnglesY = [];
		this.leaf = new MyLeaf(scene, this.stemApp,leafColor,objects);
		this.cylinder = objects.cylinder;
		this.randomize();
		this.calculateStemEnds();
		
	}
	randomize(){
		for(var i=0;i<this.numberOfStems;i++){
			var stemAngleZ =  Math.random() * (this.maxStemAngleZ - this.minStemAngleZ) + this.minStemAngleZ;
			var stemAngleY = Math.random() * this.maxStemAngleY;
			this.stemAngles.push({y:stemAngleY,z:stemAngleZ});
			var stemLength = Math.random() * (this.maxStemLength - this.minStemLength) + this.minStemLength;
			this.stemLengths.push(stemLength);
			var leafLength = Math.random() * (this.maxLeafLength - this.minLeafLength) + this.minLeafLength;
			this.leafLengths.push(leafLength);
			var leafAngleZ = Math.random() * (this.maxLeafAngleZ - this.minLeafAngleZ) + this.minLeafAngleZ;
			this.leafAnglesZ.push(leafAngleZ);
			var leafAngleY = Math.random() * this.maxStemAngleY;
			this.leafAnglesY.push(leafAngleY);
		}
		
	}
	calculateStemEnds(){
		
		for(var i=0;i<this.numberOfStems;i++){
			var currentPos = this.stemEndCoords[i];
			var stemAngle = this.stemAngles[i];
			let [xi,yi,zi] = currentPos;
			var hiponuse = Math.sin(stemAngle.z)*this.stemLengths[i] //hipotenuse of the triangle projected in the plane xz
			var height = Math.cos(stemAngle.z)*this.stemLengths[i] //height of the triangle projected in the plane xy formed by the stem
			var res = [Math.cos(stemAngle.y)*hiponuse+xi,yi-height,-Math.sin(stemAngle.y)*hiponuse+zi];
			this.stemEndCoords.push(res);
		}
	
	}
	makeStem(i){
		if(i!=0){
			//draws leaves
			this.scene.pushMatrix();
			this.scene.translate(this.stemEndCoords[i][0],this.stemEndCoords[i][1],this.stemEndCoords[i][2]);
			this.scene.rotate(this.stemAngles[i].y,0,1,0);
			this.scene.rotate(this.leafAnglesZ[i],0,0,1);
			this.scene.rotate(this.leafAnglesY[i],0,1,0);
			this.leaf.display(this.leafLengths[i]);
			this.scene.popMatrix();
			}
		this.stemApp.apply();
		this.scene.pushMatrix();
		this.scene.translate(this.stemEndCoords[i][0],this.stemEndCoords[i][1],this.stemEndCoords[i][2]);
		this.scene.rotate(this.stemAngles[i].y,0,1,0);
		this.scene.rotate(this.stemAngles[i].z,0,0,1);
		this.scene.scale(this.radius, this.stemLengths[i], this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();
	}
	display(){
		for(var i=0;i<this.numberOfStems;i++){
			this.makeStem(i);	
		}

		/*this.scene.pushMatrix();
		this.scene.scale(this.radius, 1, this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();*/

	}
}

