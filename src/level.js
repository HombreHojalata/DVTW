import Phaser from 'phaser';
import gameManager from './gameManager.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }

    init(data) {
        this.fromScene = data && data.from ? data.from : null;
        if(!this.registry.get('gameManager')){
            const GM = new gameManager();
            this.registry.set('gameManager',GM)
        }
        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();
        this.day = this.gameManager.getDay();
        this.map = this.gameManager.getMap();
    }

    create() {
        console.log("LEVEL");

        // ASSETS
        this.gameManager.spawnAssets(this);
        // "HEADER"
        this.configurationIcon = this.spawnConfigurationIcon();
        this.popularityContainer = this.spawnPopularityBar();
        this.energyBar = this.spawnEnergyBar();

        this.startEnergyDrain(); //empezar drenado de energia

        // FOOTER
        this.Footer = this.spawnFooter();
        //this.map.generateDistrictsMoney();
        // ICONS - MISSING ONES FOR EACH
        this.closeIcon = null;
        this.missionIcon = null;
        this.missionTimer = this.time.delayedCall(1200, () => {
            this.spawnMissionIcon();
        });
    }
 
    spawnConfigurationIcon(){
        this.configBtn = this.add.image(1400, 50, 'configurationIcon').setOrigin(0.5).setScale(0.12).setInteractive({ useHandCursor: true });
        this.configBtn.on('pointerover', () => {this.configBtn.setScale(0.09);});
        this.configBtn.on('pointerout', () => {this.configBtn.setScale(0.08);});
        this.configBtn.on('pointerup', () => {
            this.scene.start('configuration', { from: 'level' });
        });
        return this.configBtn;
    }

    spawnPopularityBar() {
        const panelX = 500;
        const panelY = 12;
        const panelWidth = 620;
        const panelHeight = 84;

        this.topStatsBg = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x2b2b2f, 0.96).setOrigin(0);
        this.topStatsBorder = this.add.rectangle(panelX, panelY, panelWidth, panelHeight).setOrigin(0).setStrokeStyle(3, 0xd2a94e);

        this.topStatsTitle = this.add.text(panelX + 22, panelY + 8, 'PRESIDENTIAL STATUS', {
            fontSize: '17px',
            color: '#f3e6c4',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        const barX = panelX + 175;
        const barY = panelY + 34;
        const barWidth = 390;
        const barHeight = 14;

        const popularity = Phaser.Math.Clamp(this.player.getPopularity(), 0, 100);
        const oppositors = Math.min(15, Math.floor(this.player.getCorruption() * 0.4));
        const neutrals = Math.max(0, 100 - popularity - oppositors);

        const alliesWidth = barWidth * (popularity / 100);
        const neutralWidth = barWidth * (neutrals / 100);
        const oppositorsWidth = barWidth * (oppositors / 100);

        this.popularityLabel = this.add.text(panelX + 22, barY - 1, 'PUBLIC OPINION', {
            fontSize: '14px',
            color: '#f5f1e7',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.opinionBarBg = this.add.rectangle(barX, barY, barWidth, barHeight, 0x202020).setOrigin(0);

        this.opinionAllies = this.add.rectangle(barX, barY, alliesWidth, barHeight, 0x57c26d).setOrigin(0);
        this.opinionNeutral = this.add.rectangle(barX + alliesWidth, barY, neutralWidth, barHeight, 0x5f5f5f).setOrigin(0);
        this.opinionOppositors = this.add.rectangle(barX + alliesWidth + neutralWidth, barY, oppositorsWidth, barHeight, 0xa63a3a).setOrigin(0);

        this.opinionFrame = this.add.rectangle(barX, barY, barWidth, barHeight).setOrigin(0).setStrokeStyle(2, 0xf0dfb6);

        this.opinionPercentText = this.add.text(barX + barWidth / 2, barY + barHeight / 2, Math.floor(popularity) + '%', {
            fontSize: '12px',
            color: '#f6f2e8',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        this.opinionLegend = this.add.text(barX, barY + 22, 'Allies', {
            fontSize: '11px',
            color: '#57c26d',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.neutralLegend = this.add.text(barX + 62, barY + 22, 'Neutral', {
            fontSize: '11px',
            color: '#d1d1d1',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        this.oppositorLegend = this.add.text(barX + 132, barY + 22, 'Oppositors', {
            fontSize: '11px',
            color: '#d85a5a',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        });

        // this.corruptionLabel = this.add.text(panelX + panelWidth - 150, panelY + panelHeight + 8, 'CORRUPTION', {
        //     fontSize: '12px',
        //     color: '#f3d6d6',
        //     fontStyle: 'bold',
        //     fontFamily: 'Georgia'
        // });

        // this.corruptionValue = this.add.text(panelX + panelWidth - 28, panelY + panelHeight + 8, Math.floor(this.player.getCorruption()) + '%', {
        //     fontSize: '12px',
        //     color: '#f6f2e8',
        //     fontStyle: 'bold',
        //     fontFamily: 'Georgia'
        // }).setOrigin(1, 0);
    }


    //La batería con sus delimitaciones al 25, 50, 75%, y el diseñoñ
    spawnEnergyBar(){   
        const batteryX = this.sys.game.config.width - 205;
        const batteryY = 145;
        const batteryWidth = 110;
        const batteryHeight = 430;
        const terminalWidth = 42;
        const terminalHeight = 18;
        const innerPadding = 10;
        const sectionGap = 6;
        const sections = 4;

        this.energyFrame = this.add.rectangle(batteryX, batteryY, batteryWidth, batteryHeight, 0x232323, 0.96).setOrigin(0);
        this.energyFrameBorder = this.add.rectangle(batteryX, batteryY, batteryWidth, batteryHeight).setOrigin(0).setStrokeStyle(4, 0xf0dfb6);

        this.energyTerminal = this.add.rectangle(
            batteryX + batteryWidth / 2 - terminalWidth / 2,
            batteryY - terminalHeight,
            terminalWidth,
            terminalHeight,
            0x232323,
            0.96
        ).setOrigin(0);
        this.energyTerminalBorder = this.add.rectangle(
            batteryX + batteryWidth / 2 - terminalWidth / 2,
            batteryY - terminalHeight,
            terminalWidth,
            terminalHeight
        ).setOrigin(0).setStrokeStyle(4, 0xf0dfb6);

        this.energyTitle = this.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight + 18, 'ENERGY', {
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

        this.energySectionsBg = [];
        this.energySectionsFill = [];
        this.energyThresholdMarkers = [];

        for (let i = 0; i < sections; i++) {
            const y = innerY + (sections - 1 - i) * (sectionHeight + sectionGap);

            const bg = this.add.rectangle(innerX, y, innerWidth, sectionHeight, 0x1b1b1b).setOrigin(0);
            const fill = this.add.rectangle(innerX, y, innerWidth, sectionHeight, 0x3d8bff).setOrigin(0);

            this.energySectionsBg.push(bg);
            this.energySectionsFill.push(fill);

            if (i < sections - 1) {
                const markerY = y - sectionGap / 2 - 1;
                const marker = this.add.line(
                    0, 0,
                    innerX, markerY,
                    innerX + innerWidth, markerY,
                    0xf0dfb6
                ).setOrigin(0, 0).setLineWidth(2, 2);
                this.energyThresholdMarkers.push(marker);
            }
        }

        this.energyPercentText = this.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight / 2, Math.floor(this.player.getEnergy()) + '%', {
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5).setAngle(-90);

        this.energyStageText = this.add.text(batteryX + batteryWidth / 2, batteryY + batteryHeight + 42, 'ZONE 4', {
            fontSize: '13px',
            color: '#d8d8d8',
            fontStyle: 'bold',
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        this.refreshEnergyBattery();
    }

    spawnFooter() {
    // FOOTER
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        const footerWidth = 1500;
        const footerHeight = 75;
        const footerX = (gameWidth - footerWidth) / 2;
                const footerY = gameHeight - footerHeight;
        // FOOTER VISUAL (lighter green)
        this.footerBg = this.add.rectangle(footerX, footerY, footerWidth, footerHeight, 0x004d00).setOrigin(0);
        // FOOTER SECTIONS
        const sectionMoney = footerWidth / 4;
        const sectionDistrict = footerWidth / 2;
        const sectionBlackMarket = footerWidth / 4;
        const innerScale = 0.75; // 75% of section width
        const innerHeight = footerHeight * innerScale; // 75% of section height
        // FIRST SECTION - MONEY 
        {
            const g = this.add.graphics();
            const x = footerX + (sectionMoney - sectionMoney * innerScale) / 2;
            const y = footerY + (footerHeight - innerHeight) / 2;
            const w = sectionMoney * innerScale;
            const h = innerHeight;
            const radius = 10;
            g.fillStyle(0x000000);
            g.fillRoundedRect(x, y, w, h, radius);
            g.lineStyle(2, 0x007700); // border matches footer (lighter green)
            g.strokeRoundedRect(x, y, w, h, radius);
        }
        this.moneyText = this.add.text(footerX + sectionMoney/2, footerY + footerHeight/2, this.player.getMoney() + '$', { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
        // SECOND SECTION - DISTRICT INFO 
        {
            const g = this.add.graphics();
            const x = footerX + sectionMoney + (sectionDistrict - sectionDistrict * innerScale) / 2;
            const y = footerY + (footerHeight - innerHeight) / 2;
            const w = sectionDistrict * innerScale;
            const h = innerHeight;
            const radius = 10;
            g.fillStyle(0x000000);
            g.fillRoundedRect(x, y, w, h, radius);
            g.lineStyle(2, 0x007700); // border matches footer (lighter green)
            g.strokeRoundedRect(x, y, w, h, radius);
        }
        this.districtTitleText = this.add.text(footerX + sectionMoney + sectionDistrict/2, footerY + footerHeight/2, 'QUACKINGTON DC', { fontSize: '23px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        // THIRD SECTION - BLACK MARKET
        {
            const g = this.add.graphics();
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
        const blackMarket = this.add.text(footerX + sectionMoney + sectionDistrict + sectionBlackMarket/2, footerY + footerHeight/2, 'BLACK MARKET', { fontSize: '18px', backgroundColor: '#e03b1e', padding: { x: 8, y: 4 }, color: '#fff' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        blackMarket.on('pointerover', () => blackMarket.setStyle({ backgroundColor: '#e99b15' }));
        blackMarket.on('pointerout', () => blackMarket.setStyle({ backgroundColor: '#cc7a00' }));
        blackMarket.on('pointerup', () => {
            if (this.missionIcon)
                this.missionIcon.setVisible(false);
            this.scene.start('blackmarket');
        });
    }
    spawnMissionIcon() {
        if (this.missionIcon) return;
        this.missionIcon = this.add.image(880, 1120, 'missionIcon').setOrigin(0.5).setScale(0.08).setInteractive({ useHandCursor: true });
        this.missionIcon = this.add.image(880, 1120, 'missionIcon').setOrigin(0.5).setScale(0.08).setInteractive({ useHandCursor: true });
        this.missionIcon.on('pointerover', () => {this.missionIcon.setScale(0.09);});
        this.missionIcon.on('pointerout', () => {this.missionIcon.setScale(0.08);});
        this.missionIcon.on('pointerup', () => {
            this.missionDetails = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'testSahar').setOrigin(0.5);

            // CHOICES COINTAINER
            // this.spawnMissionTypeTwoChoices();
            if (!this.buttonContainer) {
            this.buttonContainer = document.createElement('div');
            this.buttonContainer.style.position = 'absolute';
            this.buttonContainer.style.top = '0';
            this.buttonContainer.style.left = '0';
            this.buttonContainer.style.width = '100%';
            this.buttonContainer.style.height = '100%';
            this.buttonContainer.style.pointerEvents = 'none'; // Permite que los clicks pasen a través del contenedor
            document.body.appendChild(this.buttonContainer);
            }

            // Eliminar botones anteriores si existen
            if (this.missionTypeTwoChoice1) this.missionTypeTwoChoice1.remove();
            if (this.missionTypeTwoChoice2) this.missionTypeTwoChoice2.remove();

            // Crear botón 1 en coordenadas 500x800
            this.missionTypeTwoChoice1 = document.createElement('button');
            this.missionTypeTwoChoice1.style.position = 'absolute';
            this.missionTypeTwoChoice1.style.left = '315px';           // X
            this.missionTypeTwoChoice1.style.top = '550px';            // Y
            this.missionTypeTwoChoice1.style.width = '350px';
            this.missionTypeTwoChoice1.style.height = '190px';
            this.missionTypeTwoChoice1.style.opacity = '0';
            this.missionTypeTwoChoice1.style.border = '2px solid #ccc';
            this.missionTypeTwoChoice1.style.backgroundColor = '#ffffff';
            this.missionTypeTwoChoice1.style.borderRadius = '30px';
            this.missionTypeTwoChoice1.style.cursor = 'pointer';
            this.missionTypeTwoChoice1.style.transition = 'border-color 0.3s ease';
            this.missionTypeTwoChoice1.style.pointerEvents = 'auto'; // Permite interacción con el botón
            this.missionTypeTwoChoice1.onmouseover = () => this.missionTypeTwoChoice1.style.borderColor = 'green';
            this.missionTypeTwoChoice1.onmouseout = () => this.missionTypeTwoChoice1.style.borderColor = '#ccc';

            // Crear botón 2 en coordenadas 800x800
            this.missionTypeTwoChoice2 = document.createElement('button');
            this.missionTypeTwoChoice2.style.position = 'absolute';
            this.missionTypeTwoChoice2.style.left = '695px';
            this.missionTypeTwoChoice2.style.top = '550px';
            this.missionTypeTwoChoice2.style.width = '350px';
            this.missionTypeTwoChoice2.style.height = '190px';
            this.missionTypeTwoChoice2.style.opacity = '0';
            this.missionTypeTwoChoice2.style.border = '2px solid #ccc';
            this.missionTypeTwoChoice2.style.backgroundColor = '#f0f0f0';
            this.missionTypeTwoChoice2.style.borderRadius = '30px';
            this.missionTypeTwoChoice2.style.cursor = 'pointer';
            this.missionTypeTwoChoice2.style.transition = 'border-color 0.3s ease';
            this.missionTypeTwoChoice2.style.pointerEvents = 'auto'; // Permite interacción con el botón
            this.missionTypeTwoChoice2.onmouseover = () => this.missionTypeTwoChoice2.style.borderColor = 'green';
            this.missionTypeTwoChoice2.onmouseout = () => this.missionTypeTwoChoice2.style.borderColor = '#ccc';

            // Agregar botones al contenedor
            this.buttonContainer.appendChild(this.missionTypeTwoChoice1);
            this.buttonContainer.appendChild(this.missionTypeTwoChoice2);

            this.missionTypeTwoChoice1.onclick = () => {
                this.missionTypeTwoChoice1.remove();
                this.missionTypeTwoChoice2.remove();
                this.closeIcon.destroy();
                this.missionDetails.destroy();
                this.missionIcon.setVisible(false);
                // HERE WE CAN ADD THE CONSEQUENCES OF CHOOSING THIS OPTION, FOR EXAMPLE, INCREASING POPULARITY BUT DECREASING ENERGY OR SOMETHING LIKE THAT
                this.player.updateMoney(-30000);
                this.player.updateEnergy(-10);
                this.player.updatePopularity(7);
                this.player.updateCorruption(12);
                // WE WILL NEED A FUNC TO UPDATE DATA

                this.refreshTopStatsPanel();
                
            }
            this.missionTypeTwoChoice2.onclick = () => {
                this.missionTypeTwoChoice1.remove();
                this.missionTypeTwoChoice2.remove();
                this.closeIcon.destroy();
                this.missionDetails.destroy();
                this.missionIcon.setVisible(false);
                // HERE WE CAN ADD THE CONSEQUENCES OF CHOOSING THIS OPTION, FOR EXAMPLE, INCREASING ENERGY BUT DECREASING POPULARITY OR SOMETHING LIKE THAT
                this.player.updateMoney(-42000);
                this.player.updateEnergy(-10);
                this.player.updatePopularity(2);
                this.refreshTopStatsPanel();
            }
            const pos = this.mapToWorld(3163, -75);
            this.closeIcon = this.add.image(pos.x, pos.y, 'closeIcon').setOrigin(0.5).setScale(1).setInteractive({ useHandCursor: true });
            this.closeIcon.on('pointerover', () => {this.closeIcon.setScale(1);});
            this.closeIcon.on('pointerout', () => {this.closeIcon.setScale(1);});
            this.closeIcon.on('pointerup', () => {
                this.closeIcon.destroy();
                this.missionDetails.destroy();
            });
        });

    }
    /*
    Refresca el panel de opinion publica, y tmb le meti lo de la energía. 
    
    */
    refreshTopStatsPanel() {
        const opinionBarWidth = 390;

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
            this.opinionNeutral.x = 675 + alliesWidth;
            this.opinionNeutral.width = neutralWidth;
        }

        if (this.opinionOppositors) {
            this.opinionOppositors.x = 675 + alliesWidth + neutralWidth;
            this.opinionOppositors.width = oppositorsWidth;
        }

        if (this.opinionPercentText) {
            this.opinionPercentText.setText(Math.floor(popularity) + '%');
        }

        if (this.corruptionValue) {
            this.corruptionValue.setText(Math.floor(this.player.getCorruption()) + '%');
        }

        if (this.moneyText) {
            this.moneyText.setText(this.player.getMoney() + '$');
        }

        this.refreshEnergyBattery();
    }



    refreshEnergyBattery() {

        if (!this.energySectionsFill || !this.energyPercentText || !this.energyStageText) return;

        const energy = Phaser.Math.Clamp(this.player.getEnergy(), 0, 100);

        let filledSections = 0;
        let sectionColor = 0x3d8bff;
        let stageLabel = 'ZONE 1';
        //Más tarde añadiremos la lógica aquí, sobre lo q pase al bajar de thresholds de energias
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
        //estados de energía de momento, por si necesitaasemos mas tarde
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

    updateDistrictFooter(district) {
        this.districtTitleText.setText(district.getName());
    }

    startEnergyDrain() {
        //puesto a 1 MIN para testear, cambiar a valores definitvos si necesario
    this.totalDayDurationMs = 1 * 60 * 1000;
    this.energyTickMs = 250;
    this.energyDrainPerTick = 100 / (this.totalDayDurationMs / this.energyTickMs);

    if (this.energyTimerEvent) {
        this.energyTimerEvent.remove(false);
    }

    this.energyTimerEvent = this.time.addEvent({
        delay: this.energyTickMs,
        loop: true,
        callback: () => {
            this.player.updateEnergy(-this.energyDrainPerTick);
            this.refreshTopStatsPanel();

            if (this.player.getEnergy() <= 0) {
                this.energyTimerEvent.remove(false);
                console.log('ENERGÍA AGOTADA');
            }
        }
    });
}
}
