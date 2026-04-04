

export default class Mission{
    constructor(name,description, ev, co, mi){
        this.name = name;//String
        this.description = description;//String
        this.event = ev;//Bool
        this.corrupt = co;//Bool
        this.minigame= mi;//Bool
        this.numberOfOptions=0;       
        this.options=[];//Array de opciones, cada una con sus consecuencias.
        this.district = null;//String, se asigna a un distrito aleatorio.
        this.pos=[null,null];//Posición de la misión en el mapa, se asigna al distrito.
        this.missionButton = null;//Botón que se muestra en el mapa, se asigna al distrito.
        this.icon = null;//Icono del botón, se asigna al distrito.
    }
    

    getName() {return this.name;}
    getDescription() {return this.description;}
    itIsEvent() {return this.event;}
    itIsCorrupt() {return this.corrupt;}
    isMinigame() {return this.minigame;}
    getOptions() {return this.options;}
    getNumOptions() {return this.numberOfOptions;}
    setDistrict(district) {this.district = district;}
    setPos(x,y) {this.pos=[x,y];}
    getDistrict() {return this.district;}
    getPos() {return this.pos;}
    addOption(Pr, De, En, Mo, Cor, Po){
        const option = new Option(Pr, De, En, Mo, Cor, Po);
        this.options.push(option);
        this.numberOfOptions++;
    }
    createMissionButton(scene){
        this.icon = this.itIsCorrupt() ? 'missionCorruptIcon' : 'missionIcon';
        this.missionButton = scene.add.image(this.getPos()[0],this.getPos()[1],this.icon).setOrigin(0).setInteractive({ useHandCursor: true }); 
        this.missionButton.on('pointerover', () => {this.missionButton.setScale(1.1);});
        this.missionButton.on('pointerout', () => {this.missionButton.setScale(1);});
        this.missionButton.on('pointerup', () => {
            scene.scene.pause('gameScene');
            scene.scene.launch('missionScene', { mission: this});
        });
    }
    deleteMissionButton() {
        if (this.missionButton) {
            this.missionButton.destroy();
            this.missionButton = null;
        }
    }
}


class Option{
    constructor(probability, description, energy, money, corruption, popularity ){
        this.probability=probability;//out of 100
        this.description=description;//String

        //Consequences to add to the player stats, can be positive or negative.
        this.energy = energy;//int
        this.money = money;//int
        this.corruption = corruption;//int
        this.popularity = popularity;//int
    }
}