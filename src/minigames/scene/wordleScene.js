import Phaser from 'phaser';
import { WORDLE_WORDS } from '../data/mgConfig.js';


export default class wordleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'wordleMiniGame' });
    }

    create() {
        //configuracion inicial de dimensiones y variables de juego
        const width = this.scale.width;
        const height = this.scale.height;

        this.gameManager = this.registry.get('gameManager');

        this.rows = 6;
        this.cols = 5;
        this.currentRow = 0;
        this.currentCol = 0;
        this.finished = false;
        this.currentGuess = new Array(this.cols).fill('');

        //seleccion de palabra secreta aleatoria
        this.secretWord = Phaser.Utils.Array.GetRandom(WORDLE_WORDS).toUpperCase();


        this.colors = {
            emptyTile: 0x1a1a1b, 
            tileBorder: 0x33ff33,
            text: '#33ff33', 
            green: 0x538d4e,
            yellow: 0xb59f3b,
            gray: 0x757575,
            keyUnused: 0x444444, 
            keyText: '#ffffff'
        };


        this.keyStates = {}; 

        //creacion de fondo y textos de interfaz
        this.add.image(width / 2, height / 2, 'fondoWordle').setDisplaySize(width, height);

        const UI_X = width * 0.65;

        this.add.text(UI_X, 250, 'LAME DUCK\nWORDLE', {
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#33ff33', 
            fontFamily: 'Courier New',
            align: 'center'
        }).setOrigin(0.5);


        this.add.text(UI_X, 360, 'Adivina la palabra\nde 5 letras', {
            fontSize: '20px',
            color: '#33ff33',
            fontFamily: 'Courier New',
            align: 'center'
        }).setOrigin(0.5);


        this.statusText = this.add.text(UI_X, height - 300, 'Escribe las letras,\n presiona ENTER para confirmar', {
            fontSize: '19px',
            color: '#33ff33',
            fontFamily: 'Courier New',
            align: 'center'
        }).setOrigin(0.5);


        this.createGrid(width, height);
        this.createKeyboard(width, height);

        //entrada del teclado
        this.input.keyboard.on('keydown', this.handleKey, this);
        console.log('Secret word:', this.secretWord);
    }


    createGrid(width, height) {
        //generacion de la cuadricula de los intentos del a palabra
        this.grid = [];
        const boxSize = 46; 
        const gap = 8;
        const totalWidth = this.cols * boxSize + (this.cols - 1) * gap;
        
        const centerX = width * 0.41; 
        const startX = centerX - (totalWidth / 2);
        const startY = 170;

        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];

            for (let c = 0; c < this.cols; c++) {
                const x = startX + c * (boxSize + gap);
                const y = startY + r * (boxSize + gap);

                const rect = this.add.rectangle(x, y, boxSize, boxSize, this.colors.emptyTile, 0.6)
                    .setStrokeStyle(2, 0x33ff33)
                    .setOrigin(0);

                const text = this.add.text(x + boxSize / 2, y + boxSize / 2, '', {
                    fontSize: '26px',
                    fontStyle: 'bold',
                    color: '#33ff33',
                    fontFamily: 'Courier New'
                }).setOrigin(0.5);


                this.grid[r][c] = { rect, text };
            }
        }
    }


    createKeyboard(width, height) {
        this.keyboardButtons = {};

        ////generacion del teclado
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ];


        const keyWidth = 34;
        const keyHeight = 46;
        const gap = 5;
        const startY = height - 330; 
        const centerX = width * 0.41;

        rows.forEach((row, rowIndex) => {
            let rowWidth = 0;


            row.forEach((key) => {
                rowWidth += (key === 'ENTER' || key === '⌫') ? 60 : keyWidth;
            });
            rowWidth += (row.length - 1) * gap;

            let currentX = centerX - (rowWidth / 2);


            row.forEach((key) => {
                const w = (key === 'ENTER' || key === '⌫') ? 60 : keyWidth;
                const x = currentX;
                const y = startY + rowIndex * (keyHeight + gap);

                const rect = this.add.rectangle(x, y, w, keyHeight, this.colors.keyUnused, 0.8)
                    .setOrigin(0)
                    .setStrokeStyle(1, 0x000000)
                    .setInteractive({ useHandCursor: true });


                const label = this.add.text(x + w / 2, y + keyHeight / 2, key, {
                    fontSize: key === 'ENTER' ? '10px' : '14px',
                    fontStyle: 'bold',
                    color: this.colors.keyText,
                    fontFamily: 'Arial'
                }).setOrigin(0.5);


                //gestion de clicks
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
        //procesamiento de las keys presionadas
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
        //verificacion del intento al pulsar enter
        if (this.finished) return;


        if (this.currentCol < this.cols) {
            this.statusText.setText('Word too short');
            return;
        }


        const guess = this.currentGuess.join('');
        const secret = this.secretWord;


        const evaluations = this.evaluateGuess(guess, secret);


        for (let i = 0; i < this.cols; i++) {
            const tile = this.grid[this.currentRow][i];
            tile.rect.setFillStyle(evaluations[i].color);
            tile.rect.setStrokeStyle(3, evaluations[i].color);
            tile.text.setColor('#ffffff'); 
        }

        this.updateKeyboardColors(evaluations);

        const width = this.scale.width;
        const height = this.scale.height;

        if (guess === secret) {
            this.finished = true;
            
            this.statusText.setText('Correcto!\n Acceso Concedido');

            this.add.text(width / 2, height / 2.5, '¡CONTRASEÑA CORRECTA!', {
                fontSize: '64px',
                fontFamily: 'Climate Crisis',
                color: '#46c83d',
                stroke: '#000000',
                strokeThickness: 6
            }).setOrigin(0.5).setDepth(10);

            this.time.delayedCall(5000, () => {
                this.scene.stop();
                this.registry.set('flagShow',false);
                this.scene.get('gameScene').scene.restart();
            });
            return;
        }


        this.currentRow++;
        this.currentCol = 0;
        this.currentGuess = new Array(this.cols).fill('');


        if (this.currentRow >= this.rows) {
            this.finished = true;

            this.statusText.setText(`Acceso Denegado\nPalabra: ${secret}`);

            this.add.text(width / 2, height / 2.5, '¡CONTRASEÑA INCORRECTA!', {
                fontSize: '64px',
                fontFamily: 'Climate Crisis',
                color: '#c83d3d',
                stroke: '#000000',
                strokeThickness: 6
            }).setOrigin(0.5).setDepth(10);

            this.time.delayedCall(5000, () => {
                this.scene.stop();
                this.registry.set('flagShow',false);
                this.scene.get('gameScene').scene.restart();
            });
        } else {
            this.statusText.setText(`Attempt\n${this.currentRow} of ${this.rows}`);
        }
    }


    evaluateGuess(guess, secret) {
        //comparacion de letras para asignar colores
        const result = new Array(this.cols).fill(null);
        const secretChars = secret.split('');
        const guessChars = guess.split('');


        //verdes
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


        //amarillos / grises
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