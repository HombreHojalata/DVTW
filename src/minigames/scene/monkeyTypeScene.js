import Phaser from 'phaser';
import { TYPING_CONFIG } from '../data/mgConfig.js';

export default class MonkeyTypeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'monkeyTypeGame' });
    }

    init(data) {
        this.returnScene = 'gameScene';
        this.gameManager = data?.gameManager || null;
        this.duration = TYPING_CONFIG?.DURATION || 30;
        this.wordPool = TYPING_CONFIG?.WORDS || [
            'duck', 'vote', 'power', 'city', 'energy', 'money', 'market',
            'speech', 'press', 'public', 'policy', 'mayor', 'district',
            'debate', 'media', 'scandal', 'campaign', 'office', 'budget'
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
            'ESC'
        ]);

        const { width, height } = this.scale;

        this.gameStarted = false;
        this.gameEnded = false;
        this.timeLeft = this.duration;
        this.typedChars = [];
        this.totalWords = 80;
        this.testString = this.generateTestString(this.totalWords);

        this.add.rectangle(0, 0, width, height, 0x111111, 0.96).setOrigin(0);

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

        this.instructionText = this.add.text(width / 2, 170, 'Start typing to begin the 30-second test', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#8f8f8f'
        }).setOrigin(0.5);

        this.textStyle = {
            fontFamily: 'Courier New, monospace',
            fontSize: '30px',
            wordWrap: { width: width - 200, useAdvancedWrap: true },
            lineSpacing: 10
        };

        this.futureText = this.add.text(100, 250, this.testString, {
            ...this.textStyle,
            color: '#666666'
        }).setOrigin(0, 0);

        this.typedText = this.add.text(100, 250, '', {
            ...this.textStyle,
            color: '#f5f5f5'
        }).setOrigin(0, 0);

        this.caretText = this.add.text(100, 250, '', {
            ...this.textStyle,
            color: '#ffd166',
            backgroundColor: '#2a2a2a'
        }).setOrigin(0, 0);

        this.bottomHint = this.add.text(width / 2, height - 50, 'ESC to exit · Backspace enabled', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#777777'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.renderText();
    }

    generateTestString(wordCount = 60) {
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            words.push(Phaser.Utils.Array.GetRandom(this.wordPool));
        }
        return words.join(' ');
    }

    handleKeyDown(event) {
        if (this.gameEnded) {
            if (event.key === 'Escape') {
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
        const typedString = this.typedChars.join('');
        const currentIndex = this.typedChars.length;
        const currentChar = this.testString[currentIndex] || '';

        this.typedText.setText(typedString);
        this.caretText.setText(currentChar);

        const baseX = 100;
        const baseY = 250;

        const typedWidth = this.typedText.width || 0;
        const lines = this.typedText.getWrappedText(typedString);

        if (!lines || lines.length <= 1) {
            this.caretText.setPosition(baseX + typedWidth, baseY);
        } else {
            const lastLine = lines[lines.length - 1] || '';
            const lineHeight = this.typedText.height / lines.length;

            const measure = this.add.text(-9999, -9999, lastLine, this.textStyle);
            const lastLineWidth = measure.width;
            measure.destroy();

            this.caretText.setPosition(
                baseX + lastLineWidth,
                baseY + lineHeight * (lines.length - 1)
            );
        }

        this.updateLiveStats();
    }

    endGame() {
        if (this.gameEnded) return;

        this.gameEnded = true;

        if (this.timeEvent) {
            this.timeEvent.remove(false);
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

        this.resultBg = this.add.rectangle(width / 2, height / 2, 520, 320, 0x000000, 0.88)
            .setStrokeStyle(2, 0xf0f0f0);

        this.resultTitle = this.add.text(width / 2, height / 2 - 110, 'RESULTS', {
            fontFamily: 'Arial',
            fontSize: '34px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.resultText = this.add.text(
            width / 2,
            height / 2 - 10,
            [
                `WPM: ${stats.wpm}`,
                `Accuracy: ${stats.accuracy}%`,
                `Correct chars: ${stats.correctChars}`,
                `Mistakes: ${stats.incorrectChars}`,
                `Words completed: ${stats.completedWords}`,
                `Reward: +${result.money} money`
            ],
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#f2f2f2',
                align: 'center',
                lineSpacing: 10
            }
        ).setOrigin(0.5);

        this.resultHint = this.add.text(width / 2, height / 2 + 120, 'Press ENTER or ESC to return', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffd166'
        }).setOrigin(0.5);

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