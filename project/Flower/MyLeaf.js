import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import {MyCylinder} from '../Objects/MyCylinder.js';
import { MyTriangle } from '../Objects/MyTriangle.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 * @param stemApp - CGFappearance for the stem
 * @param  leafColor- color of the leaf
 */
export class MyLeaf extends CGFobject {
	constructor(scene, stemApp,leafColor,objects) {
		super(scene);
		console.log(leafColor);
		this.root = objects.cylinder; //cyclinder of 1 radius and 1 height
		this.leaf = objects.triangle //triangle of 1 height and 1 width
		this.texture = new CGFtexture(scene, "images/leaf.jpg");
		this.leafApp = new CGFappearance(scene);
		this.leafApp.setTexture(this.texture);
		this.leafApp.setTextureWrap('REPEAT', 'REPEAT');
		this.leafApp.setAmbient(...leafColor, 1);
		this.leafApp.setDiffuse(...leafColor, 1);
		this.leafApp.setSpecular(0, 0, 0, 0);
		this.leafApp.setShininess(10);

		this.stemApp = stemApp;
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
		this.leafApp.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,this.rootHeight+this.leafHeight/2-this.leafToRootOffset,0);
		this.scene.scale(this.leafWidth,this.leafHeight/2,this.leafThickness);
		this.leaf.updateTexCoords([0.5,1,0.5,0,0,0.5,0.5,1,0.5,0,0,0.5]);
		this.leaf.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,this.rootHeight+this.leafHeight/2-this.leafToRootOffset,0);
		this.scene.rotate(Math.PI,1,0,0)
		this.scene.scale(this.leafWidth,this.leafHeight/2,this.leafThickness);		
		this.leaf.updateTexCoords([0.5,1,0.5,0,1,0.5,0.5,1,0.5,0,1,0.5]);
		this.leaf.display();
		this.scene.popMatrix();
	}
	makeRoot(){
		this.scene.pushMatrix();
		this.scene.scale(this.rootRadius,this.totalLength*this.rootPercentage,this.rootRadius);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.stemApp.apply();
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

