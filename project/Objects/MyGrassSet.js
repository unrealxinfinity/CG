import { CGFobject,CGFtexture,CGFappearance, CGFshader} from "../../lib/CGF.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
/**
 * MyGrassSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param rows - number of rows of grass blades
 * @param cols - number of columns of grass blades
 */
export class MyGrassSet extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);

        this.bladeppearance = new CGFappearance(this.scene);
        this.bladeppearance.setAmbient(0,1,0,1);
        this.bladeppearance.setDiffuse(0,1,0,1);
        this.bladeTex = new CGFtexture(this.scene, "images/grass1.jpg");
        this.bladeppearance.setTexture(this.bladeTex);
        this.bladeppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.bladeppearance2 = new CGFappearance(this.scene);
        this.bladeppearance2.setAmbient(0,1,0,1);
        this.bladeppearance2.setDiffuse(0,1,0,1);
        this.bladeTex2 = new CGFtexture(this.scene, "images/grass2.jpg");
        this.bladeppearance2.setTexture(this.bladeTex2);
        this.bladeppearance2.setTextureWrap('REPEAT', 'REPEAT');

        this.rows = rows;
        this.cols = cols;

        this.materials = [this.bladeppearance, this.bladeppearance2];
        this.blades = [];
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                this.blades.push(new MyGrassBlade(this.scene, 4, this.materials[Math.floor(Math.random()*2)]));
            }
        }
        
        this.initShader();
    }
    /**
     * Updates the grass blades according to time
     * @param {Number} t - time
     */

    update(t) {
        for (let i = 0; i < this.blades.length; i++) {
            this.blades[i].update(t);
        }
    }
    /**
     * Updates the blades buffer according to the new rows and columns
     * Not in use
     * @param {Number} rows 
     * @param {Number} cols 
     */
    updateGrassSet(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.blades = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const blade = new MyGrassBlade(this.scene, 4, this.materials[Math.floor(Math.random()*2)]);
                this.blades.push(blade);
            }
        }
    }
    /**
     * Initiates the shader for the grass
     */

    updateSpeed(speed) {
        for (let i = 0; i < this.blades.length; i++) {
            this.blades[i].setStrength(speed);
        }
    }

    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/pollen.frag");
    }

    display() {
        this.scene.setActiveShader(this.shader);
        
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.scene.pushMatrix();
                this.scene.translate(x, 0, y);
                this.blades[x*this.rows + y].apply(this.shader);
                this.blades[x*this.rows + y].display();
                this.scene.popMatrix();
            }
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    getWidth(){
        return this.cols;
    }
}