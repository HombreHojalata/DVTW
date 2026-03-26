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
    }

    create() {
        console.log("TUTORIAL");
        this.showTutorialIntro();
        const { width, height } = this.sys.game.config;
        //this.blocker = this.add.zone(0, 0, width, height).setOrigin(0).setInteractive();
        this.gameManager.spawnAssets(this);
        this.topUI = new topUI(this, this.player);
        this.batteryUI = new batteryUI(this, this.player);
        this.endDayBtnUI = new endDayBtnUI(this, this.player);
        this.footerUI = new footerUI(this, this.player);

        this.topUI.create();
        this.batteryUI.create();
        this.endDayBtnUI.create();
        this.footerUI.create();

        this.nightOverlay = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0).setAlpha(0).setDepth(1);

        this.events.on('resume', () => {
            this.refreshHUD();
        });
        //BLOQUEAR MERCADO NEGRO
        //BLOQUEAR DISTRITO HASTA QUE DIGA
        //this.startEnergyDrain(); TUTORIAL DEL SIGNIFICADO, TERMINA DE EXPLICAR Y JUEGO
        //this.scene.stop()        EMPIEZA JUEGO DE VERDAD
        //this.scene.launch('gameScene', { tutorial: true});

    }

    startEnergyDrain() {
        this.totalDayDurationMs = 0.5 * 60 * 1000;
        this.energyTickMs = 250;
        const maxEnergy = this.player.getMaxEnergy() || 100;
        this.energyDrainPerTick = maxEnergy / (this.totalDayDurationMs / this.energyTickMs);

        if (this.energyTimerEvent) {
            this.energyTimerEvent.remove(false);
        }

        this.energyTimerEvent = this.time.addEvent({
            delay: this.energyTickMs,
            loop: true,
            callback: () => {
                this.player.updateEnergy(-this.energyDrainPerTick);
                this.refreshHUD();

                if (this.player.getEnergy() <= 0) {
                    this.energyTimerEvent.remove(false);
                    console.log('ENERGÍA AGOTADA');
                    this.tweens.add({
                        targets: this.nightOverlay,
                        alpha: 0.35,
                        duration: 2000,
                        ease: 'Power2'
                    });
                }
            }
        });
    }

    refreshHUD() {
        if (this.topUI) {
            this.topUI.refresh();
        }

        if (this.batteryUI) {
            this.batteryUI.refresh();
        }

        if (this.endDayBtnUI) {
            this.endDayBtnUI.refresh();
        }

        if (this.footerUI) {
            this.footerUI.refreshMoney();
        }
    }

    updateDistrictFooter(district) {
        if (this.footerUI) {
            this.footerUI.updateDistrictFooter(district);
        }
    }
    showTutorialIntro() {
        const { width, height } = this.sys.game.config;

        const blocker = this.add.zone(0, 0, width, height)
            .setOrigin(0)
            .setInteractive();
        const introContainer = this.add.container(0, 0).setDepth(100);
        const bg = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
        const dayText = this.add.text(width / 2, height / 2, 'TUTORIAL', {
            fontSize: '80px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bolf',
            color: '#ffffff'
        }).setOrigin(0.5);

        introContainer.add([blocker, bg, dayText]);

        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: introContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => introContainer.destroy()
            });
        });
    }  
}
