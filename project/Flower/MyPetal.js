import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from '../Objects/MyTriangle.js';
/**
 * MyPetale
 * @constructor
 * @param scene - Reference to MyScene object
 * @param innerRadius - inner radius of the flower
 * @param outerRadius - outer radius of the flower
 * @param objects - objects to be used in the petal
 */
export class MyPetal extends CGFobject {
	constructor(scene, innerRadius, outerRadius, texCoords) {
		super(scene);
                this.innerRadius = innerRadius;
                this.outerRadius = outerRadius;
                this.diff = (this.outerRadius-this.innerRadius)/2;
		this.triangle1 = new MyTriangle(scene);
                this.triangle2 = new MyTriangle(scene);
                this.triangle1.updateTexCoords(texCoords[0]);
                this.triangle2.updateTexCoords(texCoords[1]);
	}
	
	display(angle, texCoords) {
                this.scene.pushMatrix();
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 0, 1);
                this.scene.scale(0.8, this.diff, 1);
                this.scene.translate(0, -1, 0);
                //this.triangle.updateTexCoords(texCoords[0]);
                this.triangle1.display();
                this.scene.popMatrix(); 
                this.scene.scale(0.8, this.diff, 1);
                this.scene.translate(0, 1, 0);
                this.scene.rotate(angle, 1, 0, 0);
                //this.triangle.updateTexCoords(texCoords[1]);
                this.triangle2.display();
                this.scene.popMatrix();
	}

        enableNormalViz() {
                this.triangle.enableNormalViz();
        }
}
