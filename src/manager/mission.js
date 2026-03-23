

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
    }
    

    getName() {return this.name;}
    getDescription() {return this.description;}
    itIsEvent() {return this.event;}
    itIsCorrupt() {return this.corrupt;}
    itIsMinigame() {return this.minigame;}
    getOptions() {return this.options;}
    getNumOptions() {return this.numberOfOptions;}
    getDistrict() {return this.district;}
    addOption(Pr, De, En, Mo, Cor, Po){
        const option = new Option(Pr, De, En, Mo, Cor, Po);
        this.options.push(option);
        this.numberOfOptions++;
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