import Phaser from 'phaser';

export default class WhacAMoleMiniGame extends Phaser.Scene {
    constructor() {
        super({ key: 'whacAMole' });
    }

    init() {
        this.score = 0;
        this.timeLeft = 30; //30 segundos
        this.currentFrame = 0;
        this.isGameActive = false;
        
        //contador de microfonos mostrados
        this.totalMicrophonesShown = 0;
        //lista per evitare doppi click nello stesso frame
        this.clickedInFrame = [];

        this.framePool = Phaser.Utils.Array.NumberArray(2, 15);

        this.scaleX = 1500 / 1334;
        this.scaleY = 850 / 800;
    }

    create() {
        this.background = this.add.image(0, 0, 'whacFrameInicio').setOrigin(0);
        this.background.setDisplaySize(1500, 850);

        const textStyle = { 
            fontFamily: 'Arial Black, sans-serif',
            fontSize: '32px', 
            fill: '#ffffff', 
            stroke: '#000000',
            strokeThickness: 4
        };

        this.scoreText = this.add.text(40, 30, 'SCORE: 0', textStyle).setDepth(10);
        this.timerText = this.add.text(40, 80, 'TIME: 30', textStyle).setDepth(10);

        this.setupStartMenu();

        this.input.on('pointerdown', (pointer) => {
            if (this.isGameActive) {
                this.checkHit(pointer);
            }
        });
    }

    setupStartMenu() {
        this.startMenu = this.add.container(0, 0).setDepth(100);

        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.6);
        overlay.fillRect(0, 0, 1500, 850);

        const title = this.add.text(750, 320, 'WHAC-A-MOLE', { 
            fontFamily: 'Arial Black, sans-serif',
            fontSize: '90px', 
            fill: '#ffffff',
            letterSpacing: 10
        }).setOrigin(0.5);

        const instructions = this.add.text(750, 450, 'Haz clic en los microfonos (+10) \n Evita las camaras (-5)', { 
            fontFamily: 'Verdana, sans-serif',
            fontSize: '24px', 
            fill: '#cccccc', 
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        const startBtn = this.add.text(750, 600, 'TOCA PARA EMPEZAR', { 
            fontFamily: 'Arial Black, sans-serif',
            fontSize: '40px', 
            fill: '#ffffff'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: startBtn,
            alpha: 0.5,
            duration: 800,
            yoyo: true,
            loop: -1
        });

        startBtn.on('pointerover', () => startBtn.setStyle({ fill: '#00ff00' }));
        startBtn.on('pointerout', () => startBtn.setStyle({ fill: '#ffffff' }));

        startBtn.on('pointerdown', () => {
            this.startMenu.destroy();
            this.startGame();
        });

        this.startMenu.add([overlay, title, instructions, startBtn]);
    }

    startGame() {
        this.isGameActive = true;
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
        this.showNextFrame();
    }

    showNextFrame() {
        if (!this.isGameActive) return;

        //reset de clicks del frame anterior
        this.clickedInFrame = [];

        //frame aleatorio
        this.currentFrame = Phaser.Math.RND.pick(this.framePool);

        //conteo de microfonos en el frame actual
        this.countMicrophonesInFrame();

        //se cambia el fondo
        this.background.setTexture(`whacFrame${this.currentFrame}`);

        //velocidad de cambio del frame
        this.frameEvent = this.time.delayedCall(850, () => {
            this.showNextFrame();
        });
    }

    countMicrophonesInFrame() {
        const jsonData = this.cache.json.get(`whacJSON${this.currentFrame}`);
        if (!jsonData) return;
        const objectLayer = jsonData.layers.find(l => l.type === 'objectgroup');
        if (!objectLayer) return;

        //suma los microfonos que aparecen en este frame
        objectLayer.objects.forEach(obj => {
            if (obj.name === 'microphone') {
                this.totalMicrophonesShown++;
            }
        });
    }

    checkHit(pointer) {
        const jsonData = this.cache.json.get(`whacJSON${this.currentFrame}`);
        if (!jsonData) return;
        const objectLayer = jsonData.layers.find(l => l.type === 'objectgroup');
        if (!objectLayer) return;

        objectLayer.objects.forEach((obj, index) => {
            //si ya se hizo clic en este objeto este frame, se ignora
            if (this.clickedInFrame.includes(index)) return;

            if (obj.polygon) {
                const points = obj.polygon.map(p => ({ 
                    x: (p.x + obj.x) * this.scaleX, 
                    y: (p.y + obj.y) * this.scaleY 
                }));
                const polygon = new Phaser.Geom.Polygon(points);

                if (Phaser.Geom.Polygon.Contains(polygon, pointer.x, pointer.y)) {
                    //registra el clic para evitar spam
                    this.clickedInFrame.push(index);

                    if (obj.name === 'microphone') {
                        this.updateScore(10);
                        this.showFloatingText('+10', '#ffffff');
                    } else if (obj.name === 'camera') {
                        this.updateScore(-5);
                        this.showFloatingText('-5', '#ff4444');
                    }
                }
            }
        });
    }

    showFloatingText(text, color) {
        const floatingText = this.add.text(750, 425, text, {
            fontFamily: 'Arial Black, sans-serif',
            fontSize: '80px',
            fill: color,
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(20);

        this.tweens.add({
            targets: floatingText,
            scale: 2,
            alpha: 0,
            y: 380,
            duration: 800,
            onComplete: () => floatingText.destroy()
        });
    }

    updateScore(points) {
        this.score += points;
        if (this.score < 0) this.score = 0; 
        this.scoreText.setText(`SCORE: ${this.score}`);
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`TIME: ${this.timeLeft}`);
        if (this.timeLeft <= 0) this.endGame();
    }

    endGame() {
        this.isGameActive = false;
        if (this.frameEvent) this.frameEvent.remove();
        if (this.timeEvent) this.timeEvent.remove();

        //calculo de victoria (65% de los puntos posibles)
        const maxPossibleScore = this.totalMicrophonesShown * 10;
        const victoryThreshold = maxPossibleScore * 0.65;
        const hasWon = this.score >= victoryThreshold;

        //calculo de porcentaje para el feedback final
        const percentage = Math.round((this.score / maxPossibleScore) * 100) || 0;

        const resultText = hasWon ? '¡HAS GANADO!' : 'HAS PERDIDO';
        const resultColor = hasWon ? '#00ff00' : '#ff0000';

        this.add.text(750, 380, resultText, {
            fontFamily: 'Arial Black',
            fontSize: '80px',
            fill: resultColor,
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        //mostrar porcentaje final
        this.add.text(750, 480, `Puntaje: ${percentage}%`, {
            fontFamily: 'Arial Black',
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5).setDepth(200);

        //log para debug de puntos
        console.log(`puntos: ${this.score}, maximo: ${maxPossibleScore}, necesario: ${victoryThreshold}`);
    }
}