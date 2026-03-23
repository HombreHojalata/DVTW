import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'missionScene' });
    }

    init(data) {
        this.mission = data.mission;
    }
       
    create() {
        console.log("MISSION");
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
        //MISSION INFO
        this.missionNameText = this.spawnNameText(offsetX,offsetY);
        this.missionDescriptionText = this.spawnDescText(newWidth,offsetX,offsetY);
        this.missionScene = this.spawnScene(newWidth,newHeight,offsetX,offsetY);
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
    }

    spawnTemplate(newWidth,newHeight,offsetX,offsetY){return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, 'missionTemplate').setDisplaySize(newWidth, newHeight);}
    spawnNameText(offsetX,offsetY){
        const leftCorner = offsetX*3 - 40;
        const rightCorner = offsetX*6;
        const nameText = this.add.text(0, offsetY + 80, this.mission.getName(), {
        //const nameText = this.add.text(0, offsetY + 80, 'MISSION X', {
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
        const descText = this.add.text(offsetX*8 + 20, offsetY + 150, this.mission.getDescription(), {
        //const descText = this.add.text(offsetX*8 + 20, offsetY + 150, 'TEST DE LA MEJOR MISSION QUE EXISTE', {
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
        //could take it from a list in the district of the mission
        //this.district = this.mission.getDistrict(); and this.scene = this.district.getSceneFromMission();
        //better getScene from mission

        //this.missionScene = this.add.image(newWidth-newWidth/2-offsetX*4-35,newHeight-newHeight/2-offsetY,this.mission.getScene());
        this.missionScene = this.add.image(newWidth-newWidth/2-offsetX*4-35,newHeight-newHeight/2-offsetY,'districtBorrascalScene1');
        return this.districtScene;
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
    spawnButtons(){
        //this.isEvent = this.mission.itIsEvent();
        //this.isCorrupt = this.mission.itIsCorrupt();
        this.isMinigame = this.mission.itIsMinigame();
        if(this.isMinigame){

        }else{
            this.numberOfOptions = this.mission.getNumOptions();
            this.optionsList = this.mission.getOptions();
        }
    }
}