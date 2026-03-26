import Phaser from 'phaser';
import confirmationUI from './confirmationUI';

export default class endDayBtnUI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.isOver = false;
        this.scaleValue = 0.8;
    }

    create() {
        const batteryWidth = 222;
        const batteryHeight = 466;
        const batteryX = this.scene.sys.game.config.width - batteryWidth - 20;
        const batteryBottomY = 80 + batteryHeight;

        const x = batteryX + (batteryWidth / 2);
        const y = batteryBottomY + 60;

        this.btn = this.scene.add.image(x, y, 'endDayNormal').setInteractive({ useHandCursor: true }).setDepth(10).setScale(this.scaleValue);

        this.btn.on('pointerover', () => {
            this.scene.tweens.add({
                targets: this.btn,
                scale: this.scaleValue * 1.05,
                duration: 80,
            });
        });

        this.btn.on('pointerout', () => {
            this.btn.setTexture(this.isOver ? 'endDayBright' : 'endDayNormal');
            this.scene.tweens.add({
                targets:this.btn,
                scale: this.scaleValue,
                duration: 80
            })
        });

        this.btn.on('pointerdown', () => {
            this.btn.setTexture('endDayPressed');
        });

        this.btn.on('pointerup', () => {
            if (this.isOver) {
                this.btn.setTexture('endDayBright');
                this.registry.set('flagShow',true);
                this.finishDay();
            } else {
                this.btn.setTexture('endDayNormal');
                this.askConfirmation();
            }
        });

        this.confirmationUI = new confirmationUI(this.scene, () => this.finishDay());
        this.confirmationUI.create();
    }

    refresh() {
        const energy = this.player.getEnergy();

        if (energy <= 0 && !this.isOver) {
            this.isOver = true;
            this.btn.setTexture('endDayBright');

            this.scene.tweens.add({
                targets: this.btn,
                scale: this.scaleValue * 1.1,
                duration: 100,
                yoyo: true
            });
        } else if (energy > 0 && this.isOver) {
            this.isOver = false;
            this.btn.setTexture('endDayNormal');
        }
    }

    askConfirmation() {
        this.confirmationUI.show();
    }

    finishDay() { 
        this.scene.finishDay();
    }
}