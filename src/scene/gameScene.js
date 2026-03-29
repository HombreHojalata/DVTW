import Phaser from 'phaser';
import gameManager from '../gameManager.js';
import topUI from '../UI/topUI.js';
import footerUI from '../UI/footerUI.js';
import batteryUI from '../UI/batteryUI.js';
import endDayBtnUI from '../UI/endDayBtnUI.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
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
        if (!this.registry.has('missionList')) this.registry.set('missionList',[]);
        this.missionList = this.registry.get('missionList');
    }

    create() {
        if(this.day.getDayNumber() === 6){
            this.scene.stop();
            this.scene.start('finishScene');
        }
        console.log("GAME: " + "DAY " + this.day.getDayNumber());
        // SPAWN DAY VISUAL
        if (this.registry.get('flagShow')) this.showDayIntro();
        // SPAWN MAP and MISSIONS
        this.gameManager.spawnAssets(this);
        if (this.registry.has('missionList')) this.gameManager.spawnMissionButton(this);
        this.configButton = this.gameManager.spawnConfigurationButton(this);

        this.topUI = new topUI(this, this.player);
        this.batteryUI = new batteryUI(this, this.player);
        this.endDayBtnUI = new endDayBtnUI(this, this.player);
        this.footerUI = new footerUI(this, this.player);

        this.topUI.create();
        this.batteryUI.create();
        this.endDayBtnUI.create();
        this.footerUI.create();

        const { width, height } = this.sys.game.config;
        this.nightOverlay = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0).setAlpha(0).setDepth(1);

        this.events.on('resume', () => {
            this.refreshHUD();
        });

        this.startEnergyDrain();
        //MISSION TEST
        //this.scheduleNextMission();
        this.missionList.push(this.gameManager.getMission(this));

    }

    scheduleNextMission() {
        const delay = Math.floor(Math.random() * (12000 - 3000 + 1)) + 3000;
        this.missionTimer = this.time.addEvent({
            delay: delay,
            callback: () => {
                this.missionList.push(this.gameManager.getMission(this));
                this.scheduleNextMission();
            }
        });
    }
    /*
    Refresca el panel de opinion publica, y tmb le meti lo de la energía. 
    
    */

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

    showDayIntro() {
        const { width, height } = this.sys.game.config;
        const currentDay = this.day.getDayNumber();

        const blocker = this.add.zone(0, 0, width, height).setOrigin(0).setInteractive();
        const introContainer = this.add.container(0, 0).setDepth(100);
        const bg = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
        this.text = (currentDay === 5) ? `DÍA ${currentDay} ` + 'ÚLTIMO DÍA' : `DÍA ${currentDay}`;
        const dayText = this.add.text(width / 2, height / 2, this.text, {
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
    //NO DEBE ESTAR AQUI
    finishDay() {
        console.log("DÍA TERMINADO");
        this.gameManager.deleteAllMissions();
        this.input.enabled = false;
        if (this.energyTimerEvent) this.energyTimerEvent.paused = true;
        if (this.missionTimer) this.missionTimer.remove(false);

        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.gameManager.nextDay();
            this.scene.restart();
        });
    }
}
