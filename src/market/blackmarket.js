import Phaser from 'phaser';

const PRODUCTS = [
    {
        id: 'prensa',
        name: 'SOBORNAR A LA PRENSA',
        desc: 'A cambio de un generoso donativos, los períodicos pueden hablar bien de tu persona, reduciendo un 20% el nivel de corrupción percibida por el pueblo.',
        image: 'pensa_icon',
        basePrice: 23500,
        limit: Infinity,
        multiplier: 1.5,
        effect: (player) => {
            const current = player.getCorruption();
            const reduction = current * 0.2;
            player.updateCorruption(-reduction);
        }
    },
    {
        id: 'hotel',
        name: 'HOTELES DE PAGO GENERAL',
        desc: 'Al desviar fondos de la ciudad a la construcción de hoteles privados, el coste de estos se reduce un 15%.',
        image: 'hotel_icon',
        basePrice: 12750,
        limit: 1,
        effect: (player) => { console.log("-> Los Hoteles ahora son más baratos!! :D"); } // Bueno, esto de momento valdrá...
    },
];

export default class BlackMarket extends Phaser.Scene {
    constructor() {
        super({ key: 'blackmarket' });
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        const rojo = 0xbe1e2d;

        this.player = this.registry.get('player');
        
        this.add.rectangle(0, 0, gameWidth, gameHeight, rojo, 0.85).setOrigin(0);
        
        // Titulo
        this.add.text(gameWidth / 2, 40, 'MERCADO NEGRO', { 
            fontFamily: 'Climate Crisis',
            fontSize: '40px', 
            color: '#ffcc00' 
        }).setOrigin(0.5);

        // Cantidad de dinero disponible
        this.drawRoundBox(50, 30, 300, 50, 0x8fd886, 0x0e6e1e, 4).setDepth(1);
        this.moneyText = this.add.text(200, 55, `DINERO: ${this.player.getMoney()} $`,  {
            fontFamily: 'Courier New',
            fontSize: '22px',
            color: '#0e6e1e'
        }).setOrigin(0.5).setDepth(2);
        this.moneyText.setStroke('#0e6e1e', 3);

        this.updateCorruptionBar(gameWidth, gameHeight); // Barra de corrupción
        this.createProductsList(); // Lista de productos

        // Imagen del vendedor
        this.vendedor = this.add.image(gameWidth - 250, gameHeight / 2, 'vendedor');
        this.vendedor.setOrigin(0.5).setScale(0.8);
        this.vendedor.setDepth(0);

        // Botón de volver
        const backButton = this.add.text(gameWidth - 180, gameHeight - 50, 'VOLVER AL MAPA', { 
            fontFamily: 'Courier New',
            fontSize: '30px', 
            fontWeight: 'bold',
            backgroundColor: '#000',
            padding: 10
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(10);

        backButton.on('pointerup', () => {
            this.scene.start('level');
        });
    }

    createProductsList() {
        let startY = 150;

        PRODUCTS.forEach((product) => {
            let amountBought = this.registry.get(`buy_count_${product.id}`) || 0;

            let currentPrice = Math.floor(product.basePrice * Math.pow(product.multiplier || 1, amountBought));
            let outOfStock = product.limit !== Infinity && amountBought >= product.limit;

            const card = this.add.container(50, startY);
            const bg = this.add.rectangle(0, 0, 800, 180, 0xffffff, 0.2).setOrigin(0).setStrokeStyle(2, 0xffffff, 1);
            const img_bg = this.add.rectangle(15, 25, 130, 130, 0x000000, 0.4).setOrigin(0);
            let img;
            if (this.textures.exists(product.image)) {
                img = this.add.image(80, 90, product.image);
                img.setDisplaySize(120, 120)
            } else {
                img = this.add.text(80, 80, '?', {
                    fontFamily: 'Margarine',
                    fontSize: '48px',
                    color: '#666'
                }).setOrigin(0.5);
            }
            const name = this.add.text(180, 20, product.name, {
                fontFamily: 'Climate Crisis',
                fontSize: '22px',
                color: '#ffcc00'
            });
            const desc = this.add.text(180, 60, product.desc, {
                fontFamily: 'Courier New',
                fontSize: '16px',
                wordWrap: { width: 600 },
                color: '#000'
            });
            const price = this.add.text(450, 130, `${currentPrice} $`, {
                fontFamily: 'Courier New',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#0e6e1e'
            }).setStroke('#0e6e1e', 2);

            const btnColor = outOfStock ? 0x666666 : 0x44ff44;
            const btnText = outOfStock ? 'AGOTADO' : 'COMPRAR';
            const btnBuy = this.add.container(675, 140);
            const btnBg = this.add.rectangle(0, 0, 150, 40, btnColor).setInteractive({ useHandCursor: true });
            const btnLabel = this.add.text(0, 0, btnText, {
                color: '#000',
                fontWeight: 'bold'
            }).setOrigin(0.5);
            btnBuy.add([btnBg, btnLabel]);

            if (!outOfStock) {
                btnBg.on('pointerup', () => {
                    if (this.player.getMoney() >= currentPrice) {
                        this.player.updateMoney(-currentPrice);
                        product.effect(this.player);
                        this.registry.set(`buy_count_${product.id}`, amountBought + 1);
                        this.cameras.main.flash(300, 0, 255, 0);
                        this.scene.restart();
                    } else {
                        this.cameras.main.shake(200, 0.005);
                    }
                });
            }

            card.add([bg, img_bg, img, name, desc, price, btnBuy]);
            startY += 200;
        });
    }

    updateCorruptionBar(w, h) {
        const x = 50;
        const y = h - 90;
        const width = 550;
        const height = 70;

        this.drawRoundBox(x, y, width, height, 0xffffff, 0x000000);

        const label = this.add.text(x + 25, y + 25, 'CORRUPCIÓN:', {
            fontFamily: 'Courier New',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000000'
        }).setStroke('#000', 2);

        const barX = x + 170;
        const barY = y + 20;
        const barWidth = 330;
        const barHeight = 30;

        const bg = this.add.rectangle(barX, barY, barWidth, barHeight, 0x333333).setOrigin(0);
        const fillPercent = Math.max(0, this.player.getCorruption() / 100);
        const fill = this.add.rectangle(barX, barY, barWidth * fillPercent, barHeight, 0xff0000).setOrigin(0);
    }

    drawRoundBox(x, y, width, height, color, strokeColor) {
        const g = this.add.graphics();
        const radius = 15;

        g.fillStyle(color, 1);
        g.fillRoundedRect(x, y, width, height, radius);
        g.lineStyle(4, strokeColor, 1);
        g.strokeRoundedRect(x, y, width, height, radius);

        return g;
    }
}