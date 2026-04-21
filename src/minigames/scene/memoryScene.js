import Phaser from 'phaser';

export default class memoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'memoryMiniGame' });
    }

    create() {
        //obtener dimensiones de la pantalla
        const width = this.scale.width;
        const height = this.scale.height;

        this.gameManager = this.registry.get('gameManager');

        this.rows = 4;
        this.cols = 4;
        this.totalCards = this.rows * this.cols;

        //variables de el estado del juego
        this.firstCard = null; //primera carta seleccionada
        this.secondCard = null; //segunda
        this.lockBoard = false; //para bloquear cuando estamos eligiendo la segunda carta
        this.matchedPairs = 0; //contador de parejas
        this.moves = 0; //contador de movimientos
        this.finished = false;

        this.colors = {
            text: '#ffffff',
            textDark: '#121213'
        };

        //imagen de fondo
        this.add.image(width / 2, height / 2, 'fondoMemory');

        this.UI_X = width * 0.8;

        //textos
        this.add.text(this.UI_X, 150, 'MEMORY', {
            fontSize: '60px',
            fontStyle: 'bold',
            color: this.colors.text,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(this.UI_X, 230, 'Encuentra todas las parejas', {
            fontSize: '22px',
            color: '#d7dadc',
            fontFamily: 'Arial',
            align: 'center',
        }).setOrigin(0.5);

        this.movesText = this.add.text(this.UI_X, 350, 'Movimientos: 0', {
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.statusText = this.add.text(this.UI_X, height - 100, 'Selecciona dos cartas', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.createBoard(width, height);
    }

    createBoard(width, height) {
        this.cards = [];

        //tamano de los papeles
        const cardW = 155; 
        const cardH = 185; 
        const gapX = 50;
        const gapY = 10;

        //dimension ocupada por la cuadricula
        const totalWidth = this.cols * cardW + (this.cols - 1) * gapX;
        const totalHeight = this.rows * cardH + (this.rows - 1) * gapY;

        const startX = (width * 0.05) + (cardW / 2);
        const startY = (height - totalHeight) / 2 + (cardH / 2);

        const values = this.generatePairs();
        this.cardData = values;

        //crear las cartas
        for (let r = 0; r < this.rows; r++) {
            this.cards[r] = [];

            for (let c = 0; c < this.cols; c++) {
                const index = r * this.cols + c;
                const value = values[index];

                const x = startX + c * (cardW + gapX);
                const y = startY + r * (cardH + gapY);

                const container = this.add.container(x, y);

                //elegir un diseño de papel aleatorio
                const randomRetroKey = `retro${Phaser.Math.Between(1, 7)}`;
                
                const back = this.add.image(0, 0, randomRetroKey);
                back.setDisplaySize(cardW, cardH);

                //el front usa la misma imagen que el back (es el mismo papel)
                const front = this.add.image(0, 0, randomRetroKey); 
                front.setDisplaySize(cardW, cardH);
                front.setVisible(false);

                //r otacion aleatoria
                container.setAngle(Phaser.Math.Between(-5, 5));

                //icono del back
                const image = this.add.image(0, 0, value).setVisible(false);
                image.setDisplaySize(cardW * 0.7, cardH * 0.7);

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
        this.movesText.setText(`Movimientos: ${this.moves}`);

        if (this.firstCard.value === this.secondCard.value) {
            this.time.delayedCall(350, () => {
                this.firstCard.matched = true;
                this.secondCard.matched = true;

                this.matchedPairs++;

                this.resetTurn();

                if (this.matchedPairs === this.totalCards / 2) {
                    this.finishGame();
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

  finishGame() {
        //TODO: que se implemente la logica para dar dinero segun el rendimiento 
        const width = this.scale.width;
        const height = this.scale.height;
        this.finished = true;

        this.statusText.setText('¡Buen trabajo! Todas las parejas encontradas.');

        this.finishText1 = this.add.text(width / 2, height / 2.5,'', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
            wordWrap: { width: width * 0.7 }
        }).setOrigin(0.5);
        this.finishText2 = this.add.text(width / 2, height / 2.5 + 200, '', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
            wordWrap: { width: width * 0.7 }
        }).setOrigin(0.5);
       
        // TOTAL MIN 8 MOVES
        if (this.moves <= 12) {
            this.finishText1.setText('¡Excelente memoria! Has encontrado todas las parejas en un tiempo récord.').setColor('#5378af');
            this.finishText2.setText('¡Has ganado X dinero!').setColor('#53af53');  //100%
        }
        else if (this.moves <= 16) {
            this.finishText1.setText('¡Muy bien! Has encontrado todas las parejas en un tiempo aceptable.').setColor('#5378af');
            this.finishText2.setText('¡Has ganado X dinero!').setColor('#53af53');  //75%
        }
        else if (this.moves <= 20) {
            this.finishText1.setText('¡Buen trabajo! Has encontrado todas las parejas, pero podrías mejorar tu memoria.').setColor('#5378af');
            this.finishText2.setText('¡Has ganado X dinero!').setColor('#53af53');  //50%
        }
        else if (this.moves <= 24) {
            this.finishText1.setText('Has encontrado todas las parejas, pero tu memoria necesita trabajo.').setColor('#5378af');
            this.finishText2.setText('¡Has ganado X dinero!').setColor('#53af53');  //25%
        }
        else {
            this.finishText1.setText('Has encontrado todas las parejas, pero este no es tu juego.').setColor('#5378af');
            this.finishText2.setText('¡No has ganado nada!').setColor('#af5b53');  //0%
        }

        this.time.delayedCall(5000, () => {
            this.scene.stop();
            this.registry.set('flagShow', false);
            this.scene.get('gameScene').scene.restart();
        });

    }
}