import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'missionScene' });
    }

    init(data) {
        this.mission = data.mission;
        this.player = data.player;
        this.map = data.map;
        this.gameManager = data.gameManager;
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
        //this.player = this.registry.get('gameManager').getPlayer();
        //this.map = this.registry.get('gameManager').getMap();
        //this.footerUI = new footerUI(this, this.player).create();
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth,newHeight,offsetX,offsetY);
        //MISSION INFO
        this.missionNameText = this.spawnNameText(offsetX,offsetY);
        this.missionDescriptionText = this.spawnDescText(newWidth,offsetX,offsetY);
        this.missionScene = this.spawnScene(newWidth,newHeight,offsetX,offsetY);
        //OPTIONS
        this.options = this.spawnButtons();
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
    }

    //spawnTemplate(newWidth,newHeight,offsetX,offsetY){return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, 'missionTemplate').setDisplaySize(newWidth, newHeight);}
    spawnTemplate(newWidth, newHeight, offsetX, offsetY) {
        const x = newWidth / 2 + offsetX;
        const y = newHeight / 2 + offsetY;

        const rect = this.add.graphics();

        rect.fillStyle(0xffffff, 1); // blanco
        rect.fillRect(
            x - newWidth / 2,
            y - newHeight / 2,
            newWidth,
            newHeight
        );

        return rect;
    }
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
    createOptionButton(x, y, option) {
        const buttonWidth = 300;   // ancho fijo del botón
        const buttonHeight = 180;  // alto fijo del botón
        const padding = 20;
        const lineSpacing = 6;
        const getColor = (value) => value >= 0 ? '#00ff00' : '#ff0000';
        const lines = [
            { text: option.description, color: '#ffffff', size: '18px', style: 'bold'},
            { text: `Probabilidad: ${option.probability}`, color: getColor(option.probability) },
            { text: `Energía: ${option.energy}`, color: getColor(option.energy) },
            { text: `Coste: ${option.money}`, color: getColor(-option.money) },                         //JUSTO LA INVERSA SI DA DINERO VERDE, SI CUESTA ROJO
            { text: `Corrupción: ${option.corruption}`, color: getColor(option.corruption) },
            { text: `Población: ${option.popularity}`, color: getColor(option.popularity) }
        ];
        const bg = this.add.graphics();
        bg.fillStyle(0x007BFF, 1);
        bg.fillRoundedRect(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight, 20);
        const startY = y - buttonHeight / 2 + padding;
        let currentY = startY;
        const textObjects = lines.map(line => {
            const txt = this.add.text(x, currentY, line.text, {
                fontSize: line.size || '15px',
                color: line.color,
                align: 'center',
                wordWrap: { width: buttonWidth - padding * 2 }
            }).setOrigin(0.5, 0);

            currentY += txt.height + lineSpacing;
            return txt;
        });
        const hitArea = new Phaser.Geom.Rectangle(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight);
        bg.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains, { useHandCursor: true }).setDepth(0);
        textObjects.forEach(t => t.setDepth(1));
        this.district = this.map.getDistrictByName(this.mission.getDistrict());
        bg.on('pointerover', () => {
            bg.clear();
            bg.fillStyle(0x0056b3, 1);
            bg.fillRoundedRect(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight, 20);
            textObjects.forEach(t => t.setScale(1.05));
        });
        bg.on('pointerout', () => {
            bg.clear();
            bg.fillStyle(0x007BFF, 1);
            bg.fillRoundedRect(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight, 20);
            textObjects.forEach(t => t.setScale(1));
        });
        bg.on('pointerdown', () => textObjects.forEach(t => t.setScale(1)));
        bg.on('pointerup', () =>{
            textObjects.forEach(t => t.setScale(1.1));
            this.gameManager.removeMission(this.mission, option, this.district);
            this.scene.stop();
            this.scene.resume('gameScene');
            
        });
        return { bg, texts: textObjects };
    }
    spawnButtons(){
        //this.isEvent = this.mission.itIsEvent();
        //this.isCorrupt = this.mission.itIsCorrupt();
        this.isMinigame = this.mission.itIsMinigame();
        if(this.isMinigame){

        }else{
            this.numberOfOptions = this.mission.getNumOptions();
            this.optionsList = this.mission.getOptions();
            switch(this.numberOfOptions){
                case 2: this.missionWithTwoOptions(this.optionsList); break;
                case 1: this.missionWithOneOption(this.optionsList); break;
            }
        }
    }
    missionWithTwoOptions(optionsList){
        optionsList.forEach((option, index) => {
            const x = 400 + (index * 350);
            const y = 550;
            this.createOptionButton(x,y,option);
        });
    }
    missionWithOneOption(optionList){
        const x = 750;
        const y = 550;
        this.createOptionButton(x,y,optionList[0]);
    }
}