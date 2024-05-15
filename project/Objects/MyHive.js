import {CGFappearance, CGFobject,CGFtexture} from '../../lib/CGF.js';
import { MyCube } from './MyCube.js';
import { MyHiveStack } from './MyHiveStack.js';
/**
* MyHive
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.hiveWoodTex = new CGFtexture(this.scene, "images/wood.jpg");
        this.hiveTex = new CGFtexture(this.scene, "images/hive.jpg");
        this.hive = new MyCube(scene,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex);
        this.hiveStack = new MyHiveStack(scene,6,this.hiveWoodTex,this.hiveTex);
        this.stacks = 4;
        this.stackHeight=1;
        this.stackWidth=6; 
        this.topWidth=8;
        this.pollens = [];
        

    }

    addPollen(pollen) {
        this.pollens.push(pollen);
        console.log("added pollen");
    }

    display(){
        //BOTTOM BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0)
        this.scene.scale(this.topWidth,1,this.topWidth);
        this.hive.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.stackWidth/2+0.5,-0.5,0);
        this.scene.scale(1,1,this.stackWidth);
        this.hive.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.stackWidth/2-0.5,-0.5,0);
        this.scene.scale(1,1,this.stackWidth);
        this.hive.display();
        this.scene.popMatrix();
        //BOTTOM END
        //STACKS BEGIN   
        let height = 0;
        for(let i = 0; i < this.stacks; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,i*this.stackHeight,0);
            this.scene.translate(0,this.stackHeight/2,0);
            this.hiveStack.display(this.pollens);
            this.scene.popMatrix();
            height+=this.stackHeight;
        }
        //STACKS END
        //TOP BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,height,0);
        this.scene.translate(0,0.5,0)
        this.scene.scale(this.topWidth,1,this.topWidth);
        //this.hive.display();
        this.scene.popMatrix();
        //TOP END
    }   
}