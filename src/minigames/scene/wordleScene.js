import Phaser from 'phaser';
import { WORDLE_WORDS } from '../data/mgConfig.js';


export default class wordleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'wordleMiniGame' });
    }


    init(data) {
        this.returnScene = data?.returnScene || 'level';
        this.gameManager = data?.gameManager || null;
    }


    create() {
        const width = this.scale.width;
        const height = this.scale.height;


        this.rows = 6;
        this.cols = 5;
        this.currentRow = 0;
        this.currentCol = 0;
        this.finished = false;
        this.currentGuess = new Array(this.cols).fill('');


        this.secretWord = Phaser.Utils.Array.GetRandom(WORDLE_WORDS).toUpperCase();


        this.colors = {
            bg: 0x121213,
            panel: 0x1a1a1b,
            emptyTile: 0x121213,
            tileBorder: 0x3a3a3c,
            text: '#ffffff',
            green: 0x538d4e,
            yellow: 0xb59f3b,
            gray: 0x3a3a3c,
            keyUnused: 0x818384,
            keyText: '#ffffff'
        };


        this.keyStates = {}; // A: 'gray' | 'yellow' | 'green'


        this.add.rectangle(width / 2, height / 2, width, height, this.colors.bg);


        this.add.text(width / 2, 55, 'LAME DUCK WORDLE', {
            fontSize: '38px',
            fontStyle: 'bold',
            color: this.colors.text,
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        this.add.text(width / 2, 95, 'Guess the 5-letter word', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        this.statusText = this.add.text(width / 2, height - 40, 'Type letters, ENTER to submit, BACKSPACE to delete', {
            fontSize: '18px',
            color: '#d7dadc',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);


        this.createGrid(width, height);
        this.createKeyboard(width, height);


        this.input.keyboard.on('keydown', this.handleKey, this);


        console.log('Secret word:', this.secretWord);
    }


    createGrid(width, height) {
        this.grid = [];


        const boxSize = 62;
        const gap = 10;
        const totalWidth = this.cols * boxSize + (this.cols - 1) * gap;
        const startX = (width - totalWidth) / 2;
        const startY = 130;


        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];


            for (let c = 0; c < this.cols; c++) {
                const x = startX + c * (boxSize + gap);
                const y = startY + r * (boxSize + gap);


                const rect = this.add.rectangle(x, y, boxSize, boxSize, this.colors.emptyTile)
                    .setStrokeStyle(3, this.colors.tileBorder)
                    .setOrigin(0);


                const text = this.add.text(x + boxSize / 2, y + boxSize / 2, '', {
                    fontSize: '30px',
                    fontStyle: 'bold',
                    color: this.colors.text,
                    fontFamily: 'Arial'
                }).setOrigin(0.5);


                this.grid[r][c] = { rect, text };
            }
        }
    }


    createKeyboard(width, height) {
        this.keyboardButtons = {};


        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ];


        const keyWidth = 42;
        const keyHeight = 52;
        const gap = 6;
        const startY = 575;


        rows.forEach((row, rowIndex) => {
            let rowWidth = 0;


            row.forEach((key) => {
                rowWidth += (key === 'ENTER' || key === '⌫') ? 70 : keyWidth;
            });
            rowWidth += (row.length - 1) * gap;


            let currentX = (width - rowWidth) / 2;


            row.forEach((key) => {
                const w = (key === 'ENTER' || key === '⌫') ? 70 : keyWidth;
                const x = currentX;
                const y = startY + rowIndex * (keyHeight + gap);


                const rect = this.add.rectangle(x, y, w, keyHeight, this.colors.keyUnused)
                    .setOrigin(0)
                    .setStrokeStyle(1, 0x000000)
                    .setInteractive({ useHandCursor: true });


                const label = this.add.text(x + w / 2, y + keyHeight / 2, key, {
                    fontSize: key === 'ENTER' ? '16px' : '20px',
                    fontStyle: 'bold',
                    color: this.colors.keyText,
                    fontFamily: 'Arial'
                }).setOrigin(0.5);


                rect.on('pointerup', () => {
                    if (this.finished) return;


                    if (key === 'ENTER') {
                        this.submitGuess();
                    } else if (key === '⌫') {
                        this.removeLetter();
                    } else {
                        this.addLetter(key);
                    }
                });


                if (key.length === 1) {
                    this.keyboardButtons[key] = { rect, label };
                }


                currentX += w + gap;
            });
        });
    }


    handleKey(event) {
        if (this.finished) return;


        const key = event.key.toUpperCase();


        if (/^[A-Z]$/.test(key)) {
            this.addLetter(key);
            return;
        }


        if (event.key === 'Backspace') {
            this.removeLetter();
            return;
        }


        if (event.key === 'Enter') {
            this.submitGuess();
        }
    }


    addLetter(letter) {
        if (this.currentCol >= this.cols || this.finished) return;


        this.currentGuess[this.currentCol] = letter;
        this.grid[this.currentRow][this.currentCol].text.setText(letter);
        this.currentCol++;
    }


    removeLetter() {
        if (this.currentCol <= 0 || this.finished) return;


        this.currentCol--;
        this.currentGuess[this.currentCol] = '';
        this.grid[this.currentRow][this.currentCol].text.setText('');
    }


    submitGuess() {
        if (this.finished) return;


        if (this.currentCol < this.cols) {
            this.statusText.setText('The word must have 5 letters');
            return;
        }


        const guess = this.currentGuess.join('');
        const secret = this.secretWord;


        const evaluations = this.evaluateGuess(guess, secret);


        for (let i = 0; i < this.cols; i++) {
            const tile = this.grid[this.currentRow][i];
            tile.rect.setFillStyle(evaluations[i].color);
            tile.rect.setStrokeStyle(3, evaluations[i].color);
        }


        this.updateKeyboardColors(evaluations);


        if (guess === secret) {
            this.finished = true;
            this.statusText.setText('Correct! Crisis contained.');


            this.time.delayedCall(1000, () => {
                this.scene.start(this.returnScene, {
                    miniGameResult: {
                        success: true,
                        popularity: 8,
                        corruption: -2
                    }
                });
            });
            return;
        }


        this.currentRow++;
        this.currentCol = 0;
        this.currentGuess = new Array(this.cols).fill('');


        if (this.currentRow >= this.rows) {
            this.finished = true;
            this.statusText.setText(`You lost. The word was ${secret}`);


            this.time.delayedCall(1500, () => {
                this.scene.start(this.returnScene, {
                    miniGameResult: {
                        success: false,
                        popularity: -4,
                        corruption: 2
                    }
                });
            });
        } else {
            this.statusText.setText(`Attempt ${this.currentRow + 1} of ${this.rows}`);
        }
    }


    evaluateGuess(guess, secret) {
        const result = new Array(this.cols).fill(null);
        const secretChars = secret.split('');
        const guessChars = guess.split('');


        // 1. Verdes
        for (let i = 0; i < this.cols; i++) {
            if (guessChars[i] === secretChars[i]) {
                result[i] = {
                    letter: guessChars[i],
                    state: 'green',
                    color: this.colors.green
                };
                secretChars[i] = null;
                guessChars[i] = null;
            }
        }


        // 2. Amarillos / grises
        for (let i = 0; i < this.cols; i++) {
            if (result[i] !== null) continue;


            const letter = guessChars[i];
            const idx = secretChars.indexOf(letter);


            if (idx !== -1) {
                result[i] = {
                    letter,
                    state: 'yellow',
                    color: this.colors.yellow
                };
                secretChars[idx] = null;
            } else {
                result[i] = {
                    letter,
                    state: 'gray',
                    color: this.colors.gray
                };
            }
        }


        return result;
    }


    updateKeyboardColors(evaluations) {
        const priority = {
            gray: 1,
            yellow: 2,
            green: 3
        };


        evaluations.forEach(({ letter, state }) => {
            const currentState = this.keyStates[letter];


            if (!currentState || priority[state] > priority[currentState]) {
                this.keyStates[letter] = state;


                const button = this.keyboardButtons[letter];
                if (!button) return;


                let fillColor = this.colors.keyUnused;


                if (state === 'green') fillColor = this.colors.green;
                else if (state === 'yellow') fillColor = this.colors.yellow;
                else if (state === 'gray') fillColor = this.colors.gray;


                button.rect.setFillStyle(fillColor);
            }
        });
    }
}
