    
import Phaser from 'phaser'
    
export default class SummaryDayScene extends Phaser.Scene {

    constructor() {
        super({ key: 'summaryDayScene' });
    }
    init(data){
        this.summary = data.summary;
    }
    create() {
        const { width, height } = this.sys.game.config;

        let currentY = 100; // posición inicial

        const summaryContainer = this.add.container(width / 2, height).setDepth(100);

        const addLine = (text, style, spacing = 50) => {
            const line = this.add.text(0, currentY, text, style).setOrigin(0.5);
            summaryContainer.add(line);
            currentY += spacing;
        };

        // TITTLE
        const titleStyle = {
            fontSize: '80px',
            fontFamily: 'Times New Roman',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        };
        addLine(`RESUMEN DÍA ${this.summary.dayNumber}`, titleStyle, 120);
        // DECISIONS TAKEN
        const textStyle = {
            fontSize: '34px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center'
        };
        this.summary.decisionsTaken.forEach((d, i) => {addLine(`${i + 1}. ${d}`, textStyle, 60);});
        // RESOURCES GAINED
        const smallStyle = {
            fontSize: '28px',
            fontFamily: 'Times New Roman',
            color: '#ffffff',
            align: 'center'
        };
        const { money, corruption, popularity } = this.summary.resourcesGained;
        if(money >= 0) addLine(`DINERO GANADO: ${money}`, smallStyle);
        else addLine(`DINERO PERDIDO: ${money}`, smallStyle);
        if(corruption >= 0) addLine(`CORRUPCIÓN GANADO: ${corruption}`, smallStyle);
        else addLine(`CORRUPCIÓN PERDIDO: ${corruption}`, smallStyle);
        if(popularity >= 0) addLine(`VOTOS GANADOS: ${popularity}`, smallStyle);
        else addLine(`VOTOS PERDIDOS: ${popularity}`, smallStyle);

        this.tweens.add({
            targets: summaryContainer,
            y: -currentY, 
            duration: 7000, 
            ease: 'Linear',
            onComplete: () => {
                summaryContainer.destroy();
                this.registry.get("gameManager").nextDay();
                this.scene.start('gameScene');
            }
        });
    }
}
