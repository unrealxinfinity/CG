import { MyFlower } from "./Flower/MyFlower.js";
import { CGFobject,CGFtexture,CGFappearance} from "../lib/CGF.js";
import { MyPollen } from "./Objects/MyPollen.js";
import { MyRock } from "./Objects/MyRock.js";
import { MyGardenRockSet } from "./Objects/MyGardenRockSet.js";
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows, cols,minHeight,maxHeight) {
        super(scene);
        this.petals;
        this.maxPetals=25;
        this.minPetals=8;
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
        this.offsets = [];
        this.petalApperances = [];
        this.appIndex = 0;
        this.textures = {
            'petalTextures': [new CGFtexture(this.scene, "images/petal1.jpg"), new CGFtexture(this.scene, "images/petal2.jpg"),new CGFtexture(this.scene, "images/petal3.jpg")],
            'leafTexture':new CGFtexture(this.scene, "images/leaf.jpg"),
            'receptaleTexture':new CGFtexture(this.scene, "images/receptacleTest.jpg"),
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
        this.spaceInBetween=20;
        this.pollen = new MyPollen(this.scene);
        this.maxHeight=maxHeight;
        this.minHeight=minHeight;
        this.updateGarden(this.rows,this.cols);

        
    }
   
    randomize(){
        this.appIndex = Math.floor(Math.random()*this.textures.petalTextures.length);
        this.receptacleColor = [0.8 + Math.random() * 0.2, 0.8 + Math.random() * 0.2,Math.random() * 0.2];
        this.stemColor = [Math.random(), Math.random(), Math.random()];
        this.leafColor = [Math.random(), Math.random(), Math.random()];
        this.outterRadius = Math.random()*(this.maxOutterRadius-this.minOutterRadius)+this.minOutterRadius;
        this.innerRadius = Math.random()*(this.maxInnerRadius-this.minInnerRadius)+this.minInnerRadius;
        this.petals = Math.floor(Math.random()*(this.maxPetals-this.minPetals)+this.minPetals);
        this.stems = Math.floor(Math.random()*(this.maxStems-this.minStems)+this.minStems);
    

    }
    updateGarden(rows,cols){
        console.log(this.maxHeight);
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                this.cols=rows;
                this.rows=cols;
                this.randomize();
                var flower;
               if(Math.random()<=0.5){
                    flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                    while(!(flower.getHeight()<=this.maxHeight && flower.getHeight()>=this.minHeight)){
                        this.randomize();
                        flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                    }
                }
                else{
                    flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                    while(!(flower.getHeight()<=this.maxHeight && flower.getHeight()>=this.minHeight)){
                        this.randomize();
                        flower = new MyFlower(this.scene, this.petals, this.stems, this.innerRadius, this.outterRadius, this.petalApperances[this.appIndex], this.receptacleColor, this.stemColor, this.leafColor,this.textures,this.pollen);
                    }
                }
                const offset = [Math.random()*(this.spaceInBetween-2)+1, Math.random()*(this.spaceInBetween-2)+1]
                this.offsets.push(offset)
                console.log(flower.getHeight());
                flower.setPosition(j*this.spaceInBetween+offset[0],flower.getHeight(),i*this.spaceInBetween+offset[1]);
                this.flowers.push(flower);
            }
        }
        this.gardenRocks = new MyGardenRockSet(this.scene,this.getWidth(), 10, 4);
    }
    
    display(translation) {
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                const flowerIndex = i*this.rows + j;
                this.scene .pushMatrix();
                //this.scene.translate(j*this.spaceInBetween,0,i*this.spaceInBetween);
                this.scene.translate(j*this.spaceInBetween+this.offsets[flowerIndex][0]+translation[0],0,i*this.spaceInBetween+this.offsets[flowerIndex][1]+translation[2]);
                if(translation){
                    this.flowers[flowerIndex].setPosition(j*this.spaceInBetween+translation[0]+this.offsets[flowerIndex][0],this.flowers[flowerIndex].getHeight()+translation[1],i*this.spaceInBetween+translation[2]+this.offsets[flowerIndex][1]);
                }
                this.flowers[flowerIndex].display();
                this.scene.popMatrix();
            }
        }
        
        
    }
    getFlowers(){
        return this.flowers;
    }
    getWidth(){
        return this.cols*this.spaceInBetween;
    }
}