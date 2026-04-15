import Phaser from 'phaser';

export default class plinkoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'plinkoMiniGame' });
    }

    init(data) {
        this.pointsGoal = data.goal || 500000;
        this.ballsLeft = data.balls || 5;
        this.currentPoints = 10;
        this.isGameOver = false;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.colors = {
            bg: 0x121213,
            peg: 0xffffff,
            ball: 0xffcc00,
            bucket: [0xb94848, 0x46c83d, 0x30718c, 0xba9900, 0x30718c, 0x46c83d, 0xb94848, 0x9b59b6, 0xe67e22]
        };

        this.add.rectangle(0, 0, width, height, this.colors.bg).setOrigin(0);

        this.titleText = this.add.text(width / 2, 40, 'PLINKO', {
            fontSize: '36px',
            fontFamily: 'Climate Crisis',
            color: '#ffcc00'
        }).setOrigin(0.5);
        
        this.pointsText = this.add.text(50, 100, `OBJETIVO: ${this.currentPoints} / ${this.pointsGoal}`, {
            fontSize: '24px',
            fontFamily: 'Courier New',
            color: '#ffffff'
        });

        this.ballsText = this.add.text(50, 140, `BOLAS: ${this.ballsLeft}`, {
            fontSize: '24px',
            fontFamily: 'Courier New',
            color: '#ffffff'
        });

        this.boardWidth = 800;
        this.boardStartX = (width - this.boardWidth) / 2;
        this.boardEndX = this.boardStartX + this.boardWidth;

        this.pegs = this.physics.add.staticGroup();
        this.buckets = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();

        this.createBoard(width, height);

        this.input.on('pointerdown', (pointer) => {
            if (pointer.x > this.boardStartX && pointer.x < this.boardEndX) {
                if (this.ballsLeft > 0 && !this.isGameOver) {
                    this.dropBall(pointer.x);
                }
            } else if (!this.isGameOver) {
                this.cameras.main.shake(100, 0.002);
            }
        });
    }

    createBoard(width, height) {
        const rows = 9;
        const spacingX = 80;
        const spacingY = 60;
        const startY = 200;

        for (let r = 0; r < rows; r++) {
            const isEven = r % 2 === 0;
            const cols = isEven ? 9 : 10;
            const rowWidth = (cols - 1) * spacingX;
            const startX = (width - rowWidth) / 2;

            for (let c = 0; c < cols; c++) {
                const x = startX + c * spacingX;
                const y = startY + r * spacingY;

                const peg = this.pegs.create(x, y, null).setVisible(false); // setOrigin(0.5)
                peg.body.setCircle(6);
                peg.body.updateFromGameObject();

                const graphics = this.add.graphics();
                graphics.fillStyle(this.colors.peg, 1);
                graphics.fillCircle(x, y, 6);
                graphics.setDepth(1);
            }
        }

        const leftWall = this.add.rectangle(this.boardStartX - 10, height / 2, 20, height, 0xffffff, 1);
        const rightWall = this.add.rectangle(this.boardEndX + 10, height / 2, 20, height, 0xffffff, 1);
        leftWall.setDepth(1);
        rightWall.setDepth(1);
        this.walls.add(leftWall);
        this.walls.add(rightWall);

        const bucketValues = [100, 50, 10, 5, 1, 5, 10, 50, 100];
        const bucketWidth = this.boardWidth / bucketValues.length;
        bucketValues.forEach((val, i) => {
            const x = this.boardStartX + i * bucketWidth + bucketWidth / 2;
            const y = height - 50;
            const b = this.add.rectangle(x, y, bucketWidth - 10, 80, this.colors.bucket[i], 0.6);
            this.buckets.add(b);
            b.setData('value', val);
            b.setDepth(1);
            this.add.text(x, y - 10, `x${val}`, {
                fontSize: '18px',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                color: '#ffffff'
            }).setOrigin(0.5).setDepth(4);
        });
    }

    dropBall(x) {
        this.ballsLeft--;
        this.ballsText.setText(`BOLAS: ${this.ballsLeft}`);
        
        const ball = this.add.circle(x, 60, 12, this.colors.ball);
        this.physics.add.existing(ball);
        
        ball.body.setCircle(12);
        ball.body.setBounce(0.5, 0.5);
        ball.body.setCollideWorldBounds(true);
        ball.setDepth(5);

        ball.body.setVelocityX(Phaser.Math.Between(-15, 15));

        this.physics.add.collider(ball, this.pegs, () => {
            const audioManager = this.registry.get('audioManager');
            if (audioManager) audioManager.play('key');
            ball.body.setAngularVelocity(Phaser.Math.Between(-300, 300));
        });

        this.physics.add.collider(ball, this.walls);

        this.physics.add.overlap(ball, this.buckets, (obj1, bucket) => {
            const multiplier = bucket.getData('value');
            this.currentPoints *= multiplier;
            this.pointsText.setText(`OBJETIVO: ${this.currentPoints} / ${this.pointsGoal}`);

            ball.destroy();
            this.checkGameStatus();
        });
    }

    checkGameStatus() {
        if (this.currentPoints >= this.pointsGoal) {
            this.winGame();
        } else if (this.ballsLeft < 0 /*&& this.physics.world.activeBodies.length === 0*/) {
            this.loseGame();
        }
    }

    winGame() {
        this.isGameOver = true;
        this.add.text(this.scale.width / 2, this.scale.height / 2, '¡VICTORIA!', {
            fontSize: '40px',
            color: '#46c83d',
            backgroundColor: '#000'
        }).setOrigin(0.5);
        
        this.time.delayedCall(2000, () => this.exitScene(true));
    }

    loseGame() {
        this.isGameOver = true;
        this.add.text(this.scale.width / 2, this.scale.height / 2, 'BANCARROTA', {
            fontSize: '40px',
            color: '#b04848',
            backgroundColor: '#000'
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => this.exitScene(false));
    }

    exitScene(isWin) {
        this.scene.stop();
        this.registry.set('flagShow', false);
        this.scene.get('gameScene').scene.restart();
    }
}