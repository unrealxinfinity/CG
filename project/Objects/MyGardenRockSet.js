import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyGardenRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param gardenWidth - Garden's width
 * @param radius - Radius of the rocks
 * @param rocks - Number of rocks to display
 */
export class MyGardenRockSet extends CGFobject {
	constructor(scene, gardenWidth,radius,rocks) {
		super(scene);
        this.rocks = rocks;
        this.gardenWidth = gardenWidth;
        this.radius=radius;
        this.rockObjs = [];
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
    /**
     * Initiates the parameters of the rocks
     */
    initParams() {
        const twoPi = 2*Math.PI;
        let directions = ["top", "right", "bottom", "left"];
        let tempWidth=0;
        let nrocks=0;
        for(let dir of directions){
            while(nrocks<this.rocks/4){
                let scale = [Math.random()*0.6 + 0.4, Math.random()*0.6 + 0.4, Math.random()*0.6 + 0.4];
                let angle =[Math.random() * twoPi, Math.random(), Math.random(), Math.random()];
                this.rockObjs.push(new MyRock(this.scene, this.radius, scale, angle));
                console.log(Math.max(scale[0],scale[2]));
                tempWidth+=Math.max(scale[0],scale[2])*this.radius;
                nrocks++;
            }
            nrocks=0;
            tempWidth=0;
        }
        
    }

    display() {
        this.appearance.apply();
        let totalRocks = this.rockObjs.length;
        let directions = ["top", "right", "bottom", "left"];
        let rockIndex = 0;
    
        for (let dirIndex = 0; dirIndex < directions.length; dirIndex++) {
            let rocksPerEdge = Math.ceil(totalRocks / (4 - dirIndex)); // Calculate rocks per edge
            totalRocks -= rocksPerEdge; // Update total rocks for next calculation
    
            for (let i = 0; i < rocksPerEdge && rockIndex < this.rockObjs.length; i++) {
                let rock = this.rockObjs[rockIndex];
                let position = (this.gardenWidth / (rocksPerEdge + 1)) * (i + 1) - this.gardenWidth / 2; // Calculate position
                this.scene.pushMatrix();
                if (dirIndex === 0) {
                    this.scene.translate(position, 0, -this.gardenWidth / 2);
                } else if (dirIndex === 1) {
                    this.scene.translate(this.gardenWidth / 2, 0, position);
                } else if (dirIndex === 2) {
                    this.scene.translate(position, 0, this.gardenWidth / 2);
                } else if (dirIndex === 3) {
                    this.scene.translate(-this.gardenWidth / 2, 0, position);
                }
                
                rock.display();
                this.scene.popMatrix();
                
                rockIndex++;
            }
        }
    }
    getOffset(){
        return this.radius;
    }
}