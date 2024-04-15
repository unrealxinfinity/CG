import {CGFobject} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks,radius, height,stemColor,leafColor) {
		super(scene);
		this.cylinder = new MyCylinder(scene, slices, stacks);
		this.petal = new MyPetal(scene, 0);
		this.radius = radius;
		this.numberOfStems=height;
		this.stemColor = stemColor;
		this.leafColor = leafColor;

		this.maxStemAngle = Math.PI/6;
		this.minStemAngle = -Math.PI/6;
		this.stemAngle = 0;

		this.singleStemMaxLength=2;
		this.singleStemMinLength=0.1;
		this.stemLength = 0;
		
	}
	randomize(){
		
	}
	makeLeaf(){
		
	}
	display(){
		this.scene.pushMatrix();
		this.scene.scale(this.radius, 1, this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();

	}
}

