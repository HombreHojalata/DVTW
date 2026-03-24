import Phaser from 'phaser'
// PRINCIPAL SCENE ASSETS
import introScene from '../assets/sprites/scenes/introScene.png'  
import loadScene from '../assets/sprites/scenes/loadScene.png'          //NEED TO BE REPLACE

// MAP ASSETS
import map from '../assets/sprites/map/mapTemplate.png'
// UI ASSETS
import battery from '../assets/sprites/battery.png'
import endDayNormal from '..//assets/sprites/endDayNormal.png'
import endDayBright from '..//assets/sprites/endDayBright.png'
import endDayPressed from '..//assets/sprites/endDayPressed.png'
// DISTRICT SCENE ASSETS
import districtTemplate from '../assets/sprites/map/districtScenes/districtTemplate.png'
import districtStoreTemplate from '../assets/sprites/map/districtScenes/districtStoreTemplate.png'                    //NEED TO BE REPLACE
import districtBorrascalScene1 from '../assets/sprites/map/districtScenes/districtBorrascalScene1.png'                //NEED TO BE REPLACE
import districtElNidoScene1 from '../assets/sprites/map/districtScenes/districtElNidoScene1.png'                      //NEED TO BE REPLACE
import districtGuineaScene1 from '../assets/sprites/map/districtScenes/districtGuineaScene1.png'                      //NEED TO BE REPLACE
import districtNuevaPraderaScene1 from '../assets/sprites/map/districtScenes/districtNuevaPraderaScene1.png'          //NEED TO BE REPLACE
import districtSaharScene1 from '../assets/sprites/map/districtScenes/districtSaharScene1.png'                        //NEED TO BE REPLACE
import districtSomosaguaScene1 from '../assets/sprites/map/districtScenes/districtSomosaguaScene1.png'                //NEED TO BE REPLACE
// DISTRICT
import districtBorrascal from '../assets/sprites/map/district/districtBorrascal.png'
import districtBorrascalSpecial from '../assets/sprites/map/district/districtBorrascalSpecial.png'                    //NEED TO BE REPLACE
import districtElNido from '../assets/sprites/map/district/districtElNido.png'
import districtElNidoSpecial from '../assets/sprites/map/district/districtElNidoSpecial.png'                          //NEED TO BE REPLACE
import districtGuinea from '../assets/sprites/map/district/districtGuinea.png'
import districtGuineaSpecial from '../assets/sprites/map/district/districtGuineaSpecial.png' 
import districtNuevaPradera from '../assets/sprites/map/district/districtNuevaPradera.png'
import districtNuevaPraderaSpecial from '../assets/sprites/map/district/districtNuevaPraderaSpecial.png'  
import districtSahar from '../assets/sprites/map/district/districtSahar.png'
import districtSaharSpecial from '../assets/sprites/map/district/districtSaharSpecial.png'                            //NEED TO BE REPLACE
import districtSomosagua from '../assets/sprites/map/district/districtSomosagua.png'
import districtSomosaguaSpecial from '../assets/sprites/map/district/districtSomosaguaSpecial.png'                    //NEED TO BE REPLACE
// BUILDING ASSETS
import buildingCinema from '../assets/sprites/map/buildings/buildingCinema.png'                                       //NEED TO BE REPLACE
import buildingComercialCenter from '../assets/sprites/map/buildings/buildingComercialCenter.png'                     //NEED TO BE REPLACE
import buildingFactory from '../assets/sprites/map/buildings/buildingFactory.png'                                     //NEED TO BE REPLACE
import buildingHospital from '../assets/sprites/map/buildings/buildingHospital.png'                                   //NEED TO BE REPLACE
import buildingHotel from '../assets/sprites/map/buildings/buildingHotel.png'                                         //NEED TO BE REPLACE
import buildingHouse from '../assets/sprites/map/buildings/buildingHouse.png'                                         //NEED TO BE REPLACE
import buildingPark from '../assets/sprites/map/buildings/buildingPark.png'                                           //NEED TO BE REPLACE
import specialBuildingBorrascal from '../assets/sprites/map/buildings/specialBuildingBorrascal.png'                   //NEED TO BE REPLACE
import specialBuildingElNido from '../assets/sprites/map/buildings/specialBuildingElNido.png'                         //NEED TO BE REPLACE
import specialBuildingGuinea from '../assets/sprites/map/buildings/specialBuildingGuinea.png'                         //NEED TO BE REPLACE
import specialBuildingNuevaPradera from '../assets/sprites/map/buildings/specialBuildingNuevaPradera.png'             //NEED TO BE REPLACE
import specialBuildingSahar from '../assets/sprites/map/buildings/specialBuildingSahar.png'                           //NEED TO BE REPLACE
import specialBuildingSomosagua from '../assets/sprites/map/buildings/specialBuildingSomosagua.png'                   //NEED TO BE REPLACE
import specialBuildingMafia from '../assets/sprites/map/buildings/specialBuildingMafia.png'                           //NEED TO BE REPLACE

// BLACK MARKET ASSETS
import vendedor from '../assets/sprites/Vendedor.png' 
import prensa_icon from '../assets/sprites/marketIcons/prensa.png'
import hotel_icon from '../assets/sprites/marketIcons/hotel.png'
// ICONS        NEED TO BE REPLACED
import closeIcon from '../assets/sprites/icons/closeIcon.png'                 
import configurationIcon from '../assets/sprites/icons/configurationIcon.png'     //NEED TO BE REPLACE
import storeIcon from '../assets/sprites/icons/storeIcon.png'                     //NEED TO BE REPLACE 
import increaseIcon from '../assets/sprites/icons/increaseIcon.png'
import increaseSelectIcon from '../assets/sprites/icons/increaseSelectIcon.png'
import decreaseIcon from '../assets/sprites/icons/decreaseIcon.png'
import decreaseSelectIcon from '../assets/sprites/icons/decreaseSelectIcon.png'


//PROTOTYPE ASSETS, TO BE REPLACED
import presidente from '../assets/sprites/presidente.png'                         //NEED TO BE REPLACE
// MISSION ASSETS
import missionTemplate from '../assets/sprites/mission/missionTemplate.png'
// MISSION DISTRICT BORRASCAL SCENE ASSETS
import regularSceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/regularScene.png'
import upMoneySceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/upMoneyScene.png'
import downMoneySceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/downMoneyScene.png'
import upPopularitySceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/upPopularityScene.png'
import downPopularitySceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/downPopularityScene.png'
import downCorruptionSceneBorrascal from '../assets/sprites/mission/scenes/districtBorrascal/downCorruptionScene.png'
// MISSION DISTRICT EL NIDO SCENE ASSETS
import regularSceneElNido from '../assets/sprites/mission/scenes/districtElNido/regularScene.png'
import upMoneySceneElNido from '../assets/sprites/mission/scenes/districtElNido/upMoneyScene.png'
import downMoneySceneElNido from '../assets/sprites/mission/scenes/districtElNido/downMoneyScene.png'
import upPopularitySceneElNido from '../assets/sprites/mission/scenes/districtElNido/upPopularityScene.png'
import downPopularitySceneElNido from '../assets/sprites/mission/scenes/districtElNido/downPopularityScene.png'
import downCorruptionSceneElNido from '../assets/sprites/mission/scenes/districtElNido/downCorruptionScene.png'
// MISSION DISTRICT GUINEA SCENE ASSETS
import regularSceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/regularScene.png'
import upMoneySceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/upMoneyScene.png'
import downMoneySceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/downMoneyScene.png'
import upPopularitySceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/upPopularityScene.png'
import downPopularitySceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/downPopularityScene.png'
import downCorruptionSceneGuinea from '../assets/sprites/mission/scenes/districtGuinea/downCorruptionScene.png'
// MISSION DISTRICT NUEVA PRADERA SCENE ASSETS
import regularSceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/regularScene.png'
import upMoneySceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/upMoneyScene.png'
import downMoneySceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/downMoneyScene.png'
import upPopularitySceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/upPopularityScene.png'
import downPopularitySceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/downPopularityScene.png'
import downCorruptionSceneNuevaPradera from '../assets/sprites/mission/scenes/districtNuevaPradera/downCorruptionScene.png'
// MISSION DISTRICT SAHAR SCENE ASSETS
import regularSceneSahar from '../assets/sprites/mission/scenes/districtSahar/regularScene.png'
import upMoneySceneSahar from '../assets/sprites/mission/scenes/districtSahar/upMoneyScene.png'
import downMoneySceneSahar from '../assets/sprites/mission/scenes/districtSahar/downMoneyScene.png'
import upPopularitySceneSahar from '../assets/sprites/mission/scenes/districtSahar/upPopularityScene.png'
import downPopularitySceneSahar from '../assets/sprites/mission/scenes/districtSahar/downPopularityScene.png'
import downCorruptionSceneSahar from '../assets/sprites/mission/scenes/districtSahar/downCorruptionScene.png'
// MISSION DISTRICT SOMOSAGUA SCENE ASSETS
import regularSceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/regularScene.png'
import upMoneySceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/upMoneyScene.png'
import downMoneySceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/downMoneyScene.png'
import upPopularitySceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/upPopularityScene.png'
import downPopularitySceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/downPopularityScene.png'
import downCorruptionSceneSomosagua from '../assets/sprites/mission/scenes/districtSomosagua/downCorruptionScene.png'

// JSON misiones
import RegularMission from '../assets/jsons/regularMissions.json';
import UpMoneyMission from '../assets/jsons/upMoney.json';
import UpPopularityMission from '../assets/jsons/upPopularity.json';
import downCorruptionMission from '../assets/jsons/downCorruption.json';
import downPopularityMission from '../assets/jsons/downPopularity.json';
import downMoneyMission from '../assets/jsons/downMoney.json';
/**
 * 
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');

    //LOAD de JSONS para las misiones
    this.cache.json.add('regularMissions', RegularMission);
    this.cache.json.add('upMoney', UpMoneyMission);
    this.cache.json.add('upPopularity', UpPopularityMission);
    this.cache.json.add('downCorruption', downCorruptionMission);
    this.cache.json.add('downPopularity', downPopularityMission);
    this.cache.json.add('downMoney', downMoneyMission);


    this.load.image('load', loadScene);
    this.load.image('init', introScene);
    // MAP ASSETS
    this.load.image('map', map);
    // UI ASSETS
    this.load.image('battery', battery);
    this.load.image('endDayNormal', endDayNormal);
    this.load.image('endDayBrigth', endDayBright);
    this.load.image('endDayPressed', endDayPressed);
    // DISTRICT SCENES ASSETS
    this.load.image('districtTemplate', districtTemplate);
    this.load.image('districtStoreTemplate', districtStoreTemplate);
    this.load.image('districtBorrascalScene1', districtBorrascalScene1);
    this.load.image('districtElNidoScene1', districtElNidoScene1);
    this.load.image('districtGuineaScene1', districtGuineaScene1);
    this.load.image('districtNuevaPraderaScene1', districtNuevaPraderaScene1);
    this.load.image('districtSaharScene1', districtSaharScene1);
    this.load.image('districtSomosaguaScene1', districtSomosaguaScene1);
    // DISTRICT ASSETS
    this.load.image('districtBorrascal', districtBorrascal);
    this.load.image('districtElNido', districtElNido);
    this.load.image('districtGuinea', districtGuinea);
    this.load.image('districtNuevaPradera', districtNuevaPradera);
    this.load.image('districtSahar', districtSahar);
    this.load.image('districtSomosagua', districtSomosagua);
    // SPECIAL DISTRICT ASSETS
    this.load.image('districtBorrascalSpecial', districtBorrascalSpecial);
    this.load.image('districtElNidoSpecial', districtElNidoSpecial);
    this.load.image('districtGuineaSpecial', districtGuineaSpecial);
    this.load.image('districtNuevaPraderaSpecial', districtNuevaPraderaSpecial);
    this.load.image('districtSaharSpecial', districtSaharSpecial);
    this.load.image('districtSomosaguaSpecial', districtSomosaguaSpecial);
    // NORMAL BUILDING ASSETS
    this.load.image('buildingCinema', buildingCinema);
    this.load.image('buildingComercialCenter', buildingComercialCenter);
    this.load.image('buildingFactory', buildingFactory);
    this.load.image('buildingHospital', buildingHospital);
    this.load.image('buildingHotel', buildingHotel);
    this.load.image('buildingHouse', buildingHouse);
    this.load.image('buildingPark', buildingPark);
    // SPECIAL BUILDING ASSETS
    this.load.image('specialBuildingBorrascal', specialBuildingBorrascal);
    this.load.image('specialBuildingElNido', specialBuildingElNido);
    this.load.image('specialBuildingGuinea', specialBuildingGuinea);
    this.load.image('specialBuildingNuevaPradera', specialBuildingNuevaPradera);
    this.load.image('specialBuildingSahar', specialBuildingSahar);
    this.load.image('specialBuildingSomosagua', specialBuildingSomosagua);
    this.load.image('specialBuildingMafia', specialBuildingMafia);
    // ICONS ASSETS
    this.load.image('configurationIcon', configurationIcon);
    this.load.image('closeIcon', closeIcon);
    this.load.image('storeIcon', storeIcon);
    this.load.image('increaseIcon', increaseIcon);
    this.load.image('increaseSelectIcon', increaseSelectIcon);
    this.load.image('decreaseIcon', decreaseIcon);
    this.load.image('decreaseSelectIcon', decreaseSelectIcon);
    // PRESIDENTE ASSET
    this.load.image('presidente', presidente);
    // MISSION ASSETS
    this.load.image('missionTemplate',missionTemplate);
    // MISSION DISTRICT BORRASCAL SCENE ASSETS
    this.load.image('regularSceneBorrascal', regularSceneBorrascal);
    this.load.image('upMoneySceneBorrascal', upMoneySceneBorrascal);
    this.load.image('downMoneySceneBorrascal', downMoneySceneBorrascal);
    this.load.image('upPopularitySceneBorrascal', upPopularitySceneBorrascal);
    this.load.image('downPopularitySceneBorrascal', downPopularitySceneBorrascal);
    this.load.image('downCorruptionSceneBorrascal', downCorruptionSceneBorrascal);
    // MISSION DISTRICT EL NIDO SCENE ASSETS
    this.load.image('regularSceneElNido', regularSceneElNido);
    this.load.image('upMoneySceneElNido', upMoneySceneElNido);
    this.load.image('downMoneySceneElNido', downMoneySceneElNido);
    this.load.image('upPopularitySceneElNido', upPopularitySceneElNido);
    this.load.image('downPopularitySceneElNido', downPopularitySceneElNido);
    this.load.image('downCorruptionSceneElNido', downCorruptionSceneElNido);
    // MISSION DISTRICT GUINEA SCENE ASSETS
    this.load.image('regularSceneGuinea', regularSceneGuinea);
    this.load.image('upMoneySceneGuinea', upMoneySceneGuinea);
    this.load.image('downMoneySceneGuinea', downMoneySceneGuinea);
    this.load.image('upPopularitySceneGuinea', upPopularitySceneGuinea);
    this.load.image('downPopularitySceneGuinea', downPopularitySceneGuinea);
    this.load.image('downCorruptionSceneGuinea', downCorruptionSceneGuinea);
    // MISSION DISTRICT NUEVA PRADERA SCENE ASSETS
    this.load.image('regularSceneNuevaPradera', regularSceneNuevaPradera);
    this.load.image('upMoneySceneNuevaPradera', upMoneySceneNuevaPradera);
    this.load.image('downMoneySceneNuevaPradera', downMoneySceneNuevaPradera);
    this.load.image('upPopularitySceneNuevaPradera', upPopularitySceneNuevaPradera);
    this.load.image('downPopularitySceneNuevaPradera', downPopularitySceneNuevaPradera);
    this.load.image('downCorruptionSceneNuevaPradera', downCorruptionSceneNuevaPradera);
    // MISSION DISTRICT SAHAR SCENE ASSETS
    this.load.image('regularSceneSahar', regularSceneSahar);
    this.load.image('upMoneySceneSahar', upMoneySceneSahar);
    this.load.image('downMoneySceneSahar', downMoneySceneSahar);
    this.load.image('upPopularitySceneSahar', upPopularitySceneSahar);
    this.load.image('downPopularitySceneSahar', downPopularitySceneSahar);
    this.load.image('downCorruptionSceneSahar', downCorruptionSceneSahar);
    // MISSION DISTRICT SOMOSAGUA SCENE ASSETS
    this.load.image('regularSceneSomosagua', regularSceneSomosagua);
    this.load.image('upMoneySceneSomosagua', upMoneySceneSomosagua);
    this.load.image('downMoneySceneSomosagua', downMoneySceneSomosagua);
    this.load.image('upPopularitySceneSomosagua', upPopularitySceneSomosagua);
    this.load.image('downPopularitySceneSomosagua', downPopularitySceneSomosagua);
    this.load.image('downCorruptionSceneSomosagua', downCorruptionSceneSomosagua);  
    //PROTOTYPE ASSETS, TO BE REPLACED
    this.load.image('vendedor', vendedor);
    this.load.image('pensa_icon', prensa_icon);
    this.load.image('hotel_icon', hotel_icon);
  }

  create() {
    this.add.image(750, 375, 'load');                                                                //WE CAN ADD MUSIC AND LOADING BAR HERE
    // Crear la barra de carga
    const barWidth = 600;
    const barHeight = 30;
    const barX = this.cameras.main.centerX - barWidth / 2;
    const barY = this.cameras.main.centerY + 300;

    // Fondo de la barra
    const barBg = this.add.graphics();
    barBg.fillStyle(0x000000, 0.5);
    barBg.fillRect(barX, barY, barWidth, barHeight);

    // Barra de progreso
    const progressBar = this.add.graphics();
    progressBar.fillStyle(0xffff00, 1);

    this.tweens.add({
      targets: { width: 0 },
      width: barWidth,
      duration: 1500, //1.5 SECONDS
      ease: 'Linear',
      onUpdate: (tween) => {
        progressBar.clear();
        progressBar.fillStyle(0xffff00, 1);
        progressBar.fillRect(barX, barY, tween.getValue(), barHeight);
      },
      onComplete: () => {
        this.scene.start('introScene');
      }
    });
  }
}
