import Phaser from 'phaser';
import AudioManager from '../manager/audioManager';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'introScene' });
    }

    create() {
        //comprobar si la agenda ya estaba abierta
        const agendaAbierta = this.registry.get('agendaAbierta') || false;


        this.audioManager = this.registry.get('audioManager');
        if (this.audioManager) {
            this.audioManager.switchMusic('introSceneAudio');
        }

        //crear animacion
        this.anims.create({
            key: 'openAgenda',
            frames: this.anims.generateFrameNumbers('animatedAgenda', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: 0 //no se repite
        });

        if (agendaAbierta) {
            //mostrar agenda abierta directamente si ya se pulso antes
            this.sfondo = this.add.sprite(0, 0, 'animatedAgenda', 3).setOrigin(0);
            this.mostraMenu();
        } else {
            //sprite incial
            this.sfondo = this.add.sprite(0, 0, 'animatedAgenda', 0).setOrigin(0);

            //esperamos il click del usuario
            this.sfondo.setInteractive({ useHandCursor: true });

            //texto para el usuario
            this.clickText = this.add.text(750, 425, 'Haz clic para empezar', {
                fontSize: '36px',
                fontStyle: 'bold',
                color: '#ffffff',
                fontFamily: 'Georgia',
                stroke: '#000000',
                strokeThickness: 5
            }).setOrigin(0.5);

            this.pulseTween = this.tweens.add({
                targets: this.clickText,
                alpha: { from: 0.1, to: 0.6 },
                duration: 1200,
                ease: 'Linear',
                yoyo: true,
                repeat: -1
            });

            //esperamos a que el usuario haga clic en cualquier parte de la escena
            this.sfondo.setInteractive({ useHandCursor: true });

            this.sfondo.on('pointerdown', () => {
                //activar audio si el navegador lo bloquea
                if (this.sound.context.state === 'suspended') {
                    this.sound.context.resume();
                }
                
                //guardar estado de la agenda
                this.registry.set('agendaAbierta', true);

                this.pulseTween.stop();
                this.clickText.destroy();

                //iniciamos la animacion
                this.sfondo.play('openAgenda');
                this.sfondo.disableInteractive();
            });
        }

        //botones
        this.sfondo.on('animationcomplete', (animation) => {
            if (animation.key === 'openAgenda') {
                this.mostraMenu();
            }
        });
    }

    mostraMenu() {
        const createMenuButton = (x, y, text, callback) => {
            const width = 220;
            const height = 48;

            const shadow = this.add.rectangle(x + 4, y + 5, width, height, 0x000000, 0.18).setOrigin(0.5);
            const bg = this.add.rectangle(x, y, width, height, 0xf7f2ea, 0.82)
                .setOrigin(0.5)
                .setStrokeStyle(3, 0x263b63)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, text, {
                fontSize: '24px',
                fontStyle: 'bold',
                color: '#26304a',
                fontFamily: 'Georgia'
            }).setOrigin(0.5);

            bg.on('pointerover', () => {
                bg.setFillStyle(0xfff7df, 0.95);
                bg.setStrokeStyle(3, 0xb68a2f);
                label.setColor('#1b2340');
                bg.setScale(1.03);
                label.setScale(1.03);
                shadow.setAlpha(0.28);
            });

            bg.on('pointerout', () => {
                bg.setFillStyle(0xf7f2ea, 0.82);
                bg.setStrokeStyle(3, 0x263b63);
                label.setColor('#26304a');
                bg.setScale(1);
                label.setScale(1);
                shadow.setAlpha(0.18);
            });

            bg.on('pointerdown', () => {
                bg.setScale(0.98);
                label.setScale(0.98);
            });

            bg.on('pointerup', () => {
                bg.setScale(1.03);
                label.setScale(1.03);
                callback();
            });

            return { shadow, bg, label };
        };

        //colocacion de botones en la agenda abierta
        createMenuButton(580, 520, 'Tutorial', () => {
            this.scene.start('tutorialScene');
        });

        createMenuButton(560, 620, 'Nueva Partida', () => {
            this.scene.start('gameScene');
        });

        createMenuButton(540, 720, 'Opciones', () => {
            this.scene.start('configurationScene', {
                returnScene: 'introScene',
                openedFromPause: false
            });
        });

        /*
        createMenuButton(120, 30, 'GOOD ENDING', () => { // PARA DEPURAR
            this.scene.start('finishScene', { win: true });
        });

        createMenuButton(120, 90, 'BAD ENDING', () => { // PARA DEPURAR
            this.scene.start('finishScene', { win: false });
        });
         */
        createMenuButton(120, 30, 'MEMORY', () => { // PARA DEPURAR
            this.scene.start('memoryMiniGame');
        });
        createMenuButton(120, 90, 'PLINKO', () => { // PARA DEPURAR
            this.scene.start('plinkoMiniGame');
        });
        createMenuButton(120, 150, 'WHACAMOLE', () => { // PARA DEPURAR
            this.scene.start('whacAMole');
        });
        createMenuButton(120, 210, 'WORDLE', () => { // PARA DEPURAR
            this.scene.start('wordleMiniGame');
        });
        createMenuButton(120, 270, 'MONKEYTYPE',() => {
            this.scene.start('monkeyTypeGame');
        });
    }   
}