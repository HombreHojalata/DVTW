import Phaser from 'phaser';

export default class confirmationUI {
    constructor(scene, onConfirm) {
        this.scene = scene;
        this.onConfirm = onConfirm;
    }

    create() {
        const { width, height } = this.scene.sys.game.config;

        this.overlay = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0).setInteractive().setVisible(false).setDepth(6);
        this.container = this.scene.add.container(width * 0.40, height / 2).setVisible(false).setDepth(7);
        this.postit = this.scene.add.image(0, 0, 'confirmationUI').setScale(0.8);
        
        const txtStyle = {
            fontSize: '50px',
            color: '#333333',
            fontFamily: 'Georgia',
            fontWight: 'bold',
            align: 'center',
            wordWrap: { width: 1000 }
        };
        this.text = this.scene.add.text(0, -65, "Sr. Presidente, aún le queda energía... \n¿Está seguro que quiere terminar ya el día?", txtStyle).setOrigin(0.5).setAngle(-3);
        
        const btnStyle = {
            fontSize: '40px',
            color: '#8b0000',
            fontFamily: 'Georgia',
            fontWight: 'bold'
        };
        this.btnNo = this.scene.add.text(0, 80, "[ SEGUIR TRABAJANDO ]", btnStyle).setOrigin(0.5).setAngle(-3).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.cancel());
        this.btnYes = this.scene.add.text(0, 160, "[ SÍ, SUFICIENTE POR HOY ]", btnStyle).setOrigin(0.5).setAngle(-3).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.confirm());
        this.hoverEffect(this.btnNo);
        this.hoverEffect(this.btnYes);


        this.container.add([this.postit, this.text, this.btnNo, this.btnYes]);
    }

    hoverEffect(button) {
        button.on('pointerover', () => {
            this.scene.tweens.add({
                targets: button,
                scale: 1.1,
                duration: 100,
                ease: 'Powe1'
            });
        });

        button.on('pointerout', () => {
            this.scene.tweens.add({
                targets: button,
                scale: 1,
                duration: 100,
                ease: 'Power1'
            });
        });
    }

    show() {
        if (this.isVisible) return;
        this.isVisible = true;

        if (this.scene.energyTimerEvent)
            this.scene.energyTimerEvent.paused = true;

        this.overlay.setVisible(true);
        this.container.setVisible(true);
        
        this.container.setScale(0);
        this.scene.tweens.add({
            targets: this.container,
            scale: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }

    hide() {
        this.scene.tweens.add({
            targets: this.container,
            scale: 0,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.overlay.setVisible(false);
                this.container.setVisible(false);
                this.isVisible = false;

                if (this.scene.energyTimerEvent)
                    this.scene.energyTimerEvent.paused = false;

            } 
        });
    }

    cancel() {
        this.hide();
    }

    confirm() {
        this.hide();
        if (this.onConfirm){
            this.scene.registry.set('flagShow', true);             
            this.onConfirm();
        } 
    }
}