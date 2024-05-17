import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        this.activeKeys={};

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'lockCamera').name('Lock Camera');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        //TextBox for number of rows in the garden
        this.gui.add(this.scene, 'gardenRows', 1, 10).step(1).name('Garden Rows').onChange((rows)=>{
            this.scene.garden.updateGarden(rows, this.scene.gardenCols);

        });
        //TextBox for number of columns in the garden
        this.gui.add(this.scene, 'gardenCols', 1, 10).step(1).name('Garden Columns').onChange((cols)=>{
            this.scene.garden.updateGarden(this.scene.gardenRows,cols);

        });
        this.gui.add(this.scene,'speedFactor',0.1,3).name('Speed Factor');
        this.gui.add(this.scene,'scaleFactor',0.5,3).name('Scale Factor');
        this.gui.add(this.scene,'cloudMoveSpeedFactor',0.01,1).name("Cloud Speed Factor");
        this.gui.add(this.scene, 'grassStrength', 0.1, 5, 1).step(0.05).name('Wind Speed').onChange((speed) => {
            this.scene.grass.updateSpeed(speed);
        })
        this.initKeys();
        return true;
    }
    initKeys() {

        // create reference from the scene to the GUI

        this.scene.gui=this;

        

        // disable the processKeyboard function

        this.processKeyboard=function(){};

        

        // create a named array to store which keys are being pressed

        this.activeKeys={};

    }

    processKeyDown(event) {

            // called when a key is pressed down

            // mark it as active in the array

            this.activeKeys[event.code]=true;

    }


    processKeyUp(event) {

            // called when a key is released, mark it as inactive in the array

            this.activeKeys[event.code] = false;


    }


    isKeyPressed(keyCode) {
            // returns true if a key is marked as pressed, false otherwise
            
            return this.activeKeys[keyCode] || false;

    }

}