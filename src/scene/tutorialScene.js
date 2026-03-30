import Phaser from 'phaser';
import gameManager from '../gameManager.js';
import topUI from '../UI/topUI.js';
import footerUI from '../UI/footerUI.js';
import batteryUI from '../UI/batteryUI.js';
import endDayBtnUI from '../UI/endDayBtnUI.js';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' });
    }

    init(data) {
        this.fromScene = data && data.from ? data.from : null;
        if (!this.registry.has('gameManager')) {
            const GM = new gameManager(this);
            this.registry.set('gameManager', GM)
        }
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.day = this.gameManager.getDay();
        this.map = this.gameManager.getMap();
        if (!this.registry.has('flagShow')) this.registry.set('flagShow', true);
    }

    create() {
        console.log("TUTORIAL");
        const { width, height } = this.sys.game.config;
        this.blocker = this.add.zone(0, 0, width, height).setOrigin(0).setInteractive().setDepth(20);
        this.gameManager.spawnAssets(this);
        this.configButton = this.gameManager.spawnConfigurationButton(this);
        this.topUI = new topUI(this);
        this.batteryUI = new batteryUI(this);
        this.endDayBtnUI = new endDayBtnUI(this);
        this.footerUI = new footerUI(this);
        this.explainTutorial();
    }
    explainTutorial() {
        const { width, height } = this.sys.game.config;
        const introContainer = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(width / 2, height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(width/4 - 120, height/3 - 140, width/2, height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(width/2 - 150,30, 'tutorialAnimals').setOrigin(0).setScale(1).setDepth(20);
        const introText1 = this.add.text(width / 2 - 120, height / 2 - 200, 'Bienvenido a Quackington DC', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const introText2 = this.add.text(width / 2-120, height / 2 - 50, 'Tú eres Donald, el alcalde de esta ciudad.\nTu objetivo es mantener el poder mediante decisiones\npolíticas, económicas y a veces controvertidas.\n\nGestiona recursos, responde a eventos y toma elecciones\nque afectan tu popularidad, dinero y corrupción.\n\n¡Buena suerte!',
        {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);
        const continueBtn = this.add.text(width*2/3 - 60, height/2 + 100, 'Continuar ->', { 
            fontSize: '24px', 
            fontFamily: 'Times New Roman', 
            color: '#000000' 
        }).setOrigin(0.5).setInteractive().setDepth(21);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: introContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    introContainer.destroy();
                    this.explainEnergy();
                }
            });
        });
        introContainer.add([bg, img, introText1, introText2, continueBtn]);
    }  
    explainEnergy() {
        const container = this.add.container(900, 300).setDepth(21);
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 50, 'La barra de energía indica el tiempo que tienes para realizar acciones cada día.\nSe recarga al inicio de cada día.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
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
                    this.explainEndDayButton();
                }
            });
        });
        container.add([bg, text, continueBtn]);
    }
    explainEndDayButton() {
        const container = this.add.container(900, 480).setDepth(21);
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, 'El botón de terminar día te permite finalizar el día actual y avanzar al siguiente.\nTen cuidado, si lo presionas antes de agotar tu energía, podrías perder oportunidades importantes.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
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
                    this.explainEnergy();
                }
            });
        });
        const continueBtn = this.add.text(220, 170, 'Continuar', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainBlackMarket();
                }
            });
        });
        container.add([bg, text, goBackBtn, continueBtn]);
    }
    explainBlackMarket(){
        const container = this.add.container(1000, 600).setDepth(21);
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, 'El mercado negro es un lugar donde puedes comprar objetos especiales que te ayudarán en tu gestión de la ciudad.\nPuedes acceder a él haciendo click en el botón correspondiente en la parte inferior de la pantalla.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
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
                    this.explainEndDayButton();
                }
            });
        });
        const continueBtn = this.add.text(220, 170, 'Continuar', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainMissions();
                }
            });
        });
        container.add([bg, text, goBackBtn, continueBtn]);
    }
    explainMissions(){
        const container = this.add.container(650, 350).setDepth(21);
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 80, 'Las misiones son objetivos que puedes completar para ganar recompensas y avanzar en el juego.\nPuedes acceder a ellas haciendo click en el botón correspondiente que saldra en el mapa.\nLos rojos son las misiones corruptas y los amarillos son las misiones legítimas.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
        }).setOrigin(0.5);
        const missionIcon = this.add.image(150, -120, 'missionIcon').setDepth(22);
        const missionCorruptIcon = this.add.image(300, 300, 'missionCorruptIcon').setDepth(22);
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
                    this.explainBlackMarket();
                }
            });
        });
        const continueBtn = this.add.text(220, 170, 'Continuar', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainDistricts();
                }
            });
        });
        container.add([bg, text, missionIcon, missionCorruptIcon, goBackBtn, continueBtn]);
    }
    explainDistricts() {
        const container = this.add.container(650, 350).setDepth(21);
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0);
        const text = this.add.text(150, 70, 'La ciudad está dividida en distritos, cada uno con sus propias características y necesidades.\nPuedes hacer click en ellos para obtener información detallada y tomar decisiones informadas.', {
            fontSize: '16px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
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
                    this.explainMissions();
                }
            });
        });
        const continueBtn = this.add.text(220, 170, 'Continuar', { fontSize: '16px', fontFamily: 'Times New Roman', color: '#ffffff' }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.scene.launch('districtScene', { district: this.map.getDistrictByName("EL_NIDO"), tutorial: true});
                }
            });
        });
        container.add([bg, text, goBackBtn, continueBtn]);
    }
}