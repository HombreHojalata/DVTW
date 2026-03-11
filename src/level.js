import DistrictBorrascal from './map/district/districtBorrascal.js';
import DistrictSahar from './map/district/districtSahar.js';
import DistrictSomosagua from './map/district/districtSomosagua.js';
import DistrictElNido from './map/district/districtElNido.js';
import DistrictGuinea from './map/district/districtGuinea.js';
import DistrictNuevaPradera from './map/district/districtNuevaPradera.js';
import Map from './map/map.js';
import Phaser from 'phaser';
import Player from './manager/player.js';

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
        //TO PREPARE ALL THE DISTRICT HERE
        this.fromScene = data && data.from ? data.from : null;

        // Comprueba que no haya un jugador ya registrado (por ejemplo, al volver del Mercado Negro)
        let existingPlayer = this.registry.get('player');
        if (!existingPlayer) {
            const player = new Player(1000000, 100, 20, 80 , 'presidente' , 'presidente');
            this.player = player;
            this.registry.set('player', player);
        } else {
            this.player = existingPlayer;
        }

 //THIS FOR ALL THE DISTRICTS, WE CAN CREATE A MAP TO STORE THEM ALL IN THE REGISTRY, SO WE CAN ACCESS THEM FROM ANY SCENE
        if (!this.registry.get('GUINEA')) {
            const GUINEA = new DistrictGuinea(
                "GUINEA", "Any", 700, 14, 30,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon', 300, 300
            );
            this.registry.set('GUINEA', GUINEA);
        }
        if (!this.registry.get('SOMOSAGUA')) {
            const SOMOSAGUA = new DistrictSomosagua(
                "SOMOSAGUA", "Any", 800, 12, 10,
                ["Casino"], [], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon', 700, 200
            );
            this.registry.set('SOMOSAGUA', SOMOSAGUA);
        }
        if (!this.registry.get('BORRASCAL')) {
            const BORRASCAL = new DistrictBorrascal(
                "BORRASCAL", "Any", 1000, 10, 100,
                ["Casino"], [], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon', 1200, 150
            );
            this.registry.set('BORRASCAL', BORRASCAL);
        }
        if (!this.registry.get('SAHAR')) {
            const SAHAR = new DistrictSahar(
                "SAHAR", "Any", 600, 20, 15,
                //BUILDINGS LIST, BUILDINGS BUILT
                ["Casino"], [], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon', 400, 550
            );
            this.registry.set('SAHAR', SAHAR);
        }
        if (!this.registry.get('EL_NIDO')) {
            const EL_NIDO = new DistrictElNido(
                "EL NIDO", "Any", 500, 8, 40,
                ["Casino"], [], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon ', 800, 400
            );
            this.registry.set('EL_NIDO', EL_NIDO);
        }
        if (!this.registry.get('NUEVA_PRADERA')) {
            const NUEVA_PRADERA = new DistrictNuevaPradera(
                "NUEVA PRADERA", "Any", 1400, 18, 5,
                ["Casino"], [], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
                'closeIcon', 'closeIcon', 900, 550
            );
            this.registry.set('NUEVA_PRADERA', NUEVA_PRADERA);
        }
        //WE CREATE THE MAP WITH ALL THE DISTRICTS
        this.map = new Map('map', null, null,{                  //faltan los JSON
            BORRASCAL: this.registry.get('BORRASCAL'),
            SAHAR: this.registry.get('SAHAR'),
            SOMOSAGUA: this.registry.get('SOMOSAGUA'),
            GUINEA: this.registry.get('GUINEA'),
            NUEVA_PRADERA: this.registry.get('NUEVA_PRADERA'),
            EL_NIDO: this.registry.get('EL_NIDO')
        });
        this.registry.set('map', this.map);
    }

    create() {
        console.log("LEVEL");

        // ASSETS
        this.spawnAssets();
        // "HEADER"
        this.PopularityContainer = this.spawnPopularityBar();
        this.ConfigurationIcon = this.spawnConfigurationIcon();
        this.EnergyBar = this.spawnEnergyBar();
        // FOOTER
        this.Footer = this.spawnFooter();

        this.map.generateDistrictsMoney();

        // ICONS - MISSING ONES FOR EACH
        this.closeIcon = null;
        this.missionIcon = null;
        this.missionTimer = this.time.delayedCall(1200, () => {
            this.spawnMissionIcon();
        });


    }
    
    spawnAssets() {
        this.mapImg = this.map.spawnMap(this);
        this.borrascal = this.map.getDistricts('BORRASCAL').spawnDistrict(this);        
        this.elNido = this.map.getDistricts('EL_NIDO').spawnDistrict(this);
        this.guinea = this.map.getDistricts('GUINEA').spawnDistrict(this);
        this.nuevaPradera = this.map.getDistricts('NUEVA_PRADERA').spawnDistrict(this);
        this.sahar = this.map.getDistricts('SAHAR').spawnDistrict(this);
        this.somosagua = this.map.getDistricts('SOMOSAGUA').spawnDistrict(this);
        this.presidente = this.player.spawnPresident(this);
    }
    spawnConfigurationIcon() {
        this.configBtn = this.add.image(1400, 50, 'configurationIcon').setOrigin(0.5).setScale(0.12).setInteractive({ useHandCursor: true });
        this.configBtn.on('pointerover', () => {this.configBtn.setScale(0.09);});
        this.configBtn.on('pointerout', () => {this.configBtn.setScale(0.08);});
        this.configBtn.on('pointerup', () => {
            this.scene.start('configuration', { from: 'level' });
        });
    }
    spawnPopularityBar(){
        const barWidth = 400;
        const barHeight = 25;
        const barX = 700;
        const barY = 50;    
        this.popularityBarBg = this.add.rectangle(barX, barY, barWidth, barHeight, 0x000000).setOrigin(0);
        this.popularityBarFill = this.add.rectangle(barX, barY, barWidth * (this.player.getPopularity() / 100), barHeight, 0x00ff00).setOrigin(0);
        this.popularityText = this.add.text(barX + barWidth / 2, barY + barHeight / 2, 'Popularity: ' + Math.floor(this.player.getPopularity()) + '%', { fontSize: '14px', color: '#fff' }).setOrigin(0.5); // He puesto un Math.floor (no necesitamos decimales de porcentaje)
        this.corruptionBarbg = this.add.rectangle(barX, barY + barHeight + 20, barWidth, barHeight, 0x000000).setOrigin(0);
        this.corruptionBarFill = this.add.rectangle(barX, barY + barHeight + 20, barWidth * (this.player.getCorruption() / 100), barHeight, 0xff0000).setOrigin(0);
        this.corruptionText = this.add.text(barX + barWidth / 2, barY + barHeight + 25, 'Corruption: ' + Math.floor(this.player.getCorruption()) + '%', { fontSize: '14px', color: '#fff' }).setOrigin(0.5); // He puesto un Math.floor (no necesitamos decimales de porcentaje)
    }
    spawnEnergyBar(){   
    //VERTICAL ENERGY BAR ON THE RIGHT SIDE OF THE SCREEN
        const barWidth = 200;
        const barHeight = 500;
        const barX = this.sys.game.config.width - 250;
        const barY = 150;    
        this.energyBarBg = this.add.rectangle(barX, barY, barWidth, barHeight, 0x000000).setOrigin(0);
        this.energyBarFill = this.add.rectangle(barX, barY + barHeight * (1 - this.player.getEnergy() / 100), barWidth, barHeight * (this.player.getEnergy() / 100), 0x0000ff).setOrigin(0);
        this.energyText = this.add.text(barX + barWidth / 2, barY + barHeight / 2, 'Energy: ' + this.player.getEnergy() + '%', { fontSize: '14px', color: '#fff' }).setOrigin(0.5).setAngle(-90);
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
                this.PopularityContainer = this.spawnPopularityBar();
                this.EnergyBar = this.spawnEnergyBar();
                this.Footer = this.spawnFooter();
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
                this.PopularityContainer = this.spawnPopularityBar();
                this.EnergyBar = this.spawnEnergyBar();
                this.Footer = this.spawnFooter();
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
    updateDistrictFooter(district) {
        this.districtTitleText.setText(district.getName());
    }
}