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
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

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

        return true;
    }
}