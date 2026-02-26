import DistrictBorrascal from './map/district/districtBorrascal.js';
import DistrictSahar from './map/district/districtSahar.js';
import DistrictSomosagua from './map/district/districtSomosagua.js';
import DistrictElNido from './map/district/districtElNido.js';
import DistrictGuinea from './map/district/districtGuinea.js';
import DistrictNuevaPradera from './map/district/districtNuevaPradera.js';
import Map from './map/map.js';
import Phaser from 'phaser';

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
        //this.d = this.registry.get('borrascal');    //WE WILL NEED TO CREATE 1 OF THIS FOR EACH DISTRICT, AND THEN CREATE A MAP TO STORE THEM ALL IN THE REGISTRY, SO WE CAN ACCESS THEM FROM ANY SCENE
        this.districtTitleText = this.add.text(0, 50,"" );
        this.populationText = this.add.text(0, 100,"");
        this.populationIncreaseText = this.add.text(0, 150,"");
        this.satisfactionText = this.add.text(0, 200,"");

        const configBtn = this.add.text(200, 0, 'Configuration', { fontSize: '18px', backgroundColor: '#0066cc', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        configBtn.on('pointerover', () => configBtn.setStyle({ backgroundColor: '#005bb5' }));
        configBtn.on('pointerout', () => configBtn.setStyle({ backgroundColor: '#0066cc' }));
        configBtn.on('pointerup', () => {
            this.scene.start('configuration', { from: 'level' });
        });
        
        this.mapImg = this.add.image(350, 100, 'map').setOrigin(0).setScale(0.3);
        this.cineImg = this.add.image(this.mapImg.x + 500, this.mapImg.y + 70, 'cine1real').setOrigin(0).setScale(0.07);
        this.fabricaImg = this.add.image(this.mapImg.x + 150, this.mapImg.y + 180, 'fabrica').setOrigin(0).setScale(0.07);
        this.fabricaNuevaImg = this.add.image(200, 200, 'fabrica').setDisplaySize(350, 500);

        this.popupBg = this.add.rectangle(750, 60, 620, 70, 0x000000, 0.75).setVisible(false);
        this.popupText = this.add.text(470, 40, '', { fontSize: '22px', color: '#ffffff' }).setVisible(false);

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
        //updates the district text now..
        this.districtTitleText.setText(this.d.getName() + " - " + this.d.getDescription());

        this.populationText.setText("Población: " + this.d.getPopulationDensity());
        this.populationIncreaseText.setText("Aumento de población: " + this.d.getPopulationIncrease());
        this.satisfactionText.setText("Satisfacción: " + this.d.getSatisfaction());

        this.popupBg.setVisible(true);
        this.popupText.setVisible(true);
        this.popupText.setText(`${this.d.getName()} seleccionado`);

        this.drawSelection(key);

        const increaseBtn = this.add.text(200, 50, '+ Population', { fontSize: '18px', backgroundColor: '#228822', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        increaseBtn.on('pointerover', () => increaseBtn.setStyle({ backgroundColor: '#1f7a1f' }));
        increaseBtn.on('pointerout', () => increaseBtn.setStyle({ backgroundColor: '#228822' }));
        increaseBtn.on('pointerup', () => {
            this.map.modifyDistrict(key,1000)
            this.populationText.setText('Población: ' + this.d.getPopulationDensity());
        });
        const decreaseBtn = this.add.text(200, 100, '- Population', { fontSize: '18px', backgroundColor: '#882222', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        decreaseBtn.on('pointerover', () => decreaseBtn.setStyle({ backgroundColor: '#7a1f1f' }));
        decreaseBtn.on('pointerout', () => decreaseBtn.setStyle({ backgroundColor: '#882222' }));
        decreaseBtn.on('pointerup', () => {
            this.map.modifyDistrict(key,-1000)
            this.populationText.setText('Población: ' + this.d.getPopulationDensity());
        }); 

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
}