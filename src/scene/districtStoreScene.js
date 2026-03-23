import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtStoreScene' });
    }

    init(data) {
        this.district = data.district;
    }
       
    create() {
        console.log("DISTRICT STORE");
        const baseWidth = this.scale.width;
        const baseHeight = this.scale.height;
        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;
        //PLAYER INFO
        this.player = this.registry.get('gameManager').getPlayer();
        this.footerUI = new footerUI(this, this.player).create();
        //BUTTONS
        this.iconList = this.spawnIconList(newWidth,offsetX,newHeight);
    }
    // BUILDING LIST
    spawnIconList(newWidth, offsetX, newHeight) { 
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
                if(this.district.canBuildMore()){
                    if(this.player.getMoney() < building.getBuildingCost()) tooltip.setText(`No tienes suficiente dinero para comprar este edificio. Dinero - ${this.player.getMoney()}$ `);
                    else tooltip.setText(building.getBuildingInfo());
                }else tooltip.setText('No tienes suficiente espacio para construir');
                tooltip.setPosition(pointer.x + 10, pointer.y + 10);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
            img.on('pointerout', () => {tooltip.setVisible(false);});
            img.on('pointerup', () => {
                if(this.district.canBuildMore()){
                    if(this.player.getMoney() >= building.getBuildingCost()){
                        this.district.addBuilding(building);
                        this.player.updateMoney(-building.getBuildingCost());
                        this.footerUI.refreshMoney();
                    } 
                }
                tooltip.setVisible(false);
                this.scene.get('districtScene').scene.restart();
            });
        }
        //SPECIAL BUILDING
        const building = this.district.getSpecialBuilding();
        const x1 = this.newX + offsetX * (this.builtList.length + 1) + 20;
        const y1 = this.newY + 50;
        const img = this.add.image(x1, y1, building.getBuildingPNG()).setOrigin(0).setInteractive({ useHandCursor: true }); 
        img.on('pointerover', (pointer) => {
            if(this.district.isSpecialBuildingBuilt()) tooltip.setText('Edificio especial ya construido!!!');
            else{
                if(this.district.canBuildMore()){
                    if(this.player.getMoney() < building.getBuildingCost()) tooltip.setText(`No tienes suficiente dinero para comprar este edificio. Dinero - ${this.player.getMoney()}$ `);
                    else tooltip.setText('-----EDIFICIO SPECIAL-----\n' + building.getBuildingInfo());
                }else tooltip.setText('No tienes suficiente espacio para construir');
            }
            tooltip.setPosition(pointer.x + 10, pointer.y + 10);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        img.on('pointermove', (pointer) => {tooltip.setPosition(pointer.x + 15, pointer.y + 35);});
        img.on('pointerout', () => {tooltip.setVisible(false);});
        img.on('pointerup', () => {
            tooltip.setVisible(false);
            if(this.district.canBuildMore()){
                if(this.player.getMoney() >= building.getBuildingCost()){
                    this.district.addSpecialBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    this.footerUI.refreshMoney();
                } 
            }
            tooltip.setVisible(false);
            this.scene.get('districtScene').scene.restart();
        });
        //CLOSE STORE BUTTON
        const x2 = this.newX + offsetX * (this.builtList.length + 2) + 20;
        const y2 = this.newY + 50;
        this.closeButton = this.add.image(x2 ,y2,'closeIcon').setOrigin(0).setInteractive({ useHandCursor: true }); 
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