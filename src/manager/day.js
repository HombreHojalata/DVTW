export default class day{

    constructor(previousDay){
        this.dayNumber = previousDay ? previousDay + 1 : 1;
        this.decisionstaken=[];
        this.resourcesGained={
            money: 0,
            energy: 0,
            corruption: 0,
            popularity: 0
        }
    }

    updateResources(money, energy, corruption, popularity) {
        this.resourcesGained.money += Number(money);
        this.resourcesGained.energy += Number(energy);
        this.resourcesGained.corruption += Number(corruption);
        this.resourcesGained.popularity += Number(popularity);
    }

    addDecision(decision) {
        this.decisionstaken.push(decision);
    }

    getDaySummary(){
        return {
            dayNumber: this.dayNumber,
            decisionsTaken: this.decisionstaken,
            resourcesGained: this.resourcesGained
        }
    }

    getDayNumber() { return this.dayNumber; }
    nextDayNumber() { this.dayNumber + 1; }
}