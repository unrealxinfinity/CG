import {CGFappearance, CGFobject,CGFtexture} from '../../lib/CGF.js';
import { MyCube } from './MyCube.js';
/**
* MyHive
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyHiveStack extends CGFobject {
    constructor(scene,barLength,barText,centerText) {
        super(scene);
        this.centerText = centerText;
        this.barText = barText
        this.centerSlice = new MyCube(scene,this.centerText,this.centerText,this.centerText,this.centerText,this.centerText,this.centerText);
        this.sideBar = new MyCube(scene,this.barText,this.barText,this.centerText,this.barText,this.barText,this.barText);
        this.barLength = barLength;
    }
    display(pollens){
        //BACK BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,0,-this.barLength/2+0.5);
        this.scene.scale(this.barLength,1,1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //BACK END
        //FRONT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,0,this.barLength/2-0.5);
        this.scene.scale(this.barLength,1,1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //FRONT END
        //RIGHT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(this.barLength/2-0.5,0,0);
        this.scene.scale(1,1,this.barLength-2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //RIGHT END
        //LEFT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(-this.barLength/2+0.5,0,0);
        this.scene.scale(1,1,this.barLength-2);
        this.sideBar.display();
        this.scene.popMatrix();
        //LEFT END
        //CENTER BEGIN
        this.scene.pushMatrix();
        this.scene.scale(this.barLength-2,1,this.barLength-2);
        //this.centerSlice.display();
        this.scene.popMatrix();
        for (const pollen of pollens) {
            pollen.display();
        }
    }   
}