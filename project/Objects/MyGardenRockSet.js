import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyGardenRocks
 * @constructor
 * @param scene - Reference to MyScene object
 * @param gardenWidth - Garden's width
 * @param rocks - Number of rocks
 * @param radius - Radius of the rocks
 */
export class MyGardenRockSet extends CGFobject {
	constructor(scene, gardenWidth,rocks,radius) {
		super(scene);
    
        this.rocks = rocks;
        this.gardenWidth = gardenWidth;
        this.radius=radius;
        
        this.rockObjs = [];
        this.perimeter = 4*gardenWidth;        
        this.initParams();
        this.initMaterial();
	}

    initMaterial() {
        this.appearance = new CGFappearance(this.scene);
        const texture = new CGFtexture(this.scene, "images/rock.jpg");
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.75,0.75,0.75,1);
        this.appearance.setDiffuse(0.75,0.75,0.75,1);
        this.appearance.setSpecular(0,0,0,1);
    }

    initParams() {
        console.log(this.perimeter);
        const twoPi = 2*Math.PI;
        let tempPerimeter = 0;
        let nRocks=0;
        while(tempPerimeter<this.perimeter && nRocks<this.rocks){
            let scale = [Math.random()*10, Math.random()*10, Math.random()*10];
            let angle =[Math.random() * twoPi, Math.random(), Math.random(), Math.random()];
            this.rockObjs.push(new MyRock(this.scene, this.radius, scale, angle));
            console.log(this.radius);
            
            tempPerimeter+=Math.max(scale[0],scale[2]);
            nRocks++;
            
        }
        console.log("here");
        console.log(this.rockObjs);
    }

    display() {
        this.appearance.apply();
       /* let tempLength=0; 
        let directions = ["top","bottom","left","right"];
        let chosenDir = 0 ;
        for(let i = 0;i<this.rockObjs.length;i++){
            let rock = this.rockObjs[i];
            tempLength+=this.radius*Math.max(...rock.getScale());
            console.log(tempLength);
            console.log(directions[chosenDir]);
            if(directions[chosenDir]=="top"){
                this.scene.pushMatrix();
                this.scene.translate(tempLength,0,-this.gardenWidth/2);
                rock.display();
                this.scene.popMatrix();
            }
            else if(directions[chosenDir]=="bottom"){
                this.scene.pushMatrix();
                this.scene.translate(tempLength,0,this.gardenWidth/2);
                rock.display();
                this.scene.popMatrix();
            }
            else if(directions[chosenDir]=="left"){
                this.scene.pushMatrix();
                this.scene.translate(-this.gardenWidth/2,0,tempLength);
                rock.display();
                this.scene.popMatrix();
            }
            else if(directions[chosenDir]=="right"){
                this.scene.pushMatrix();
                this.scene.translate(this.gardenWidth/2,0,tempLength);
                rock.display();
                this.scene.popMatrix();
            }
            if(tempLength>this.gardenWidth){
                tempLength=0;
                chosenDir++;
            }*/
            this.rockObjs[0].display();
        //}
    }
}