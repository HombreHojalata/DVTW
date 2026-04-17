import Phaser from 'phaser';

export default class memoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'memoryMiniGame' });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.gameManager = this.registry.get('gameManager');

        this.rows = 4;
        this.cols = 4;
        this.totalCards = this.rows * this.cols;

        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
        this.matchedPairs = 0;
        this.moves = 0;
        this.finished = false;

        this.colors = {
            bg: 0x121213,
            panel: 0x1a1a1b,
            cardBack: 0x3a3a3c,
            cardFront: 0xf5f5f5,
            matched: 0x538d4e,
            text: '#ffffff',
            textDark: '#121213'
        };

        this.add.image(width / 2, height / 2, 'fondoMemory');

        this.add.text(width / 2, 50, 'MEMORY', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: this.colors.text,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(width / 2, 90, 'Find all the matching pairs', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.statusText = this.add.text(width / 2, height - 35, 'Click two cards', {
            fontSize: '18px',
            color: '#d7dadc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.movesText = this.add.text(20, 20, 'Moves: 0', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial'
        });

        this.createBoard(width, height);
    }

    createBoard(width, height) {
        this.cards = [];

        const cardW = 90;
        const cardH = 110;
        const gapX = 14;
        const gapY = 14;

        const totalWidth = this.cols * cardW + (this.cols - 1) * gapX;
        const totalHeight = this.rows * cardH + (this.rows - 1) * gapY;

        const startX = (width - totalWidth) / 2 +30;
        const startY = 180;

        const values = this.generatePairs();
        this.cardData = values;

        for (let r = 0; r < this.rows; r++) {
            this.cards[r] = [];

            for (let c = 0; c < this.cols; c++) {
                const index = r * this.cols + c;
                const value = values[index];

                const x = startX + c * (cardW + gapX);
                const y = startY + r * (cardH + gapY);

                const container = this.add.container(x, y);

                const back = this.add.rectangle(0, 0, cardW, cardH, this.colors.cardBack)
                    .setStrokeStyle(3, 0x000000);

                const front = this.add.rectangle(0, 0, cardW, cardH, this.colors.cardFront)
                    .setStrokeStyle(3, 0x000000);
                front.setVisible(false);

                const image = this.add.image(0, 0, value).setVisible(false);
                image.setDisplaySize(cardW, cardH);

                container.add([back, front, image]);
                container.setSize(cardW, cardH);
                back.setInteractive({ useHandCursor: true });
                back.on('pointerup', () => {
                    this.handleCardClick(r, c);
                });

                this.cards[r][c] = {
                    container,
                    back,
                    front,
                    image,
                    value,
                    flipped: false,
                    matched: false
                };
            }
        }
    }

    generatePairs() {
        const symbols = [
            'memoryImage1',
            'memoryImage2',
            'memoryImage3',
            'memoryImage4',
            'memoryImage5',
            'memoryImage6',
            'memoryImage7',
            'memoryImage8'
        ];
        const pairs = [...symbols, ...symbols];

        Phaser.Utils.Array.Shuffle(pairs);

        return pairs;
    }

    handleCardClick(row, col) {
        if (this.finished || this.lockBoard) return;

        const card = this.cards[row][col];
        if (card.flipped || card.matched) return;

        this.flipCard(card);

        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }

        this.secondCard = card;
        this.lockBoard = true;
        this.moves++;
        this.movesText.setText(`Moves: ${this.moves}`);

        if (this.firstCard.value === this.secondCard.value) {
            this.time.delayedCall(350, () => {
                this.firstCard.matched = true;
                this.secondCard.matched = true;

                this.firstCard.front.setFillStyle(this.colors.matched);
                this.secondCard.front.setFillStyle(this.colors.matched);

                this.matchedPairs++;

                this.resetTurn();

                if (this.matchedPairs === this.totalCards / 2) {
                    this.winGame();
                }
            });
        } else {
            this.time.delayedCall(700, () => {
                this.unflipCard(this.firstCard);
                this.unflipCard(this.secondCard);
                this.resetTurn();
            });
        }
    }

    flipCard(card) {
        card.flipped = true;
        card.back.setVisible(false);
        card.front.setVisible(true);
        card.image.setVisible(true);

        card.container.setScale(1.03);
        this.tweens.add({
            targets: card.container,
            scaleX: 1,
            scaleY: 1,
            duration: 120
        });
    }

    unflipCard(card) {
        card.flipped = false;
        card.back.setVisible(true);
        card.front.setVisible(false);
        card.image.setVisible(false);
    }

    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }

    winGame() {
        this.finished = true;
        this.statusText.setText('You win! All pairs found.');

        this.time.delayedCall(2500, () => {
            this.scene.stop();
            this.registry.set('flagShow', false);
            this.scene.get('gameScene').scene.restart();
        });
    }
}