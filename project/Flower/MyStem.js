import {CGFobject} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of faces
 * @param stacks - number of stacked prisms
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.cylinder = new MyCylinder(scene, slices, stacks);
	}
	
	display(){
		this.scene.pushMatrix();
		this.scene.scale(0.1, 1, 0.1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();

	}
}

