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
        else if(this.sceneOrder === 2) this.explainCorrupt();
        else if(this.sceneOrder === 3) this.explainBlackMarket();
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
    // ORDER 1
    explainTutorial() {
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);

        const introText = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Bienvenido a Quackington DC!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        const text = this.add.text(this.width / 2 - 120, this.height / 2 - 50, 'Buenos días, señor presidente.\nSoy su secretaria, la que se únca que trabaja de verdad por aquí.\n\nSeré clara: su mandato es un chiste y las elecciones son solo en 5 días.\nSi no consigue suficiente apoyo político, su próxima oficina será una celda con vistas al estanque.\n\nComo veo que lo necesita ayuda, le explicaré como llevar la ciudad.',
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
            this.explainMissions();
        });
    }
    explainMissions(){
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const icon = this.add.image(this.width / 2 - 120, this.height / 2 - 225, 'missionIcon').setOrigin(0.5, 0.5).setDepth(22).setScale(1.5);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);
        const text = this.add.text(this.width / 2 - 120, this.height / 2 - 70, 'He cancelado un puente público para que nuestros mejores ingenieros se centren en diseñar este mapa interactivo. Ahora, los ciudadanos podrán mandarle notificaciones directamente a usted.\n\nEstos iconos aparecerán por toda la ciudad. Si hace click y los completa le recompensarán con recursos y popularidad.\n\nTenga cuidado; si las ignora, desaparecerán.\nY ojo, que cada misión es distinta.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        container.add([bg, icon, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            container.destroy();
            this.explainEnergyAndEndDayButton();
        });
        this.createTutorialButton(container, this.width * 0.28, this.height * 0.62, 'Volver', () => {
            container.destroy();
            this.explainTutorial();
        });
        
        /* ME PARECE QUE ESTO ES DEMASIADO CONFUSO, LA VERDAD
        this.time.delayedCall(700, () => {
            container.setAlpha(0.3);
            const missionIcon = this.add.image(800, 420, 'missionIcon').setDepth(22);
            const missionCorruptIcon = this.add.image(400, 600, 'missionCorruptIcon').setDepth(22);
            this.time.delayedCall(3000, () => {
                container.setAlpha(1);
                this.canContinue = true;
                missionIcon.destroy();
                missionCorruptIcon.destroy();
            });
        });
        */
    }
    explainEnergyAndEndDayButton() {
        let canContinue = false; // DE MOMENTO ESTO NO SIRVE, PERO LO PUEDO AÑADIR LUEGO
        this.time.delayedCall(1000, () => { canContinue = true; });
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);
        const text = this.add.text(this.width / 2-120, this.height / 2 - 90, 'A su derecha está su energía, dividida en 4 ciclos. Se reduce con el tiempo y haciendo misiones, pero se recarga cada día.\n\nCada cuarto de la barra representa un ciclo.\nCada ciclo los edificos cobran y los gastos pasivos se pagan.\n\nDebajo está el botón de \'Terminar Día\'. Lo puede pulsar cuando se acabe la energía para finalizar el día.\nPuede pulsarlo antes si quiere, pero un pato dormido no es un pato productivo. Usted verá si prefiere dormir o dirigir.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);

        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            //this.fadeOutContainer(container, () => this.explainDistricts());
            container.destroy();
            this.explainDistricts();
        });
        this.createTutorialButton(container, this.width * 0.28, this.height * 0.62, 'Volver', () => {
            //this.fadeOutContainer(container, () => this.explainMissions());
            container.destroy();
            this.explainMissions();
        });
    }
    explainDistricts() {
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);
        const text = this.add.text(this.width / 2 - 120, this.height / 2 - 90, 'Como sabrá, nuestra ciudad está dividida en distritos, cada uno con sus propias características y necesidades.\nPuede hacer click en ellos para obtener información detallada y tomar decisiones informadas.\n\nEntremos en uno ahora para que pueda explicarle el funcionamiento interno de estos.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        container.add([bg, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            //this.fadeOutContainer(container, () => { this.scene.launch('districtScene', { district: this.map.getDistrictByName("EL_NIDO"), tutorial: true, order: 1 }); });
            this.scene.launch('districtScene', { district: this.map.getDistrictByName("EL_NIDO"), tutorial: true, order: 1 });
        });
        this.createTutorialButton(container, this.width * 0.28, this.height * 0.62, 'Volver', () => {
            //this.fadeOutContainer(container, () => this.explainEnergyAndEndDayButton());
            container.destroy();
            this.explainEnergyAndEndDayButton();
        });

    }
    // ORDER 2
    explainCorrupt() {
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const icon = this.add.image(this.width / 2 - 120, this.height / 2 - 225, 'missionCorruptIcon').setOrigin(0.5, 0.5).setDepth(22).setScale(1.5);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);
        const text = this.add.text(this.width / 2 - 120, this.height / 2 - 70, 'Una cosa más, señor presidente. Seguro que ha oído romores sobre nuestros "cuestionables" valores.\nEs posible que encuentre algunas misiones rojas, consideradas por la gente como corruptas. Estas misiones proporcionan aliados poderosos y mejores recursos, pero a cambio de aumentar la corrupción del estado.\n\nOficialmente, negamos cualquier tipo de acusación de este estilo, pero realizar demasiados favores corruptos puede complicar las cosas.\nCuanta mayor corruupción, menor será la probabilidad de encubrirla. Tengalo en cuenta.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        
        container.add([bg, icon, img, text]);

        this.createTutorialButton(container, this.width * 0.57, this.height * 0.62, 'Continuar', () => {
            container.destroy();
            this.startGameText();
        });
    }
    startGameText() {
        const container = this.add.container(0, 0).setDepth(21);
        const bg = this.add.image(this.width / 4 - 120, this.height / 3 - 140, 'tutorialInfo').setOrigin(0).setDepth(20);
        const img = this.add.image(this.width * 0.73, this.height/2, 'flamingo').setOrigin(0.5, 0.5).setScale(0.85).setDepth(20);
        const introText = this.add.text(this.width / 2 - 120, this.height / 2 - 200, '¡Alas a la obra!', {
            fontSize: '40px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold',
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);
        const text = this.add.text(this.width / 2- 120, this.height / 2 - 70, 'Veo que está usted listo para manejar una ciudad, señor presidente. Le recuerdo que puede ver a tiempo real su popularidad pública en la barra superior.\n\nMucha suerte estos 5 días, los va a necesitar.', {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width / 2 - 40);

        //MAYBE EN TODO EL MEDIO O SINO UN LA FLECHA

        container.add([bg, img, introText, text]);    

        this.createTutorialButton(container, this.width * 0.44, this.height * 0.6, '¡Entendido!', () => {
            this.fadeOutContainer(container, () => { this.scene.start('gameScene', { tutorial: true }); });
        });  
    }
    // ORDER 4
    explainIntroBlackMarket(){
        const container = this.add.container(0, 0).setDepth(21);
        
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
    explainBlackMarket(){
        this.footerBlocker.destroy();
        this.blackMarketContainer = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(this.width / 2, this.height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width - 500, 30, 'vendedor').setOrigin(0).setScale(1).setDepth(20);
        const blackMarketText = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Cuanto tiempo sin verte señor presidente. Mi nombre es Robinson Piqui y soy el jefe del mercado negro. En el mercado negro puedes comprar muchas cosas que fuera no existen que te ayudarán en tu gestión de tu ciudad.\n\nPuedes acceder a él haciendo click en el botón correspondiente en la parte inferior de la pantalla, pero solo puedes acceder cuando tu barra de energía esté por debajo de la mitad.', {
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
                targets: this.blackMarketContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.blackMarketContainer.destroy();
                    this.explainBlackMarket2();
                }
            });
        });
        this.blackMarketContainer.add([bg, img, blackMarketText,continueBtn]);
    }
    explainBlackMarket2(){
        const container = this.add.container(0, 0).setDepth(21);
        //const bg = this.add.image(this.width / 2, this.height / 2 - 100, 'textCloud').setOrigin(0);
        const bg = this.add.rectangle(this.width/4 - 120, this.height/3 - 140, this.width/2, this.height/2, 0xffffff).setOrigin(0);
        const img = this.add.image(this.width - 500, 30, 'vendedor').setOrigin(0).setScale(1).setDepth(20);
        const blackMarketText = this.add.text(this.width / 2-120, this.height / 2 - 50, 'Como ya sabes aquí solo vendemos productos de alta calidad, pero la calidad se paga caro.\n Ten cuidado que un gran poder conlleva grandes responsabilidades, yo no me hago cargo de las consecuencias.\n Bueno tengo cosas que hacer vuelve más tarde que todavia no esta abierto.',
        {
            fontSize: '24px',
            fontFamily: 'Times New Roman',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(this.width/2 - 40);
        this.time.delayedCall(8000, () => {
            this.tweens.add({
                targets: container,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    container.destroy();
                    this.registry.set('flagShow', false);
                    this.scene.start('gameScene', { tutorial: true});
                }
            }); 
        });

        container.add([bg, img, blackMarketText]);
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
}