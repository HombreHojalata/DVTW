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
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.map = this.gameManager.getMap();
        //DISTRICT INFO
        this.district = this.map.getDistrictByName(this.mission.getDistrict());
        this.districtInfo = this.spawnDetailText(newWidth,newHeight,offsetX,offsetY);
        this.footerUI = new footerUI(this, this.player).create();
        //TEMPLATE
        this.template = this.spawnTemplate(newWidth,newHeight,offsetX,offsetY);
        //MISSION INFO
        this.missionNameText = this.spawnNameText(offsetX,offsetY);
        this.missionDescriptionText = this.spawnDescText(newWidth,newHeight,offsetX,offsetY);
        this.missionScene = this.spawnScene(newWidth,newHeight,offsetX,offsetY);
        //OPTIONS
        this.options = this.spawnButtons();
        //BUTTONS
        this.closeButton = this.spawnCloseButton(newWidth,offsetX,offsetY);
    }

    spawnTemplate(newWidth,newHeight,offsetX,offsetY){
        this.template = this.mission.itIsCorrupt()? 'missionCorruptTemplate' : 'missionTemplate';
        return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY, this.template).setDisplaySize(newWidth, newHeight);
    }
    spawnNameText(offsetX,offsetY){                         //NEED TO CHANGE
        const text = this.mission.getName() + '!';
        const spacing = 10;
        let x = 0;
        const container = this.add.container(0, offsetY + 80);

        for (let char of text) {
            const letter = this.add.text(x, 0, char, {
                fontSize: '60px',
                fontFamily: 'Impact',
                fontStyle: 'bold',
                color: '#ffffff'
            });
            container.add(letter);
            x += letter.width + spacing;
        }
        // centrar
        container.x = offsetX*4;
        container.setAngle(-3);
        return container;
    }
    spawnDescText(newWidth,newHeight,offsetX,offsetY){
        const descText = this.add.text(newWidth/4 - offsetX - 20 ,newHeight/4 + offsetY*2, this.mission.getDescription(), {
            fontSize: '18px',
            fontFamily: 'Arial Black',
            fontStyle: 'italic',
            color: '#000000',
            wordWrap: { width: newWidth - newWidth/2 },                                                 //LIMIT
            lineSpacing: 10                                                                             //SPACE BETWEEN LINES
        }); 
        return descText;
    }  
    spawnDetailText(newWidth,newHeight,offsetX,offsetY){
        const populationInfo = this.add.text(newWidth / 2 + offsetX*4 - 20, newHeight - offsetY*10,'Poblacion - ' + this.district.getPopulation(),{
            fontSize: '14px',
            fontFamily: 'Arial Black',
            fontStyle: 'italic',
            color: '#000000',
        }).setDepth(1000);
        const satisfactionInfo = this.add.text(newWidth / 2 + offsetX*6, newHeight - offsetY*10, 'Satisfaccion - ' + this.district.getSatisfaction(),{
            fontSize: '14px',
            fontFamily: 'Arial Black',
            fontStyle: 'italic',
            color: '#000000',
        }).setDepth(1000);
        return {populationInfo,satisfactionInfo};
    }
    spawnScene(newWidth,newHeight,offsetX,offsetY){
        //could take it from a list in the district of the mission
        //this.district = this.mission.getDistrict(); and this.scene = this.district.getSceneFromMission();
        //better getScene from mission

        //this.missionScene = this.add.image(newWidth-newWidth/2-offsetX*4-35,newHeight-newHeight/2-offsetY,this.mission.getScene());
        this.missionScene = this.add.image(newWidth-offsetX*3,newHeight-newHeight/2,'districtBorrascalScene1');
        return this.districtScene;
    }
    spawnCloseButton(newWidth,offsetX,offsetY){
        this.closeButton = this.add.image(newWidth - offsetX ,offsetY + 60,'closeIcon').setOrigin(0.5).setInteractive({ useHandCursor: true }); 
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
            this.scene.resume('gameScene');
        });
        return this.closeButton;
    }
    createOptionButton(x, y, option, minigameScene) {
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
            if(this.mission.isMinigame()) this.scene.launch(minigameScene);
            this.gameManager.removeMission(this, this.mission, option, this.district);
            this.scene.stop();
            this.scene.resume('gameScene');
        });
        return { bg, texts: textObjects };
    }
    spawnButtons(){
        if(this.mission.isMinigame()){
            if(this.mission.getName() == "Cuackdle") this.createOptionButton(550,500,this.mission.getOptions()[0],'wordleMiniGame');
        }
        else{
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
            const y = 500;
            this.createOptionButton(x,y,option,null);
        });
    }
    missionWithOneOption(optionList){
        const x = 550;
        const y = 500;
        this.createOptionButton(x,y,optionList[0],null);
    }
}