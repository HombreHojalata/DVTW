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

        const player = new Player(1000000, 100, 20, 80);

        this.player = player;
        this.registry.set('player', player);

        //THIS FOR ALL THE DISTRICTS, WE CAN CREATE A MAP TO STORE THEM ALL IN THE REGISTRY, SO WE CAN ACCESS THEM FROM ANY SCENE
        if (!this.registry.get('borrascal')) {
            const borrascal = new DistrictBorrascal(
                "Borrascal", "Any", 1000, 10, 100,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('borrascal', borrascal);
        }

        //FROM THIS POINT ON, TEST VALUES ONLY, LATER CHANGE TO ACTUAL ONES...
        if (!this.registry.get('sahar')) {
            const sahar = new DistrictSahar(
                "Sahar", "Any", 600, 20, 15,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('sahar', sahar);
        }

        if (!this.registry.get('somosagua')) {
            const somosagua = new DistrictSomosagua(
                "Somosagua", "Any", 800, 12, 10,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('somosagua', somosagua);
        }

        if (!this.registry.get('guinea')) {
            const guinea = new DistrictGuinea(
                "Guinea", "Any", 700, 14, 30,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('guinea', guinea);
        }

        if (!this.registry.get('nueva_pradera')) {
            const nuevaPradera = new DistrictNuevaPradera(
                "Nueva Pradera", "Any", 1400, 18, 5,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('nueva_pradera', nuevaPradera);
        }

        if (!this.registry.get('el_nido')) {
            const elNido = new DistrictElNido(
                "El Nido", "Any", 500, 8, 40,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('el_nido', elNido);
        }

        this.map = new Map({
            BORRASCAL: this.registry.get('borrascal'),
            SAHAR: this.registry.get('sahar'),
            SOMOSAGUA: this.registry.get('somosagua'),
            GUINEA: this.registry.get('guinea'),
            NUEVA_PRADERA: this.registry.get('nueva_pradera'),
            EL_NIDO: this.registry.get('el_nido')
        });
        this.registry.set('map', this.map);
    }

    create() {
        console.log("LEVEL");
        this.add.text(0, 0, "Level");      

        // LO QUE NECESITAMOS ES QUE SE CREE UNA VEZ Y LUEGO QUE TODAS LAS VARIABLES SE GUARDEN EN EL REGISTRY, ASI SI VOLVEMOS A LA ESCENA, NO SE RECREAN LOS ELEMENTOS, SOLO SE ACTUALIZAN LOS DATOS EN EL REGISTRY Y SE REFLEJAN EN LOS ELEMENTOS CREADOS.
        // ASSETS
        this.spawnAssets();
        // "HEADER"
        this.PopularityContainer = this.spawnPopularityBar();
        this.ConfigurationIcon = this.spawnConfigurationIcon();
        this.EnergyBar = this.spawnEnergyBar();
        // FOOTER
        this.Footer = this.spawnFooter();

        // ICONS - MISSING ONES FOR EACH
        this.closeIcon = null;
        this.missionIcon = null;
        this.missionTimer = this.time.delayedCall(1200, () => {
            this.spawnMissionIcon();
        });
        this.hl = this.add.graphics();

        this.useIdMap = this.textures.exists('map_id');
        this.idCanvas = null;
        this.idCtx = null;

        this.colorToDistrict = {
            '255,0,0': 'BORRASCAL'
        };

        //USED POLYGONS TO TRY TO TEST MOCK ZONE AREAS; WE CAN REFACTOR IF NEEDED TO FIT THE MAP BETTER LATER ON OR ANOTHER METHOD
        this.polygons = {
            SOMOSAGUA: new Phaser.Geom.Polygon([
                434, 876,
                467, 674,
                567, 539,
                801, 505,
                935, 640,
                868, 808,
                801, 977,
                634, 1078,
                501, 1044,
                467, 943
            ]),
            SAHAR: new Phaser.Geom.Polygon([
                668, 707,
                1001, 707,
                1101, 909,
                1202, 1415,
                834, 1415,
                668, 1280,
                601, 1078,
                601, 842
            ]),
            GUINEA: new Phaser.Geom.Polygon([
                834, 505,
                1368, 505,
                1569, 573,
                1569, 674,
                1335, 741,
                1001, 741,
                834, 640
            ]),
            BORRASCAL: new Phaser.Geom.Polygon([
                1402, 135,
                1902, 168,
                2103, 303,
                2169, 539,
                2036, 707,
                1736, 707,
                1502, 539,
                1368, 371
            ]),
            NUEVA_PRADERA: new Phaser.Geom.Polygon([
                1335, 606,
                1736, 573,
                2169, 741,
                2136, 1112,
                1869, 1179,
                1402, 1213,
                1202, 1078,
                1168, 775
            ]),
            EL_NIDO: new Phaser.Geom.Polygon([
                1068, 741,
                1202, 691,
                1368, 707,
                1435, 808,
                1368, 876,
                1202, 893,
                1101, 842
            ])
        };

        this.input.on('pointerdown', (p) => {
            const hit = this.pickDistrictAt(p.x, p.y);
            if (hit) {
                this.selectDistrict(hit);
            } else {
                this.clearSelection();
            }
        });

        this.input.on('pointermove', (p) => {
            const hit = this.pickDistrictAt(p.x, p.y);
            this.drawHover(hit);
        });

    }
    pickDistrictAt(screenX, screenY) {
        const local = this.toMapLocal(screenX, screenY);
        if (!local) return null;

        if (this.useIdMap) {
            const k = this.pickByIdMap(local.x, local.y);
            if (k) return k;
        }

        return this.pickByPolygons(local.x, local.y);
    }
    toMapLocal(screenX, screenY) {
        const s = this.mapImg.scaleX;
        const w = this.mapImg.width * s;
        const h = this.mapImg.height * s;

        if (screenX < this.mapImg.x || screenY < this.mapImg.y) return null;
        if (screenX > this.mapImg.x + w || screenY > this.mapImg.y + h) return null;

        const lx = (screenX - this.mapImg.x) / s;
        const ly = (screenY - this.mapImg.y) / s;
        return { x: lx, y: ly };
    }
    pickByPolygons(lx, ly) {
        for (const key of Object.keys(this.polygons)) {
            if (Phaser.Geom.Polygon.Contains(this.polygons[key], lx, ly)) return key;
        }
        return null;
    }
    ensureIdCanvas() {
        if (this.idCanvas) return;

        const img = this.textures.get('map_id').getSourceImage();
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        this.idCanvas = canvas;
        this.idCtx = ctx;
    }

    pickByIdMap(lx, ly) {
        try {
            this.ensureIdCanvas();
            const x = Math.floor(lx);
            const y = Math.floor(ly);
            const data = this.idCtx.getImageData(x, y, 1, 1).data;
            const key = `${data[0]},${data[1]},${data[2]}`;
            return this.colorToDistrict[key] || null;
        } catch (e) {
            return null;
        }
    }
    selectDistrict(key) { //ONCE WE CLICK ON EACH POLYGON, CHANGES WHAT HAPPENS, WE CAN ADD DISPLAY ANOTHER POP-UP TAB ONCE WE CLICK ON IT.

        const dist = this.map.getDistricts(key);
        if (!dist) {
            this.clearSelection();
            return;
        }
        this.d = dist;
        this.districtTitleText.setText(this.d.getName() + " - " + this.d.getDescription());
        this.drawSelection(key);
        
        if(dist.getName() == "Borrascal") {
            this.missionIcon.setVisible(false);
            const pos = this.mapToWorld(3400, 250);

            this.districtDetails = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'district').setOrigin(0.5);
            this.closeIcon = this.add.image(pos.x, pos.y, 'closeIcon').setOrigin(0.5).setScale(0.8).setInteractive({ useHandCursor: true });
            this.closeIcon.on('pointerover', () => {this.closeIcon.setScale(0.8);});
            this.closeIcon.on('pointerout', () => {this.closeIcon.setScale(0.6);});
            this.closeIcon.on('pointerup', () => {
                this.closeIcon.destroy();
                this.districtDetails.destroy();
                this.missionIcon.setVisible(true);
            });
        }
    }
    clearSelection() {
        this.popupBg.setVisible(false);
        this.popupText.setVisible(false);
        this.hl.clear();
    }
    drawSelection(key) {
        this.hl.clear();
        const s = this.mapImg.scaleX;

        if (this.polygons[key]) {
            const pts = this.polygons[key].points;
            this.hl.lineStyle(3, 0xff0000, 1);
            this.hl.beginPath();
            this.hl.moveTo(this.mapImg.x + pts[0].x * s, this.mapImg.y + pts[0].y * s);
            for (let i = 1; i < pts.length; i++) {
                this.hl.lineTo(this.mapImg.x + pts[i].x * s, this.mapImg.y + pts[i].y * s);
            }
            this.hl.closePath();
            this.hl.strokePath();
        }
    }
    drawHover(key) {
        if (!key) return;
        this.drawSelection(key);
    }
    
    spawnAssets() {
        this.mapImg = this.add.image(350, 100, 'map').setOrigin(0).setScale(0.3);
        this.cineImg = this.add.image(this.mapImg.x + 500, this.mapImg.y + 70, 'cine1real').setOrigin(0).setScale(0.07);
        this.fabricaImg = this.add.image(this.mapImg.x + 150, this.mapImg.y + 180, 'fabrica').setOrigin(0).setScale(0.07);
        this.presidente = this.add.image(175, 200, 'presidente').setDisplaySize(350, 500);
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
        this.popularityText = this.add.text(barX + barWidth / 2, barY + barHeight / 2, 'Popularity: ' + this.player.getPopularity() + '%', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
        this.corruptionBarbg = this.add.rectangle(barX, barY + barHeight + 20, barWidth, barHeight, 0x000000).setOrigin(0);
        this.corruptionBarFill = this.add.rectangle(barX, barY + barHeight + 20, barWidth * (this.player.getCorruption() / 100), barHeight, 0xff0000).setOrigin(0);
        this.corruptionText = this.add.text(barX + barWidth / 2, barY + barHeight + 25, 'Corruption: ' + this.player.getCorruption() + '%', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
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
            this.missionIcon.setVisible(false);
            this.blackMarketDetails = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'blackMarket').setOrigin(0.5).setScale(0.8);
            
            const pos = this.mapToWorld(3163, 70);
            this.closeIcon = this.add.image(pos.x, pos.y, 'closeIcon').setOrigin(0.5).setScale(1).setInteractive({ useHandCursor: true });
            this.closeIcon.on('pointerover', () => {this.closeIcon.setScale(1);});
            this.closeIcon.on('pointerout', () => {this.closeIcon.setScale(1);});
            this.closeIcon.on('pointerup', () => {
                this.blackMarketDetails.destroy();
                this.closeIcon.destroy();
                this.missionDetails.destroy();
                this.missionIcon.setVisible(true);
            });

            //this.scene.start('configuration', { from: 'level' });
        });
    }
    spawnMissionIcon() {
        if (this.missionIcon) return;
        const pos = this.mapToWorld(880, 1120);

        this.missionIcon = this.add.image(pos.x, pos.y, 'missionIcon').setOrigin(0.5).setScale(0.08).setInteractive({ useHandCursor: true });
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
    spawnMissionTypeTwoChoices(){
    }
    mapToWorld(mx, my) {
        const s = this.mapImg.scaleX;
        return {
            x: this.mapImg.x + mx * s,
            y: this.mapImg.y + my * s
        };
    }
}