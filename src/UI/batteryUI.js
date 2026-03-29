import Phaser from 'phaser';

export default class batteryI {
    constructor(scene) {
        this.scene = scene;
        this.player = this.scene.registry.get('gameManager').getPlayer();
        this.create();
    }

    create() {
        const batteryWidth = 222;
        const batteryHeight = 466;
        const terminalHeight = 30;
        
        const batteryX = this.scene.sys.game.config.width - batteryWidth - 20;
        const batteryY = 100;
        const innerPadding = 15;

        this.innerX = batteryX + innerPadding;
        this.innerY = batteryY + innerPadding + terminalHeight;
        this.innerWidth = batteryWidth - (innerPadding * 2);
        this.innerHeight = (batteryHeight - terminalHeight) - (innerPadding * 2);

        this.energyBackground = this.scene.add.rectangle(this.innerX, this.innerY, this.innerWidth, this.innerHeight, 0x1b1b1b, 0.9).setOrigin(0).setDepth(10);
        this.energyFill = this.scene.add.rectangle(this.innerX, this.innerY + this.innerHeight, this.innerWidth, this.innerHeight, 0x3d8bff).setOrigin(0, 1).setDepth(11);
        this.batteryFrame = this.scene.add.image(batteryX, batteryY, 'battery').setOrigin(0).setDepth(12);
        this.batteryFrame.postFX.addShadow(-5, 5, 0.5, 1, 0x000000, 0.8);

        const sections = 4;
        const sectionGap = 6;
        
        const totalSectionHeight = (this.innerHeight - sectionGap * (sections - 1));
        const sectionHeight = totalSectionHeight / sections;

        const bottomSectionY = this.innerY + (sections - 1) * (sectionHeight + sectionGap);
        const textCenterX = this.innerX + this.innerWidth / 2;

        const labelStyle = {
            fontSize: '14px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        };
        const numberStyle = {
            fontSize: '26px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        };

        this.energyLabelTitle = this.scene.add.text(textCenterX, bottomSectionY + 20, 'ENERGÍA:', labelStyle).setOrigin(0.5, 0).setDepth(13);
        this.energyNumberText = this.scene.add.text(textCenterX, bottomSectionY + sectionHeight - 10, '', numberStyle).setOrigin(0.5, 1.5).setDepth(13);

        this.refresh();
    }

    refresh() {
        if (!this.energyNumberText || !this.energyFill) return;

        const currentEnergy = Math.max(0, this.player.getEnergy());
        const maxEnergy = this.player.getMaxEnergy();

        if (!maxEnergy || maxEnergy === 0) return;

        this.energyNumberText.setText(Math.floor(`${currentEnergy}`) + '/' +  Math.floor(`${maxEnergy}`));

        const energyPercent = Phaser.Math.Clamp(currentEnergy / maxEnergy, 0, 1);

        let sectionColor = 0x3d8bff;
        if (energyPercent > 0.75) sectionColor = 0x4fc96b;
        else if (energyPercent > 0.50) sectionColor = 0xb7d94b;
        else if (energyPercent > 0.25) sectionColor = 0xe0a93b;
        else if (energyPercent > 0.05) {
            sectionColor = 0xc94a4a;
            this.energyNumberText.setColor('#fffb0b');
        } else if (energyPercent > 0) {
            sectionColor = 0x5a1f1f;
            this.energyNumberText.setColor('#ff0000');
        } else this.energyNumberText.setColor('#742020ff');

        this.energyFill.displayHeight = this.innerHeight * energyPercent;
        this.energyFill.setFillStyle(sectionColor, 1);
    }
}