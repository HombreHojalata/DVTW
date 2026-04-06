import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtScene' });
    }

    init(data) {
        this.district = data.district;
        this.tutorial = data.tutorial || false;
        this.order = data.order || 1;
    }
       
    create() {
        console.log("DISTRICT + " + this.district.getName());

        const baseWidth = this.scale.width;
        const baseHeight = this.scale.height;

        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;

        this.add.rectangle(0, 0, baseWidth, baseHeight, 0x000000, 0.5).setOrigin(0);

        //PLAYER INFO
        this.player = this.registry.get('gameManager').getPlayer();
        this.footerUI = new footerUI(this, this.player).create();
        this.footerUI.updateDistrictFooter(this.district);

        //TEMPLATE
        this.template = this.spawnTemplate(newWidth, newHeight, offsetX, offsetY);
        //DISTRICT INFO
        this.districtNameText = this.spawnNameText(offsetX, offsetY, newWidth);
        this.districtDescriptionText = this.spawnDescText(newWidth, offsetX, offsetY);
        this.districtScene = this.spawnScene(newWidth, newHeight, offsetX, offsetY);
        this.districtDetail = this.spawnDetailText(newWidth, newHeight, offsetX, offsetY);
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth, offsetX, offsetY);
        this.storePositionX = this.spawnBuiltList(newWidth, offsetX, newHeight);
        this.storeButton = this.spawnStoreButton(newHeight, this.storePositionX, this.tutorial).setDepth(19);
        this.spawnAllFooter(newWidth, offsetX, newHeight, offsetY);
        //TUTORIAL
        if(this.tutorial){
            const { width, height } = this.sys.game.config;
            this.blockerBuilding = this.add.zone(580, 320, width/2, height/6).setOrigin(0).setInteractive().setDepth(20);
            this.blockerPercentage = this.add.zone(580, 480, width/2, height/5).setOrigin(0).setInteractive().setDepth(20);
            this.blockerFooter = this.add.zone(0, height - 100, width, 100).setOrigin(0).setInteractive().setDepth(20);
            this.containerStore = null;
            if(this.order === 1) this.explainTutorial(width,height);
            else if(this.order === 2)this.finishTutorial(width,height);
        }
    }
    spawnTemplate(newWidth, newHeight, offsetX, offsetY) {
        return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, 'districtTemplate').setDisplaySize(newWidth, newHeight);
    }
    spawnNameText(offsetX, offsetY) {
        const leftCorner = offsetX*3 - 40;
        const rightCorner = offsetX*6;
        const nameText = this.add.text(0, offsetY + 15, this.district.getName(), {
            fontSize: '44px',
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            color: '#000000'
        });
        const middlePoint = (leftCorner + rightCorner) / 2;
        nameText.x = middlePoint - (nameText.width / 2);
        return nameText;
    }
    spawnDescText(newWidth, offsetX, offsetY) {
        const descText = this.add.text(offsetX*8 + 7, offsetY + 165, this.district.getDescription(), {
            fontSize: '20px',
            fontFamily: 'Margarine',
            fontStyle: 'italic',
            color: '#000000',
            wordWrap: { width: newWidth * 0.55 + 10 },                                                 //LIMIT
            lineSpacing: 8                                                                             //SPACE BETWEEN LINES
        }); 
        return descText;
    }  
    spawnScene(newWidth,newHeight,offsetX,offsetY) {
        const list = this.district.getSceneList();
        const randomIndex = Math.floor(Math.random() * list.length);
        this.districtScene = this.add.image(offsetX + newWidth * 0.048, offsetY + newHeight * 0.2, list[randomIndex]).setOrigin(0);
        return this.districtScene;
    }
    spawnDetailText(newWidth,newHeight,offsetX,offsetY) {
        //POBLACION TOTAL
        const populationText = this.add.text(newWidth/10 + 70, newHeight - newHeight/3 + offsetY*2 + 45, this.district.getPopulation(), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#30718c'
        }).setDepth(15);  
        // DINERO QUE SE GANA POR CICLO
        const moneyText = this.add.text(newWidth/10 + 70, newHeight - newHeight/3 + offsetY*7 + 50, this.district.getMoneyGenerated(), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#ba9900'
        }).setDepth(15);  
        // HABITANTES A FAVOR
        const inFavorText = this.add.text(newWidth/10 + offsetX*3 + 65, newHeight - newHeight/3 + offsetY*2 + 45, this.district.getPopulation() * this.district.getSatisfaction() / 100, {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#46c83d'
        }).setDepth(15);  
        // HABITANTES EN CONTRA/NEUTROS
        const noFavorText = this.add.text(newWidth/10 + offsetX*3 + 65, newHeight - newHeight/3 + offsetY*7 + 50, this.district.getPopulation() * (100 - this.district.getSatisfaction()) / 100, {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#e62d2a'
        }).setDepth(15);  
        return { population: populationText, money: moneyText, inFavor: inFavorText, noFavor: noFavorText };
    }
    refreshDetailsText(){
        this.districtDetail.population.setText(this.district.getPopulation());
        this.districtDetail.inFavor.setText(this.district.getPopulation() * this.district.getSatisfaction() / 100);
        this.districtDetail.money.setText(this.district.getMoneyGenerated());
        this.districtDetail.noFavor.setText(this.district.getPopulation() * (100 - this.district.getSatisfaction()) / 100);
    }
    // SPAWN BUILTS IMAGE
    spawnBuiltList(newWidth, offsetX, newHeight) {
        this.builtList = this.district.getBuildingsBuilt();

        const tooltip = this.add.text(0, 0, '', {
            fontSize: '16px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);

        const startX = newWidth * 0.5;
        const spacing = 100;

        for (let i = 0; i < this.builtList.length; i++) {
            const building = this.builtList[i];
            const x = startX + i * spacing;
            const y = newHeight - newHeight / 2;
            const img = this.add.image(x, y + 35, building.getBuildingPNG()).setOrigin(0.5, 0.5).setScale(1.4).setInteractive();

            img.on('pointerover', () => {
                tooltip.setText(building.getBuildingInfo());
                tooltip.setPosition(720, newHeight - newHeight/2 - 55);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            });
            img.on('pointerout', () => {tooltip.setVisible(false);});
        }

        return newWidth * 0.5 + (offsetX + 25) * this.builtList.length;
    }
    // BUTTONS
    spawnStoreButton(newHeight, positionX) {
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '16px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        this.storeButton = this.add.image(positionX, newHeight - newHeight/2 + 35,'storeIcon').setScale(1.3).setOrigin(0.5,0.5).setInteractive({ useHandCursor: true }); 
        this.storeButton.on('pointerover', () => {
            tooltip.setText(`Dale al boton si quieres ir al mercado de EDIFICIOS(${this.district.getSpaceBuildingBuilt()}/${this.district.getSpaceBuilding()})`);
            tooltip.setPosition(740, newHeight - newHeight/2 - 45);
            tooltip.setVisible(true);
            tooltip.setDepth(50);
            this.tweens.add({
                targets: this.storeButton,
                scale: 1.5,
                duration: 80
            });
        });
        this.storeButton.on('pointerout', () => {
            tooltip.setVisible(false);
            this.tweens.add({
                targets: this.storeButton,
                scale: 1.3,
                duration: 50
            });
        });
        this.storeButton.on('pointerup', () => {
            //if(this.tutorial) this.containerStore.destroy();
            if(this.district.getSpaceBuildingBuilt() === this.district.getSpaceBuilding()) {
                tooltip.setText(`Distrito lleno(${this.district.getSpaceBuildingBuilt()}/${this.district.getSpaceBuilding()})`);
                tooltip.setPosition(740, newHeight - newHeight/2 - 45);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            }else{
                tooltip.setVisible(false);
                this.scene.pause('districtScene');
                this.scene.launch('districtStoreScene', { district: this.district, tutorial: this.tutorial });
            }
        });
        return this.storeButton;
    }
    spawnCloseButton(newWidth, offsetX, offsetY) {
        this.closeButton = this.add.image(offsetX + newWidth - 60, offsetY + 110, 'closeIcon').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true }); 
        this.closeButton.on('pointerover', () => {
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
        });
        this.closeButton.on('pointerup', () => {
            this.scene.stop();
            this.registry.set('flagShow',false);
            this.scene.get('gameScene').scene.restart();
        });
        return this.closeButton;
    }
    // FOOTER
    spawnAllFooter(newWidth,offsetX,newHeight,offsetY){
        this.taxesText = this.add.text(newWidth-offsetX*9,  newHeight - offsetY*15 + 50, this.district.getTaxesPercentage(), {
            fontSize: '30px',
            color: '#333333',
            fontStyle: 'bold'
        });
        this.spawnTaxesButton(newWidth,offsetX,newHeight,offsetY);
        this.securityText = this.add.text(newWidth-offsetX*4,  newHeight - offsetY*15 + 50, this.district.getSecurityPercentage(), {
            fontSize: '30px',
            color: '#333333',
            fontStyle: 'bold'
        });
        this.spawnSecurityButton(newWidth,offsetX,newHeight,offsetY);
        this.workScheduleText = this.add.text(newWidth-offsetX*9,  newHeight - offsetY*7 + 50, this.district.getWorkSchedule(), {
            fontSize: '30px',
            color: '#333333',
            fontStyle: 'bold'
        });
        this.spawnWorkScheduleButton(newWidth,offsetX,newHeight,offsetY);
        this.cleaningText = this.add.text(newWidth-offsetX*4,  newHeight - offsetY*7 + 50, this.district.getCleaningPercentage(), {
            fontSize: '30px',
            color: '#333333',
            fontStyle: 'bold'
        });
        this.spawnCleaningButton(newWidth,offsetX,newHeight,offsetY);
    }
    createButton(x, y, image, swapImage,callback) {
        const button = this.add.image(x, y, image).setScale(1);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setTexture(swapImage);
        });
        button.on('pointerout', () => {
            button.setScale(1); 
            button.setTexture(image);
        });
        button.on('pointerdown', () => {button.setScale(1); button.setTexture(image);});
        button.on('pointerup', () => {
            button.setScale(1);
            button.setTexture(swapImage);
            if (callback) callback();
        });
        return button;
    }
    spawnTaxesButton(newWidth, offsetX, newHeight, offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7 + 10, 
            newHeight - offsetY*15 + 40, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getTaxesPercentage() < 100){
                    this.district.addTaxesPercentage(5);
                    this.taxesText.setText(this.district.getTaxesPercentage());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth - offsetX*6 + 10, 
            newHeight - offsetY*15 + 40, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getTaxesPercentage() > 0){
                    this.district.addTaxesPercentage(-5);
                    this.taxesText.setText(this.district.getTaxesPercentage());
                    this.district.updateAfterModifyPercentage();  
                    this.refreshDetailsText();                  
                }
            }
        );
    }
    spawnSecurityButton(newWidth, offsetX, newHeight, offsetY){
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2 + 10, 
            newHeight - offsetY*15 + 40, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getSecurityPercentage() < 100){
                    this.district.addSecurityPercentage(1);
                    this.securityText.setText(this.district.getSecurityPercentage());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth-offsetX + 10, 
            newHeight - offsetY*15 + 40, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getSecurityPercentage() > 0){
                    this.district.addSecurityPercentage(-1);
                    this.securityText.setText(this.district.getSecurityPercentage());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
    }
    spawnWorkScheduleButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7 + 10, 
            newHeight - offsetY*8 + 40, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getWorkSchedule() < 24){
                    this.district.addWorkSchedule(1);
                    this.workScheduleText.setText(this.district.getWorkSchedule());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth - offsetX*6 + 10, 
            newHeight - offsetY*8 + 40, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getWorkSchedule() > 0) {
                    this.district.addWorkSchedule(-1);
                    this.workScheduleText.setText(this.district.getWorkSchedule());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
    }
    spawnCleaningButton(newWidth,offsetX,newHeight,offsetY) { 
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2 + 10, 
            newHeight - offsetY*8 + 40, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getCleaningPercentage() < 100) {
                    this.district.addCleaningPercentage(1);
                    this.cleaningText.setText(this.district.getCleaningPercentage());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth-offsetX + 10, 
            newHeight - offsetY*8 + 40, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getCleaningPercentage() > 0) {
                    this.district.addCleaningPercentage(-1);
                    this.cleaningText.setText(this.district.getCleaningPercentage());
                    this.district.updateAfterModifyPercentage();
                    this.refreshDetailsText();
                }
            }
        );
    }
    // TUTORIAL
    // FALTARIA EXPLICAR QUE EL BENEFICIO DE UN EDIFICIO ES SU VALOR N X HORAS LABORALES X NUM POBLACION
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
    // ORDER 1
    explainTutorial(width, height) {
        const container = this.add.container(width / 2, height / 2).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 750, 425, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -40, '¡Bienvenido a El Nido!\n\nAquí podrá gestionar la política interna de cada distrito. Recuerde que cada zona de Quackington DC es distinta, le recomiendo leer la descripción de cada una.\n\nEstamos trabajando en mejoras a futuro en este panel, pero por el momento dejeme explicar cómo funciona todo.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, 0, 120, 'Continuar', () => {
            container.destroy();
            this.explainDistrictAttributes(width, height);
        });
    }
    explainDistrictAttributes(width, height) {
        const container = this.add.container(width / 4 - 30, height * 0.35 + 30).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 650, 400, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -50, 'Esos cuatro números debajo de la foto del distrito son: el número total de habitantes del lugar, el dinero que cobra o gasta cada ciclo este distrito, y los vecinos del distrito a favor y en contra.\n\nEl objetivo es ampliar el porcentaje de satisfacción de los distritos para aumentar los vecinos a favor. Esto influye directamente en la opinión pública global.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        container.add([bg, text]);

        this.createTutorialButton(container, 180, 120, 'Continuar', () => {
            container.destroy();
            this.explainStoreButton(width, height);
        });
        this.createTutorialButton(container, -180, 120, 'Volver', () => {
            container.destroy();
            this.explainTutorial(width, height);
        });
    }
    explainStoreButton(width, height) {
        const container = this.add.container(width * 0.7, height * 0.6).setDepth(21);   
        this.blockerBuilding.destroy();
        const bg = this.add.rectangle(0, 0, 700, 250, 0x000000, 0.85).setOrigin(0.5, 0);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, 100, 'Si de verdad quiere controlar la ciudad, la mejor forma de hacerlo es contruyendo edificios.\nPulse el icono de la bolsa de dinero para gastar esos fondos públicos en constuctoras privadas.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 650 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, -180, 200, 'Volver', () => {
            container.destroy();
            if (this.pulseTween) this.pulseTween.stop();
            this.storeButton.setScale(1.3);
            this.explainDistrictAttributes(width, height);
        });

        this.pulseTween = this.tweens.add({
            targets: this.storeButton,
            scale: 1.6,
            duration: 600,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });
        this.storeButton.once('pointerdown', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.storeButton.setScale(1.3);
            container.destroy();
            this.scene.launch('districtStoreScene', { district: this.district, tutorial: true });
        })
    
    }
    // ORDER 2
    finishTutorial() {
        const container = this.add.container(750, 500).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 750, 300, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -40, '¡Buen trabajo, señor!\nSi se cansa de algún edificio que ha contruido anteriormente, siempre puede demolerlo haciendo clicl sobre este.\n\nVeo que ya se ha familiarizado bien con el control de los distritos, estoy segura que le pillará el tranquillo en seguida.\n', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, 0, 100, 'Continuar', () => {
            container.destroy();
            this.scene.stop();
            this.scene.stop('tutorialScene');
            this.scene.launch('tutorialScene', { order: 2 });
        });
    }
}