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
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.day = this.gameManager.getDay();
        this.map = this.gameManager.getMap();;
    }

    create() {
        console.log("TUTORIAL");
        
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        
        const section = this.scene.settings.data.section || 'INTRO';

        this.audioManager = this.registry.get('audioManager');
        this.flamingoSounds = ['flam1', 'flam2', 'flam3', 'flam4', 'flam5', 'flam6', 'flam7'];

        this.blocker = this.add.zone(0, 0, this.width, this.height).setOrigin(0).setInteractive().setDepth(100);

        switch(section) {
            case 'INTRO':
                this.tutorialIntro();
                break;
            case 'DISTRICT':
                this.tutorialDistricts(); 
                break;
            case 'MISSIONS':
                this.tutorialMissions();
                break;
            case 'CORRUPT':
                this.tutorialCorrupt();
                break;
            case 'BLACK_MARKET':
                this.tutorialBlackMarket();
                break;
            case 'PARAMETERS':
                this.tutorialCorrupt();
                break;
            case 'DAY_TWO':
                this.tutorialDayTwo();
                break;
            case 'DAY_THREE':
                this.tutorialDayThree();
                break;
            case 'FINAL_DAY':
                this.tutorialFinalDay();
                break;
        }
    }

    createTutorialButton(container, x, y, text, callback) {
        const width = 240;
        const height = 50;

        const shadow = this.add.rectangle(x + 4, y + 5, width, height, 0x000000, 0.18).setOrigin(0.5);
        const bg = this.add.rectangle(x, y, width, height, 0xf7f2ea, 0.9).setOrigin(0.5).setStrokeStyle(3, 0x263b63).setInteractive({ useHandCursor: true });
        const label = this.add.text(x, y, text, {
            fontSize: '22px',
            fontFamily: 'Georgia',
            color: '#26304a',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        bg.on('pointerover', () => {
            bg.setFillStyle(0xfff7df, 1);
            bg.setStrokeStyle(3, 0xb68a2f);
            label.setColor('#1b2340');
            bg.setScale(1.05);
            label.setScale(1.05);
            shadow.setAlpha(0.28);
        });

        bg.on('pointerout', () => {
            bg.setFillStyle(0xf7f2ea, 0.9);
            bg.setStrokeStyle(3, 0x263b63);
            label.setColor('#26304a');
            bg.setScale(1);
            label.setScale(1);
            shadow.setAlpha(0.18);
        });

        bg.on('pointerdown', () => {
            bg.setScale(0.95);
            label.setScale(0.95);
        });

        bg.on('pointerup', () => {
            bg.setScale(1.05);
            label.setScale(1.05);
            callback();
        });

        container.add([shadow, bg, label]);
    }

    addHighlight(container, x, y, width, height) {
        const graphics = this.add.graphics().setDepth(105);
        graphics.lineStyle(8, 0xff0000, 1);
        graphics.strokeRect(x, y, width, height);

        this.tweens.add({
            targets: graphics,
            alpha: 0.4,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        container.add(graphics);
    }


    tutorialIntro() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);

        const introText = this.add.text(this.width / 2 + 100, this.height / 2 - 200, '¡Bienvenido a Quackington DC!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const text = this.add.text(this.width / 2 + 120, this.height / 2 - 50, 'Buenos días, señor presidente.\nSoy su secretaria, la que se única que trabaja de verdad por aquí.\n\nSeré clara: su mandato es un chiste y las elecciones son solo en 5 días.\nSi no consigue suficiente apoyo político, su próxima oficina será una celda con vistas al estanque.\n\nComo veo que lo necesita ayuda, le explicaré como llevar la ciudad.',
        {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);

        container.add([bg, img, introText, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            //this.fadeOutContainer(container, () => this.explainMissions());
            container.destroy();
            this.tutorialIntro2();
        });
    }
    tutorialIntro2() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const icon = this.add.image(this.width / 2 + 100, this.height / 2 - 200, 'missionIcon').setOrigin(0.5, 0.5).setDepth(103).setScale(1.5);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const text = this.add.text(this.width / 2 + 120, this.height / 2 - 70, 'En su mapa aparecerán iconos como este. Son misiones enviadas directamente por los ciudadanos.\n\nSi las completa le recompensarán con recursos y popularidad.\nTenga cuidado; si las ignora, desaparecerán.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        this.tweens.add({
            targets: icon,
            scale: 1.7,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        container.add([bg, icon, img, text]);

        this.createTutorialButton(container, this.width * 0.67, this.height * 0.62, 'Continuar', () => {
            container.destroy();
            this.tutorialIntro3();
        });
        this.createTutorialButton(container, this.width * 0.48, this.height * 0.62, 'Volver', () => {
            container.destroy();
            this.tutorialIntro();
        });
    }
    tutorialIntro3() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);

        this.addHighlight(container, this.width - 251, 150, 240, 545);

        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const text = this.add.text(this.width / 2 + 100, this.height / 2 - 90, 'A su derecha está su Energía diaria. Se reduce con el tiempo y haciendo misiones.\n\nCada cuarto de la barra representa un ciclo.\nAl superar uno de estos los edificos cobran y los gastos pasivos se pagan.\n\nDebajo está el botón de \'Terminar Día\'. Lo puede pulsar cuando se acabe la energía para finalizar el día.\nPuede pulsarlo antes si quiere, pero un pato dormido no es un pato productivo. Usted verá si prefiere dormir o dirigir.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);

        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.67, this.height * 0.62, 'Continuar', () => {
            //this.fadeOutContainer(container, () => this.explainDistricts());
            container.destroy();
            this.tutorialIntro4();
        });
        this.createTutorialButton(container, this.width * 0.48, this.height * 0.62, 'Volver', () => {
            //this.fadeOutContainer(container, () => this.explainMissions());
            container.destroy();
            this.tutorialIntro2();
        });
    }
    tutorialIntro4() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);

        this.addHighlight(container, this.width / 4 - 90, 12, 908, 90);

        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const text = this.add.text(this.width / 2 + 100, this.height / 2 - 90, 'Como sabrá, nuestra ciudad está dividida en distritos, cada uno con sus propias características y necesidades.\nPuede hacer click en cada uno desde el mapa, para obtener información detallada y tomar decisiones informadas.\n\nLa suma de la satifacción de cada distrito determina su opinión pública; la puede consultar en la barra superior de la pantalla.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.67, this.height * 0.62, 'Continuar', () => {
            container.destroy();
            this.tutorialIntro5();
        });
        this.createTutorialButton(container, this.width * 0.48, this.height * 0.62, 'Volver', () => {
            container.destroy();
            this.tutorialIntro3();
        });
    }
    tutorialIntro5() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const icon = this.add.image(this.width / 2 + 100, this.height / 2 - 225, 'missionCorruptIcon').setOrigin(0.5, 0.5).setDepth(103).setScale(1.5);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const text = this.add.text(this.width / 2 + 100, this.height / 2 - 70, 'Una cosa más, señor presidente.\nEs posible que encuentre algunas misiones rojas, llamadas misiones corruptas. Estas proporcionan aliados poderosos y mejores recursos, pero a cambio de aumentar la corrupción del estado.\n\nOficialmente, negamos cualquier tipo de acusación de este estilo, pero realizar demasiados favores corruptos puede complicar las cosas.\nCuanta mayor corrupción, menor será la probabilidad de encubrirla. Tengalo en cuenta.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        this.tweens.add({
            targets: icon,
            scale: 1.7,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        container.add([bg, icon, img, text]);

        this.createTutorialButton(container, this.width * 0.67, this.height * 0.62, 'Continuar', () => {
            container.destroy();
            this.tutorialIntroEnd();
        });
        this.createTutorialButton(container, this.width * 0.48, this.height * 0.62, 'Volver', () => {
            container.destroy();
            this.tutorialIntro4();
        });
    }
    tutorialIntroEnd() {
        this.audioManager.play(Phaser.Utils.Array.GetRandom(this.flamingoSounds));
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 + 100, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.25, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const introText = this.add.text(this.width / 2 + 100, this.height / 2 - 200, '¡Alas a la obra!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold',
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);
        const text = this.add.text(this.width / 2 + 100, this.height / 2 - 70, 'Asegurese de conseguir más de un 50% de popularidad antes del último día. Y aseguresé de no caer en una deuda demasiado grande, o no podremos salvarnos de las consecuencias.\n\nMucha suerte estos 5 días, los va a necesitar.\nVolveré más tarde para explicarle nuevas cosas.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);

        container.add([bg, img, introText, text]);    

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.6, '¡Entendido!', () => {
            this.fadeOutContainer(container, () => {
                const gameScene = this.scene.get('gameScene');
                if (gameScene) gameScene.scene.resume();
                this.scene.stop();
            });
        });
    }

    tutorialDayTwo() {
        this.audioManager.play('racoon', { volume: 2 } );
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'blackMarketMessage').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width - 515, 120, 'vendedor').setOrigin(0).setScale(0.9).setDepth(130);
        const text = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Saludo, señor presidente. Mi nombre es Robinson Piqui, y soy el jefe del Mercado Negro. Tengo a la venta ciertos artículos que son imposibles de encontrar en otro lugar, y que le ayudarán en su gestión de la ciudad.\n\nPodrá venir a visitarme cuando su energía esté por debajo de la mitad. Negocios como los nuestros no se pueden hacer a plena luz del día.', {
            fontSize: '24px',
            fontFamily: 'Margarine',
            color: '#000000',
            align: 'center',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);

        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.72, 'Entendido...', () => {
            this.audioManager.play('racoon', { volume: 2 });
            this.fadeOutContainer(container, () => {
                const gameScene = this.scene.get('gameScene');
                if (gameScene) gameScene.scene.resume();
                this.scene.stop();
            });
        });
    }

    explainBlackMarket2() {
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'blackMarketMessage').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width - 515, 120, 'vendedor').setOrigin(0).setScale(0.9).setDepth(130);
        const text = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Recuerde visitar el Mercado Negro de vez en cuando, puede encontrar productos que antes no estaban disponibles.\nY no se preocupe por su reputación, nos enorgullecemos de nuestra confidencialidad con los clientes.\n\nEso sí: tenga cuidado que con lo que compre; no me hago responsable de las posibles consecuencias.\n Bueno tengo cosas que hacer, espero verle esta tarde.',{
            fontSize: '24px',
            fontFamily: 'Margarine',
            color: '#000000',
            align: 'center',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);

        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.72, 'Entendido...', () => {
            this.registry.set('flagShow', false);
            this.fadeOutContainer(container, () => { this.scene.start('gameScene', { tutorial: true }); });
            this.footerBlocker.destroy();
        });
        this.createTutorialButton(container, this.width * 0.28, this.height * 0.72, 'Volver', () => {
            container.destroy();
            this.explainBlackMarket();
        });
    }

    // ORDER 4
    explainDistrictParameters() {
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.75, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);

        const introText = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Hola de nuevo!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const text = this.add.text(this.width / 2 - 120, this.height / 2 - 50, 'Es un placer volver a verle, señor presidente.\nVengo a comunicarle que nuestras políticas de propaganda están dando frutos.\n\nDejeme explicarle los nuevos parámetros de control de cada distrito. No tardaré mucho, pero tampoco es como que este trabajando realmente.',
        {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);

        container.add([bg, img, introText, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            this.scene.launch('districtScene', { district: this.map.getDistrictByName("EL_NIDO"), tutorial: true, order: 3, day: 3 });
        });
    }

    fadeOutContainer(container, callback) {
        this.tweens.add({
            targets: container,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                container.destroy();
                callback();
            }
        });
    }
    //ORDER 5
    finishTutorial() {
        const container = this.add.container(0, 0).setDepth(101);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(100);
        const img = this.add.image(this.width * 0.75, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(100);
        const introText = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Eso es todo!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold',
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);
        const text = this.add.text(this.width / 2- 120, this.height / 2 - 70, 'Bien, le dejo para que pruebe su nuevo jugetito.\nYa quedan pocos días para las elecciones, así que propcure conseguir el mayor apoyo posible.\n\nMucho animo, señor presidente.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);

        container.add([bg, img, introText, text]);    

        this.createTutorialButton(container, this.width * 0.44, this.height * 0.6, '¡Entendido!', () => {
            this.fadeOutContainer(container, () => { this.scene.start('gameScene', { tutorial: false }); });
        }); 
    }
}