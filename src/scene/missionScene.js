import Phaser from 'phaser';
import footerUI from '../UI/footerUI.js';

export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'missionScene' });
    }

    init(data) {
        this.mission = data.mission;
        this.tutorial = this.registry.get('isTutorial');
    }
       
    create() {
        console.log("MISSION");
        
        const audioManager = this.registry.get('audioManager');
        const sound = this.mission.itIsCorrupt() ? 'corruptMission' : 'mission';
        if (audioManager) audioManager.play(sound);
        
        const { width: baseWidth, height: baseHeight } = this.scale;
        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;
        const offsetX = (baseWidth - newWidth) / 2; 
        const offsetY = (baseHeight - newHeight) / 2 - 50;

        // BACKGROUND
        this.bgOverlay = this.add.rectangle(0, 0, baseWidth, baseHeight, 0x000000, 1).setOrigin(0).setAlpha(0);
        this.tweens.add({
            targets: this.bgOverlay,
            alpha: 0.6,
            duration: 150
        });

        // MAIN CONTAINER
        this.mainContainer = this.add.container(0, baseHeight);

        // PLAYER AND MAP INFO
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.district = this.gameManager.getMap().getDistrictByName(this.mission.getDistrict());

        // SPAWN ELEMENTS
        const template = this.spawnTemplate(newWidth, newHeight, offsetX, offsetY);
        const nameText = this.spawnNameText(offsetX, offsetY);
        const descText = this.spawnDescText(newWidth, newHeight, offsetX, offsetY);
        const sceneImg = this.spawnScene(newWidth, newHeight, offsetX, offsetY);
        const detailTexts = this.spawnDetailText(newWidth, newHeight, offsetX, offsetY);
        const closeBtn = this.spawnCloseButton(newWidth, offsetX, offsetY);

        this.mainContainer.add([template, nameText, descText, sceneImg, detailTexts.populationInfo, detailTexts.satisfactionInfo]);
        if (closeBtn) this.mainContainer.add(closeBtn);

        this.spawnButtons();

        // ANIMATION
        this.tweens.add({
            targets: this.mainContainer,
            y: 0,
            scaleY: { from: 0.2, to: 1 },
            duration: 600,
            ease: 'Back.easeOut'
        });

        this.footerUI = new footerUI(this, this.tutorial);
    }

    spawnTemplate(newWidth, newHeight, offsetX, offsetY) {
        const key = this.mission.itIsCorrupt() ? 'missionCorruptTemplate' : 'missionTemplate';
        return this.add.image(newWidth / 2 + offsetX, newHeight / 2 + offsetY + 20, key).setDisplaySize(newWidth, newHeight);
    }

    spawnNameText(offsetX, offsetY) {
        const text = '¡' + this.mission.getName() + '!';
        const spacing = 8;
        let xOffset = 0;
        const nameContainer = this.add.container(offsetX * 4, offsetY + 90);

        for (let char of text) {
            const letter = this.add.text(xOffset - 100, 0, char, {
                fontSize: '60px',
                fontFamily: 'Impact',
                fontStyle: 'bold',
                color: '#ffffff'
            });
            nameContainer.add(letter);
            xOffset += letter.width + spacing;
        }
        nameContainer.setAngle(-2.8);
        return nameContainer;
    }

    spawnDescText(newWidth, newHeight, offsetX, offsetY) {
        return this.add.text(newWidth / 4 - offsetX - 20, newHeight / 4 + offsetY * 2 + 20, this.mission.getDescription(), {
            fontSize: '18px',
            fontFamily: 'Arial Black',
            fontStyle: 'italic',
            color: '#000000',
            wordWrap: {width: newWidth - newWidth / 2},                                                 //LIMIT
            lineSpacing: 10                                                                             //SPACE BETWEEN LINES
        });
    }

    spawnDetailText(newWidth, newHeight, offsetX, offsetY) {
        const toTitleCase = (str) => {
            return str.toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        };

        const formattedName = toTitleCase(this.district.getName());

        const startX = newWidth - offsetX * 5 - 10;
        const startY = newHeight - offsetY * 11;
        const spacingY = 26;

        const populationInfo = this.add.text(startX, startY, 'Distrito: ' + formattedName, {
            fontSize: '24px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#000000',
        });
        const satisfactionInfo = this.add.text(startX, startY + spacingY, 'Satisfaccion: ' + this.district.getSatisfaction() + '%', {
            fontSize: '24px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#000000',
        });
        return { populationInfo, satisfactionInfo };
    }

    spawnScene(newWidth, newHeight, offsetX, offsetY) {
        return this.add.image(newWidth - offsetX * 3, newHeight - newHeight / 2 + 20, this.mission.getScene()).setDisplaySize(350, 350);
    }

    spawnCloseButton(newWidth, offsetX, offsetY) {
        if (this.mission.itIsEvent()) return null;
        const btn = this.add.image(newWidth - offsetX + 25, offsetY + 77, 'closeIcon').setOrigin(0.5).setInteractive({ useHandCursor: true });
        btn.on('pointerover', () => {
            this.tweens.add({
                targets: btn,
                scale: 1.1,
                duration: 80
            });
        });
        btn.on('pointerout', () => {
            this.tweens.add({
                targets: btn,
                scale: 1,
                duration: 80
            });
        });
        btn.on('pointerup', () => {
            const audioManager = this.registry.get('audioManager');
            if (audioManager) audioManager.play('exitMission');
            this.tweens.add({
                targets: this.mainContainer,
                y: this.scale.height,
                scaleY: 0.5,
                duration: 150,
                onComplete: () => {
                    this.scene.stop();
                    this.scene.resume('gameScene');
                }
            });
        });
        return btn;
    }

    createOptionButton(x, y, option, minigameScene) {
        const buttonWidth = 300;
        const buttonHeight = 180;
        const padding = 20;

        const getColor = (value) => value >= 0 ? '#00ff00' : '#ff0000';

        const container = this.add.container(x, y);
        const bg = this.add.graphics();
        bg.fillStyle(0x007BFF, 1);
        bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);

        const lines = [
            { text: option.description, color: '#ffffff', size: '18px' },
            { text: `Energía: ${option.energy}`, color: option.energy >= 0 ? '#00ff00' : '#ff0000' }
        ];
        if(option.probability < 100)
            lines.push({ text: `Probabilidad: ${option.probability}`, color: getColor(option.probability) });
        if(option.money != 0)
            lines.push({ text: `Dinero: ${option.money}`, color: getColor(option.money) });
        if(option.corruption != 0)
            lines.push({ text: `Corrupción: ${option.corruption}`, color: getColor(option.corruption) });
        if(option.popularity != 0)
            lines.push({ text: `Satisfacción: ${option.popularity}%`, color: getColor(option.popularity) });

        let currentY = -buttonHeight / 2 + padding;
        const textObjects = lines.map(line => {
            const txt = this.add.text(0, currentY, line.text, {
                fontSize: line.size || '15px', color: line.color, align: 'center',
                wordWrap: { width: buttonWidth - padding * 2 }
            }).setOrigin(0.5, 0);
            currentY += txt.height + 6;
            container.add(txt);
            return txt;
        });

        container.addAt(bg, 0);
        const hitArea = new Phaser.Geom.Rectangle(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight);
        container.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains, { useHandCursor: true });

        container.on('pointerover', () => {
            bg.clear(); bg.fillStyle(0x0056b3, 1);
            bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);
        });
        container.on('pointerout', () => {
            bg.clear(); bg.fillStyle(0x007bff, 1);
            bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);
        });

        container.on('pointerup', () => {
            const audioManager = this.registry.get('audioManager');
            if (audioManager) audioManager.play('exitMission');
            this.gameManager.removeMission(this, this.mission, option, this.district);
            this.tweens.add({
                targets: this.mainContainer,
                y: this.scale.height,
                scaleY: 0.5,
                duration: 150,
                onComplete: () => {
                    this.scene.stop();
                    if (this.mission.isMinigame()) this.scene.start(minigameScene);
                    else this.scene.resume('gameScene');
                }
            });
        });

        this.mainContainer.add(container);
    }

    spawnButtons() {
        const options = this.mission.getOptions();
        if (this.mission.isMinigame()) {
            const scenes = { "Cuackdle": 'wordleMiniGame', "Memory": 'memoryMiniGame', "Plinko": 'plinkoMiniGame', "whacAMole": 'whacAMole', "Sopa de letras": 'wordSearchMiniGame', "MonkeyType": 'monkeyTypeGame' };
            this.createOptionButton(550, 500, options[0], scenes[this.mission.getName()]);
        } else {
            if (this.mission.getNumOptions() === 2) {
                options.forEach((opt, i) => this.createOptionButton(400 + (i * 350), 500, opt, null));
            } else {
                this.createOptionButton(550, 500, options[0], null);
            }
        }
    }
}