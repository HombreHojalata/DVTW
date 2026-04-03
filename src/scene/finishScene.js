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
      this.add.text(this.width/2, this.height/2, 'Felicidades has mantenido tu presidencia').setAlign('center');
    }else{
      this.add.text(this.width/2, this.height/2, 'Una lastima has perdido tu presidencia').setAlign('center');
    }
  }
}