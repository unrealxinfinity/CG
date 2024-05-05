import { MyFlower } from "./Flower/MyFlower.js";
import { CGFobject,CGFtexture,CGFappearance} from "../lib/CGF.js";
import { MyPollen } from "./Objects/MyPollen.js";
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
        this.minInnerRadius=0.5;
        this.maxInnerRadius=1.2;
        this.outterRadius;
        this.maxOutterRadius=7;
        this.minOutterRadius=3;
        this.flowers=[];
        this.petalApperances = [];
        this.appIndex = 0;
        this.textures = {
            'petalTextures': [new CGFtexture(this.scene, "images/petal1.jpg"), new CGFtexture(this.scene, "images/petal2.jpg"),new CGFtexture(this.scene, "images/petal3.jpg")],
            'leafTexture':new CGFtexture(this.scene, "images/leaf.jpg"),
            'receptaleTexture':new CGFtexture(this.scene, "images/receptacle.jpg"),
            'stemTexture': new CGFtexture(this.scene, "images/stem.jpg"),
            'leafTexture':new CGFtexture(this.scene, "images/leaf.jpg")
            };
        for (const petalTexture of this.textures.petalTextures) {
            const petalApp = new CGFappearance(scene);
            petalApp.setTexture(petalTexture);
            petalApp.setTextureWrap('REPEAT', 'REPEAT');
            this.petalApperances.push(petalApp);
        }

        this.receptacleColor;
        this.stemColor;
        this.leafColor;
        this.rows=rows;
        this.cols=cols;
        this.spaceInBetween=10;
        this.pollen = new MyPollen(this.scene);
        this.updateGarden(this.rows,this.cols);

        console.log(this.textures);

        
    }
    randomize(){
        this.appIndex = Math.floor(Math.random()*this.textures.petalTextures.length);
        this.receptacleColor = [Math.random(), Math.random(), Math.random()];
        this.stemColor = [Math.random(), Math.random(), Math.random()];
        this.leafColor = [Math.random(), Math.random(), Math.random()];
        this.outterRadius = Math.random()*(this.maxOutterRadius-this.minOutterRadius)+this.minOutterRadius;
        this.innerRadius = Math.random()*(this.maxInnerRadius-this.minInnerRadius)+this.minInnerRadius;
        this.petals = Math.floor(Math.random()*(this.maxPetals-this.minPetals)+this.minPetals);
        this.stems = Math.floor(Math.random()*(this.maxStems-this.minStems)+this.minStems);
    

    }
    updateGarden(rows,cols){
        
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                this.cols=rows;
                this.rows=cols;
                this.randomize();
                var flower;
                if(Math.random() >= 0.5){
                    flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                }
                else{
                    flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                }
                flower.setPosition(j*this.spaceInBetween,0,i*this.spaceInBetween);
                console.log(flower);
                this.flowers.push(flower);
                
            }
        }
    }
    display(translation) {
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.scene .pushMatrix();
                this.scene.translate(j*this.spaceInBetween,0,i*this.spaceInBetween);
                if(translation){
                    this.flowers[i*this.rows+j].setPosition(j*this.spaceInBetween+translation[0],0+translation[1],i*this.spaceInBetween+translation[2]);
                }
                this.flowers[i*this.rows+j].display();
                this.scene.popMatrix();
            }
        }
    }
    getFlowers(){
        return this.flowers;
    }
}