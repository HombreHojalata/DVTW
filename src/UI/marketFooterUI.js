export default class marketFooterUI {
    constructor(scene, tutorial) {
        this.scene = scene;
        this.player = this.scene.registry.get('gameManager').getPlayer();
        this.create();
    }

    create() {
        const gameWidth = this.scene.sys.game.config.width;
        const gameHeight = this.scene.sys.game.config.height + 5;
        const footerWidth = 1500;
        const footerHeight = 81;
        const footerX = (gameWidth - footerWidth) / 2;
        const footerY = gameHeight - footerHeight;

        this.footerBg = this.scene.add.image(footerX, footerY, 'lowBarMarketUI').setOrigin(0).setDepth(11);

        const sectionMoney = footerWidth / 4;
        const sectionCorruption = footerWidth / 2;
        const sectionExit = footerWidth / 4;
        this.moneyText = this.createMoneyText(sectionMoney, footerX, footerY, footerHeight);
        this.exitButton = this.createExitButton(sectionMoney, sectionCorruption, sectionExit, footerX, footerY, footerHeight);
        return this;
    }
    
    // MONEY
    createMoneyText(sectionMoney, footerX, footerY, footerHeight) {
        this.moneyText = this.scene.add.text(footerX + sectionMoney * 0.8, footerY + footerHeight / 2, this.player.getMoney(), {
            fontFamily: 'Handjet',
            fontSize: '34px',
            fontStyle: 'bold',
            color: '#ad3333'
        }).setOrigin(1, 0.5).setDepth(11);
    }
    refreshMoney() {if(this.moneyText) {this.moneyText.setText(this.player.getMoney());}}

    createExitButton(sectionMoney, sectionCorruption, sectionExit, footerX, footerY, footerHeight) {
        const x = footerX + sectionMoney + sectionCorruption + sectionExit / 2 + 15;
        const y = footerY + footerHeight / 2 - 2;

        this.exitBtn = this.scene.add.image(x, y, 'mapBtnNormal').setInteractive({ useHandCursor: true }).setDepth(15);

        this.exitBtn.on('pointerover', (pointer) => { this.exitBtn.setTexture('mapBtnBright'); });
        
        this.exitBtn.on('pointerout', (pointer) => { this.exitBtn.setTexture('mapBtnNormal'); });
        
        this.exitBtn.on('pointerdown', () => {
            this.exitBtn.setTexture('mapBtnPressed');
            this.pressed = true;
        });
        this.exitBtn.on('pointerup', () => {
            this.exitBtn.setTexture('mapBtnBright');
            if (this.pressed) {
                this.pressed = false;
                this.scene.scene.stop();
                this.scene.scene.resume('gameScene');
                const audioManager = this.scene.registry.get('audioManager');
                if (audioManager) audioManager.switchMusic('bgMusic');
            }
        });

        return this.exitBtn;
    }
}