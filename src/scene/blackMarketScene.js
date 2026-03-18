import Phaser from 'phaser';
import { PRODUCTS } from '../market/products.js';

export default class BlackMarketScene extends Phaser.Scene {
    constructor() {
        super({ key: 'blackmarket' });
    }

    init(data) {
        this.currentPage = data.page || 0;
        this.itemsPerPage = 3;
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        this.gameManager = this.registry.get('gameManager');
        this.player = this.gameManager.getPlayer();

        this.add.rectangle(0, 0, gameWidth, gameHeight, 0xbe1e2d, 0.85).setOrigin(0);

        if (this.buyFlash) {
            this.cameras.main.flash(150, 100, 255, 100);
            this.buyFlash = false;
        }

        this.add.text(gameWidth / 2, 40, 'MERCADO NEGRO', {
            fontFamily: 'Climate Crisis',
            fontSize: '40px',
            color: '#ffcc00'
        }).setOrigin(0.5);

        this.drawRoundBox(50, 30, 300, 50, 0x8fd886, 0x0e6e1e).setDepth(1);

        this.moneyText = this.add.text(200, 55, `DINERO: ${this.player.getMoney()} $`, {
            fontFamily: 'Courier New',
            fontSize: '22px',
            color: '#0e6e1e'
        }).setOrigin(0.5).setDepth(2);

        this.moneyText.setStroke('#0e6e1e', 3);

        this.updateCorruptionBar(gameWidth, gameHeight);
        this.renderProducts();
        this.createTabsButtons(gameWidth, gameHeight);

        this.vendedor = this.add.image(gameWidth - 250, gameHeight / 2, 'vendedor');
        this.vendedor.setOrigin(0.5).setScale(0.8);
        this.vendedor.setDepth(0);

        const backButton = this.add.text(gameWidth - 180, gameHeight - 50, 'VOLVER AL MAPA', {
            fontFamily: 'Courier New',
            fontSize: '30px',
            fontWeight: 'bold',
            backgroundColor: '#000',
            padding: 10
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(10);

        backButton.on('pointerup', () => {
            this.scene.resume('level');
            this.scene.stop();
        });
    }

    renderProducts() {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const currentProducts = PRODUCTS.slice(start, end);

        let startY = 130;

        currentProducts.forEach((product) => {
            let amountBought = this.registry.get(`buy_count_${product.id}`) || 0;
            let currentPrice = product.price;

            if (amountBought > 0) {
                const operator = product.priceStep[0];
                const value = parseFloat(product.priceStep.slice(1));

                if (operator === '*') {
                    currentPrice = Math.floor(product.price * Math.pow(value, amountBought));
                } else if (operator === '+') {
                    currentPrice = Math.floor(product.price + (value * amountBought));
                }
            }

            let outOfStock = product.limit !== Infinity && amountBought >= product.limit;
            this.createProductCard(product, currentPrice, outOfStock, amountBought, startY);
            startY += 190;
        });
    }

    createProductCard(product, price, outOfStock, amountBought, y) {
        const container = this.add.container(50, y);

        const bg = this.add.rectangle(0, 0, 800, 175, 0xffffff, 0.2)
            .setOrigin(0)
            .setStrokeStyle(2, 0xffffff, 1);

        const img_bg = this.add.rectangle(15, 22, 130, 130, 0x000000, 0.4).setOrigin(0);

        let img;
        if (this.textures.exists(product.image)) {
            img = this.add.image(80, 90, product.image);
            img.setDisplaySize(120, 120);
        } else {
            img = this.add.text(80, 80, '?', {
                fontFamily: 'Margarine',
                fontSize: '48px',
                color: '#333333'
            }).setOrigin(0.5);
        }

        const name = this.add.text(180, 20, product.name, {
            fontFamily: 'Climate Crisis',
            fontSize: '20px',
            color: '#ffcc00'
        });

        const desc = this.add.text(180, 60, product.desc, {
            fontFamily: 'Courier New',
            fontSize: '16px',
            wordWrap: { width: 600 },
            color: '#333333'
        });

        const priceText = this.add.text(450, 130, `${price} $`, {
            fontFamily: 'Courier New',
            fontSize: '22px',
            color: '#0e6e1e'
        }).setStroke('#0e6e1e', 2);

        const btnColor = outOfStock ? 0x666666 : 0x44ff44;
        const btnText = outOfStock ? 'AGOTADO' : 'COMPRAR';

        const btnBg = this.add.rectangle(680, 140, 150, 45, btnColor)
            .setInteractive({ useHandCursor: !outOfStock });

        const btnLabel = this.add.text(680, 140, btnText, {
            color: '#000',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        if (!outOfStock) {
            btnBg.on('pointerup', () => {
                if (this.player.getMoney() >= price) {
                    this.player.updateMoney(-price);
                    product.effect(this.player);

                    this.registry.set(`buy_count_${product.id}`, amountBought + 1);
                    this.buyFlash = true;

                    this.scene.restart({ page: this.currentPage });
                } else {
                    this.cameras.main.shake(200, 0.005);
                }
            });
        }

        container.add([bg, img_bg, img, name, desc, priceText, btnBg, btnLabel]);
    }

    createTabsButtons(w, h) {
        const totalPages = Math.ceil(PRODUCTS.length / this.itemsPerPage);
        if (totalPages <= 1) return;

        if (this.currentPage > 0) {
            const prevBtn = this.add.text(350, h - 140, '◀', {
                fontSize: '20px',
                backgroundColor: '#000',
                padding: 10
            }).setInteractive({ useHandCursor: true });

            prevBtn.on('pointerup', () => {
                this.scene.restart({ page: this.currentPage - 1 });
            });
        }

        if (this.currentPage < totalPages - 1) {
            const nextBtn = this.add.text(500, h - 140, '▶', {
                fontSize: '20px',
                backgroundColor: '#000',
                padding: 10
            }).setInteractive({ useHandCursor: true });

            nextBtn.on('pointerup', () => {
                this.scene.restart({ page: this.currentPage + 1 });
            });
        }

        this.add.text(450, h - 125, `${this.currentPage + 1} / ${totalPages}`, {
            fontSize: '18px'
        }).setOrigin(0.5);
    }

    updateCorruptionBar(w, h) {
        const x = 50;
        const y = h - 90;
        const width = 550;
        const height = 70;

        this.drawRoundBox(x, y, width, height, 0xffffff, 0x000000);

        this.add.text(x + 25, y + 25, 'CORRUPCIÓN:', {
            fontFamily: 'Courier New',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000000'
        }).setStroke('#000', 2);

        const barX = x + 170;
        const barY = y + 20;
        const barWidth = 330;
        const barHeight = 30;

        this.add.rectangle(barX, barY, barWidth, barHeight, 0x333333).setOrigin(0);

        const fillPercent = Phaser.Math.Clamp(this.player.getCorruption(), 0, 100) / 100;
        this.add.rectangle(barX, barY, barWidth * fillPercent, barHeight, 0xff0000).setOrigin(0);

        this.add.text(barX + barWidth + 20, barY + barHeight / 2, `${Math.floor(this.player.getCorruption())}%`, {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
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