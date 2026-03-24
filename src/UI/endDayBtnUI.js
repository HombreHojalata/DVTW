import Phaser from 'phaser';

export default class endDayBtnUI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.isReady = false;
    }

    create() {
        const batteryWidth = 222;
        const batteryHeight = 466;
        const batteryX = this.scene.sys.game.config.width - batteryWidth - 20;
        const batteryBottomY = 100 + batteryHeight;

        const btnWidth = 290;
        const x = batteryX + (batteryWidth / 2);
        const y = batteryBottomY + 60;

        this.btn = this.scene.add.image(x, y, 'endDayNormal').setInteractive({ useHandCursor: true }).setDepth(5);

        this.btn.on('pointover', () => {
            if (this.isReady) {
                this.scene.tweens.add({
                    targets: this.btn,
                    scale: 1.05,
                    duration: 80
                });
            }
        });

        this.btn.on('pointerout', () => {
            if (this.isReady) {
                this.btn.setTexture('endDayBright');
                this.scene.tweens.add({
                    targets: this.btn,
                    scale: 1,
                    duration: 80
                });
            }
        });

        this.btn.on('pointerdown', () => {
            if (this.isReady)
                this.btn.setTexture('endDayPressed');
        });

        this.btn.on('pointerup', () => {
            if (this.isReady) {
                this.btn.setTexture('endDayBright');
                this.finishDay();
            }
        });
    }

    refresh() {
        const energy = this.player.getEnergy();

        if (energy <= 0 && !this.isReady) {
            this.isReady = true;
            this.btn.setTexture('endDayBright');

            this.scene.tweens.add({
                targets: this.btn,
                scale: 1.1,
                duration: 100,
                yoyo: true
            });
        } else if (energy > 0) {
            this.isReady = false;
            this.btn.setTexture('endDayNormal');
        }
    }

    finishDay() { // TODO: Completar con lógica de acabar dñias...
        console.log("DÍA TERMINADO");
    }
}