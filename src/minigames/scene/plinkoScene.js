import Phaser from 'phaser';

export default class plinkoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'plinkoMiniGame' });
    }

    init(data) {
        //inicializa los valores del juego como el objetivo y las bolas
        this.pointsGoal = data.goal || 500000;
        this.maxBalls = data.balls || 10;
        this.ballsUsed = 0;
        this.currentPoints = 10;
        this.isGameOver = false;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.colors = {
            bg: 0x121213,
            peg: 0x222222, 
            ball: 0xffcc00,
            bucket: [0xb94848, 0x46c83d, 0x30718c, 0xba9900, 0x30718c, 0x46c83d, 0xb94848, 0x9b59b6, 0xe67e22]
        };

        //fondo imagen y textos
        this.add.image(width / 2, height / 2, 'fondoPlinko').setDisplaySize(width, height);

        this.titleText = this.add.text(120, 100, 'ECONOMY FIRST! \n - Plinko', {
            fontSize: '42px',
            fontFamily: 'Climate Crisis',
            color: '#ffcc00',
            stroke: '#000000',
            strokeThickness: 2
        });
        
        this.pointsText = this.add.text(120, 220, `OBJETIVO: ${this.currentPoints} / ${this.pointsGoal}`, {
            fontSize: '20px',
            fontFamily: 'Climate Crisis',
            color: '#1a1a1b'
        });

        this.ballsText = this.add.text(120, 270, `BOLAS: ${this.ballsUsed}`, {
            fontSize: '20px',
            fontFamily: 'Climate Crisis',
            color: '#1a1a1b'
        });

        //calcula los limites del tablero para centrar los pivotes
        this.boardWidth = 600; 
        this.boardStartX = (width - this.boardWidth) / 2 + 180; 
        this.boardEndX = this.boardStartX + this.boardWidth;

        this.pegs = this.physics.add.staticGroup();
        this.buckets = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();
        this.ballsGroup = this.physics.add.group();
        this.uiTexts = [this.titleText, this.pointsText, this.ballsText]; 
        this.bucketLabels = []; 

        this.createBoard(width, height);

        //detecta el click 
        this.input.on('pointerdown', (pointer) => {
            if (this.ballsUsed < this.maxBalls && !this.isGameOver) {
                this.dropBall();
            }
            if (!this.isGameOver) this.checkGameStatus();
        });
    }

    createBoard(width, height) {
        const rows = 10;
        const spacingX = 55;
        const spacingY = 45;
        const startY = 110; 

        //genera la estructura piramida l 
        for (let r = 0; r < rows; r++) {
            const cols = r + 2;
            const rowWidth = (cols - 1) * spacingX;
            const startX = this.boardStartX + (this.boardWidth - rowWidth) / 2;

            for (let c = 0; c < cols; c++) {
                const x = startX + c * spacingX;
                const y = startY + r * spacingY;
                const peg = this.pegs.create(x, y, null).setVisible(false); 
                peg.body.setCircle(5);
                peg.body.updateFromGameObject();

                const graphics = this.add.graphics();
                graphics.fillStyle(this.colors.peg, 1);
                graphics.fillCircle(x, y, 5);
                graphics.setDepth(1);
                peg.setData('graphics', graphics); 
            }
        }

        //anade paredes invisibles laterales para que la bola no salga
        const leftWall = this.add.rectangle(this.boardStartX - 10, height / 2, 20, height, 0xffffff, 0); 
        const rightWall = this.add.rectangle(this.boardEndX + 10, height / 2, 20, height, 0xffffff, 0); 
        this.walls.add(leftWall);
        this.walls.add(rightWall);

        const bucketValues = [100, 50, 10, 5, 1, 5, 10, 50, 100];
        const bucketWidth = this.boardWidth / bucketValues.length;
        bucketValues.forEach((val, i) => {
            const x = this.boardStartX + i * bucketWidth + bucketWidth / 2;
            const y = startY + (rows * spacingY) + 40; 
            const b = this.buckets.create(x, y, 'bagPlinko').setScale(0.9).setData('value', val).setDepth(2);
            
            const label = this.add.text(x, y + 30, `x${val}`, {
                fontSize: '16px',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                color: '#1a1a1b' 
            }).setOrigin(0.5).setDepth(4);
            this.bucketLabels.push(label);
        });
    }

    clearScene() {
        //borra todos los elementos de la escena cuando termina el juego
        this.uiTexts.forEach(t => t.destroy());
        this.bucketLabels.forEach(l => l.destroy());
        this.pegs.getChildren().forEach(p => {
            if(p.getData('graphics')) p.getData('graphics').destroy();
        });
        this.pegs.clear(true, true);
        this.buckets.clear(true, true);
        this.walls.clear(true, true);
        this.ballsGroup.clear(true, true);
    }

    dropBall() {
        //"instancia" la bola y aplica las propiedades fisicas
        this.ballsUsed++;
        this.ballsText.setText(`BOLAS: ${this.ballsUsed}`);
        const spawnX = this.boardStartX + (this.boardWidth / 2); 
        const ball = this.add.image(spawnX, 40, 'coinPlinko').setScale(0.36);
        this.physics.add.existing(ball);
        this.ballsGroup.add(ball);
        ball.body.setCircle((ball.width * ball.scaleX) / 2).setBounce(0.7).setCollideWorldBounds(true);
        ball.setDepth(5).body.setVelocityX(Phaser.Math.Between(-30, 30));

        //gestiona las colisiones con los pivotes y tambien reproduce sonidos
        this.physics.add.collider(ball, this.pegs, (ballHit, pegHit) => {
            const audioManager = this.registry.get('audioManager');
            const currentTime = this.time.now;
            if (!ballHit.lastSoundTime || currentTime - ballHit.lastSoundTime > 100) {
                audioManager.play(Phaser.Utils.Array.GetRandom(['ball1', 'ball2', 'ball3']));
                ballHit.lastSoundTime = currentTime;
            }
            if (Math.abs(ballHit.body.velocity.x) < 20) {
                ballHit.body.setVelocityX(ballHit.x - pegHit.x > 0 ? 50 : -50);
            }
            ballHit.body.setAngularVelocity(Phaser.Math.Between(-400, 400));
        });

        //aplica el multiplicador a la puntacion
        this.physics.add.collider(ball, this.walls);
        this.physics.add.overlap(ball, this.buckets, (obj1, bucket) => {
            this.currentPoints *= bucket.getData('value');
            this.pointsText.setText(`OBJETIVO: ${this.currentPoints} / ${this.pointsGoal}`);
            ball.destroy();
            this.checkGameStatus();
        });
    }

    checkGameStatus() {
        if (this.currentPoints >= this.pointsGoal) this.winGame();
        else if (this.ballsUsed >= this.maxBalls && this.ballsGroup.countActive() === 0) this.loseGame();
    }

    winGame() {
        this.isGameOver = true;
        this.clearScene(); 
        const width = this.scale.width;
        const height = this.scale.height;

        //mensaje de victoria
        this.add.text(width / 2, height / 2.5, '¡ECONOMÍA SALVADA!', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            color: '#46c83d',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);

        this.time.delayedCall(2000, () => this.exitScene(true));
    }

    loseGame() {
        this.isGameOver = true;
        this.clearScene(); 
        const width = this.scale.width;
        const height = this.scale.height;

        //mensaje cuando se pierde
        this.add.text(width / 2, height / 2.5, '¡COLAPSO FINANCIERO!', {
            fontSize: '64px',
            fontFamily: 'Climate Crisis',
            color: '#b04848',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);
        
        this.time.delayedCall(2000, () => this.exitScene(false));
    }


    exitScene(isWin) {
        this.scene.stop();
        this.registry.set('flagShow', false);
        this.scene.get('gameScene').scene.restart();
    }
}