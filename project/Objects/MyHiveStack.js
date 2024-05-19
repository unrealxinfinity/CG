import {CGFobject} from '../../lib/CGF.js';
import { MyCube } from './MyCube.js';
import { MyPollenSet } from './MyPollenSet.js';
/**
* MyHiveStack
* @constructor
 * @param scene - Reference to MyScene object
 * @param barLength - length of the sides
 * @param barText - texture of the sides
 * @param centerText - texture of the center piece
*/
export class MyHiveStack extends CGFobject {
    constructor(scene,barLength,barText,centerText) {
        super(scene);
        this.centerText = centerText;
        this.barText = barText
        this.centerSlice = new MyCube(scene,this.centerText,this.centerText,this.centerText,this.centerText,this.centerText,this.centerText);
        this.sideBar = new MyCube(scene,this.barText,this.barText,this.centerText,this.barText,this.barText,this.barText);
        this.barLength = barLength;
        this.pollenSet = new MyPollenSet(scene,[]);
        this.position=[];
    }
    /**
     * Displays the stacks for the hive levels
     * @param {Number} i - index of the stack 
     * @param {Array} pollens -array of pollens to be displayed
     * @param {Number} pollenScale - scale of the pollens in reverse to make it smaller
     */
    display(i,pollens,pollenScale){
        //BACK BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,0,-this.barLength/2+0.5);
        this.scene.scale(this.barLength,0.99,1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //BACK END
        //FRONT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,0,this.barLength/2-0.5);
        this.scene.scale(this.barLength,0.99,1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //FRONT END
        //RIGHT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(this.barLength/2-0.5,0,0);
        this.scene.scale(1,0.99,this.barLength-2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.sideBar.display();
        this.scene.popMatrix();
        //RIGHT END
        //LEFT BEGIN
        this.scene.pushMatrix();
        this.scene.translate(-this.barLength/2+0.5,0,0);
        this.scene.scale(1,0.99,this.barLength-2);
        this.sideBar.display();
        this.scene.popMatrix();
        //LEFT END
        //CENTER BEGIN
        this.scene.pushMatrix();
        this.scene.scale(this.barLength-2,1,this.barLength-2);
        //this.centerSlice.display();
        this.scene.popMatrix();
        if(i==1){
            this.scene.pushMatrix();
            this.scene.scale(1/pollenScale[0],1/pollenScale[1],1/pollenScale[2]);
            //this.scene.translate(position[0], position[1], position[2]);
            this.pollenSet.updatePollens(pollens);
            this.pollenSet.display();
            this.scene.popMatrix();
        }

        
    }
}