import confirmationUI from './confirmationUI';

export default class endDayBtnUI {
    constructor(scene) {
        this.scene = scene;
        this.gameManager = this.scene.registry.get('gameManager');
        this.currentDay = this.gameManager.getDay().getDayNumber();
        this.player = this.gameManager.getPlayer();
        this.isOver = false;
        this.scaleValue = 0.8;
        this.create();
    }
    create() {
        const batteryWidth = 222;
        const batteryHeight = 466;
        const batteryX = this.scene.sys.game.config.width - batteryWidth - 20;
        const batteryBottomY = 130 + batteryHeight;

        const x = batteryX + (batteryWidth / 2);
        const y = batteryBottomY + 60;
        const { width, height } = this.scene.sys.game.config;

        if(this.tutorial || this.currentDay === 5) {
            const size = 100;
            this.blocker = this.scene.add.rectangle(x, y, size, size, 0x000000, 0).setOrigin(0.5).setInteractive().setDepth(24);
            this.blockedContainer = this.scene.add.container(x, y - 70);
            
            const bg = this.scene.add.rectangle(0, 0, 150, 50, 0xffff00).setOrigin(0.5);
            const text = this.scene.add.text(0, 0, 'BLOQUEADO!!!', { fontSize: '20px', color: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
            if(this.currentDay === 5) {
                const bg2 = this.scene.add.rectangle(0,0,150,70, 0xffff00).setOrigin(0.5);
                const text2 = this.scene.add.text(0, 0, 'HOY ES UN DIA MUY IMPORTANTE, SIGUE TRABAJANDO', { fontSize: '20px', color: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
                this.blockedContainer.add([bg, text, bg2, text2]);
            }else{
                this.blockedContainer.add([bg, text]);
            }
            this.blockedContainer.setVisible(false).setDepth(14);
            this.blocker.on('pointerover', () => { this.blockedContainer.setVisible(true); });
            this.blocker.on('pointerout', () => { this.blockedContainer.setVisible(false); });
        }
        this.btn = this.scene.add.image(x, y, 'endDayNormal').setInteractive({ useHandCursor: true }).setDepth(22).setScale(this.scaleValue);

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
            const audioManager = this.scene.registry.get('audioManager');
            if (audioManager) audioManager.play('key');
            if (this.isOver) {
                this.btn.setTexture('endDayBright');
                this.scene.registry.set('flagShow',true);
                this.finishDay();
            } else {
                this.btn.setTexture('endDayNormal');
                //this.blocker =  this.scene.add.zone(x, y, width, height).setOrigin(0.5).setInteractive().setDepth(24);
                this.confirmationUI = new confirmationUI(this.scene, () => this.finishDay()).show();
            }
        });

        
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

    setDepth(depth) {
        if (this.btn) {
            this.btn.setDepth(depth);
        }
        if (this.blockedContainer) {
            this.blockedContainer.setDepth(depth + 1);
        }
        if (this.blocker) {
            this.blocker.setDepth(depth);
        }
        return this;
    }

    finishDay() { 
        const audioManager = this.scene.registry.get('audioManager');
        if (audioManager) audioManager.play('trumpet');
        this.scene.finishDay();
    }
}