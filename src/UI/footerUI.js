export default class footerUI {
    constructor(scene) {
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

        this.footerBg = this.scene.add.image(footerX, footerY, 'lowBarUI').setOrigin(0).setDepth(11);

        const sectionMoney = footerWidth / 4;
        const sectionDistrict = footerWidth / 2;
        const sectionBlackMarket = footerWidth / 4;

        this.moneyText = this.scene.add.text(footerX + sectionMoney * 0.8, footerY + footerHeight / 2, this.player.getMoney(), {
            fontFamily: 'Handjet',
            fontSize: '34px',
            fontStyle: 'bold',
            color: '#2e6417'
        }).setOrigin(1, 0.5).setDepth(11);

        this.districtTitleText = this.scene.add.text(footerX + sectionMoney + sectionDistrict / 2, footerY + footerHeight / 2, 'QUACKINGTON DC', {
            fontSize: '38px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(11);

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

        this.blackMarketText.on('pointerover', () => {this.blackMarketText.setStyle({ backgroundColor: '#e99b15' });});
        this.blackMarketText.on('pointerout', () => {this.blackMarketText.setStyle({ backgroundColor: '#cc7a00' });});
        this.blackMarketText.on('pointerup', () => {
            if (this.scene.scene.key === 'gameScene'){
                if (this.scene.missionIcon) {this.scene.missionIcon.setVisible(false);}
                this.scene.scene.pause();
                this.scene.scene.launch('blackMarketScene', { page: 0});
            }
        });
        return this;
    }

    refreshMoney() {if(this.moneyText) {this.moneyText.setText(this.player.getMoney());}}
    updateDistrictFooter(district) {if(this.districtTitleText) {this.districtTitleText.setText(district.getName());}}
}