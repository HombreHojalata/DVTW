import Phaser from 'phaser'
// PRINCIPAL SCENE ASSETS
import introScene from '../assets/scenes/introScene.png'  
import loadScene from '../assets/scenes/loadScene.png'                                                        //NEED TO BE REPLACE
import configScene from '../assets/scenes/configScene.png'

// TUTORIAL ASSETS
import tutorialAnimals1 from '../assets/other/tutorialAnimals1.png'
import tutorialAnimals2 from '../assets/other/tutorialAnimals2.png'
import tutorialAnimals3 from '../assets/other/tutorialAnimals3.png'
import textCloud from '../assets/other/textCloud.png'

// PROTOTYPE ASSETS, TO BE REPLACED
import presidente from '../assets/other/presidente.png'                                                       //NEED TO BE REPLACE

// MAP ASSET
import map from '../assets/map/mapTemplate.png'

// DISTRICT SCENE ASSETS
import districtTemplate from '../assets/map/districtScenes/districtTemplate.png'
import districtStoreTemplate from '../assets/map/districtScenes/districtStoreTemplate.png'                    //NEED TO BE REPLACE
import districtBorrascalScene1 from '../assets/map/districtScenes/districtBorrascalScene1.png'                //NEED TO BE REPLACE
import districtElNidoScene1 from '../assets/map/districtScenes/districtElNidoScene1.png'                      //NEED TO BE REPLACE
import districtGuineaScene1 from '../assets/map/districtScenes/districtGuineaScene1.png'                      //NEED TO BE REPLACE
import districtNuevaPraderaScene1 from '../assets/map/districtScenes/districtNuevaPraderaScene1.png'          //NEED TO BE REPLACE
import districtSaharScene1 from '../assets/map/districtScenes/districtSaharScene1.png'                        //NEED TO BE REPLACE
import districtSomosaguaScene1 from '../assets/map/districtScenes/districtSomosaguaScene1.png'                //NEED TO BE REPLACE
// DISTRICT
import districtBorrascal from '../assets/map/district/districtBorrascal.png'
import districtBorrascalSpecial from '../assets/map/district/districtBorrascalSpecial.png'
import districtElNido from '../assets/map/district/districtElNido.png'
import districtElNidoSpecial from '../assets/map/district/districtElNidoSpecial.png'
import districtGuinea from '../assets/map/district/districtGuinea.png'
import districtGuineaSpecial from '../assets/map/district/districtGuineaSpecial.png' 
import districtNuevaPradera from '../assets/map/district/districtNuevaPradera.png'
import districtNuevaPraderaSpecial from '../assets/map/district/districtNuevaPraderaSpecial.png'  
import districtSahar from '../assets/map/district/districtSahar.png'
import districtSaharSpecial from '../assets/map/district/districtSaharSpecial.png'
import districtSomosagua from '../assets/map/district/districtSomosagua.png'
import districtSomosaguaSpecial from '../assets/map/district/districtSomosaguaSpecial.png'
// BUILDING ASSETS
import buildingCinema from '../assets/map/buildings/buildingCinema.png'
import buildingComercialCenter from '../assets/map/buildings/buildingComercialCenter.png'
import buildingFactory from '../assets/map/buildings/buildingFactory.png' 
import buildingHospital from '../assets/map/buildings/buildingHospital.png'
import buildingHotel from '../assets/map/buildings/buildingHotel.png' 
import buildingHouse from '../assets/map/buildings/buildingHouse.png'     
import buildingPark from '../assets/map/buildings/buildingPark.png'                                    
import specialBuildingBorrascal from '../assets/map/buildings/specialBuildingBorrascal.png'                   //NEED TO BE REPLACE
import specialBuildingElNido from '../assets/map/buildings/specialBuildingElNido.png'                         //NEED TO BE REPLACE
import specialBuildingGuinea from '../assets/map/buildings/specialBuildingGuinea.png'                         //NEED TO BE REPLACE
import specialBuildingNuevaPradera from '../assets/map/buildings/specialBuildingNuevaPradera.png'             //NEED TO BE REPLACE
import specialBuildingSahar from '../assets/map/buildings/specialBuildingSahar.png'                           //NEED TO BE REPLACE
import specialBuildingSomosagua from '../assets/map/buildings/specialBuildingSomosagua.png'                   //NEED TO BE REPLACE
import specialBuildingMafia from '../assets/map/buildings/specialBuildingMafia.png'                           //NEED TO BE REPLACE

// MISSION ASSETS
import missionTemplate from '../assets/mission/missionTemplate.png'
import missionCorruptTemplate from '../assets/mission/missionCorruptTemplate.png'
// MISSION DISTRICT BORRASCAL SCENE ASSETS
import regularSceneBorrascal from '../assets/mission/scenes/districtBorrascal/regularScene.png'
import upMoneySceneBorrascal from '../assets/mission/scenes/districtBorrascal/upMoneyScene.png'
import downMoneySceneBorrascal from '../assets/mission/scenes/districtBorrascal/downMoneyScene.png'
import upPopularitySceneBorrascal from '../assets/mission/scenes/districtBorrascal/upPopularityScene.png'
import downPopularitySceneBorrascal from '../assets/mission/scenes/districtBorrascal/downPopularityScene.png'
import downCorruptionSceneBorrascal from '../assets/mission/scenes/districtBorrascal/downCorruptionScene.png'
// MISSION DISTRICT EL NIDO SCENE ASSETS
import regularSceneElNido from '../assets/mission/scenes/districtElNido/regularScene.png'
import upMoneySceneElNido from '../assets/mission/scenes/districtElNido/upMoneyScene.png'
import downMoneySceneElNido from '../assets/mission/scenes/districtElNido/downMoneyScene.png'
import upPopularitySceneElNido from '../assets/mission/scenes/districtElNido/upPopularityScene.png'
import downPopularitySceneElNido from '../assets/mission/scenes/districtElNido/downPopularityScene.png'
import downCorruptionSceneElNido from '../assets/mission/scenes/districtElNido/downCorruptionScene.png'
// MISSION DISTRICT GUINEA SCENE ASSETS
import regularSceneGuinea from '../assets/mission/scenes/districtGuinea/regularScene.png'
import upMoneySceneGuinea from '../assets/mission/scenes/districtGuinea/upMoneyScene.png'
import downMoneySceneGuinea from '../assets/mission/scenes/districtGuinea/downMoneyScene.png'
import upPopularitySceneGuinea from '../assets/mission/scenes/districtGuinea/upPopularityScene.png'
import downPopularitySceneGuinea from '../assets/mission/scenes/districtGuinea/downPopularityScene.png'
import downCorruptionSceneGuinea from '../assets/mission/scenes/districtGuinea/downCorruptionScene.png'
// MISSION DISTRICT NUEVA PRADERA SCENE ASSETS
import regularSceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/regularScene.png'
import upMoneySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/upMoneyScene.png'
import downMoneySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downMoneyScene.png'
import upPopularitySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/upPopularityScene.png'
import downPopularitySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downPopularityScene.png'
import downCorruptionSceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downCorruptionScene.png'
// MISSION DISTRICT SAHAR SCENE ASSETS
import regularSceneSahar from '../assets/mission/scenes/districtSahar/regularScene.png'
import upMoneySceneSahar from '../assets/mission/scenes/districtSahar/upMoneyScene.png'
import downMoneySceneSahar from '../assets/mission/scenes/districtSahar/downMoneyScene.png'
import upPopularitySceneSahar from '../assets/mission/scenes/districtSahar/upPopularityScene.png'
import downPopularitySceneSahar from '../assets/mission/scenes/districtSahar/downPopularityScene.png'
import downCorruptionSceneSahar from '../assets/mission/scenes/districtSahar/downCorruptionScene.png'
// MISSION DISTRICT SOMOSAGUA SCENE ASSETS
import regularSceneSomosagua from '../assets/mission/scenes/districtSomosagua/regularScene.png'
import upMoneySceneSomosagua from '../assets/mission/scenes/districtSomosagua/upMoneyScene.png'
import downMoneySceneSomosagua from '../assets/mission/scenes/districtSomosagua/downMoneyScene.png'
import upPopularitySceneSomosagua from '../assets/mission/scenes/districtSomosagua/upPopularityScene.png'
import downPopularitySceneSomosagua from '../assets/mission/scenes/districtSomosagua/downPopularityScene.png'
import downCorruptionSceneSomosagua from '../assets/mission/scenes/districtSomosagua/downCorruptionScene.png'

// BLACK MARKET ASSETS
import vendedor from '../assets/other/Vendedor.png' 
import vendedorSilueta from '../assets/other/VendedorSilueta.png' 
import prensa_icon from '../assets/marketIcons/prensa.png'
import hotel_icon from '../assets/marketIcons/hotel.png'

// ICONS 
import closeIcon from '../assets/icons/closeIcon.png'                 
import configurationIcon from '../assets/icons/configurationIcon.png'
import storeIcon from '../assets/icons/storeIcon.png'
import increaseIcon from '../assets/icons/increaseIcon.png'
import increaseSelectIcon from '../assets/icons/increaseSelectIcon.png'
import decreaseIcon from '../assets/icons/decreaseIcon.png'
import decreaseSelectIcon from '../assets/icons/decreaseSelectIcon.png'
import missionIcon from '../assets/icons/missionIcon.png'
import missionCorruptIcon from '../assets/icons/missionCorruptIcon.png'
import blackMarketIcon from '../assets/icons/blackMarketIcon.png'

// UI ASSETS
import battery from '../assets/UIs/battery.png'
import endDayNormal from '../assets/UIs/endDayNormal.png'
import endDayBright from '../assets/UIs/endDayBright.png'
import endDayPressed from '../assets/UIs/endDayPressed.png'
import confirmationUI from '../assets/UIs/confirmationUI.png'
import lowBarUI from '../assets/UIs/lowBarUI.png'

// JSON misiones
import RegularMission from '../assets/jsons/regularMissions.json';
import UpMoneyMission from '../assets/jsons/upMoney.json';
import UpPopularityMission from '../assets/jsons/upPopularity.json';
import downCorruptionMission from '../assets/jsons/downCorruption.json';
import downPopularityMission from '../assets/jsons/downPopularity.json';
import downMoneyMission from '../assets/jsons/downMoney.json';
import minigameMission from '../assets/jsons/minigame.json';
import mapCutout from '../assets/jsons/map.json';

// AUDIO
import AudioManager from '../src/manager/audioManager.js'
import gameAudio from '../assets/audio/il porco rosso.mp3';
import quackAudio from '../assets/audio/quack.mp3';
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

    // PRINCIPAL SCENE ASSETS
    this.load.image('loadScene', loadScene);
    this.load.image('introScene', introScene);
    this.load.image('configScene', configScene);
    // TUTORIAL ASSETS
    this.load.image('tutorialAnimals1', tutorialAnimals1);
    this.load.image('tutorialAnimals2', tutorialAnimals2);
    this.load.image('tutorialAnimals3', tutorialAnimals3);
    this.load.image('textCloud', textCloud);
    // PRESIDENT ASSET
    this.load.image('presidente', presidente);
    // MAP ASSETS
    this.load.image('map', map);
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

    // MISSION ASSETS
    this.load.image('missionTemplate',missionTemplate);
    this.load.image('missionCorruptTemplate',missionCorruptTemplate);
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

    // BLACK MARKET ASSETS
    this.load.image('vendedor', vendedor);
    this.load.image('vendedorSilueta', vendedorSilueta);
    this.load.image('pensa_icon', prensa_icon);
    this.load.image('hotel_icon', hotel_icon);

    // ICONS ASSETS
    this.load.image('configurationIcon', configurationIcon);
    this.load.image('closeIcon', closeIcon);
    this.load.image('storeIcon', storeIcon);
    this.load.image('increaseIcon', increaseIcon);
    this.load.image('increaseSelectIcon', increaseSelectIcon);
    this.load.image('decreaseIcon', decreaseIcon);
    this.load.image('decreaseSelectIcon', decreaseSelectIcon);
    this.load.image('missionIcon', missionIcon);
    this.load.image('missionCorruptIcon', missionCorruptIcon);
    this.load.image('blackMarketIcon', blackMarketIcon);

    // UI ASSETS
    this.load.image('battery', battery);
    this.load.image('endDayNormal', endDayNormal);
    this.load.image('endDayBright', endDayBright);
    this.load.image('endDayPressed', endDayPressed);
    this.load.image('confirmationUI', confirmationUI);
    this.load.image('lowBarUI', lowBarUI);

    // JSONS
    this.cache.json.add('regularMissions', RegularMission);
    this.cache.json.add('upMoney', UpMoneyMission);
    this.cache.json.add('upPopularity', UpPopularityMission);
    this.cache.json.add('downCorruption', downCorruptionMission);
    this.cache.json.add('downPopularity', downPopularityMission);
    this.cache.json.add('downMoney', downMoneyMission);
    this.cache.json.add('minigameMoney', minigameMission);
    this.cache.json.add('mapCutout', mapCutout);

    // AUDIO
    this.load.audio('bgMusic', gameAudio);
    this.load.audio('quack', quackAudio);

  }

  create() {
    this.add.image(750, 375, 'loadScene');  
    
    //WE CAN ADD MUSIC AND LOADING BAR HERE
    this.audioManager = new AudioManager(this);
    this.registry.set('audioManager', this.audioManager)
    this.audioManager.playMusic('bgMusic');
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
