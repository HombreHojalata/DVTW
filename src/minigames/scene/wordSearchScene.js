import Phaser from 'phaser';

export default class wordSearchScene extends Phaser.Scene{
    constructor(){
        super({key: 'wordSearchMiniGame'});
    }

    create(){
        const width = this.scale.width;
        const height = this.scale.height;

        this.gameManager = this.registry.get('gameManager');

        this.rows = 10;
        this.cols = 10;
        this.finished = false;

        this.isDragging = false;
        this.selectedTiles = [];
        this.wordsFound = 0;

        //CHANGE WORDS != THAN WORDLE 
        this.wordsToFind = [
            'DUCKS',
            'VOTES',
            'MAYOR',
            'MEDIA',
            'MONEY',
            'POWER',
            'TRIAL',
            'CROOK',
            'CHAOS',
            'LAUGH',
            'QUACK',
            'PRESS'
        ];

        this.colors = {
            emptyTile: 0x1a1a1b,
            text: '#ffffff',
            highlight: 0x538d4e,
            found: 0xb59f3b
        }

        //BACKGROUND

        const UI_X = width * 0.8;

        this.add.text(UI_X, 150, 'SOPA DE LETRAS', {
            fontSize: '48px',
            fontStyle: 'bold',
            color: this.colors.text,
            fontFamily: 'Courier New',
            align: 'center'
        }).setOrigin(0.5);

        this.statusText = this.add.text(UI_X, 250, 'Arrastra el puntador para jugar', {
            fontSize: '20px',
            color: '#d7dadc',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        this.createGrid(width, height);

        this.input.on('pointerup', () => this.endDrag());
    }

    createGrid(width, height){
        this.grid = [];
        const boxSize = 40;
        const gap = 5;
        const totalWidth = this.cols * boxSize + (this.cols - 1) * gap;

        const centerX = width * 0.4;
        const startX = centerX - (totalWidth / 2);
        const startY = 150;

        const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for(let r = 0; r < this.rows; r++){
            this.grid[r] = [];

            for(let c = 0; c < this.cols; c++){
                const x = startX + (c * (boxSize + gap));
                const y = startY + (r * (boxSize + gap));

                //ACTUAL WORDS

                const randChar = alph[Math.floor(Math.random() * alph.length)];

                const rect = this.add.rectangle(x, y, boxSize, boxSize, this.colors.emptyTile, 0.8)
                    .setStrokeStyle(1, 0xffffff)
                    .setOrigin(0)
                    .setInteractive({useHandCursor: true});

                const text = this.add.text(x + (boxSize / 2), y + (boxSize / 2), randChar, {
                    fontSize: '24px',
                    fontStyle: 'bold',
                    color: this.colors.text,
                    fontFamily: 'Courier New'
                }).setOrigin(0.5);

                const tile = {rect, text, r, c, letter: randChar, matched: false};
                this.grid[r][c] = tile;

                rect.on('pointerdown', () => this.startDrag(tile));
                rect.on('pointerover', () => this.handleDragOver(tile));
            }
        }
    }

    startDrag(tile){
        if(this.finished || tile.matched)
            return;
        
        this.isDragging = true;
        this.selectedTiles = [tile];
        tile.rect.setFillStyle(this.colors.highlight);
    }

    handleDragOver(tile){
        if(!this.isDragging || this.finished || tile.matched)
            return;
        
        if(!this.selectedTiles.includes(tile)){
            this.selectedTiles.push(tile);
            tile.rect.setFillStyle(this.colors.highlight);
        }
    }

    endDrag(){
        if(!this.isDragging || this.finished)
            return;

        this.isDragging = false;

        const selectedWord = this.selectedTiles.map(t => t.letter).join('');
        const reverseWord = selectedWord.split('').reverse().join('');

        if(this.wordsToFind.includes(selectedWord) || this.wordsToFind.includes(reverseWord)){
            this.wordsFound++;
            this.statusText.setText(`Encontraste la palabra {${selectedWord}}`);

            this.selectedTiles.forEach(t => {
                t.matched = true;
                t.rect.setFillStyle(this.colors.found);
            });

            if(this.wordsFound == this.wordsToFind.length)
                this.finishGame();
        }else{
            this.selectedTiles.forEach(t => {
                if(!t.matched)
                    t.rect.setFillStyle(this.colors.emptyTile);
            });
        }

        this.selectedTiles = [];
    }

    finishGame(){
        this.finished = true;

        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width / 2, height / 2.5, 'MINIJUEGO COMPLETADO', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            color: '#46c83d',
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