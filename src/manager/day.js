

export default class day{

    constructor(previousDay){
        this.dayNumber = previousDay ? previousDay.dayNumber + 1 : 1;
        this.decisionstaken=[];
        this.resourcesGained={
            money: 0,
            energy: 0,
            corruption: 0,
            popularity: 0
        }
    }

    updateResources(money, energy, corruption, popularity){
        this.resourcesGained.money += money;
        this.resourcesGained.energy += energy;
        this.resourcesGained.corruption += corruption;
        this.resourcesGained.popularity += popularity;
    }
    addDecision(decision){
        this.decisionstaken.push(decision);
    }

    getDaySummary(){
        return {
            dayNumber: this.dayNumber,
            decisionsTaken: this.decisionstaken,
            resourcesGained: this.resourcesGained
        }
    }
}