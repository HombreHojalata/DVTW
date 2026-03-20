import Phaser from 'phaser';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtStoreScene' });
    }

    init(data) {
        this.district = data.district;
    }
       
    create() {
        const baseWidth = this.scale.width;
        const baseHeight = this.scale.height;
        this.add.rectangle(0, 0, baseWidth, baseHeight, 0x000000, 0.5).setOrigin(0);

        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth,newHeight,offsetX,offsetY);
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
        this.buildingList = this.spawnBuiltList(newWidth,offsetX,newHeight);
    }
    spawnTemplate(newWidth,newHeight,offsetX,offsetY){return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, 'districtStoreTemplate').setDisplaySize(newWidth, newHeight);}
    // BUTTON
    spawnCloseButton(newWidth,offsetX,offsetY){ //NEED TO BE SMALLER
        this.closeButton = this.add.image(offsetX + newWidth - 40,offsetY + 120,'closeIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.closeButton.on('pointerover', () => {this.closeButtons.setScale(1.1);});
        this.closeButton.on('pointerout', () => {this.closeButton.setScale(1);});
        this.closeButton.on('pointerup', () => {
            this.scene.stop();
            this.scene.resume('gameScene');
        });
        return this.closeButton;
    }
    // BUILDING LIST
    spawnBuiltList(newWidth, offsetX, newHeight) {      //NEED TO MAKE SOME CHANGES
        this.builtList = this.district.getBuildingsList();
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '14px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);

        for (let i = 0; i < this.builtList.length; i++) {
            const building = this.builtList[i];
            const x = newWidth - offsetX * (9 - i);
            const y = newHeight - newHeight / 2;
            const img = this.add.image(x, y, building.getBuildingPNG()).setOrigin(0).setInteractive(); 
            img.on('pointerover', (pointer) => {
                tooltip.setText(building.getBuildingInfo());
                tooltip.setPosition(pointer.x + 10, pointer.y + 10);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
            img.on('pointerout', () => {tooltip.setVisible(false);});
        }
        if(!this.district.isSpecialBuildingBuilt()){
            const building = this.district.getSpecialBuilding();
            const x = newWidth - offsetX * (9 - this.builtList.length+1);
            const y = newHeight - newHeight / 2; 
            const img = this.add.image(x, y, building.getBuildingPNG()).setOrigin(0).setInteractive(); 
            img.on('pointerover', (pointer) => {
                tooltip.setText(building.getBuildingInfo());
                tooltip.setPosition(pointer.x + 10, pointer.y + 10);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
            img.on('pointerout', () => {tooltip.setVisible(false);});
        }
    }
}