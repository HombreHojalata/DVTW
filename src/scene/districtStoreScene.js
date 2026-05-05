import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtStoreScene' });
    }

    init(data) {
        this.district = data.district;
        this.tutorial = data.tutorial || false;
        this.order = data.order || 1;
        this.day = data.day || 1;
    }
       
    create() {
        console.log("DISTRICT STORE: " + this.district.getName());
        const baseWidth = this.scale.width;
        const baseHeight = this.scale.height;
        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;
        //PLAYER INFO
        this.player = this.registry.get('gameManager').getPlayer();
        this.footerUI = new footerUI(this, this.tutorial);
        this.footerUI.updateDistrictFooter(this.district);
        //BUTTONS
        this.iconList = this.spawnIconList(newWidth,offsetX,newHeight);
        //TUTORIAL
        if(this.tutorial){
            const { width, height } = this.sys.game.config;
            this.containerStore = null;
            this.explainTutorial();
        }
    }
    // BUILDING LIST
    spawnIconList(newWidth, offsetX, newHeight) { 
        this.builtList = this.district.getBuildingsList();
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '30px',
            fontFamily: 'Handjet',
            backgroundColor: '#000000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false).setPosition(0,0).setDepth(100);;
        this.newX = newWidth * 0.4 + 5;
        this.newY = newHeight * 0.67;
        const container = this.add.container(this.newX, this.newY); 
        this.storeContainer = this.add.image(0, 0, 'districtStoreBg').setOrigin(0);
        container.add(this.storeContainer);
        //NORMAL BUILDING
        for (let i = 0; i < this.builtList.length; i++) {
            const building = this.builtList[i];
            const x = this.newX + offsetX * i * 1.1 + 20;
            const y = this.newY + 50;
            const img = this.add.image(x, y, building.getBuildingPNG()).setOrigin(0).setDepth(19); 

            if (this.tutorial) {
                if (building.getName() === "CINE") {
                    img.setOrigin(0.5);
                    img.x += 32;
                    img.y += 32;
                    this.pulseTween = this.tweens.add({
                        targets: img,
                        scale: 1.3,
                        duration: 400,
                        ease: 'Sin.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            }
            img.setInteractive({ useHandCursor: true });
            this.configureNormalEvents(img, building, tooltip);
        }
        //SPECIAL BUILDING
        const building = this.district.getSpecialBuilding();
        const x1 = this.newX + offsetX * this.builtList.length * 1.1 + 20;
        const y1 = this.newY + 50; 
        const img = this.add.image(x1, y1, building.getBuildingPNG()).setOrigin(0).setDepth(19); 
        if (!this.tutorial) {
            img.setInteractive({ useHandCursor: true });
            this.configureSpecialEvents(img, building, tooltip);
        }
        
        //CLOSE STORE BUTTON
        const x2 = this.newX + offsetX * (this.builtList.length + 1) * 1.1 + 100;
        const y2 = this.newY + 70;
        this.closeButton = this.add.image(x2, y2,'closeIcon').setOrigin(0).setInteractive({ useHandCursor: true }).setDepth(19).setOrigin(0.5, 0.5); 
        this.closeButton.on('pointerover', (pointer) => {
            tooltip.setText("Dale para salir del mercado");
            tooltip.setVisible(true);
            this.tweens.add({
                targets: this.closeButton,
                scale: 1.1,
                duration: 80
            });
        });
        this.closeButton.on('pointerout', () => {
            this.tweens.add({
                targets: this.closeButton,
                scale: 1,
                duration: 80
            });
            tooltip.setVisible(false);
        });
        this.closeButton.on('pointerup', () => {
            tooltip.setVisible(false);
            this.scene.stop();
            this.scene.launch('districtScene', { district: this.district, tutorial: this.tutorial, order: this.order, day: this.day });
        });
        return this.closeButton;
    }

    configureNormalEvents(img, building, tooltip) {
        img.on('pointerover', (pointer) => {
            if(this.district.canBuildMore()){
                if(this.player.getMoney() < building.getBuildingCost()){
                    img.setInteractive({ useHandCursor: false });
                    tooltip.setText(`No tienes suficiente dinero para comprar este edificio. \nTienes: ${this.player.getMoney()}$ \t El edificio cuesta: ${building.getBuildingCost()}$`);
                } 
                else tooltip.setText(building.getBuildingInfo(this.district.getPopulation(),this.district.getTaxesPercentage()));
            }else {
                img.setInteractive({ useHandCursor: false });
                tooltip.setText('No tienes suficiente espacio para construir');
            }
            tooltip.setVisible(true);
            tooltip.setPosition(pointer.x + 5, pointer.y + 5);
        });
        img.on('pointermove', () => {});
        img.on('pointerout', () => {tooltip.setVisible(false);});
        img.on('pointerup', () => {
            if(this.tutorial) {
                if (building.getName() === "CINE") {
                    if (this.pulseTween) this.pulseTween.stop();
                    img.setScale(1);
                    this.district.addBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    this.footerUI.refreshMoney();
                    this.time.delayedCall(400, () => {
                        this.containerStore.destroy();
                        this.passToTutorialScene();
                    });
                }
                return
            }
            if(this.district.canBuildMore()){
                if(this.player.getMoney() >= building.getBuildingCost()){
                    this.district.addBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    this.footerUI.refreshMoney();
                    this.time.delayedCall(400, () => {
                        tooltip.setVisible(false);
                        this.scene.stop();
                        this.scene.launch('districtScene', { district: this.district, tutorial: this.tutorial, order: this.order, boughtBuilding: true, day: this.day });
                    });
                } else this.cameras.main.shake(200, 0.005);
            }
        }); 
    }
    configureSpecialEvents(img, building, tooltip) {
        img.on('pointerover', (pointer) => {
            tooltip.setVisible(true);
            if(this.district.isSpecialBuildingBuilt()){
                img.setInteractive({ useHandCursor: false });
                tooltip.setText('Edificio especial ya construido!!!');
            } 
            else{
                if(this.district.canBuildMore()){
                    if(this.player.getMoney() < building.getBuildingCost()){
                        img.setInteractive({ useHandCursor: false });
                        tooltip.setText(`No tienes suficiente dinero para comprar este edificio. \nTienes: ${this.player.getMoney()}$ \t El edificio cuesta: ${building.getBuildingCost()}$`);
                    } 
                    else tooltip.setText('--------EDIFICIO ESPECIAL--------\n' + building.getBuildingInfo(this.district.getPopulation(),this.district.getTaxesPercentage()));
                }else{
                    img.setInteractive({ useHandCursor: false });
                    tooltip.setText('No tienes suficiente espacio para construir');
                } 
            }
            tooltip.setPosition(pointer.x + 5, pointer.y + 5);
        });
        img.on('pointermove', () => {});
        img.on('pointerout', () => {tooltip.setVisible(false);});
        img.on('pointerup', () => {
            if(this.district.canBuildMore() && !this.district.isSpecialBuildingBuilt()){
                if(this.player.getMoney() >= building.getBuildingCost()){
                    this.district.addSpecialBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    tooltip.setVisible(false);
                    this.footerUI.refreshMoney();
                    this.time.delayedCall(400, () => {
                        this.scene.stop();
                        this.scene.launch('districtScene', { district: this.district, tutorial: this.tutorial, order: this.order, boughtBuilding: true, day: this.day });
                    });
                } 
            }else this.cameras.main.shake(200, 0.005);
        });
    }
}