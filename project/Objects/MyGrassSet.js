import { CGFobject,CGFtexture,CGFappearance, CGFshader} from "../../lib/CGF.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
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

    update(t) {
        for (let i = 0; i < this.blades.length; i++) {
            this.blades[i].update(t);
        }
    }

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
}