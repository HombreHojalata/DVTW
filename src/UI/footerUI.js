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
    // BLACK MARKET needed changes
    createBlackMarketButton(sectionMoney, sectionDistrict, sectionBlackMarket, footerX, footerY, footerHeight) {

        const tooltip = this.scene.add.text(0, 0, '', {
            fontSize: '14px',
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: { x: 5, y: 5 },
            align: 'center'
        }).setVisible(false);
        // AQUI DEBERIA IR blackMarketIcon
        this.blackMarketText = this.scene.add.text(
            footerX + sectionMoney + sectionDistrict + sectionBlackMarket / 2,
            footerY + footerHeight / 2,
            'BLACK MARKET',
            {
                fontSize: '18px',
                backgroundColor: '#e03b1e',
                padding: { x: 8, y: 4 },
                color: '#fff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(12);

        this.blackMarketText.on('pointerover', (pointer) => {
            this.blackMarketText.setStyle({ backgroundColor: '#e99b15' });
            tooltip.setText('Dale click para accerder al mercado negro');
            tooltip.setPosition(footerX + sectionMoney + sectionDistrict + sectionBlackMarket / 2 - 180, footerY - 20);
            tooltip.setVisible(true);
            tooltip.setDepth(100);
        });
        this.blackMarketText.on('pointerout', () => {
            this.blackMarketText.setStyle({ backgroundColor: '#cc7a00' });
            tooltip.setVisible(false);
        });
        this.blackMarketText.on('pointerup', (pointer)=> {
            if (this.player.getEnergy() < this.player.getMaxEnergy() / 2) {
                this.scene.scene.pause();
                this.scene.scene.launch('blackMarketScene', { page: 0});
            }else{
                tooltip.setText('Todavia es muy temprano para poder acceder\nal mercado negro');
                tooltip.setPosition(footerX + sectionMoney + sectionDistrict + sectionBlackMarket / 2 - 180, footerY - 20);
                tooltip.setVisible(true);
                tooltip.setDepth(100);
            }
        });
        return this.blackMarketText;
    }
}