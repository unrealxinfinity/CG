import {CGFappearance, CGFobject,CGFtexture} from '../../lib/CGF.js';
import { MyBee } from './MyBee.js';
import { MyCube } from './MyCube.js';
import { MyHiveStack } from './MyHiveStack.js';
import { MyPollen } from './MyPollen.js';
/**
* MyHive
* @constructor
 * @param scene - Reference to MyScene object
 * @param pos - position of the hive
*/
export class MyHive extends CGFobject {
    constructor(scene,pos) {
        super(scene);
        this.hiveWoodTex = new CGFtexture(this.scene, "images/wood.jpg");
        this.hiveTex = new CGFtexture(this.scene, "images/hive.jpg");
        this.hive = new MyCube(scene,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex,this.hiveWoodTex);
        this.hiveStack = new MyHiveStack(scene,6,this.hiveWoodTex,this.hiveTex);
        this.centerSlice = new MyCube(scene,this.hiveTex,this.hiveTex,this.hiveTex,this.hiveTex,this.hiveTex,this.hiveTex, 1, true);

        this.animationBee = new MyBee(scene,this);
        this.animationBee.setHivePosition(pos);
        this.animationBee.setPosition([pos[0]+11,pos[1]-1,pos[2]+11]);
        this.animationBee.turn(-Math.PI/4);
        this.animationBee.setEntrancePos([pos[0]+11,pos[1]-1,pos[2]+11]);
        this.stacks = 4;
        this.stackHeight=1;
        this.stackWidth=6; 
        this.topWidth=8;
        this.pollens = [];
        this.position = pos;
        

    }
    /**
     * Gets the hive bee
     * @returns the bee of the hive
     */
    getAnimationBee(){
        return this.animationBee;
    }
    /**
     * Adds a pollen to the hive
     * @param {MyPollen} pollen - reference to the pollen added
     */
    addPollen(pollen) {
        this.playBeeAnimation(pollen).then(() => {
            setTimeout(() => {
                this.pollens.push(pollen);
            }, 1000);
        });
    }
    /**
     * Plays the helper bee animation in the hive
     * @param {MyPollen} pollen 
     * @returns promise that adds the pollen to the hive when the animation is finished
     */
    playBeeAnimation(pollen){
        this.animationBee.getPollen2(pollen);
        return new Promise(resolve => {
            const checkAnimation = setInterval(() => {
                if (!this.animationBee.goToDestinations([this.animationBee.hivePosition, this.animationBee.hiveEntrancePos])) {
                    clearInterval(checkAnimation);
                    resolve();
                }
            }, 100); 
        });
    }
    /**
     * Displays the hive
     * @param {Number} pollenScale - scale of the pollen
     */
    display(pollenScale){
        //BOTTOM BEGIN
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0)
        this.scene.scale(this.topWidth,1,this.topWidth);
        this.hive.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.stackWidth-0.5,2,this.stackWidth-0.5);
        this.centerSlice.display();
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
            this.hiveStack.display(i,this.pollens,pollenScale,this.stackHeight);
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