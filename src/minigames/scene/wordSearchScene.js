import Phaser from 'phaser';
import { WORD_SEARCH_WORDS } from '../data/mgConfig';

export default class wordSearchScene extends Phaser.Scene {
    constructor() {
        super({ key: 'wordSearchMiniGame' });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(width / 2, height / 2, 'fondoWordSearch').setOrigin(0.5);

        this.gameManager = this.registry.get('gameManager');

        this.rows = 10;
        this.cols = 10;

        this.finished = false;
        this.isDragging = false;
        this.selectedTiles = [];
        this.wordsFoundList = [];
        this.wordsFound = 0;


        this.wordsToFind = Phaser.Utils.Array.GetRandom(WORD_SEARCH_WORDS);

        this.colors = {
            emptyTile: 0xffffff,
            emptyAlpha: 0,
            text: '#e0e0e0',
            highlight: 0xe8f056,
            highlightAlpha: 0.6,
        }

        const UI_X = width * 0.9;

        this.add.text(width * 0.85, 80, 'SOPA DE LETRAS', {
            fontSize: '48px',
            fontStyle: 'bold',
            color: this.colors.text,
            fontFamily: 'Courier New',
            align: 'center'
        }).setOrigin(0.5);

        this.statusText = this.add.text(UI_X, 160, 'Arrastra el puntador para jugar', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: 250 }
        }).setOrigin(0.5);

        this.maxTimeLimit = 120;
        this.gameStarted = false;
        this.startTime = this.time.now;

        this.timerText = this.add.text(UI_X, 200, `Tiempo: ${this.maxTimeLimit}s`, {
            fontSize: '24px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.wordListTexts = {};
        const wordListX = width * 0.89;
        let listStartY = 280;

        this.wordsToFind.forEach((word, index) => {
            let textObj = this.add.text(wordListX, listStartY + (index * 35), word, {
                fontSize: '24px',
                fontStyle: 'bold',
                color: '#000',
                fontFamily: 'Courier New',
                align: 'center'
            }).setOrigin(0.5);

            this.wordListTexts[word] = textObj;
        })

        this.createGrid(width, height);

        this.input.on('pointerup', () => this.endDrag());
    }

    update(time) {
        if (this.gameStarted && !this.finished) {
            const sec = Math.floor((time - this.startTime) / 1000);
            const secLeft = this.maxTimeLimit - sec;
            if (secLeft > 0)
                this.timerText.setText(`Tiempo: ${secLeft}s`);
            else {
                this.timerText.setText(`Tiempo: 0s`);
                this.timeUp();
            }
        }
    }

    createGrid(width, height) {
        this.grid = [];
        const boxSize = 60;
        const gap = 15;
        const totalWidth = this.cols * boxSize + (this.cols - 1) * gap;

        const margin = 20; 
        const startX = margin; 
        const startY = margin;

        const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let invisibleGrid = [];
        for (let r = 0; r < this.rows; r++)
            invisibleGrid[r] = new Array(this.cols).fill('');

        const directions = [
            [1, 0],
            [0, 1],
            [1, 1],
            [-1, 1]
        ];

        this.wordsToFind.forEach(word => {
            let done = false;
            let attempts = 0;

            while (!done && attempts < 100000) {
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const startRow = Math.floor(Math.random() * this.rows);
                const startCol = Math.floor(Math.random() * this.cols);

                let avail = true;

                for (let i = 0; i < word.length; i++) {
                    const r = startRow + (i * dir[0]);
                    const c = startCol + (i * dir[1]);

                    if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
                        avail = false;
                        break;
                    }

                    if (invisibleGrid[r][c] !== '') {
                        avail = false;
                        break;
                    }
                }

                if (avail) {
                    for (let i = 0; i < word.length; i++) {
                        const r = startRow + (i * dir[0]);
                        const c = startCol + (i * dir[1]);

                        invisibleGrid[r][c] = word[i];
                    }

                    done = true;
                }

                attempts++;
            }

            if (!done) //CHECK
                console.warn(`WORD NOT PLACED (${word})`);
        });

        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];

            for (let c = 0; c < this.cols; c++) {
                const x = startX + (c * (boxSize + gap));
                const y = startY + (r * (boxSize + gap));

                //ACTUAL WORDS
                let charVal = invisibleGrid[r][c];
                if (charVal === '')
                    charVal = alph[Math.floor(Math.random() * alph.length)];

                const rect = this.add.rectangle(x, y, boxSize, boxSize, this.colors.emptyTile, this.colors.emptyAlpha)
                    .setStrokeStyle(2, 0xaba6a6, 0.2)
                    .setOrigin(0)
                    .setInteractive({ useHandCursor: true });

                const text = this.add.text(x + (boxSize / 2), y + (boxSize / 2), charVal, {
                    fontSize: '24px',
                    fontStyle: 'bold',
                    color: '#000000',
                    fontFamily: 'Courier New'
                }).setOrigin(0.5);

                const tile = { rect, text, r, c, letter: charVal, matched: false };
                this.grid[r][c] = tile;

                rect.on('pointerdown', () => this.startDrag(tile));
                rect.on('pointerover', () => this.handleDragOver(tile));
            }
        }
    }

    startDrag(tile) {
        if (this.finished || tile.matched)
            return;

        if(!this.gameStarted){
            this.gameStarted = true;
            this.startTime = this.time.now;
        }

        this.isDragging = true;
        this.selectedTiles = [tile];
        tile.rect.setFillStyle(this.colors.highlight, this.colors.highlightAlpha);
    }

    handleDragOver(tile) {
        if (!this.isDragging || this.finished || tile.matched)
            return;

        if (!this.selectedTiles.includes(tile)) {
            this.selectedTiles.push(tile);
            tile.rect.setFillStyle(this.colors.highlight, this.colors.highlightAlpha);
        }
    }

    endDrag() {
        if (!this.isDragging || this.finished)
            return;

        this.isDragging = false;

        const selectedWord = this.selectedTiles.map(t => t.letter).join('');
        const reverseWord = selectedWord.split('').reverse().join('');
        const match = [selectedWord, reverseWord].find(w => this.wordsToFind.includes(w));

        if (match && !this.wordsFoundList.includes(match)) {
            this.wordsFound++;
            this.wordsFoundList.push(match);

            if (this.wordListTexts[match]) {
                const foundWord = this.wordListTexts[match];
                foundWord.setColor('#888888');
                this.add.rectangle(foundWord.x, foundWord.y, foundWord.width + 10, 3, 0x888888);
            }

            this.selectedTiles.forEach(t => {
                t.matched = true;
                t.rect.setFillStyle(0x000000);
                t.rect.setStrokeStyle(2, 0x000000);
                t.text.setColor('#000000');
            });

            if (this.wordsFound == this.wordsToFind.length)
                this.finishGame();
        } else {
            this.selectedTiles.forEach(t => {
                if (t.matched){
                    t.rect.setFillStyle(0x000000);
                    t.rect.setStrokeStyle(2, 0x000000);
                }else{
                    t.rect.setFillStyle(this.colors.emptyTile, this.colors.emptyAlpha);
                    t.rect.setStrokeStyle(2, 0xaba6a6, 0.2);
                }
            });
        }

        this.selectedTiles = [];
    }

    finishGame() {
        this.finished = true;

        const width = this.scale.width;
        const height = this.scale.height;

        this.bg = this.add.rectangle(0,0,this.scale.width,this.scale.height,0x000000,0.5).setOrigin(0).setDepth(19);


        this.add.text(width / 2, height / 2.5, '¡Detalles ocultados!', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            color: '#46c83d',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(20);

        this.time.delayedCall(4000, () => {
            this.scene.stop();
            this.registry.set('flagShow', false);
            this.scene.get('gameScene').scene.restart();
        });
    }

    timeUp() {
        this.finished = true;

        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width / 2, height / 2.5, 'TIEMPO AGOTADO', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            color: '#ff3333',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);

        this.time.delayedCall(4000, () => {
            this.scene.stop();
            this.registry.set('flagShow', false);
            this.scene.get('gameScene').scene.restart();
        });
    }
}