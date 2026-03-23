export default class footerUI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
    }

    create() {
        const gameWidth = this.scene.sys.game.config.width;
        const gameHeight = this.scene.sys.game.config.height;
        const footerWidth = 1500;
        const footerHeight = 75;
        const footerX = (gameWidth - footerWidth) / 2;
        const footerY = gameHeight - footerHeight;

        this.footerBg = this.scene.add.rectangle(footerX, footerY, footerWidth, footerHeight, 0x004d00).setOrigin(0);

        const sectionMoney = footerWidth / 4;
        const sectionDistrict = footerWidth / 2;
        const sectionBlackMarket = footerWidth / 4;
        const innerScale = 0.75;
        const innerHeight = footerHeight * innerScale;

        {
            const g = this.scene.add.graphics();
            const x = footerX + (sectionMoney - sectionMoney * innerScale) / 2;
            const y = footerY + (footerHeight - innerHeight) / 2;
            const w = sectionMoney * innerScale;
            const h = innerHeight;
            const radius = 10;

            g.fillStyle(0x000000);
            g.fillRoundedRect(x, y, w, h, radius);
            g.lineStyle(2, 0x007700);
            g.strokeRoundedRect(x, y, w, h, radius);
        }

        this.moneyText = this.scene.add.text(
            footerX + sectionMoney / 2,
            footerY + footerHeight / 2,
            this.player.getMoney() + '$',
            { fontSize: '18px', color: '#fff' }
        ).setOrigin(0.5);

        {
            const g = this.scene.add.graphics();
            const x = footerX + sectionMoney + (sectionDistrict - sectionDistrict * innerScale) / 2;
            const y = footerY + (footerHeight - innerHeight) / 2;
            const w = sectionDistrict * innerScale;
            const h = innerHeight;
            const radius = 10;

            g.fillStyle(0x000000);
            g.fillRoundedRect(x, y, w, h, radius);
            g.lineStyle(2, 0x007700);
            g.strokeRoundedRect(x, y, w, h, radius);
        }

        this.districtTitleText = this.scene.add.text(
            footerX + sectionMoney + sectionDistrict / 2,
            footerY + footerHeight / 2,
            'QUACKINGTON DC',
            { fontSize: '23px', color: '#fff', fontStyle: 'bold' }
        ).setOrigin(0.5);

        {
            const g = this.scene.add.graphics();
            const x = footerX + sectionMoney + sectionDistrict + (sectionBlackMarket - sectionBlackMarket * innerScale) / 2;
            const y = footerY + (footerHeight - innerHeight) / 2;
            const w = sectionBlackMarket * innerScale;
            const h = innerHeight;
            const radius = 10;

            g.fillStyle(0x000000);
            g.fillRoundedRect(x, y, w, h, radius);
            g.lineStyle(2, 0x007700);
            g.strokeRoundedRect(x, y, w, h, radius);
        }

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
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

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

    refreshMoney() {if(this.moneyText) {this.moneyText.setText(this.player.getMoney() + '$');}}
    updateDistrictFooter(district) {if(this.districtTitleText) {this.districtTitleText.setText(district.getName());}}
}