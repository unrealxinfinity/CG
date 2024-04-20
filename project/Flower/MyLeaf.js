import {CGFobject} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyTriangle } from '../Objects/MyTriangle.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyLeaf extends CGFobject {
	constructor(scene,slices,stacks) {
		super(scene);
		this.root = new MyCylinder(scene, slices, stacks); //cyclinder of 1 radius and 1 height
		this.leaf = new MyTriangle(scene); //triangle of 1 height and 1 width
		//this.flowerRadius = outerRadius;
        //this.zAngle;
        this.totalLength;//hypotenuse aka leaf total length
		//root parameters
		this.rootPercentage;
		this.rootRadius;
		this.rootHeight;
		//leaf parameters
		this.leafToRootOffset;
		this.trianglePercentage;
		this.leafThickness;
		this.leafHeight;
		this.leafWidth;
	}
	setAttributes(length){
		//this.zAngle = zAngle;
		this.totalLength = length //Math.abs(this.flowerRadius/Math.sin(Math.abs(this.zAngle)));

		//root parameters
		this.rootPercentage=0.3;
		this.rootRadius=0.1;
		this.rootHeight=this.totalLength*this.rootPercentage;
		//leaf parameters
		this.leafToRootOffset=0.4;
		this.trianglePercentage=1-this.rootPercentage;
		this.leafThickness=this.rootRadius;
		this.leafHeight=this.totalLength*this.trianglePercentage;
		this.leafWidth=this.totalLength*this.trianglePercentage/4;
		
	}
	makeLeaf(){
		this.scene.pushMatrix();
		this.scene.translate(0,this.rootHeight+this.leafHeight/2-this.leafToRootOffset,0);
		this.scene.scale(this.leafWidth,this.leafHeight/2,this.leafThickness);
		this.leaf.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,this.rootHeight+this.leafHeight/2-this.leafToRootOffset,0);
		this.scene.rotate(Math.PI,1,0,0)
		this.scene.scale(this.leafWidth,this.leafHeight/2,this.leafThickness);		
		this.leaf.display();
		this.scene.popMatrix();
	}
	makeRoot(){
		this.scene.pushMatrix();
		this.scene.scale(this.rootRadius,this.totalLength*this.rootPercentage,this.rootRadius);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.root.display();
		this.scene.popMatrix();

	}
	enableNormalViz() {
		this.triangle.enableNormalViz();
		this.cylinder.enableNormalViz();
	}
	display(length){
		this.setAttributes(length);
		this.makeLeaf();
		this.makeRoot();
	}
}

