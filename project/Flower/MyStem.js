import {CGFobject} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyLeafKnot } from './MyLeafKnot.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks,radius, numStems,stemColor,leafColor) {
		super(scene);
		this.knotLength=0.1;
		this.radius = radius;
		this.numberOfStems=numStems;
		this.stemColor = stemColor;
		this.leafColor = leafColor;
		this.maxStemAngle = Math.PI/6;
		this.minStemAngle = -Math.PI/6;
		this.stemAngle = 0;

		this.cylinder = new MyCylinder(scene, slices, stacks);
		this.petal = new MyPetal(scene, 1,3);
		this.knot = new MyLeafKnot(scene,slices,stacks,radius,Math.PI/2,0,this.knotLength);

	}
	randomize(){
		
	}
	makeStem(){

	}
	display(){
		for(var i=0 ;i<this.numberOfStems;i++){
			this.scene.pushMatrix();
			this.scene.translate(0,this.knotLength*i,0);
			this.knot.display();
			this.scene.popMatrix();
			//this.cylinder.display();
		}
		
		/*this.scene.pushMatrix();
		this.scene.scale(this.radius, 1, this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();*/

	}
}

