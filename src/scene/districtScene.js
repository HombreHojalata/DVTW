import Phaser from 'phaser';

export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtScene' });
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
        this.add.rectangle(0, 0, baseWidth, baseHeight, 0x000000, 0.5).setOrigin(0);
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth,newHeight,offsetX,offsetY);
        //DISTRICT NAME
        this.districtNameText = this.spawnNameText(offsetX,offsetY);
        this.districtDescriptionText = this.spawnDescText(newWidth,offsetX,offsetY);
        this.districtScene = this.spawnScene(newWidth,newHeight,offsetX,offsetY);
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
        this.storePositionX = this.spawnBuiltList(newWidth,offsetX,newHeight);
        this.storeButton = this.spawnStoreButton(newHeight,this.storePositionX);
        this.spawnAllFooter(newWidth,offsetX,newHeight,offsetY);
    }
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
    spawnScene(newWidth,newHeight,offsetX,offsetY){
        const list = this.district.getSceneList();
        const randomIndex = Math.floor(Math.random() * list.length);
        this.districtScene = this.add.image(newWidth-newWidth/2-offsetX*4-35,newHeight-newHeight/2-offsetY,list[randomIndex]);
        return this.districtScene;
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
    spawnStoreButton(newHeight,positionX){ //NEED TO BE FINISH
        this.storeButton = this.add.image(positionX,newHeight - newHeight/2,'storeIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.storeButton.on('pointerover', () => {this.storeButton.setScale(1.1);});
        this.storeButton.on('pointerout', () => {this.storeButton.setScale(1);});
        this.storeButton.on('pointerup', () => {
            this.scene.pause('districtScene');
            this.scene.launch('districtStoreScene', { district: this.district });
            //this.scene.bringToTop('districtStoreScene');
        });
        return this.storeButton;
    }
    spawnCloseButton(newWidth,offsetX,offsetY){
        this.closeButton = this.add.image(offsetX + newWidth - 40,offsetY + 120,'closeIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.closeButton.on('pointerover', () => {this.closeButton.setScale(1.1);});
        this.closeButton.on('pointerout', () => {this.closeButton.setScale(1);});
        this.closeButton.on('pointerup', () => {
            this.scene.stop();
            this.scene.resume('gameScene');
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
    createButton(x, y, text, colorNormal, colorHover, colorPress, callback) {
        const container = this.add.container(x, y);
        const background = this.add.rectangle(0, 0, 100, 50, colorNormal).setStrokeStyle(2, 0xffffff);
        const textoBoton = this.add.text(0, 0, text, {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);
        container.add([background, textoBoton]);
        container.setSize(100, 50);
        container.setInteractive({ useHandCursor: true });
        container.on('pointerover', () => {
            container.setScale(1.1);
            background.fillColor = colorHover;
        });
        container.on('pointerout', () => {
            container.setScale(1);
            background.fillColor = colorNormal;
        });
        
        container.on('pointerdown', () => {
            container.setScale(0.95);
            background.fillColor = colorPress;
        });
        
        container.on('pointerup', () => {
            container.setScale(1);
            background.fillColor = colorNormal;
            if (callback) callback();
        });
        return container;
    }
    spawnTaxesButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7, 
            newHeight - offsetY*15, 
            'Aumentar', 
            0xff0000,  // color normal
            0xcc0000,  // color hover
            0x990000,  // color press
            () => {this.district.addTaxesPercentage(5);this.updatePercentageText();}
        );
        
        this.botonReducir = this.createButton(
            newWidth - offsetX*6, 
            newHeight - offsetY*15, 
            'Reducir', 
            0x00ff00,  // color normal
            0x00cc00,  // color hover
            0x009900,  // color press
            () =>  {this.district.addTaxesPercentage(-5);this.updatePercentageText();}
        );
    }
    spawnSecurityButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2, 
            newHeight - offsetY*15, 
            'Aumentar', 
            0xff0000,  // color normal
            0xcc0000,  // color hover
            0x990000,  // color press
            () =>  {this.district.addSecurityPercentage(5);this.updatePercentageText();}
        );
        
        this.botonReducir = this.createButton(
            newWidth-offsetX, 
            newHeight - offsetY*15, 
            'Reducir', 
            0x00ff00,  // color normal
            0x00cc00,  // color hover
            0x009900,  // color press
            () =>  {this.district.addSecurityPercentage(-5);this.updatePercentageText()}
        );
    }
    spawnWorkScheduleButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth - offsetX*7, 
            newHeight - offsetY*8, 
            'Aumentar', 
            0xff0000,  // color normal
            0xcc0000,  // color hover
            0x990000,  // color press
            () =>  {this.district.addWorkSchedulePercentage(5);this.updatePercentageText()}
        );
        
        this.botonReducir = this.createButton(
            newWidth - offsetX*6, 
            newHeight - offsetY*8, 
            'Reducir', 
            0x00ff00,  // color normal
            0x00cc00,  // color hover
            0x009900,  // color press
            () =>  {this.district.addWorkSchedulePercentage(-5);this.updatePercentageText()}
        );
    }
    spawnCleaningButton(newWidth,offsetX,newHeight,offsetY){
        this.botonAumentar = this.createButton(
            newWidth-offsetX*2, 
            newHeight - offsetY*8, 
            'Aumentar', 
            0xff0000,  // color normal
            0xcc0000,  // color hover
            0x990000,  // color press
            () =>  {this.district.addCleaningPercentage(5);this.updatePercentageText()}
        );
        
        this.botonReducir = this.createButton(
            newWidth-offsetX, 
            newHeight - offsetY*8, 
            'Reducir', 
            0x00ff00,  // color normal
            0x00cc00,  // color hover
            0x009900,  // color press
            () =>  {this.district.addCleaningPercentage(-5);this.updatePercentageText()}
        );
    }
    updatePercentageText(){
        this.taxesText.setText(this.district.getTaxesPercentage());
        this.securityText.setText(this.district.getSecurityPercentage());
        this.workScheduleText.setText(this.district.getWorkSchedulePercentage());
        this.cleaningText.setText(this.district.getCleaningPercentage());
    }
}