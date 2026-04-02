import Phaser from 'phaser';
import gameManager from '../gameManager.js';
import topUI from '../UI/topUI.js';
import footerUI from '../UI/footerUI.js';
import batteryUI from '../UI/batteryUI.js';
import endDayBtnUI from '../UI/endDayBtnUI.js';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    init(data) {
        this.fromScene = data && data.from ? data.from : null;                  //SOBRA
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
        this.isTutorial = data.tutorial || false;
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        if(this.day.getDayNumber() === 6){                                      // GAME END                       
            this.scene.stop();
            this.scene.start('finishScene');
        }else{                                                                  // GAME START/CONTINUE   
            console.log("GAME: " + "DAY " + this.day.getDayNumber());
            // SPAWN DAY VISUAL
            if (this.registry.get('flagShow')) this.showDayIntro();
            //FOOTER BLOCKER
            if(this.day.getDayNumber() === 1){
                const footerHeight = 81;
                const footerWidth = 1500;
                const footerX = (this.width - footerWidth) / 2;
                const footerY = this.height - footerHeight;
                this.footerBlocker = this.add.zone(footerX, footerY, footerWidth, footerHeight).setOrigin(0).setInteractive().setDepth(100);
            }
            // SPAWN MAP and MISSIONS
            this.gameManager.spawnAssets(this);
            if (this.registry.has('missionList')) this.gameManager.spawnMissionButton(this);
            this.configButton = this.gameManager.spawnConfigurationButton(this);


            this.input.keyboard.on('keydown-ESC', () => {
                if (!this.scene.isActive('PauseScene') && !this.scene.isActive('configurationScene')) {
                    this.scene.launch('PauseScene', { returnScene: this.scene.key });
                    this.scene.pause();
                }
            });

            this.topUI = new topUI(this);
            this.batteryUI = new batteryUI(this);
            this.endDayBtnUI = new endDayBtnUI(this);
            this.endDayBtnUI.btn.setDepth(22);
            this.footerUI = new footerUI(this);

            this.nightOverlay = this.add.rectangle(0, 0, this.width, this.height, 0x000000).setOrigin(0).setAlpha(0).setDepth(1);

            this.events.on('resume', () => {
                this.refreshHUD();
            });

            this.startEnergyDrain();
            //MISSION TEST
            //this.scheduleNextMission();
            this.missionList.push(this.gameManager.getMission(this));
        }
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
                    this.blocker = this.add.zone(0, 0, this.width, this.height).setOrigin(0).setInteractive().setDepth(20);
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
                onComplete: () =>{
                    introContainer.destroy()
                    if(currentDay === 2 && this.isTutorial){               // TUTORIAL BLACK MARKET
                        this.scene.stop();
                        this.scene.start('tutorialScene', { order: 4 });
                    }
                } 
            });
        });
    }
    //NO DEBE ESTAR AQUI
    finishDay() {
        console.log("DÍA TERMINADO");
        this.gameManager.deleteAllMissions(this);
        this.input.enabled = false;
        if (this.energyTimerEvent) this.energyTimerEvent.paused = true;
        if (this.missionTimer) this.missionTimer.remove(false);

        this.cameras.main.fadeOut(1000, 0, 0, 0);
        // UPDATE DATA
        //this.moneyGenerated = this.map.updateDistricts();
        //this.player.updateMoney(this.moneyGenerated);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.gameManager.nextDay();
            this.scene.restart();
        });
    }
}
