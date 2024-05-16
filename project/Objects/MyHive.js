import {CGFappearance, CGFobject,CGFtexture} from '../../lib/CGF.js';
import { MyBee } from './MyBee.js';
import { MyCube } from './MyCube.js';
import { MyHiveStack } from './MyHiveStack.js';
/**
* MyHive
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyHive extends CGFobject {
    constructor(scene,pos) {
        super(scene);
        this.hiveWoodTex = new CGFtexture(this.scene, "images/wood.jpg");
        this.hiveTex = new CGFtexture(this.scene, "images/hive.jpg");
        this.hive = new MyCube(scene,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex);
        this.hiveStack = new MyHiveStack(scene,6,this.hiveWoodTex,this.hiveTex);
        this.animationBee = new MyBee(scene,this);
        this.animationBee.setHivePosition(pos);
        this.animationBee.setPosition([pos[0]+12,pos[1],pos[2]+12]);
        this.animationBee.setEntrancePos([pos[0]+10,pos[1],pos[2]+10]);
        this.stacks = 4;
        this.stackHeight=1;
        this.stackWidth=6; 
        this.topWidth=8;
        this.pollens = [];
        this.position = pos;
        

    }
    getAnimationBee(){
        return this.animationBee;
    }
    addPollen(pollen) {
        this.playBeeAnimation(pollen).then(() => {
            setTimeout(() => {
                this.pollens.push(pollen);
            }, 1000);
        });
    }
    playBeeAnimation(pollen){
        this.animationBee.getPollen2(pollen);
        return new Promise(resolve => {
            const checkAnimation = setInterval(() => {
                if (!this.animationBee.returnHome(true)) {
                    clearInterval(checkAnimation);
                    resolve();
                }
            }, 100); 
        });
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

        this.scene.pushMatrix();
        this.scene.translate(-this.stackWidth/2+0.5,0.5,0);
        this.scene.scale(1,1,this.stackWidth);
        this.hive.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.stackWidth/2-0.5,0.5,0);
        this.scene.scale(1,1,this.stackWidth);
        this.hive.display();
        this.scene.popMatrix();

        //BOTTOM END
        //STACKS BEGIN   
        let height = 0;

        for(let i = 1; i < this.stacks; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,i*this.stackHeight,0);
            this.scene.translate(0,this.stackHeight/2,0);
            this.hiveStack.display(i,this.pollens);
            this.scene.popMatrix();
            height+=this.stackHeight;
           
        }
        //STACKS END
        //TOP BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,height,0);
        this.scene.translate(0,0.5,0)
        this.scene.scale(this.topWidth,1,this.topWidth);
        this.hive.display();
        this.scene.popMatrix();
        //TOP END
    }   
  
}