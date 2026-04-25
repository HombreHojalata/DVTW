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
        this.numberOfEvents=0;
        this.Orquilladerecursos=[{
            minMoney: 200000,
            maxMoney: 550000,
            maxCorruption: 60,
            maxSatisfaction: 35,
            minSatisfaction: 28
        },{
            minMoney: 180000,
            maxMoney: 400000,
            maxCorruption: 50,
            maxSatisfaction: 37,
            minSatisfaction: 30
        },{
            minMoney: 100000,
            maxMoney: 300000,
            maxCorruption: 40,
            maxSatisfaction: 35,
            minSatisfaction: 30
        },{
            minMoney: 100000,
            maxMoney: 250000,
            maxCorruption: 40,
            maxSatisfaction: 45,
            minSatisfaction: 40
        },{
            minMoney: 0,
            maxMoney: 120000,
            maxCorruption: 40,
            maxSatisfaction: 55,
            minSatisfaction: 44
        }]
    }
    getNumberOfEvents() { return this.numberOfEvents; }
    incrementNumberOfEvents() { this.numberOfEvents += 1; }
    getOrquilladeRecursos(daynumber){
        return this.Orquilladerecursos[daynumber - 1];
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