import Phaser from 'phaser'
// PRINCIPAL SCENE ASSETS
import introScene from '../assets/sprites/scenes/introScene.png'  
import loadScene from '../assets/sprites/scenes/loadScene.png'          //NEED TO BE REPLACE

// MAP ASSETS
import map from '../assets/sprites/map/mapTemplate.png'
// DISTRICT SCENE ASSETS
import districtTemplate from '../assets/sprites/map/districtScenes/districtTemplate.png'
import districtBorrascalScene1 from '../assets/sprites/map/districtScenes/districtBorrascalScene1.png'
import districtElNidoScene1 from '../assets/sprites/map/districtScenes/districtElNidoScene1.png'
import districtGuineaScene1 from '../assets/sprites/map/districtScenes/districtGuineaScene1.png'
import districtNuevaPraderaScene1 from '../assets/sprites/map/districtScenes/districtNuevaPraderaScene1.png'
import districtSaharScene1 from '../assets/sprites/map/districtScenes/districtSaharScene1.png'
import districtSomosaguaScene1 from '../assets/sprites/map/districtScenes/districtSomosaguaScene1.png'
// DISTRICT
import districtBorrascal from '../assets/sprites/map/district/districtBorrascal.png'
import districtBorrascalSpecial from '../assets/sprites/map/district/districtBorrascalSpecial.png'
import districtElNido from '../assets/sprites/map/district/districtElNido.png'
import districtElNidoSpecial from '../assets/sprites/map/district/districtElNidoSpecial.png'
import districtGuinea from '../assets/sprites/map/district/districtGuinea.png'
import districtGuineaSpecial from '../assets/sprites/map/district/districtGuineaSpecial.png'
import districtNuevaPradera from '../assets/sprites/map/district/districtNuevaPradera.png'
import districtNuevaPraderaSpecial from '../assets/sprites/map/district/districtNuevaPraderaSpecial.png'
import districtSahar from '../assets/sprites/map/district/districtSahar.png'
import districtSaharSpecial from '../assets/sprites/map/district/districtSaharSpecial.png'
import districtSomosagua from '../assets/sprites/map/district/districtSomosagua.png'
import districtSomosaguaSpecial from '../assets/sprites/map/district/districtSomosaguaSpecial.png'
// BUILDING ASSETS
import buildingCinema from '../assets/sprites/map/buildings/buildingCinema.png'
import buildingComercialCenter from '../assets/sprites/map/buildings/buildingComercialCenter.png'
import buildingFactory from '../assets/sprites/map/buildings/buildingFactory.png'
import buildingHospital from '../assets/sprites/map/buildings/buildingHospital.png'
import buildingHotel from '../assets/sprites/map/buildings/buildingHotel.png'
import buildingHouse from '../assets/sprites/map/buildings/buildingHouse.png'
import buildingPark from '../assets/sprites/map/buildings/buildingPark.png'
import specialBuildingBorrascal from '../assets/sprites/map/buildings/specialBuildingBorrascal.png'
import specialBuildingElNido from '../assets/sprites/map/buildings/specialBuildingElNido.png'
import specialBuildingGuinea from '../assets/sprites/map/buildings/specialBuildingGuinea.png'
import specialBuildingNuevaPradera from '../assets/sprites/map/buildings/specialBuildingNuevaPradera.png'
import specialBuildingSahar from '../assets/sprites/map/buildings/specialBuildingSahar.png'
import specialBuildingSomosagua from '../assets/sprites/map/buildings/specialBuildingSomosagua.png'
import specialBuildingMafia from '../assets/sprites/map/buildings/specialBuildingMafia.png'

// BLACK MARKET ASSETS
import vendedor from '../assets/sprites/Vendedor.png' 
import prensa_icon from '../assets/sprites/marketIcons/prensa.png'
import hotel_icon from '../assets/sprites/marketIcons/hotel.png'
// ICONS        NEED TO BE REPLACED
import closeIcon from '../assets/sprites/icons/closeIcon.png'                 
import configurationIcon from '../assets/sprites/icons/configurationIcon.png'     //NEED TO BE REPLACE
import storeIcon from '../assets/sprites/icons/storeIcon.png'                     //NEED TO BE REPLACE 

//PROTOTYPE ASSETS, TO BE REPLACED
import presidente from '../assets/sprites/presidente.png'                         //NEED TO BE REPLACE

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
    // DISTRICT SCENES ASSETS
    this.load.image('districtTemplate', districtTemplate);
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
    
    // PRESIDENTE ASSET
    this.load.image('presidente', presidente);
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
