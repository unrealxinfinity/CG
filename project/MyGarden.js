import { MyFlower } from "./Flower/MyFlower.js";
import { CGFobject,CGFtexture,CGFappearance} from "../lib/CGF.js";
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);
        this.petals;
        this.maxPetals=25;
        this.minPetals=1;
        this.stems;
        this.maxStems=10;
        this.minStems=1;
        this.innerRadius;
        this.minInnerRadius=0.1;
        this.maxInnerRadius=1;
        this.outterRadius;
        this.maxOutterRadius=7;
        this.minOutterRadius=3;
        this.flowers=[];
        this.petalTextures = [new CGFtexture(this.scene, "images/petal1.jpg"), new CGFtexture(this.scene, "images/petal2.jpg"),new CGFtexture(this.scene, "images/petal3.jpg")];
        this.petalppearance = new CGFappearance(scene);
        this.receptacleColor;
        this.stemColor;
        this.leafColor;
        this.rows=rows;
        this.cols=cols;
        this.spaceInBetween=10;

        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                this.randomize();
                this.petalppearance.setTextureWrap('REPEAT', 'REPEAT');
                var flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalppearance, this.receptacleColor, this.stemColor, this.leafColor);
                this.flowers.push(flower);
                console.log(flower);
            }
        }
        
    }
    randomize(){
        this.petalppearance.setTexture(this.petalTextures[Math.floor(Math.random()*this.petalTextures.length)]);
        this.receptacleColor = [Math.random(), Math.random(), Math.random()];
        this.stemColor = [Math.random(), Math.random(), Math.random()];
        this.leafColor = [Math.random(), Math.random(), Math.random()];
        this.outterRadius = Math.random()*(this.maxOutterRadius-this.minOutterRadius)+this.minOutterRadius;
        this.innerRadius = Math.random()*(this.maxInnerRadius-this.minInnerRadius)+this.minInnerRadius;
        this.petals = Math.floor(Math.random()*(this.maxPetals-this.minPetals)+this.minPetals);
        this.stems = Math.floor(Math.random()*(this.maxStems-this.minStems)+this.minStems);

    }

    display() {
        
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.scene.pushMatrix();
                this.scene.translate(j*this.spaceInBetween,0,i*this.spaceInBetween);
                this.flowers[i*this.rows+j].display();
                this.scene.popMatrix();
            }
        }
    }
}