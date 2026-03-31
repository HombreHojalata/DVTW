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
        this.sceneOrder = data.order || 1;
    }

    create() {
        console.log("TUTORIAL");
        // ATRIBUTES
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        const footerHeight = 81;
        const footerWidth = 1500;
        const footerX = (this.width - footerWidth) / 2;
        const footerY = this.height - footerHeight;
        // BLOCKER AND FOOTER BLOCKER
        this.blocker = this.add.zone(0, 0, this.width, this.height - footerHeight).setOrigin(0).setInteractive().setDepth(20);
        this.footerBlocker = this.add.zone(footerX, footerY, footerWidth, footerHeight).setOrigin(0).setInteractive().setDepth(20);
        // SPAWN MAP AND UI
        this.gameManager.spawnAssets(this);
        this.configButton = this.gameManager.spawnConfigurationButton(this);
        this.topUI = new topUI(this);
        this.batteryUI = new batteryUI(this);
        this.endDayBtnUI = new endDayBtnUI(this);
        this.footerUI = new footerUI(this, true);
        // TUTORIAL ORDER
        if(this.sceneOrder === 1) this.explainTutorial();
        else if(this.sceneOrder === 2) this.startGameText();
        else if(this.sceneOrder === 3) this.explainBlackMarket();
    }
    // ORDEN 1
    explainTutorial() {
        const introContainer = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(width / 2, height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width/2 - 200,30, 'tutorialAnimals').setOrigin(0).setScale(1).setDepth(20);
        const introText1 = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Bienvenido a Quackington DC!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const introText2 = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Tú eres Donald, el alcalde de esta ciudad.\nTu objetivo es mantener el poder durante los próximos 5 días mediante decisiones políticas, económicas y a veces controvertidas.\n\nGestiona recursos, responde a eventos y toma elecciones\nque afectan tu popularidad, dinero y corrupción.\n\n¡Buena suerte!',
        {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        const continueBtn = this.add.text(this.width*2/3 - 60, this.height/2 + 100, 'Continuar ->', { 
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
                    this.explainEnergyAndEndDayButton();
                }
            });
        });
        introContainer.add([bg, img, introText1, introText2, continueBtn]);
    }  
    explainEnergyAndEndDayButton() {
        const container = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(this.width / 2, this.height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width/2 - 200,30, 'tutorialAnimals').setOrigin(0).setScale(1).setDepth(20);
        const text = this.add.text(this.width / 2-120, this.height / 2 - 50, 'La barra que hay a la derecha es la barra de energía.\n Esta indicará el tiempo restante que tienes para realizar acciones cada día y se recargará tras el inicio del día siguiente.\n El botón de terminar día te permite finalizar el día actual y avanzar al siguiente, este se ubica justo debajo de la barra de energía.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        const continueBtn = this.add.text(this.width*2/3 - 60, this.height/2 + 100, 'Continuar', {
            fontSize: '20px',
            fontFamily: 'Times New Roman', 
            color: '#000000' 
        }).setOrigin(0.5).setInteractive().setDepth(22);
        continueBtn.on('pointerup', () => {
            continueBtn.setScale(1.1);
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.explainIntroBlackMarket();
                }
            });
        });
        container.add([bg, img, text, continueBtn]);
    }
    explainIntroBlackMarket(){
        const container = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(this.width / 2, this.height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width - 500, 30, 'vendedorSilueta').setOrigin(0).setScale(1).setDepth(20);
        const blackMarketText = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Un placer hablar con usted señor presidente. Soy Xxxxxxxx Xxxxx, ya me conocerás cuando pases a visitarme al mercado negro.\n\n Que no sabes como ir? Abajo a la derecha tienes un boton para acceder a ella, cuando pases por ahi ya te explicaré como funciona mi mercado.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);

        const goBackBtn = this.add.text(this.width/4-40, this.height/2 + 100, 'Volver', { 
            fontSize: '16px', 
            fontFamily: 'Times New Roman', 
            color: '#000000' 
        }).setOrigin(0.5).setInteractive().setDepth(22);
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
        const continueBtn = this.add.text(this.width*2/3 - 60, this.height/2 + 100, 'Continuar', { 
            fontSize: '16px', 
            fontFamily: 'Times New Roman', 
            color: '#000000' 
        }).setOrigin(0.5).setInteractive().setDepth(22);
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
        container.add([bg, img, blackMarketText, goBackBtn, continueBtn]);
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
                    this.explainIntroBlackMarket();
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
    // ORDER 2
    startGameText() {
        const introContainer = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(width / 2, height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width/2 - 150,30, 'tutorialAnimals').setOrigin(0).setScale(1).setDepth(20);
        const introText1 = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Felicidades has completado el tutorial!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        const introText2 = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Señor presidente, estás preparado para gestionar la ciudad y hacer que todos rindan ante ti?',{
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        //MAYBE EN TODO EL MEDIO O SINO UN LA FLECHA
        const prepareBtn = this.add.text(this.width*2/3 - 60, this.height/2 + 100, '¡Estoy preparado!', { 
            fontSize: '24px', 
            fontFamily: 'Times New Roman', 
            color: '#000000' 
        }).setOrigin(0.5).setInteractive().setDepth(21);
        prepareBtn.on('pointerup', () => {
            prepareBtn.setScale(1.1);
            this.tweens.add({
                targets: introContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    introContainer.destroy();
                    this.scene.start('gameScene', { tutorial: true });
                }
            });
        });
        introContainer.add([bg, img, introText1, introText2, prepareBtn]);      
    }
    // ORDER 3
    explainBlackMarket(){
        this.footerBlocker.destroy();
        this.blackMarketContainer = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(this.width / 2, this.height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width - 500, 30, 'vendedor').setOrigin(0).setScale(1).setDepth(20);
        const blackMarketText1 = this.add.text(this.width / 2 - 120, this.height / 2 - 200,'¡Bienvenido al Mercado Negro!',{
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const blackMarketText2 = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Cuanto tiempo sin verte señor presidente. Mi nombre es Robinson Piqui y soy el jefe del mercado negro. En el mercado negro puedes comprar muchas cosas que fuera no existen que te ayudarán en tu gestión de tu ciudad.\n\nPuedes acceder a él haciendo click en el botón correspondiente en la parte inferior de la pantalla.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        this.blackMarketContainer.add([bg, img, blackMarketText1, blackMarketText2]);
    }
    destroyBlackMarketContainer() {
        if (this.blackMarketContainer) {
            this.blackMarketContainer.destroy();
            this.blackMarketContainer = null;
        }
    }
}