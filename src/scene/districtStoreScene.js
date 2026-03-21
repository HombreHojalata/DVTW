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
        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;
        //PLAYER INFO
        this.player = this.registry.get('gameManager').getPlayer();
        this.playerMoney = this.add.text(200,700,`Dinero - ${this.player.getMoney()}$ `);        // STILL NEED AN ASSET FOR OTHER INFO
        //BUTTONS
        this.buildingList = this.spawnBuiltList(newWidth,offsetX,newHeight);
    }
    // BUILDING LIST
    spawnBuiltList(newWidth, offsetX, newHeight) { 
        //TODO swap closeButton and container assets
        this.builtList = this.district.getBuildingsList();
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '14px',
            backgroundColor: '#000000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        this.newX = 400;
        this.newY = 500;
        const container = this.add.container(this.newX, this.newY);
        //HERE HAS TO BE THE districtStoreScene
        const background = this.add.rectangle(0, 0, newWidth/2 + offsetX*2, newHeight/5, 0x576a8f, 1).setOrigin(0);
        container.add(background);
        //NORMAL BUILDING
        for (let i = 0; i < this.builtList.length; i++) {
            const building = this.builtList[i];
            const x = this.newX + offsetX * (i+1) + 20;
            const y = this.newY + 50;
            const img = this.add.image(x, y, building.getBuildingPNG()).setOrigin(0).setInteractive({ useHandCursor: true }); 
            img.on('pointerover', (pointer) => {
                tooltip.setText(building.getBuildingInfo());
                tooltip.setPosition(pointer.x + 10, pointer.y + 10);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
            img.on('pointerout', () => {tooltip.setVisible(false);});
            img.on('pointerup', () => {
                if(this.player.getMoney() >= building.getBuildingPrice()){
                    this.district.addBuilding(building);
                    this.player.updateMoney(-building.getBuildingPrice());
                } 
                else tooltip.setText(`No tienes el suficiente dinero para comprar este edificio. Dinero - ${this.player.getMoney()}$ `);
                tooltip.setVisible(false);
                this.scene.stop();
                this.scene.get('districtScene').scene.restart();
            });
        }
        //SPECIAL BUILDING
        if(!this.district.isSpecialBuildingBuilt()){
            const building = this.district.getSpecialBuilding();
            const x = this.newX + offsetX * (this.builtList.length + 1) + 20;
            const y = this.newY + 50;
            const img = this.add.image(x, y, building.getBuildingPNG()).setOrigin(0).setInteractive({ useHandCursor: true }); 
            img.on('pointerover', (pointer) => {
                tooltip.setText('EDIFICIO SPECIAL: ' + building.getBuildingInfo());
                tooltip.setPosition(pointer.x + 10, pointer.y + 10);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
            img.on('pointerout', () => {tooltip.setVisible(false);});
            img.on('pointerup', () => {
                tooltip.setVisible(false);
                if(this.player.getMoney() >= building.getBuildingPrice()){
                    this.district.addSpecialBuilding(building);
                    this.player.updateMoney(-building.getBuildingPrice());
                } 
                else {
                    tooltip.setVisible(true);
                    tooltip.setText(`No tienes el suficiente dinero para comprar este edificio. Dinero - ${this.player.getMoney()}$ `);
                }
                tooltip.setVisible(false);
                this.scene.stop();
                this.scene.get('districtScene').scene.restart();
            });
        }
        //CLOSE STORE BUTTON
        const x = this.newX + offsetX * (this.builtList.length + 2) + 20;
        const y = this.newY + 50;
        this.closeButton = this.add.image(x ,y,'closeIcon').setOrigin(0).setInteractive({ useHandCursor: true }); 
        this.closeButton.on('pointerover', (pointer) => {
            tooltip.setText("Dale para salir del mercado");
            tooltip.setPosition(pointer.x + 10, pointer.y + 10);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
            this.closeButton.setScale(1.1);
        });
        this.closeButton.on('pointerout', () => {this.closeButton.setScale(1); tooltip.setVisible(false);});
        this.closeButton.on('pointerup', () => {
            tooltip.setVisible(false);
            this.scene.stop();
            this.scene.resume('districtScene');
        });
        return this.closeButton;
    }
}