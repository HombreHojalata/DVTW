import Phaser from 'phaser';

export default class bateriaUI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.energySectionsBg = [];
        this.energySectionsFill = [];
        this.energyThresholdMarkers = [];
        this.energyPlaceholderState = null;
    }

    create() {
        const batteryX = this.scene.sys.game.config.width - 205;
        const batteryY = 145;
        const batteryWidth = 110;
        const batteryHeight = 430;
        const terminalWidth = 42;
        const terminalHeight = 18;
        const innerPadding = 10;
        const sectionGap = 6;
        const sections = 4;

        this.batteryX = batteryX;
        this.batteryY = batteryY;
        this.batteryWidth = batteryWidth;
        this.batteryHeight = batteryHeight;

        this.energyFrame = this.scene.add.rectangle(batteryX, batteryY, batteryWidth, batteryHeight, 0x232323, 0.96).setOrigin(0);
        this.energyFrameBorder = this.scene.add.rectangle(batteryX, batteryY, batteryWidth, batteryHeight).setOrigin(0).setStrokeStyle(4, 0xf0dfb6);

        this.energyTerminal = this.scene.add.rectangle(
            batteryX + batteryWidth / 2 - terminalWidth / 2,
            batteryY - terminalHeight,
            terminalWidth,
            terminalHeight,
            0x232323,
            0.96
        ).setOrigin(0);

        this.energyTerminalBorder = this.scene.add.rectangle(
            batteryX + batteryWidth / 2 - terminalWidth / 2,
            batteryY - terminalHeight,
            terminalWidth,
            terminalHeight
        ).setOrigin(0).setStrokeStyle(4, 0xf0dfb6);

        this.energyTitle = this.scene.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight + 18, 'ENERGY', {
            fontSize: '16px',
            color: '#f3e7c7',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        const innerX = batteryX + innerPadding;
        const innerY = batteryY + innerPadding;
        const innerWidth = batteryWidth - innerPadding * 2;
        const innerHeight = batteryHeight - innerPadding * 2;
        const sectionHeight = (innerHeight - sectionGap * (sections - 1)) / sections;

        this.innerX = innerX;
        this.innerY = innerY;
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.sectionHeight = sectionHeight;
        this.sectionGap = sectionGap;
        this.sections = sections;

        for (let i = 0; i < sections; i++) {
            const y = innerY + (sections - 1 - i) * (sectionHeight + sectionGap);

            const bg = this.scene.add.rectangle(innerX, y, innerWidth, sectionHeight, 0x1b1b1b).setOrigin(0);
            const fill = this.scene.add.rectangle(innerX, y, innerWidth, sectionHeight, 0x3d8bff).setOrigin(0);

            this.energySectionsBg.push(bg);
            this.energySectionsFill.push(fill);

            if (i < sections - 1) {
                const markerY = y - sectionGap / 2 - 1;
                const marker = this.scene.add.line(
                    0, 0,
                    innerX, markerY,
                    innerX + innerWidth, markerY,
                    0xf0dfb6
                ).setOrigin(0, 0).setLineWidth(2, 2);

                this.energyThresholdMarkers.push(marker);
            }
        }

        this.energyPercentText = this.scene.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight / 2, Math.floor(this.player.getEnergy()) + '%', {
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5).setAngle(-90);

        this.energyStageText = this.scene.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight + 42, 'ZONE 4', {
            fontSize: '13px',
            color: '#d8d8d8',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        this.refresh();
    }

    refresh() {
        if (!this.energySectionsFill || !this.energyPercentText || !this.energyStageText) return;

        const energy = Phaser.Math.Clamp(this.player.getEnergy(), 0, 100);

        let filledSections = 0;
        let sectionColor = 0x3d8bff;
        let stageLabel = 'ZONE 1';

        if (energy > 75) {
            filledSections = 4;
            sectionColor = 0x4fc96b;
            stageLabel = 'Energia muy alta';
        } else if (energy > 50) {
            filledSections = 3;
            sectionColor = 0xb7d94b;
            stageLabel = 'Energia alta';
        } else if (energy > 25) {
            filledSections = 2;
            sectionColor = 0xe0a93b;
            stageLabel = 'Energia media';
        } else if (energy > 0) {
            filledSections = 1;
            sectionColor = 0xc94a4a;
            stageLabel = 'Energia baja';
        } else {
            filledSections = 0;
            sectionColor = 0x5a1f1f;
            stageLabel = 'SIN ENERGIA';
        }

        for (let i = 0; i < this.energySectionsFill.length; i++) {
            if (i < filledSections) {
                this.energySectionsFill[i].setVisible(true);
                this.energySectionsFill[i].setFillStyle(sectionColor, 1);
            } else {
                this.energySectionsFill[i].setVisible(false);
            }
        }

        if (this.energyPercentText) {
            this.energyPercentText.setText(Math.floor(energy) + '%');
        }

        if (this.energyStageText) {
            this.energyStageText.setText(stageLabel);
        }

        if (energy <= 25) {
            this.energyPlaceholderState = 'LOWEST_THRESHOLD';
        } else if (energy <= 50) {
            this.energyPlaceholderState = 'LOW_THRESHOLD';
        } else if (energy <= 75) {
            this.energyPlaceholderState = 'MID_THRESHOLD';
        } else {
            this.energyPlaceholderState = 'HIGH_THRESHOLD';
        }
    }
}