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
        this.day = data.day || 1;
        this.boughtBuilding = data.boughtBuilding || false;
    }
       
    create() {
        console.log("DISTRICT: " + this.district.getName());

        this.baseWidth = this.scale.width;
        this.baseHeight = this.scale.height;

        const newWidth = this.baseWidth * 0.9;
        const newHeight = this.baseHeight * 0.85;

        const offsetX = (this.baseWidth - newWidth) / 2;
        const offsetY = (this.baseHeight - newHeight) / 2 - 50;

        this.add.rectangle(0, 0, this.baseWidth, this.baseHeight, 0x000000, 0.5).setOrigin(0);

        //PLAYER INFO
        this.player = this.registry.get('gameManager').getPlayer();
        this.footerUI = new footerUI(this, this.tutorial);
        this.footerUI.updateDistrictFooter(this.district);
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth, newHeight, offsetX, offsetY);
        //DISTRICT INFO
        this.districtNameText = this.spawnNameText(offsetX, offsetY, newWidth);
        this.districtDescriptionText = this.spawnDescText(newWidth, offsetX, offsetY);
        this.districtScene = this.spawnScene(newWidth, newHeight, offsetX, offsetY);
        this.districtDetail = this.spawnDetailText(newWidth, newHeight, offsetX, offsetY);
        if(this.boughtBuilding)
            this.refreshDetailsText();
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth, offsetX, offsetY);
        this.storePositionX = this.spawnBuiltList(newWidth, offsetX, newHeight);
        this.storeButton = this.spawnStoreButton(newHeight, this.storePositionX, this.tutorial).setDepth(19);
        this.spawnAllFooter(newWidth, offsetX, newHeight, offsetY);

        //BLOCKER
        if (this.day < 3) this.blocker = this.add.image(598, 500, 'blockerDistrict').setOrigin(0).setInteractive({ useHandCursor: false }).setScale(0.955);

        //TUTORIAL
        if(this.tutorial){
            const { width, height } = this.sys.game.config;
            this.blockerBuilding = this.add.zone(580, 320, width/2, height/6).setOrigin(0).setInteractive().setDepth(20);
            this.blockerPercentage = this.add.zone(580, 480, width/2, height/5).setOrigin(0).setInteractive().setDepth(20);
            this.blockerFooter = this.add.zone(0, height - 100, width, 100).setOrigin(0).setInteractive().setDepth(20);
            this.containerStore = null;
            if (this.order === 1) this.explainTutorial(width, height);
            else if (this.order === 2) this.finishTutorial(width, height);
            else if (this.order === 3) this.explainParameters(width, height);
        }

        //this.event.on('resume', () => { ...

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
        let i = 0;
        if(this.district.isSpecialBuildingBuilt())
            i = 1;
        this.districtScene = this.add.image(offsetX + newWidth * 0.048, offsetY + newHeight * 0.2, list[i]).setOrigin(0);
        return this.districtScene;
    }
    spawnDetailText(newWidth,newHeight,offsetX,offsetY) {
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '30px',
            fontFamily: 'Margarine',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        //POBLACION TOTAL
        const populationText = this.add.text(newWidth/10 + 70, newHeight - newHeight/3 + offsetY*2 + 45, Math.trunc(this.district.getPopulation()), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#30718c'
        }).setDepth(15).setInteractive();
        populationText.on('pointerover', () => {
            tooltip.setText('Dato: Población total del distrito');
            tooltip.setPosition(0, 0);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        populationText.on('pointerout', () => { tooltip.setVisible(false); });
        // DINERO QUE SE GANA POR CICLO
        const moneyText = this.add.text(newWidth/10 + 70, newHeight - newHeight/3 + offsetY*7 + 50, Math.trunc(this.district.getMoneyGenerated()), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#ba9900'
        }).setDepth(15).setInteractive();
        moneyText.on('pointerover', () => {
            tooltip.setText('Dato: Dinero que genera el distrito por ciclo de energía');
            tooltip.setPosition(0, 0);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        moneyText.on('pointerout', () => { tooltip.setVisible(false); });
        // HABITANTES A FAVOR
        const inFavorText = this.add.text(newWidth/10 + offsetX*3 + 65, newHeight - newHeight/3 + offsetY*2 + 45, Math.trunc(this.district.getPopulation() * this.district.getSatisfaction() / 100), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#46c83d'
        }).setDepth(15).setInteractive();
        inFavorText.on('pointerover', () => {
            tooltip.setText('Dato: Habitantes satisfechos del distrito');
            tooltip.setPosition(0, 0);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        inFavorText.on('pointerout', () => { tooltip.setVisible(false); });
        // HABITANTES EN CONTRA/NEUTROS
        const noFavorText = this.add.text(newWidth/10 + offsetX*3 + 65, newHeight - newHeight/3 + offsetY*7 + 50, Math.trunc(this.district.getPopulation() * (100 - this.district.getSatisfaction()) / 100), {
            fontSize: '34px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#e62d2a'
        }).setDepth(15).setInteractive();
        noFavorText.on('pointerover', () => {
            tooltip.setText('Dato: Habitantes insatisfechos del distrito');
            tooltip.setPosition(0, 0);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        noFavorText.on('pointerout', () => { tooltip.setVisible(false); });
        return { population: populationText, money: moneyText, inFavor: inFavorText, noFavor: noFavorText };
    }
    refreshDetailsText(callback = null){
        this.districtDetail.population.setText(this.district.getPopulation());
        this.districtDetail.inFavor.setText(this.district.getPopulation() * this.district.getSatisfaction() / 100);
        this.districtDetail.money.setText(this.district.getMoneyGenerated());
        this.districtDetail.noFavor.setText(this.district.getPopulation() * (100 - this.district.getSatisfaction()) / 100);
        const texts = [this.districtDetail.population, this.districtDetail.money, this.districtDetail.inFavor, this.districtDetail.noFavor];
        let completedTweens = 0;
        texts.forEach(text => {
            this.tweens.add({
                targets: text,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 300,
                yoyo: true,
                ease: 'Power2',
                onComplete: () => {
                    completedTweens++;
                    if (completedTweens === texts.length && callback) {
                        callback();
                    }
                }
            });
        });
    }
    // SPAWN BUILTS IMAGE
    spawnBuiltList(newWidth, offsetX, newHeight) {
        this.builtList = this.district.getBuildingsBuilt();

        const tooltip = this.add.text(0, 0, '', {
            fontSize: '30px',
            fontFamily: 'Margarine',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false).setPosition(0,0).setDepth(100);
        const tooltip2 = this.add.text(0, 0, '', {
            fontSize: '30px',
            fontFamily: 'Margarine',
            backgroundColor: '#000',
            color: '#ffe600',
            padding: { x: 5, y: 5 }
        }).setVisible(false).setPosition(0,165).setDepth(100);

        const startX = newWidth * 0.5;
        const spacing = 100;

        for (let i = 0; i < this.builtList.length; i++) {
            const building = this.builtList[i];
            const x = startX + i * spacing;
            const y = newHeight - newHeight / 2;

            const img = this.add.image(x, y + 35, building.getBuildingPNG()).setOrigin(0.5, 0.5).setScale(1.4).setInteractive();
            if(this.boughtBuilding && i === this.builtList.length - 1) this.tweens.add({
                targets: img,
                scale: 1.6,
                duration: 300,
                yoyo: true,
                ease: 'Power2'
            });
            img.on('pointerover', () => {
                tooltip.setText(building.getBuildingInfo());
                tooltip2.setText("Si quieres vender el edificio pulsalo");
                tooltip.setVisible(true);
                tooltip2.setVisible(true);
            });
            img.on('pointerout', () => {tooltip.setVisible(false); tooltip2.setVisible(false);});
            img.on('pointerup', () => {
                tooltip2.setVisible(false);
                this.blocker = this.add.zone(0, 0, this.baseWidth, this.baseHeight).setOrigin(0).setInteractive().setDepth(20);
                const container = this.add.container(this.baseWidth/2, this.baseHeight/2).setDepth(21);   
                const bg = this.add.rectangle(0, 0, 650, 400, 0x000000, 0.85).setOrigin(0.5);
                bg.setStrokeStyle(2, 0xffffff, 0.5);
                const text = this.add.text(0, 0, 'Para demoler este edificio tienes que pagar a los trabajores 10000$', {
                    fontSize: '30px',
                    fontFamily: 'Margarine',
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: { width: 600 }
                }).setOrigin(0.5);

                container.add([bg, text]);

                this.createTutorialButton(container, -180, 120, 'Rechazar', () => {
                    container.destroy();
                    this.blocker.destroy();
                });
                this.createTutorialButton(container, 180, 120, 'Aceptar', () => {
                    container.destroy();
                    this.blocker.destroy();
                    this.player.updateMoney(-10000);
                    this.district.removeBuilding(building);
                    this.refreshDetailsText(() => {
                        this.scene.restart();
                    });
                });

            });
        }
        //ANIMATION FOR TOOLTIP2
        this.tweens.add({
            targets: tooltip2,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        return newWidth * 0.5 + (offsetX + 25) * this.builtList.length;
    }
    // BUTTONS
    spawnStoreButton(newHeight, positionX) {
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '30px',
            fontFamily: 'Margarine',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false).setPosition(0,0).setDepth(100);
        this.storeButton = this.add.image(positionX, newHeight - newHeight/2 + 35,'storeIcon').setScale(1.3).setOrigin(0.5,0.5).setInteractive({ useHandCursor: true }); 
        this.storeButton.on('pointerover', () => {
            tooltip.setText(`Dale al boton si quieres ir al mercado de EDIFICIOS(${this.district.getSpaceBuildingBuilt()}/${this.district.getSpaceBuilding()})`);
            tooltip.setVisible(true);
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
                tooltip.setVisible(true);
            }else{
                tooltip.setVisible(false);
                this.closeButton.setVisible(false);
                this.scene.pause('districtScene');
                this.scene.launch('districtStoreScene', { district: this.district, tutorial: this.tutorial, order: this.order, day: this.day });
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
            const audioManager = this.registry.get('audioManager');
            if (audioManager) audioManager.play('closeDistrict');
            this.scene.stop();
            this.registry.set('flagShow',false);
            this.scene.resume('gameScene');
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
            const audioManager = this.registry.get('audioManager');
            if (audioManager) audioManager.play('key');
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
            this.scene.launch('districtStoreScene', { district: this.district, tutorial: true});
        })
    
        this.createTutorialButton(container, -180, 200, 'Volver', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.storeButton.setScale(1.3);
            container.destroy();
            this.explainDistrictAttributes(width, height);
        });
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
    // ORDER 3
    explainParameters(width, height) {
        const container = this.add.container(width / 2, height / 2).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 750, 350, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -40, 'Estamos nuevamente en El Nido, el lugar ideal para mostrarle sus nuevo Parámetros de Distritos: Impuestos, Horario Laboral, Seguridad, y Limpieza de las calles.\n\nCada parámetro es un delicado equilibrio. Al ajustarlo, la satisfacción de los vecinos y el dinero del distrito irán variando.\nDebe encontrar el balance que más le convenga, señor.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, 0, 120, 'Continuar', () => {
            container.destroy();
            this.epxlainTestParameter(width, height);
        });
    }
    epxlainTestParameter(width, height) {
        const container = this.add.container(width / 4 - 30, height * 0.35 + 30).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 650, 300, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -50, 'Vamos a porbar a ampliar la limpieza del distrito. Las avez locales aprecian mucho mantener sus calles limpias.\n\nPulsa el botón de + para subir el nivel de limpieza.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        container.add([bg, text]);

        this.pulseTween = this.tweens.add({
            targets: this.botonAumentar,
            scale: 1.4,
            duration: 300,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });
        this.botonAumentar.once('pointerup', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.storeButton.setScale(1.3);
            container.destroy();
            this.explainParameters2(width, height);
        })

        /*this.createTutorialButton(container, -180, 90, 'Volver', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.botonAumentar.setScale(1);
            container.destroy();
            this.explainParameters(width, height);
        });*/
    }
    explainParameters2(width, height) {
        const container = this.add.container(width / 2, height / 2).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 750, 350, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -40, '¡Bien hecho, señor presidente!\nAhora las calles están mucho más a la alutra del distrito.\n\nSin embargo, no somos una ONG, y nuestro dinero está mejor invertido en otras cosas.\nVamos a probar a revertir los cambios que hemos hecho.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, 0, 120, 'Continuar', () => {
            container.destroy();
            this.epxlainTestParameter2(width, height);
        });
    }
    epxlainTestParameter2(width, height) {
        const container = this.add.container(width / 4 - 30, height * 0.35 + 30).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 650, 300, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -50, 'Intente lo contrario: disminuya la limpieza del lugar.\nNo sé preocue, si luego lo prefiere, puede volver a dejarla como estaba.\n\nPulsa el botón de - para diminuir el nivel de seguridad.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        container.add([bg, text]);

        this.pulseTween = this.tweens.add({
            targets: this.botonReducir,
            scale: 1.4,
            duration: 300,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });
        this.botonReducir.once('pointerup', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.storeButton.setScale(1.3);
            container.destroy();
            this.explainParametersFinish(width, height);
        })

        /*this.createTutorialButton(container, -180, 90, 'Volver', () => {
            if (this.pulseTween) this.pulseTween.stop();
            this.botonReducir.setScale(1);
            container.destroy();
            this.explainParametersFinish(width, height);
        });*/
    }
    explainParametersFinish(width, height) {
        const container = this.add.container(width / 2, height / 2).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 750, 350, 0x000000, 0.85).setOrigin(0.5);
        bg.setStrokeStyle(2, 0xffffff, 0.5);
        const text = this.add.text(0, -40, 'Usted ha nacido para esto, señor presidente.\nRecuerde que cada distrito es distito, por lo que preferiran un equilibrio diferente de los parámetros.\n\nEsta herramienta le será muy útil para conseguir llegar popularidad en aquellos distritos que más se le compliquen.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);
        
        container.add([bg, text]);

        this.createTutorialButton(container, 0, 120, 'Continuar', () => {
            container.destroy();
            this.scene.stop();
            this.scene.stop('tutorialScene');
            this.scene.launch('tutorialScene', { order: 5 });
        });
    }
}