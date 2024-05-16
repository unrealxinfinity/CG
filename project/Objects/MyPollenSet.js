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
        for (let i = this.levels-1; i <= 0; i--) {
            const len = 1 + 2*i;
            this.scene.translate(Math.ceil(-len/2)*this.offset, -i*this.offset, Math.ceil(-len/2)*this.offset);
            for (let x = 0; x < len; x++) {
                for (let y = 0; y < len; y++) {
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
    updatePollens(pollens){
        let tempN=0;
        let levels = 1;
        if(pollens.length != this.pollenSet.length){
            this.pollenSet = pollens;
            while(!tempN>pollens.length){
            
                for (let level = 0; level < levels; level++) {
                    const len = 1 + stage*2;
                    this.tempN += len*len;
                }
                levels++;
            }
            this.levels = levels;
        }
    }
}