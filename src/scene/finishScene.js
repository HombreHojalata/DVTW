import Phaser from 'phaser'

export default class FinishScene extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'finishScene' });
  }
  init(data){
    this.win = data.win;
  }
  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    if(this.win){
      this.add.text(this.width/2, this.height/2, 'Felicidades has mantenido tu presidencia',{
        fontSize: '36px',
        fontFamily: 'Times New Roman',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    }else{
      this.add.text(this.width/2, this.height/2, 'Una lastima has perdido tu presidencia',{
        fontSize: '36px',
        fontFamily: 'Times New Roman',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    }
    this.clickText = this.add.text(this.width/2, this.height/2 + 100, 'Haz clic para volver al inicio', {
        fontSize: '36px',
        fontStyle: 'bold',
        color: '#ffffff',
        fontFamily: 'Times New Roman',
        stroke: '#000000',
        strokeThickness: 5
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.clickText.on('pointerup', () => {
      this.registry.reset();
      this.registry.set('agendaAbierta',true); 
      this.scene.stop();
      this.scene.start('introScene');
    });
  }
}