import {CGFobject} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyLeafKnot
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyLeafKnot extends CGFobject {
	constructor(scene,slices,stacks,stemRadius,leafAngleY,leafAngleZ,knotLength) {
		super(scene);
		this.knot = new MyCylinder(scene, slices, stacks);
		this.petal = new MyPetal(scene, 1,3);
		this.radius = stemRadius;
        this.flip = 1;
		this.knotLength = knotLength;
		this.leafKnotAngleY = leafAngleY;
		this.leafKnotAngleZ = leafAngleZ;
		
	}
	makeLeaf(leafScale,leafYAngle,leafZAngle,positionToKnot,side){
		
		this.scene.pushMatrix();
		this.scene.translate(positionToKnot, 0, 0);
		this.scene.rotate(leafZAngle,0,1,0);
		this.scene.rotate(leafYAngle, 0, 0, 1);
		this.scene.scale(side*leafScale,leafScale,side*leafScale);
		this.petal.display(Math.PI/4,[0,1]);
		this.scene.popMatrix();

	}
	display(){
		this.scene.pushMatrix();
        this.makeLeaf(this.radius*2,this.leafKnotAngleY,this.leafKnotAngleZ,-this.radius,this.flip);
        this.makeLeaf(this.radius*2,-this.leafKnotAngleY,this.leafKnotAngleZ,this.radius,-this.flip)
        this.scene.scale(this.radius, this.knotLength, this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.knot.display();
		this.scene.popMatrix();
	}
}

