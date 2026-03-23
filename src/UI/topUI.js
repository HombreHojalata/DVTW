import Phaser from 'phaser';

export default class topUI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
    }

    create() {
        const panelX = 500;
        const panelY = 12;
        const panelWidth = 620;
        const panelHeight = 84;

        this.panelX = panelX;
        this.panelY = panelY;
        this.panelWidth = panelWidth;
        this.panelHeight = panelHeight;

        this.topStatsBg = this.scene.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x2b2b2f, 0.96).setOrigin(0);
        this.topStatsBorder = this.scene.add.rectangle(panelX, panelY, panelWidth, panelHeight).setOrigin(0).setStrokeStyle(3, 0xd2a94e);

        this.topStatsTitle = this.scene.add.text(panelX + 22, panelY + 8, 'PRESIDENTIAL STATUS', {
            fontSize: '17px',
            color: '#f3e6c4',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        const barX = panelX + 175;
        const barY = panelY + 34;
        const barWidth = 390;
        const barHeight = 14;

        this.barX = barX;
        this.barY = barY;
        this.barWidth = barWidth;
        this.barHeight = barHeight;

        const popularity = Phaser.Math.Clamp(this.player.getPopularity(), 0, 100);
        const oppositors = Math.min(15, Math.floor(this.player.getCorruption() * 0.4));
        const neutrals = Math.max(0, 100 - popularity - oppositors);

        const alliesWidth = barWidth * (popularity / 100);
        const neutralWidth = barWidth * (neutrals / 100);
        const oppositorsWidth = barWidth * (oppositors / 100);

        this.popularityLabel = this.scene.add.text(panelX + 22, barY - 1, 'PUBLIC OPINION', {
            fontSize: '14px',
            color: '#f5f1e7',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.opinionBarBg = this.scene.add.rectangle(barX, barY, barWidth, barHeight, 0x202020).setOrigin(0);

        this.opinionAllies = this.scene.add.rectangle(barX, barY, alliesWidth, barHeight, 0x57c26d).setOrigin(0);
        this.opinionNeutral = this.scene.add.rectangle(barX + alliesWidth, barY, neutralWidth, barHeight, 0x5f5f5f).setOrigin(0);
        this.opinionOppositors = this.scene.add.rectangle(barX + alliesWidth + neutralWidth, barY, oppositorsWidth, barHeight, 0xa63a3a).setOrigin(0);

        this.opinionFrame = this.scene.add.rectangle(barX, barY, barWidth, barHeight).setOrigin(0).setStrokeStyle(2, 0xf0dfb6);

        this.opinionPercentText = this.scene.add.text(barX + barWidth / 2, barY + barHeight / 2, Math.floor(popularity) + '%', {
            fontSize: '12px',
            color: '#f6f2e8',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        this.opinionLegend = this.scene.add.text(barX, barY + 22, 'Allies', {
            fontSize: '11px',
            color: '#57c26d',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.neutralLegend = this.scene.add.text(barX + 62, barY + 22, 'Neutral', {
            fontSize: '11px',
            color: '#d1d1d1',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.oppositorLegend = this.scene.add.text(barX + 132, barY + 22, 'Oppositors', {
            fontSize: '11px',
            color: '#d85a5a',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });
    }

    refresh() {
        const opinionBarWidth = this.barWidth;

        const popularity = Phaser.Math.Clamp(this.player.getPopularity(), 0, 100);
        const oppositors = Math.min(15, Math.floor(this.player.getCorruption() * 0.4));
        const neutrals = Math.max(0, 100 - popularity - oppositors);

        const alliesWidth = opinionBarWidth * (popularity / 100);
        const neutralWidth = opinionBarWidth * (neutrals / 100);
        const oppositorsWidth = opinionBarWidth * (oppositors / 100);

        if (this.opinionAllies) {
            this.opinionAllies.width = alliesWidth;
        }

        if (this.opinionNeutral) {
            this.opinionNeutral.x = this.barX + alliesWidth;
            this.opinionNeutral.width = neutralWidth;
        }

        if (this.opinionOppositors) {
            this.opinionOppositors.x = this.barX + alliesWidth + neutralWidth;
            this.opinionOppositors.width = oppositorsWidth;
        }

        if (this.opinionPercentText) {
            this.opinionPercentText.setText(Math.floor(popularity) + '%');
        }
    }
}