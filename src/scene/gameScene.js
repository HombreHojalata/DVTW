import Phaser from 'phaser';
import gameManager from '../gameManager.js';
import topUI from '../UI/topUI.js';
import footerUI from '../UI/footerUI.js';
import bateriaUI from '../UI/bateriaUI.js';

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
        if(!this.registry.get('gameManager')){
            const GM = new gameManager(this);
            this.registry.set('gameManager',GM)
        }
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.day = this.gameManager.getDay();
        this.map = this.gameManager.getMap();
    }

    create() {
        console.log("GAME");

        this.gameManager.spawnAssets(this);

        this.topUI = new topUI(this, this.player);
        this.bateriaUI = new bateriaUI(this, this.player);
        this.footerUI = new footerUI(this, this.player);

        this.topUI.create();
        this.bateriaUI.create();
        this.footerUI.create();

        this.events.on('resume', () => {
            this.refreshHUD();
        });

        this.startEnergyDrain();
        //MISSION TEST
        this.thisDayMission = this.gameManager.getMission();
        this.missionButton = this.add.image(350,350,'closeIcon').setOrigin(0).setInteractive({ useHandCursor: true }); 
        this.missionButton.on('pointerover', () => {this.missionButton.setScale(1.1);});
        this.missionButton.on('pointerout', () => {this.missionButton.setScale(1);});
        this.missionButton.on('pointerup', () => {
            this.scene.pause('gameScene');
            this.scene.launch('missionScene', { mission: this.thisDayMission, player: this.player, map: this.map});         //falta pasarle player y map o solo gameManager
        });
    }
    /*
    Refresca el panel de opinion publica, y tmb le meti lo de la energía. 
    
    */

    startEnergyDrain() {
        this.totalDayDurationMs = 1 * 60 * 1000;
        this.energyTickMs = 250;
        this.energyDrainPerTick = 100 / (this.totalDayDurationMs / this.energyTickMs);

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
                }
            }
        });
    }

    refreshHUD() {
        if (this.topUI) {
            this.topUI.refresh();
        }

        if (this.bateriaUI) {
            this.bateriaUI.refresh();
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
}
