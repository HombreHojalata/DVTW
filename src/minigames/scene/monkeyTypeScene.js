import Phaser from 'phaser';
import { TYPING_CONFIG } from '../data/mgConfig.js';

export default class MonkeyTypeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'monkeyTypeGame' });
    }

    init(data) {
        this.returnScene = data?.returnScene || 'gameScene';
        this.gameManager = data?.gameManager || null;
        this.duration = TYPING_CONFIG?.DURATION || 30;

        this.wordPool = TYPING_CONFIG?.WORDS || [
            'pato', 'votos', 'poder', 'ciudad', 'energía', 'dinero', 'mercado',
            'expresión', 'prensa', 'público', 'política', 'alcalde', 'distrito',
            'debate', 'media', 'escándalo', 'campaña', 'oficina', 'presupuesto'
        ];
    }

    create() {
        this.input.keyboard.addCapture([
            'SPACE',
            'UP',
            'DOWN',
            'LEFT',
            'RIGHT',
            'BACKSPACE',
            'ESC',
            'ENTER'
        ]);

        const { width, height } = this.scale;

        this.gameStarted = false;
        this.gameEnded = false;
        this.timeLeft = this.duration;
        this.typedChars = [];
        this.totalWords = 50;
        this.testString = this.generateTestString(this.totalWords);

        this.baseX = 100;
        this.baseY = 250;
        this.wrapWidth = width - 200;

        this.charObjects = [];
        this.charPositions = [];

        this.add.rectangle(0, 0, width, height, 0x111111, 0.97).setOrigin(0);

        this.titleText = this.add.text(width / 2, 55, 'MONKEYTYPE MODE', {
            fontFamily: 'Arial',
            fontSize: '34px',
            color: '#f5f5f5',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timerText = this.add.text(120, 120, `Time: ${this.timeLeft}`, {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffd166',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        this.liveStatsText = this.add.text(width - 120, 120, 'WPM: 0   ACC: 100%', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#e6e6e6'
        }).setOrigin(1, 0.5);

        this.instructionText = this.add.text(width / 2, 170, 'Start typing to begin the test', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#8f8f8f'
        }).setOrigin(0.5);

        this.bottomHint = this.add.text(width / 2, height - 50, 'ESC to exit · Backspace enabled', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#777777'
        }).setOrigin(0.5);

        this.charStyle = {
            fontFamily: 'monospace',
            fontSize: '26px',
            color: '#666666'
        };

        this.measureText = this.add.text(-9999, -9999, 'M', this.charStyle);
        this.charWidth = this.measureText.width;
        this.lineHeight = this.measureText.height + 10;
        this.measureText.destroy();

        this.buildCharLayout();

        this.caret = this.add.rectangle(this.baseX, this.baseY, 3, this.lineHeight - 6, 0xffd166)
            .setOrigin(0, 0);

        this.caretTween = this.tweens.add({
            targets: this.caret,
            alpha: 0.15,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        this.renderText();
    }

    generateTestString(wordCount = 50) {
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            words.push(Phaser.Utils.Array.GetRandom(this.wordPool));
        }
        return words.join(' ');
    }

    buildCharLayout() {
        const maxCols = Math.max(1, Math.floor(this.wrapWidth / this.charWidth));

        let col = 0;
        let row = 0;

        for (let i = 0; i < this.testString.length; i++) {
            const ch = this.testString[i];

            if (ch === '\n') {
                col = 0;
                row++;
                continue;
            }

            const x = this.baseX + col * this.charWidth;
            const y = this.baseY + row * this.lineHeight;

            const textObj = this.add.text(x, y, ch, this.charStyle).setOrigin(0, 0);

            this.charObjects.push(textObj);
            this.charPositions.push({ x, y });

            col++;

            if (col >= maxCols || ch === ' ') {
                if (col >= maxCols) {
                    col = 0;
                    row++;
                }
            }
        }
    }

    handleKeyDown(event) {
        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Backspace') {
            event.preventDefault();
        }

        if (this.gameEnded) {
            if (event.key === 'Escape' || event.key === 'Enter') {
                this.finishAndReturn();
            }
            return;
        }

        if (event.key === 'Escape') {
            this.finishAndReturn();
            return;
        }

        if (!this.gameStarted && this.isAcceptedInput(event)) {
            this.startTimer();
            this.gameStarted = true;
            this.instructionText.setText('');
        }

        if (event.key === 'Backspace') {
            if (this.typedChars.length > 0) {
                this.typedChars.pop();
                this.renderText();
            }
            return;
        }

        if (!this.isAcceptedInput(event)) return;
        if (this.typedChars.length >= this.testString.length) return;

        this.typedChars.push(event.key);
        this.renderText();

        if (this.typedChars.length >= this.testString.length) {
            this.endGame();
        }
    }

    isAcceptedInput(event) {
        if (!event || !event.key) return false;
        return event.key.length === 1;
    }

    startTimer() {
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Time: ${Math.max(0, this.timeLeft)}`);
                this.updateLiveStats();

                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }
        });
    }

    computeStats() {
        let correctChars = 0;

        for (let i = 0; i < this.typedChars.length; i++) {
            if (this.typedChars[i] === this.testString[i]) {
                correctChars++;
            }
        }

        const totalTyped = this.typedChars.length;
        const incorrectChars = totalTyped - correctChars;
        const elapsedSeconds = Math.max(1, this.duration - this.timeLeft);
        const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
        const wpm = Math.round((correctChars / 5) / (elapsedSeconds / 60));

        let completedWords = 0;
        const typedString = this.typedChars.join('');
        const typedWords = typedString.trim().length > 0 ? typedString.trim().split(/\s+/) : [];
        const targetWords = this.testString.split(' ');

        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] === targetWords[i]) {
                completedWords++;
            }
        }

        return {
            correctChars,
            incorrectChars,
            totalTyped,
            accuracy,
            wpm,
            completedWords
        };
    }

    updateLiveStats() {
        const stats = this.computeStats();
        this.liveStatsText.setText(`WPM: ${stats.wpm}   ACC: ${stats.accuracy}%`);
    }

    renderText() {
        const currentIndex = this.typedChars.length;

        for (let i = 0; i < this.charObjects.length; i++) {
            const obj = this.charObjects[i];
            const expected = this.testString[i];
            const typed = this.typedChars[i];

            if (i < currentIndex) {
                if (typed === expected) {
                    obj.setColor('#f5f5f5');
                    obj.setBackgroundColor(null);
                    obj.setAlpha(1);
                } else {
                    obj.setColor('#ff6b6b');
                    obj.setBackgroundColor('#3a1f1f');
                    obj.setAlpha(1);
                }
            } else if (i === currentIndex) {
                obj.setColor('#ffd166');
                obj.setBackgroundColor('#2a2a2a');
                obj.setAlpha(1);
            } else {
                obj.setColor('#666666');
                obj.setBackgroundColor(null);
                obj.setAlpha(1);
            }
        }

        if (currentIndex < this.charPositions.length) {
            const pos = this.charPositions[currentIndex];
            this.caret.setPosition(pos.x - 2, pos.y + 2);
            this.caret.setVisible(true);
        } else if (this.charPositions.length > 0) {
            const lastIndex = this.charPositions.length - 1;
            const lastPos = this.charPositions[lastIndex];
            this.caret.setPosition(lastPos.x + this.charWidth, lastPos.y + 2);
            this.caret.setVisible(true);
        } else {
            this.caret.setVisible(false);
        }

        this.updateLiveStats();
    }

    endGame() {
        if (this.gameEnded) return;

        this.gameEnded = true;

        if (this.timeEvent) {
            this.timeEvent.remove(false);
        }

        if (this.caretTween) {
            this.caretTween.stop();
        }

        this.input.keyboard.off('keydown', this.handleKeyDown, this);

        const stats = this.computeStats();
        const result = this.buildResult(stats);

        this.showResults(stats, result);
    }

    buildResult(stats) {
        let money = stats.wpm * 10;
        let popularity = 0;

        if (stats.wpm >= 40) popularity += 1;
        if (stats.wpm >= 60) popularity += 1;
        if (stats.accuracy >= 95) popularity += 1;

        const energy = -5;

        return {
            money,
            popularity,
            energy,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            correctChars: stats.correctChars,
            mistakes: stats.incorrectChars,
            completedWords: stats.completedWords
        };
    }

    showResults(stats, result) {
    const { width, height } = this.scale;

    this.resultPayload = result;

    const panelWidth = 560;
    const panelHeight = 380;
    const panelX = width / 2;
    const panelY = height / 2;

    this.resultBg = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x000000, 0.92)
        .setStrokeStyle(2, 0xf0f0f0);

    const topY = panelY - panelHeight / 2 + 35;

    this.resultTitle = this.add.text(panelX, topY, 'RESULTS', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    const resultLines = [
        `WPM: ${stats.wpm}`,
        `Accuracy: ${stats.accuracy}%`,
        `Correct chars: ${stats.correctChars}`,
        `Mistakes: ${stats.incorrectChars}`,
        `Words completed: ${stats.completedWords}`,
        `Reward: +${result.money} money`
    ];

    this.resultText = this.add.text(panelX, topY + 70, resultLines.join('\n'), {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#f2f2f2',
        align: 'center',
        lineSpacing: 12
    }).setOrigin(0.5, 0);

    this.resultHint = this.add.text(panelX, panelY + panelHeight / 2 - 55, 'Press ENTER or ESC to return', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffd166'
    }).setOrigin(0.5, 0.5);

    this.input.keyboard.on('keydown', this.handleResultKeyDown, this);
}

    handleResultKeyDown(event) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            this.finishAndReturn();
        }
    }

    finishAndReturn() {
        const returnSceneObj = this.scene.get(this.returnScene);

        if (this.resultPayload && returnSceneObj?.mgManager) {
            returnSceneObj.mgManager.applyResult(this.resultPayload);
        }

        this.scene.stop();

        if (this.scene.isPaused(this.returnScene)) {
            this.scene.resume(this.returnScene);
        } else if (!this.scene.isActive(this.returnScene)) {
            this.scene.start(this.returnScene, {
                gameManager: this.gameManager
            });
        }
    }
}