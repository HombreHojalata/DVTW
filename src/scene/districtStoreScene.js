import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtStoreScene' });
    }

    init(data) {
        this.district = data.district;
        this.tutorial = data.tutorial || false;
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
            fontSize: '14px',
            backgroundColor: '#000000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        this.newX = newWidth * 0.4 + 5;
        this.newY = newHeight * 0.67;
        const container = this.add.container(this.newX, this.newY); 
        const background = this.add.image(0, 0, 'districtStoreBg').setOrigin(0);
        container.add(background);
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
                    img.setInteractive({ useHandCursor: true });
                    this.configureNormalEvents(img, building, tooltip);
                }
            } else {
                img.setInteractive({ useHandCursor: true });
                this.configureNormalEvents(img, building, tooltip);
            }
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
            tooltip.setPosition(pointer.x + 10, pointer.y + 10);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
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
            this.scene.resume('districtScene');
        });
        return this.closeButton;
    }

    configureNormalEvents(img, building, tooltip) {
        img.on('pointerover', () => {
            if(this.district.canBuildMore()){
                if(this.player.getMoney() < building.getBuildingCost()) tooltip.setText(`No tienes suficiente dinero para comprar este edificio. \nTienes: ${this.player.getMoney()}$ \t El edificio cuesta: ${building.getBuildingCost()}$`);
                else tooltip.setText(building.getBuildingInfo());
            }else tooltip.setText('No tienes suficiente espacio para construir');
            tooltip.setPosition(600, 625);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        img.on('pointermove', () => {tooltip.setPosition(600, 625);});
        img.on('pointerout', () => {tooltip.setVisible(false);});
        img.on('pointerup', () => {
            if(this.tutorial) {
                if (building.getName() === "CINE") {
                    if (this.pulseTween) this.pulseTween.stop();
                    img.setScale(1);
                    this.district.addBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    this.footerUI.refreshMoney();
                    this.containerStore.destroy();
                    this.passToTutorialScene();
                }
                return
            }
            if(this.district.canBuildMore()){
                if(this.player.getMoney() >= building.getBuildingCost()){
                    this.district.addBuilding(building);
                    this.player.updateMoney(-building.getBuildingCost());
                    this.footerUI.refreshMoney();
                } 
            }
            tooltip.setVisible(false);
            this.scene.stop();
            this.scene.get('districtScene').scene.restart();
        });
    }
    configureSpecialEvents(img, building, tooltip) {
        img.on('pointerover', () => {
            if(this.district.isSpecialBuildingBuilt()) tooltip.setText('Edificio especial ya construido!!!');
            else{
                if(this.district.canBuildMore()){
                    if(this.player.getMoney() < building.getBuildingCost()) tooltip.setText(`No tienes suficiente dinero para comprar este edificio. \nTienes: ${this.player.getMoney()}$ \t El edificio cuesta: ${building.getBuildingCost()}$`);
                    else tooltip.setText('--------EDIFICIO ESPECIAL--------\n' + building.getBuildingInfo());
                }else tooltip.setText('No tienes suficiente espacio para construir');
            }
            tooltip.setPosition(600,625);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        img.on('pointermove', () => {tooltip.setPosition(600,625);});
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
            this.scene.stop();
            this.scene.get('districtScene').scene.restart();
        });
    }
    // TUTORIAL
    createTutorialButton(container, x, y, text, callback) {
        const width = 220;
        const height = 48;

        const shadow = this.add.rectangle(x + 4, y + 5, width, height, 0x000000, 0.18).setOrigin(0.5);
        const bg = this.add.rectangle(x, y, width, height, 0xf7f2ea, 0.95)
            .setOrigin(0.5)
            .setStrokeStyle(3, 0x263b63)
            .setInteractive({ useHandCursor: true });

        const label = this.add.text(x, y, text, {
            fontSize: '22px',
            fontStyle: 'bold',
            color: '#26304a',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        bg.on('pointerover', () => {
            bg.setFillStyle(0xfff7df, 1);
            bg.setStrokeStyle(3, 0xb68a2f);
            label.setScale(1.05);
            bg.setScale(1.05);
        });

        bg.on('pointerout', () => {
            bg.setFillStyle(0xf7f2ea, 0.95);
            bg.setStrokeStyle(3, 0x263b63);
            label.setScale(1);
            bg.setScale(1);
        });

        bg.on('pointerdown', () => { bg.setScale(0.98); label.setScale(0.98); });

        bg.on('pointerup', () => {
            bg.setScale(1.05);
            label.setScale(1.05);
            callback();
        });

        container.add([shadow, bg, label]);
    }
    explainTutorial() {
        this.containerStore = this.add.container(300, 140).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 450, 300, 0x000000, 0.85).setOrigin(0.5, 0);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, 140, '¡Aquí tiene el catálogo de obras públicas!\nAquí podrá comprar nuevos edificios para los distritos.\n\nCada edificio tiene una función distinta.\n Intente comprar el edificio "CINE" para probar.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 410 }
        }).setOrigin(0.5);

        this.containerStore.add([bg, text]);
    }
    passToTutorialScene() {
        this.scene.launch('districtScene', { district: this.district, tutorial: true, order: 2 });
        this.scene.stop();
    }
}