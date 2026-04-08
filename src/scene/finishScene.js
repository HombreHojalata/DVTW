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
      this.add.image(0, 0, 'goodEnding').setOrigin(0).setDisplaySize(this.width, this.height);
      this.add.rectangle(0, 0, this.width, this.height, 0x0000ff, 0.15).setOrigin(0);
      this.add.text(this.width/2, this.height/4 * 3, 'VICTORIA',{
        fontSize: '200px',
        fontFamily: 'Rubik Distressed',
        fontStyle: 'bold',
        color: '#ffcc00',
        align: 'center'
      }).setOrigin(0.5);
    } else {
      this.add.image(0, 0, 'badEnding').setOrigin(0);
      this.add.text(this.width/2, this.height/4 * 3, 'DERROCADO',{
        fontSize: '200px',
        fontFamily: 'Rubik Distressed',
        //fontStyle: 'bold',
        color: '#c10100',
        align: 'center'
      }).setOrigin(0.5);
      this.add.rectangle(0, 0, this.width, this.height, 0xff0000, 0.15).setOrigin(0);
    }
    this.clickText = this.add.text(this.width/2, this.height - 70, 'Haz clic para volver al inicio', {
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