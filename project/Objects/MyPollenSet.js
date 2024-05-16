import { CGFobject} from '../../lib/CGF.js';
/**
 * MyPollenSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPollenSet extends CGFobject {
	constructor(scene, pollens) {
		super(scene);
            
        this.offset = 0.4;
        this.pollenSet = pollens;
        this.levels = 1;
        this.x=2;
        this.y=2;
        this.initParams();
	}

    initParams() {
        this.scales = [];
        this.angles = [];
        const twoPi = 2*Math.PI;
        for (let i = 0; i < this.pollenSet.length; i++) {
            let pollenScale=Math.random()*0.6;
            this.scales.push(pollenScale);
            this.angles.push([Math.random() * twoPi, Math.random(), Math.random(), Math.random()]);
        }
    }

    display() {
        let total = this.pollenSet.length;
        let pollenIndex = 0;
        let remaining = total;
        console.log(this.levels);
        if ( total !=  0 ){
           for (let i = 0; i <= this.levels; i--) {
                let len = this.x*this.y;
            this.scene.translate(Math.ceil(-len/2)*this.offset, -i*this.offset, Math.ceil(-len/2)*this.offset);
                for (let x = 0; x < this.x; x++) {
                    for (let y = 0; y < this.y; y++) {
                        this.scene.pushMatrix();
                        this.scene.translate(x*this.offset, 0, y*this.offset);
                        this.scene.scale(0.2, 0.2, 0.2);
                        this.pollenSet[pollenIndex].display();
                        pollenIndex++;
                        remaining--;
                        this.scene.popMatrix(); 
                        if(remaining==0){
                            return;
                        } 
                       
                    }
                }
            }
        }
        
    }
    updatePollens(pollens){
        let levels = 0;
        let requiredForNext = this.x*this.y;
        this.pollenSet = pollens;
        for (let i = 0; i < this.pollenSet.length; i++) {
            requiredForNext--;
            if (requiredForNext == 0) {
                levels++;
                requiredForNext = this.x*this.y;
            }
        }
        this.levels = levels;
    }
}