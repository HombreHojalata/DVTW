import Story from './story.js';
import Mission from './mission.js';



export default class missionManager{
    constructor(scene,player){
        this.scene = scene;
        this.player = player;
        this.regularMissions = [];
        this.upMoneyMissions = [];
        this.upPopularityMissions = [];
        this.downPopularityMissions = [];
        this.downMoneyMissions = [];
        this.downCorruptionMissions = [];
        this.activeMissions = [];
        this.minigameMissions=[];
        this.story = new Story();//Aqui se asigna una de las historias de forma aleatoria.
        this.districtsWithMissions=[false,false,false,false,false,false];

        this.espectedResources = {
            money: 400,
            corruption: 30,
            popularity: 51
        }
        this.loadMissions();
    }

    


    getMission(map, day){
        //Primero de todo vamos a ver en que distrito sería la mision para elegir la misión en función de eso.
        let districtIndex = Math.floor(Math.random() * 6);
        if(this.districtsWithMissions[districtIndex]){
            if(!this.districtsWithMissions[0] || !this.districtsWithMissions[1] || !this.districtsWithMissions[2] || !this.districtsWithMissions[3] || !this.districtsWithMissions[4] || !this.districtsWithMissions[5]){
                while(this.districtsWithMissions[districtIndex]){
                    districtIndex = Math.floor(Math.random() * 6);
                }
            }
            else {
                //No se debería llegar aquí meter limitaciones para evitarlo.
                districtIndex=-1;
            }
        }
        if(districtIndex==-1){
            let nullMission = new Mission("NULL","NULL",false,false,false);
            nullMission.setDistrict("NULL");
            return nullMission;
        }
        this.districtsWithMissions[districtIndex] = true;
        let districtName;
        let districtPosition;
        if(districtIndex == 0){
            districtName = "BORRASCAL";
            districtPosition = [1160, 150];
        }
        else if(districtIndex == 1){
            districtName = "EL_NIDO";
            districtPosition = [680, 390];
        }
        else if(districtIndex == 2){
            districtName = "GUINEA";
            districtPosition = [250, 200];
        }
        else if(districtIndex == 3){
            districtName = "NUEVA_PRADERA";
            districtPosition = [1020, 540];
        }
        else if(districtIndex == 4){
            districtName = "SAHAR";
            districtPosition = [350, 450];
        }
        else{//districtIndex == 5
            districtName = "SOMOSAGUA";
            districtPosition = [800, 160];
        }
        //Atributos a tener en cuenta para elegir la misión:
        let districtSatisfaction = map.getDistrictByName(districtName).getSatisfaction();
        let money = this.player.getMoney();
        let corruption = this.player.getCorruption();
        let energy = this.player.getEnergy();
        //Limites de recursos para elegir misión, dependiendo del dia:
        let orquilladeRecursos = day.getOrquilladeRecursos(day.getDayNumber());
        let minMoney = orquilladeRecursos.minMoney;
        let maxMoney = orquilladeRecursos.maxMoney;
        let maxCorruption = orquilladeRecursos.maxCorruption;
        let maxSatisfaction = orquilladeRecursos.maxSatisfaction;
        let minSatisfaction = orquilladeRecursos.minSatisfaction;
        //Logica para elegir mision:
        let missionType;
        let missionSelected;

        if((corruption > maxCorruption) && (Math.random() * (corruption - maxCorruption+40))>20){
                missionSelected = this.downCorruptionMissions[Math.floor(Math.random() * this.downCorruptionMissions.length)];
            }

        else if((districtSatisfaction < minSatisfaction) && (Math.random() *100)<80){
            missionType = "upPopularity";
            missionSelected = this.upPopularityMissions[Math.floor(Math.random() * this.upPopularityMissions.length)];
        }
        else if((districtSatisfaction > maxSatisfaction) && (Math.random() *100)<80){
            missionType = "downPopularity";
            missionSelected = this.downPopularityMissions[Math.floor(Math.random() * this.downPopularityMissions.length)];
        }
        else if((districtSatisfaction < maxSatisfaction) && (districtSatisfaction > minSatisfaction) &&((Math.random() *100)<15)){
            if((Math.random() *100)<=50){
                missionType = "upPopularity";
                missionSelected = this.upPopularityMissions[Math.floor(Math.random() * this.upPopularityMissions.length)];
            }
            else{
                missionType = "downPopularity";
                missionSelected = this.downPopularityMissions[Math.floor(Math.random() * this.downPopularityMissions.length)];
            }
        }
        else{
            if((money < minMoney) && (Math.random() *100)<80){
                missionType = "upMoney";
                missionSelected = this.upMoneyMissions[Math.floor(Math.random() * this.upMoneyMissions.length)];
            }
            else if((money > maxMoney) && (Math.random() *100)<80){
                missionType = "downMoney";
                missionSelected = this.downMoneyMissions[Math.floor(Math.random() * this.downMoneyMissions.length)];
            }
            else if((money < maxMoney) && (money > minMoney) && ((Math.random() *100)<15)){
                if((Math.random() *100)<=50){
                    missionType = "upMoney";
                    missionSelected = this.upMoneyMissions[Math.floor(Math.random() * this.upMoneyMissions.length)];
                }
                else{
                    missionType = "downMoney";
                    missionSelected = this.downMoneyMissions[Math.floor(Math.random() * this.downMoneyMissions.length)];
                }
            }
            else{
                missionType = "regular";
                missionSelected = this.regularMissions[Math.floor(Math.random() * this.regularMissions.length)];
            }
        }
        missionSelected.setDistrict(districtName);
        missionSelected.setPos(districtPosition[0],districtPosition[1]);
        missionSelected.setSceneImage(this.chooseImage(missionType, districtName));
        this.activeMissions.push(missionSelected);
        return missionSelected;
    }

    finishDay(){
        dayFinished = this.day;
        this.day = new day(this.day);
        return dayFinished.getDaySummary();    
    }

    async loadMissions(){


        const regularMissionData = this.scene.cache.json.get('regularMissions');

        regularMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.regularMissions.push(mission);
    });

    const upMoneyMissionData = this.scene.cache.json.get('upMoney');

        upMoneyMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.upMoneyMissions.push(mission);
    });

    const upPopularityMissionData = this.scene.cache.json.get('upPopularity');

        upPopularityMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.upPopularityMissions.push(mission);
    });

    const downCorruptionMissionData = this.scene.cache.json.get('downCorruption');

        downCorruptionMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downCorruptionMissions.push(mission);
    });

    const downPopularityMissionData = this.scene.cache.json.get('downPopularity');

        downPopularityMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downPopularityMissions.push(mission);
    });
    const downMoneyMissionData = this.scene.cache.json.get('downMoney');

        downMoneyMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downMoneyMissions.push(mission);
    });
    const minigameMissionData = this.scene.cache.json.get('minigameMoney');

        minigameMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.minigameMissions.push(mission);
    });
    let numberOfMInigamesRepetitions = 16;
    for(let i=0; i<numberOfMInigamesRepetitions; i++){
        this.downCorruptionMissions.push(this.minigameMissions[2]);
        this.upMoneyMissions.push(this.minigameMissions[4]);
        this.upMoneyMissions.push(this.minigameMissions[3]);
        this.upMoneyMissions.push(this.minigameMissions[2]);
        this.upPopularityMissions.push(this.minigameMissions[0]);
        this.upPopularityMissions.push(this.minigameMissions[1]);
    }
}
    rmMission(mission){
        const districtName = mission.getDistrict(); 
        if(districtName == "BORRASCAL"){
            this.districtsWithMissions[0] = false;
        }
        else if(districtName == "EL_NIDO"){
            this.districtsWithMissions[1] = false;
        }
        else if(districtName == "GUINEA"){
            this.districtsWithMissions[2] = false;
        }
        else if(districtName == "NUEVA_PRADERA"){
            this.districtsWithMissions[3] = false;
        }
        else if(districtName == "SAHAR"){
            this.districtsWithMissions[4] = false;
        }
        else{//districtName == "SOMOSAGUA"
            this.districtsWithMissions[5] = false;
        }
        this.minigameMissions = this.minigameMissions.filter(m => m !== mission);
        this.regularMissions = this.regularMissions.filter(m => m !== mission);
        this.upMoneyMissions = this.upMoneyMissions.filter(m => m !== mission);
        this.upPopularityMissions = this.upPopularityMissions.filter(m => m !== mission);
        this.downMoneyMissions = this.downMoneyMissions.filter(m => m !== mission);
        this.downPopularityMissions = this.downPopularityMissions.filter(m => m !== mission);
        this.downCorruptionMissions = this.downCorruptionMissions.filter(m => m !== mission);
        mission.deleteMissionButton();
        this.activeMissions = this.activeMissions.filter(m => m !== mission);
    }
    deleteAllMissions(){
        for(let mission of this.activeMissions){
            mission.deleteMissionButton();
        }
        this.activeMissions = [];
        this.districtsWithMissions=[false,false,false,false,false,false];
    }
    chooseImage(missionType, districtName){
        let imageKey = '';
        if(missionType == "upPopularity"){
            if(districtName == "BORRASCAL"){imageKey = 'upPopularitySceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'upPopularitySceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'upPopularitySceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'upPopularitySceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'upPopularitySceneSahar';}
            else{//districtName == "SOMOSAGUA"
                imageKey = 'upPopularitySceneSomosagua';}
        }
        else if(missionType == "downPopularity"){
            if(districtName == "BORRASCAL"){imageKey = 'downPopularitySceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'downPopularitySceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'downPopularitySceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'downPopularitySceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'downPopularitySceneSahar';}
            else{//districtName == "SOMOSAGUA"
                imageKey = 'downPopularitySceneSomosagua'; }
        }
        else if(missionType == "upMoney"){
            if(districtName == "BORRASCAL"){imageKey = 'upMoneySceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'upMoneySceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'upMoneySceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'upMoneySceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'upMoneySceneSahar';}
            else{//districtName == "SOMOSAGUA"
                imageKey = 'upMoneySceneSomosagua';}
        }
        else if(missionType == "downMoney"){
            if(districtName == "BORRASCAL"){imageKey = 'downMoneySceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'downMoneySceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'downMoneySceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'downMoneySceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'downMoneySceneSahar';}
            else{//districtName == "SOMOSAGUA"
            imageKey = 'downMoneySceneSomosagua';}
        }
        else if(missionType == "downCorruption"){
            if(districtName == "BORRASCAL"){imageKey = 'downCorruptionSceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'downCorruptionSceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'downCorruptionSceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'downCorruptionSceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'downCorruptionSceneSahar';}
            else{//districtName == "SOMOSAGUA"
                imageKey = 'downCorruptionSceneSomosagua';}
        }
        else if(missionType == "regular"){
            if(districtName == "BORRASCAL"){imageKey = 'regularSceneBorrascal';}
            else if(districtName == "EL_NIDO"){imageKey = 'regularSceneElNido';}
            else if(districtName == "GUINEA"){imageKey = 'regularSceneGuinea';}
            else if(districtName == "NUEVA_PRADERA"){imageKey = 'regularSceneNuevaPradera';}
            else if(districtName == "SAHAR"){imageKey = 'regularSceneSahar';}
            else{//districtName == "SOMOSAGUA"
                imageKey = 'regularSceneSomosagua';}
        }
        return imageKey;
    }
}