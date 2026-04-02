export default class footerUI {
    constructor(scene, tutorial) {
        this.scene = scene;
        this.tutorial = tutorial;
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

        this.footerBg = this.scene.add.image(footerX, footerY, 'lowBarUI').setOrigin(0).setDepth(11);
        const sectionMoney = footerWidth / 4;
        const sectionDistrict = footerWidth / 2;
        const sectionBlackMarket = footerWidth / 4;
        this.moneyText = this.createMoneyText(sectionMoney,footerX,footerY,footerHeight);
        this.districtTitleText = this.createDistrictText(sectionMoney,sectionDistrict,footerX,footerY,footerHeight);
        this.blackMarketButton = this.createBlackMarketButton(sectionMoney,sectionDistrict,sectionBlackMarket,footerX,footerY,footerHeight);
        return this;
    }
    
    // MONEY
    createMoneyText(sectionMoney, footerX, footerY, footerHeight) {
        this.moneyText = this.scene.add.text(footerX + sectionMoney * 0.8, footerY + footerHeight / 2, this.player.getMoney(), {
            fontFamily: 'Handjet',
            fontSize: '34px',
            fontStyle: 'bold',
            color: '#2e6417'
        }).setOrigin(1, 0.5).setDepth(11);
    }
    refreshMoney() {if(this.moneyText) {this.moneyText.setText(this.player.getMoney());}}
    // DISTRICT
    createDistrictText(sectionMoney, sectionDistrict, footerX, footerY, footerHeight) {
        this.districtTitleText = this.scene.add.text(footerX + sectionMoney + sectionDistrict / 2, footerY + footerHeight / 2, 'QUACKINGTON DC', {
            fontSize: '38px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(11);
        return this.districtTitleText;
    }
    updateDistrictFooter(district) {if(this.districtTitleText) {this.districtTitleText.setText(district.getName());}}

    createBlackMarketButton(sectionMoney, sectionDistrict, sectionBlackMarket, footerX, footerY, footerHeight) {
        const x = footerX + sectionMoney + sectionDistrict + sectionBlackMarket / 2 + 15;
        const y = footerY + footerHeight / 2 - 2;

        const currentDay = this.scene.registry.get('gameManager').getDay();
        const isDayOne = currentDay.dayNumber === 1;

        const tooltip = this.scene.add.text(x - 150, y - 70, '', {
            fontSize: '16px',
            fontFamily: 'Georgia',
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: { x: 5, y: 5 },
            align: 'center'
        }).setVisible(false);

        const initialTexture = isDayOne ? 'marketBtnBlocked' : 'marketBtnNormal';
        this.blackMarketBtn = this.scene.add.image(x, y, initialTexture).setInteractive({ useHandCursor: !isDayOne }).setDepth(15);
        if (!isDayOne) this.blackMarketBtn.setTexture('marketBtnNormal');

        this.blackMarketBtn.on('pointerover', (pointer) => {
            if (isDayOne) return;
            this.blackMarketBtn.setTexture('marketBtnBright');

            if (this.player.getEnergy() > this.player.getMaxEnergy() / 2) {
                tooltip.setText('Aún es muy pronto, vuelve luego.');
            } else {
                tooltip.setText('Dale click para accerder al mercado negro');
            }
            tooltip.setVisible(true);
        });

        this.blackMarketBtn.on('pointerout', (pointer) => {
            if (isDayOne) return;
            this.blackMarketBtn.setTexture('marketBtnNormal');
            tooltip.setVisible(false);
        });

        this.blackMarketBtn.on('pointerdown', () => {
            if (isDayOne) return;
            this.blackMarketBtn.setTexture('marketBtnPressed');
            this.pressed = true;
        });

        this.blackMarketBtn.on('pointerup', () => {
            if (isDayOne) return;
            this.blackMarketBtn.setTexture('marketBtnBright');

            if (this.pressed) {
                this.pressed = false;
                if (this.player.getEnergy() <= this.player.getMaxEnergy() / 2) {
                    this.scene.scene.pause();
                    this.scene.scene.launch('blackMarketScene', { page: 0 });
                } else {
                    this.scene.cameras.main.shake(100, 0.005);
                    tooltip.setText('¡Es muy pronto para el mercado negro!');
                    tooltip.setVisible(true);
                }
            }
        });

        return this.blackMarketBtn;
    }
}