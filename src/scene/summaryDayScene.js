    
import Phaser from 'phaser'
    
export default class SummaryDayScene extends Phaser.Scene {

    constructor() {
        super({ key: 'summaryDayScene' });
    }
    init(data){
        this.summary = data.summary;
    }
    create() {
        // ATRIBUTES
        const { width, height } = this.sys.game.config;
        this.dayNumber = this.summary.dayNumber,
        this.decisionsTaken = this.summary.decisionsTaken,
        this.resourcesGained = this.summary.resourcesGained
        const {money, corruption, energy, popularity} = this.resourcesGained;

        // VISUAL
        const blocker = this.add.zone(0, 0, width, height).setOrigin(0).setInteractive();
        const summaryContainer = this.add.container(0, 0).setDepth(100);
        const bg = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
        const summaryText = this.add.text(width / 2, height / 4 - 50, `RESUMEN DÍA ${this.dayNumber}`, {
            fontSize: '80px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        const decisionsFormatted = this.decisionsTaken.map((d, i) => `${i + 1}. ${d}`).join('\n');

        const decisionText = this.add.text(width/2, height/4 + 100, decisionsFormatted, {
            fontSize: '34px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        const resourcesText1 = this.add.text(width/2, height/4 + 400,  `DINERO: ${money}`, {
            fontSize: '28px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        const resourcesText2 = this.add.text(width/2, height/4 + 450,  `CORRUPCION: ${corruption}`, {
            fontSize: '28px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        const resourcesText3 = this.add.text(width/2, height/4 + 500, `PORCENTAGE DE VOTOS:  + ${popularity}`, {
            fontSize: '28px',
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        summaryContainer.add([blocker, bg, summaryText, decisionText, resourcesText1, resourcesText2, resourcesText3]);

        this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: summaryContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () =>{
                    summaryContainer.destroy()
                    this.registry.get("gameManager").nextDay();
                    this.scene.stop();
                    this.scene.start('gameScene');
                } 
            });
        });
    }
}
