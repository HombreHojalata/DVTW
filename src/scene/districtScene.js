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
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth,newHeight,offsetX,offsetY);
        //DISTRICT INFO
        this.districtNameText = this.spawnNameText(offsetX,offsetY);
        this.districtDescriptionText = this.spawnDescText(newWidth,offsetX,offsetY);
        this.districtScene = this.spawnScene(newWidth,newHeight,offsetX,offsetY);
        this.districtDetail = this.spawnDetailText(newWidth,newHeight,offsetX,offsetY);
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
        this.storePositionX = this.spawnBuiltList(newWidth,offsetX,newHeight);
        this.storeButton = this.spawnStoreButton(newHeight,this.storePositionX,this.tutorial).setDepth(19);
        this.spawnAllFooter(newWidth,offsetX,newHeight,offsetY);
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
    // TUTORIAL
    // ORDER 1
    explainTutorial(width, height) {
        const container = this.add.container(340, 300).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, '¡Bienvenido al distrito de ' + this.district.getName() + '!\nAquí puedes gestionar las políticas del distrito y ver su información detallada.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 },
            lineSpacing: 10
        }).setOrigin(0.5);
        const continueBtn = this.add.text(150, 150, 'Continuar', { fontSize: '20px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainDistrictAtributes(width, height);
                }
            });
        });
        container.add([bg, text, continueBtn]);
    }
    explainDistrictAtributes(width, height) {
        const container = this.add.container(300, 450).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, 'En la parte inferior de la pantalla puedes ver los atributos del distrito y modificarlos usando los botones correspondientes.\nTen en cuenta que cada cambio tiene un costo, así que elige sabiamente.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 },
            lineSpacing: 10
        }).setOrigin(0.5);
        const goBackBtn = this.add.text(80, 170, 'Volver', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        goBackBtn.on('pointerup', () => {
            goBackBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainTutorial(width, height);
                }
            });
        });
        const prepareBtn = this.add.text(220, 170, 'Continuar', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        prepareBtn.on('pointerup', () => {
            prepareBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainStoreButton(width, height);
                }
            });
        });
        container.add([bg, text, goBackBtn, prepareBtn]);
    }
    explainStoreButton(width, height) {              // CAPAZ HAY QUE MARCARLO
        this.containerStore = this.add.container(340, 300).setDepth(21);   
        this.blockerBuilding.destroy();
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, 'Haz click en el icono de la tienda para acceder al mercado de edificios del distrito.\nAquí podrás comprar nuevos edificios para tu distrito usando el dinero que has ganado.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 },
            lineSpacing: 10
        }).setOrigin(0.5);
        const goBackBtn = this.add.text(150,150, 'Volver', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        goBackBtn.on('pointerup', () => {
            goBackBtn.setScale(1.1);
            this.tweens.add({
                targets: this.containerStore,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.containerStore.destroy();
                    this.blockerBuilding = this.add.zone(580, 320, width/2, height/6).setOrigin(0).setInteractive().setDepth(20);
                    this.explainDistrictAtributes(width, height);
                }
            });
        });
        //FALTA UNA MARCA
        this.containerStore.add([bg, text, goBackBtn]);
    }
    // ORDER 2
    finishTutorial() {
        this.containerText = this.add.container(340, 300).setDepth(21);   
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, '¡Bien hecho!\nHas aprendido a comprar edificios, que no sabes para qué sirven? Cada edificio tiene una función específica en tu distrito cuando pongas el cursor por encima de él te dira sus propiedades.\n', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 },
            lineSpacing: 10
        }).setOrigin(0.5);
            //}).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        this.time.delayedCall(5000, () => {
            this.tweens.add({
                targets: this.containerText,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.containerText.destroy();
                    this.scene.stop();
                    this.scene.stop('tutorialScene');
                    this.scene.launch('tutorialScene', { order: 3 });
                }
            }); 
        });
    }
    //
    spawnTemplate(newWidth,newHeight,offsetX,offsetY){return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, 'districtTemplate').setDisplaySize(newWidth, newHeight);}
    spawnNameText(offsetX,offsetY){
        const leftCorner = offsetX*3 - 40;
        const rightCorner = offsetX*6;
        const nameText = this.add.text(0, offsetY + 80, this.district.getName(), {
            fontSize: '40px',
            fontFamily: 'Impact',
            fontStyle: 'italic',
            color: '#000000'
        });
        const middlePoint = (leftCorner + rightCorner) / 2;
        nameText.x = middlePoint - (nameText.width / 2);
        return nameText;
    }
    spawnDescText(newWidth,offsetX,offsetY){
        const descText = this.add.text(offsetX*8 + 20, offsetY + 150, this.district.getDescription(), {
            fontSize: '14px',
            fontFamily: 'Arial Black',
            fontStyle: 'italic',
            color: '#000000',
            wordWrap: { width: newWidth - newWidth/2 },                                                 //LIMIT
            lineSpacing: 10                                                                             //SPACE BETWEEN LINES
        }); 
        return descText;
    }  
    spawnScene(newWidth,newHeight,offsetX,offsetY) {
        const list = this.district.getSceneList();
        const randomIndex = Math.floor(Math.random() * list.length);
        this.districtScene = this.add.image(newWidth-newWidth/2-offsetX*4-35,newHeight-newHeight/2-offsetY,list[randomIndex]);
        return this.districtScene;
    }
    spawnDetailText(newWidth,newHeight,offsetX,offsetY) {
        //POBLACION TOTAL
        const populationText = this.add.text(newWidth/10 + 80, newHeight - newHeight/3 + offsetY*5 + 5, this.district.getPopulation(), {
            fontSize: '29px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#30718c'
        }).setDepth(1000);  
        // DINERO QUE SE GANA POR CICLO
        const moneyText = this.add.text(newWidth/10 + 80, newHeight - newHeight/3 + offsetY*9 + 5, this.district.getMoneyGenerated(), {
            fontSize: '29px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#ba9900'
        }).setDepth(1000);  
        // HABITANTES A FAVOR
        const inFavorText = this.add.text(newWidth/10 + offsetX*3 + 70, newHeight - newHeight/3 + offsetY*5 + 5, this.district.getPopulation() * this.district.getSatisfaction() / 100, {
            fontSize: '29px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#46c83d'
        }).setDepth(1000);  
        // HABITANTES EN CONTRA/NEUTROS
        const noFavorText = this.add.text(newWidth/10 + offsetX*3 + 70, newHeight - newHeight/3 + offsetY*9 + 5, this.district.getPopulation() * (100 - this.district.getSatisfaction()) / 100, {
            fontSize: '29px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#e62d2a'
        }).setDepth(1000);  
        return { populationText, moneyText, inFavorText, noFavorText };
    }
    // SPAWN BUILTS IMAGE
    spawnBuiltList(newWidth, offsetX, newHeight) {
        this.builtList = this.district.getBuildingsBuilt();

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
        return newWidth - offsetX * (9 - this.builtList.length - 1);
    }
    // BUTTON
    spawnStoreButton(newHeight,positionX){
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '14px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        this.storeButton = this.add.image(positionX,newHeight - newHeight/2,'storeIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.storeButton.on('pointerover', (pointer) => {
            tooltip.setText('Dale al boton si quieres ir al mercado de EDIFICIOS');
            tooltip.setPosition(pointer.x + 15, pointer.y + 35);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
            this.storeButton.setScale(1.1);
        });
        this.storeButton.on('pointerout', () => {
            tooltip.setVisible(false);
            this.storeButton.setScale(1);
        });
        this.storeButton.on('pointerup', () => {
            if(this.tutorial) this.containerStore.destroy();
            tooltip.setVisible(false);
            this.scene.pause('districtScene');
            this.scene.launch('districtStoreScene', { district: this.district, tutorial: this.tutorial });
        });
        return this.storeButton;
    }
    spawnCloseButton(newWidth,offsetX,offsetY){
        this.closeButton = this.add.image(offsetX + newWidth - 40,offsetY + 120,'closeIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.closeButton.on('pointerover', () => {this.closeButton.setScale(1.1);});
        this.closeButton.on('pointerout', () => {this.closeButton.setScale(1);});
        this.closeButton.on('pointerup', () => {
            this.scene.stop();
            this.registry.set('flagShow',false);
            this.scene.get('gameScene').scene.restart();
        });
        return this.closeButton;
    }
    // FOOTER
    spawnAllFooter(newWidth,offsetX,newHeight,offsetY){
        this.taxesText = this.add.text(newWidth-offsetX*9,  newHeight - offsetY*15, this.district.getTaxesPercentage(), {
            fontSize: '20px',
            color: '#ffffff'
        });
        this.spawnTaxesButton(newWidth,offsetX,newHeight,offsetY);
        this.securityText = this.add.text(newWidth-offsetX*4,  newHeight - offsetY*15, this.district.getSecurityPercentage(), {
            fontSize: '20px',
            color: '#ffffff'
        });
        this.spawnSecurityButton(newWidth,offsetX,newHeight,offsetY);
        this.workScheduleText = this.add.text(newWidth-offsetX*9,  newHeight - offsetY*8, this.district.getWorkSchedulePercentage(), {
            fontSize: '20px',
            color: '#ffffff'
        });
        this.spawnWorkScheduleButton(newWidth,offsetX,newHeight,offsetY);
        this.cleaningText = this.add.text(newWidth-offsetX*4,  newHeight - offsetY*8, this.district.getCleaningPercentage(), {
            fontSize: '20px',
            color: '#ffffff'
        });
        this.spawnCleaningButton(newWidth,offsetX,newHeight,offsetY);
    }
    createButton(x, y, image, swapImage,callback) {
        const button = this.add.image(x, y, image).setScale(1);
        const tooltip = this.add.text(0, 0, '', {
            fontSize: '14px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 5, y: 5 }
        }).setVisible(false);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerover', (pointer) => {
            tooltip.setText('Darle al boton cuesta 5000$');
            tooltip.setPosition(pointer.x + 15, pointer.y + 35);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
            button.setScale(1.1);
            button.setTexture(swapImage);
        });
        button.on('pointerout', () => {
            tooltip.setVisible(false);
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
    spawnTaxesButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7, 
            newHeight - offsetY*15, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getTaxesPercentage() < 100){
                    this.district.addTaxesPercentage(5);
                    this.taxesText.setText(this.district.getTaxesPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth - offsetX*6, 
            newHeight - offsetY*15, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getTaxesPercentage() > 0){
                    this.district.addTaxesPercentage(-5);
                    this.taxesText.setText(this.district.getTaxesPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
    }
    spawnSecurityButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2, 
            newHeight - offsetY*15, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getSecurityPercentage() < 100){
                    this.district.addSecurityPercentage(5);
                    this.securityText.setText(this.district.getSecurityPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth-offsetX, 
            newHeight - offsetY*15, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getSecurityPercentage() > 0){
                    this.district.addSecurityPercentage(-5);
                    this.securityText.setText(this.district.getSecurityPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
    }
    spawnWorkScheduleButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7, 
            newHeight - offsetY*8, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getWorkSchedulePercentage() < 100){
                    this.district.addWorkSchedulePercentage(5);
                    this.workScheduleText.setText(this.district.getWorkSchedulePercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();             
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth - offsetX*6, 
            newHeight - offsetY*8, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getWorkSchedulePercentage() > 0){
                    this.district.addWorkSchedulePercentage(-5);
                    this.workScheduleText.setText(this.district.getWorkSchedulePercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
    }
    spawnCleaningButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2, 
            newHeight - offsetY*8, 
            'increaseIcon',
            'increaseSelectIcon',
            () => {
                if(this.district.getWorkSchedulePercentage() < 100){
                    this.district.addCleaningPercentage(5);
                    this.cleaningText.setText(this.district.getCleaningPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
        this.botonReducir = this.createButton(
            newWidth-offsetX, 
            newHeight - offsetY*8, 
            'decreaseIcon', 
            'decreaseSelectIcon',
            () =>  {
                if(this.district.getCleaningPercentage() > 0){
                    this.district.addCleaningPercentage(-5);
                    this.cleaningText.setText(this.district.getCleaningPercentage());
                    this.player.updateMoney(-5000);
                    this.footerUI.refreshMoney();
                }
            }
        );
    }
}