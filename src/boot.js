import Phaser from 'phaser'
// PRINCIPAL SCENE ASSETS
import agendaSheet from '../assets/scenes/agendaSpritesheet.png'
import urnaSheet from '../assets/scenes/urnaSpritesheet.png'
import loadScene from '../assets/scenes/loadScene.png'
import configScene from '../assets/scenes/configScene.png'

// TUTORIAL ASSETS
import tutorialAnimals1 from '../assets/other/tutorialAnimals1.png'
import tutorialAnimals2 from '../assets/other/tutorialAnimals2.png'
import tutorialAnimals3 from '../assets/other/tutorialAnimals3.png'
import tutorialInfo from '../assets/other/tutorialInfo.png'
import textCloud from '../assets/other/textCloud.png'
import flamingo from '../assets/other/flamingo.png'
import blackMarketMessage from '../assets/other/blackMarketMessage.png'

// PROTOTYPE ASSETS
import presidente from '../assets/other/presidente.png'
import photoNormal from '../assets/other/photoNormal.png'
import photoBlink from '../assets/other/photoBlink.png'
import photoSleep from '../assets/other/photoSleep.png'
import goodEnding from '../assets/other/goodEnding.png'
import badEnding from '../assets/other/badEnding.png'

// MAP ASSET
import map from '../assets/map/mapTemplate.png'

// DISTRICT SCENE ASSETS
import districtTemplate from '../assets/map/districtScenes/districtTemplate.png'
import districtBorrascalScene1 from '../assets/map/districtScenes/districtBorrascalScene1.png'
import districtElNidoScene1 from '../assets/map/districtScenes/districtElNidoScene1.png'
import districtGuineaScene1 from '../assets/map/districtScenes/districtGuineaScene1.png'
import districtNuevaPraderaScene1 from '../assets/map/districtScenes/districtNuevaPraderaScene1.png'
import districtSaharScene1 from '../assets/map/districtScenes/districtSaharScene1.png'
import districtSomosaguaScene1 from '../assets/map/districtScenes/districtSomosaguaScene1.png'
import districtBorrascalScene2 from '../assets/map/districtScenes/districtBorrascalScene2.png'
import districtElNidoScene2 from '../assets/map/districtScenes/districtElNidoScene2.png'
import districtGuineaScene2 from '../assets/map/districtScenes/districtGuineaScene2.png'
import districtNuevaPraderaScene2 from '../assets/map/districtScenes/districtNuevaPraderaScene2.png'
import districtSaharScene2 from '../assets/map/districtScenes/districtSaharScene2.png'
import districtSomosaguaScene2 from '../assets/map/districtScenes/districtSomosaguaScene2.png'

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
import specialBuildingBorrascal from '../assets/map/buildings/specialBuildingBorrascal.png'
import specialBuildingElNido from '../assets/map/buildings/specialBuildingElNido.png'
import specialBuildingGuinea from '../assets/map/buildings/specialBuildingGuinea.png'
import specialBuildingNuevaPradera from '../assets/map/buildings/specialBuildingNuevaPradera.png'
import specialBuildingSahar from '../assets/map/buildings/specialBuildingSahar.png'
import specialBuildingSomosagua from '../assets/map/buildings/specialBuildingSomosagua.png'
import specialBuildingMafia from '../assets/map/buildings/specialBuildingMafia.png'
import districtStoreBg from '../assets/map/buildings/districtStoreBg.png'
import blockerDistrict from '../assets/map/districtScenes/blockerDistrict.png'

// MISSION ASSETS
import missionTemplate from '../assets/mission/missionTemplate.png'
import missionCorruptTemplate from '../assets/mission/missionCorruptTemplate.png'

// MISSION DISTRICT SCENES (CONTINUAZIONE...)
import regularSceneBorrascal from '../assets/mission/scenes/districtBorrascal/regularScene.png'
import upMoneySceneBorrascal from '../assets/mission/scenes/districtBorrascal/upMoneyScene.png'
import downMoneySceneBorrascal from '../assets/mission/scenes/districtBorrascal/downMoneyScene.png'
import upPopularitySceneBorrascal from '../assets/mission/scenes/districtBorrascal/upPopularityScene.png'
import downPopularitySceneBorrascal from '../assets/mission/scenes/districtBorrascal/downPopularityScene.png'
import downCorruptionSceneBorrascal from '../assets/mission/scenes/districtBorrascal/downCorruptionScene.png'

import regularSceneElNido from '../assets/mission/scenes/districtElNido/regularScene.png'
import upMoneySceneElNido from '../assets/mission/scenes/districtElNido/upMoneyScene.png'
import downMoneySceneElNido from '../assets/mission/scenes/districtElNido/downMoneyScene.png'
import upPopularitySceneElNido from '../assets/mission/scenes/districtElNido/upPopularityScene.png'
import downPopularitySceneElNido from '../assets/mission/scenes/districtElNido/downPopularityScene.png'
import downCorruptionSceneElNido from '../assets/mission/scenes/districtElNido/downCorruptionScene.png'

import regularSceneGuinea from '../assets/mission/scenes/districtGuinea/regularScene.png'
import upMoneySceneGuinea from '../assets/mission/scenes/districtGuinea/upMoneyScene.png'
import downMoneySceneGuinea from '../assets/mission/scenes/districtGuinea/downMoneyScene.png'
import upPopularitySceneGuinea from '../assets/mission/scenes/districtGuinea/upPopularityScene.png'
import downPopularitySceneGuinea from '../assets/mission/scenes/districtGuinea/downPopularityScene.png'
import downCorruptionSceneGuinea from '../assets/mission/scenes/districtGuinea/downCorruptionScene.png'

import regularSceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/regularScene.png'
import upMoneySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/upMoneyScene.png'
import downMoneySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downMoneyScene.png'
import upPopularitySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/upPopularityScene.png'
import downPopularitySceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downPopularityScene.png'
import downCorruptionSceneNuevaPradera from '../assets/mission/scenes/districtNuevaPradera/downCorruptionScene.png'

import regularSceneSahar from '../assets/mission/scenes/districtSahar/regularScene.png'
import upMoneySceneSahar from '../assets/mission/scenes/districtSahar/upMoneyScene.png'
import downMoneySceneSahar from '../assets/mission/scenes/districtSahar/downMoneyScene.png'
import upPopularitySceneSahar from '../assets/mission/scenes/districtSahar/upPopularityScene.png'
import downPopularitySceneSahar from '../assets/mission/scenes/districtSahar/downPopularityScene.png'
import downCorruptionSceneSahar from '../assets/mission/scenes/districtSahar/downCorruptionScene.png'

import regularSceneSomosagua from '../assets/mission/scenes/districtSomosagua/regularScene.png'
import upMoneySceneSomosagua from '../assets/mission/scenes/districtSomosagua/upMoneyScene.png'
import downMoneySceneSomosagua from '../assets/mission/scenes/districtSomosagua/downMoneyScene.png'
import upPopularitySceneSomosagua from '../assets/mission/scenes/districtSomosagua/upPopularityScene.png'
import downPopularitySceneSomosagua from '../assets/mission/scenes/districtSomosagua/downPopularityScene.png'
import downCorruptionSceneSomosagua from '../assets/mission/scenes/districtSomosagua/downCorruptionScene.png'

// MINIGAME & MARKET
import fondoMemory from '../assets/minigames/memory/fondoMemory.png';
import memoryRetro1 from '../assets/minigames/memory/retro1.png';
import memoryRetro2 from '../assets/minigames/memory/retro2.png';
import memoryRetro3 from '../assets/minigames/memory/retro3.png';
import memoryRetro4 from '../assets/minigames/memory/retro4.png';
import memoryRetro5 from '../assets/minigames/memory/retro5.png';
import memoryRetro6 from '../assets/minigames/memory/retro6.png';
import memoryRetro7 from '../assets/minigames/memory/retro7.png';
import memoryImage1 from '../assets/minigames/memory/memoryImage1.png'
import memoryImage2 from '../assets/minigames/memory/memoryImage2.png'
import memoryImage3 from '../assets/minigames/memory/memoryImage3.png'
import memoryImage4 from '../assets/minigames/memory/memoryImage4.png'
import memoryImage5 from '../assets/minigames/memory/memoryImage5.png'
import memoryImage6 from '../assets/minigames/memory/memoryImage6.png'
import memoryImage7 from '../assets/minigames/memory/memoryImage7.png'
import memoryImage8 from '../assets/minigames/memory/memoryImage8.png'

import vendedor from '../assets/other/Vendedor.png'
import vendedorSilueta from '../assets/other/VendedorSilueta.png'
import news_icon from '../assets/marketIcons/news_icon.png'
import hotel_icon from '../assets/marketIcons/hotel_icon.png'
import votes_icon from '../assets/marketIcons/votes_icon.png'
import bridge_icon from '../assets/marketIcons/bridge_icon.png'
import coffee_icon from '../assets/marketIcons/coffee_icon.png'
import evil_icon from '../assets/marketIcons/evil_icon.png'
import planet_icon from '../assets/marketIcons/planet_icon.png';

import whacFrameInicio from '../assets/minigames/whacAMole/whacFrameInicio.png'
import whacFrame2 from '../assets/minigames/whacAMole/whacFrame2.png'
import whacFrame3 from '../assets/minigames/whacAMole/whacFrame3.png'
import whacFrame4 from '../assets/minigames/whacAMole/whacFrame4.png'
import whacFrame5 from '../assets/minigames/whacAMole/whacFrame5.png'
import whacFrame6 from '../assets/minigames/whacAMole/whacFrame6.png'
import whacFrame7 from '../assets/minigames/whacAMole/whacFrame7.png'
import whacFrame8 from '../assets/minigames/whacAMole/whacFrame8.png'
import whacFrame9 from '../assets/minigames/whacAMole/whacFrame9.png'
import whacFrame10 from '../assets/minigames/whacAMole/whacFrame10.png'
import whacFrame11 from '../assets/minigames/whacAMole/whacFrame11.png'
import whacFrame12 from '../assets/minigames/whacAMole/whacFrame12.png'
import whacFrame13 from '../assets/minigames/whacAMole/whacFrame13.png'
import whacFrame14 from '../assets/minigames/whacAMole/whacFrame14.png'
import whacFrame15 from '../assets/minigames/whacAMole/whacFrame15.png'

import fondoWordle from '../assets/minigames/wordle/fondoWordle.png';

import fondoPlinko from '../assets/minigames/plinko/fondoPlinko.png';
import coinPlinko from '../assets/minigames/plinko/coinPlinko.png';
import bagPlinko from '../assets/minigames/plinko/bagPlinko.png';

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

// UI
import battery from '../assets/UIs/battery.png'
import endDayNormal from '../assets/UIs/endDayNormal.png'
import endDayBright from '../assets/UIs/endDayBright.png'
import endDayPressed from '../assets/UIs/endDayPressed.png'
import confirmationUI from '../assets/UIs/confirmationUI.png'
import lowBarUI from '../assets/UIs/lowBarUI.png'
import marketBtnNormal from '../assets/UIs/marketBtnNormal.png'
import marketBtnBright from '../assets/UIs/marketBtnBright.png'
import marketBtnPressed from '../assets/UIs/marketBtnPressed.png'
import marketBtnBlocked from '../assets/UIs/marketBtnBlocked.png'
import popularityBar from '../assets/UIs/popularityBar.png'
import mapBtnNormal from '../assets/UIs/mapBtnNormal.png'
import mapBtnBright from '../assets/UIs/mapBtnBright.png'
import mapBtnPressed from '../assets/UIs/mapBtnPressed.png'
import lowBarMarketUI from '../assets/UIs/lowBarMarketUI.png'

// JSON
import RegularMission from '../assets/jsons/regularMissions.json';
import UpMoneyMission from '../assets/jsons/upMoney.json';
import UpPopularityMission from '../assets/jsons/upPopularity.json';
import downCorruptionMission from '../assets/jsons/downCorruption.json';
import downPopularityMission from '../assets/jsons/downPopularity.json';
import downMoneyMission from '../assets/jsons/downMoney.json';
import minigameMission from '../assets/jsons/minigame.json';
import mapCutout from '../assets/jsons/map.json';
// WHAC-A-MOLE JSONS
import whacJSON2 from '../assets/jsons/whacAMole/whacFrame2.json';
import whacJSON3 from '../assets/jsons/whacAMole/whacFrame3.json';
import whacJSON4 from '../assets/jsons/whacAMole/whacFrame4.json';
import whacJSON5 from '../assets/jsons/whacAMole/whacFrame5.json';
import whacJSON6 from '../assets/jsons/whacAMole/whacFrame6.json';
import whacJSON7 from '../assets/jsons/whacAMole/whacFrame7.json';
import whacJSON8 from '../assets/jsons/whacAMole/whacFrame8.json';
import whacJSON9 from '../assets/jsons/whacAMole/whacFrame9.json';
import whacJSON10 from '../assets/jsons/whacAMole/whacFrame10.json';
import whacJSON11 from '../assets/jsons/whacAMole/whacFrame11.json';
import whacJSON12 from '../assets/jsons/whacAMole/whacFrame12.json';
import whacJSON13 from '../assets/jsons/whacAMole/whacFrame13.json';
import whacJSON14 from '../assets/jsons/whacAMole/whacFrame14.json';
import whacJSON15 from '../assets/jsons/whacAMole/whacFrame15.json';

// AUDIO
import AudioManager from '../src/manager/audioManager.js'
import gameAudio from '../assets/audio/rimworld.mp3';
import quackAudio from '../assets/audio/quack.mp3';
import blackMarketAudio from '../assets/audio/black market.mp3';
import introSceneAudio from '../assets/audio/il porco rosso.mp3';
import openDistrict from '../assets/audio/openDistrict.mp3';
import closeDistrict from '../assets/audio/closeDistrict.mp3';
import key from '../assets/audio/key.mp3';
import money from '../assets/audio/money.mp3';
import ball1 from '../assets/audio/ball1.mp3';
import ball2 from '../assets/audio/ball2.mp3';
import ball3 from '../assets/audio/ball3.mp3';
import mission from '../assets/audio/mission.mp3';
import corruptMission from '../assets/audio/corruptMission.mp3';
import exitMission from '../assets/audio/exitMission.mp3';
import alarm from '../assets/audio/alarm.mp3';
import closeBriefcase from '../assets/audio/closeBriefcase.mp3';
import trumpet from '../assets/audio/trumpet.mp3';
import nightAmbience from '../assets/audio/nightAmbience.mp3';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    //LOADING SCENE ASSETS
    this.load.spritesheet('urnaCarga', urnaSheet, {
      frameWidth: 1536,
      frameHeight: 922
    });

    // PRINCIPAL SCENE ASSETS
    this.load.image('loadScene', loadScene);

    //AUDIO PART
    this.load.audio('bgMusic', gameAudio);
    this.load.audio('introSceneAudio', introSceneAudio);
  }

  create() {
    this.add.image(750, 375, 'loadScene');

    //WE CAN ADD MUSIC AND LOADING BAR HERE


    this.audioManager = new AudioManager(this);
    this.registry.set('audioManager', this.audioManager)
    this.audioManager.playMusic('introSceneAudio');

    //animacion de la urna
    this.anims.create({
      key: 'animUrna',
      frames: this.anims.generateFrameNumbers('urnaCarga', { start: 0, end: 6 }),
      frameRate: 1,
      repeat: -1
    });

    const urna = this.add.sprite(0, 0, 'urnaCarga').setOrigin(0);
    urna.setDisplaySize(1536, 922);
    urna.play('animUrna');

    //BARRA DE CARGA
    const barWidth = 600;
    const barHeight = 22;
    const barX = this.cameras.main.centerX - barWidth / 2;
    const barY = 780;

    //estilo
    const barBg = this.add.graphics();
    barBg.lineStyle(3, 0x1b263b, 1);
    barBg.fillStyle(0x0d1117, 0.8);
    barBg.strokeRoundedRect(barX, barY, barWidth, barHeight, 5);
    barBg.fillRoundedRect(barX, barY, barWidth, barHeight, 5);
    const progressBar = this.add.graphics();
    const barGlow = this.add.graphics();

    this.tweens.add({
      targets: { width: 0 },
      width: barWidth,
      duration: 7000,
      ease: 'Cubic.easeOut', //mas lento al final
      onUpdate: (tween) => {
        const currentWidth = tween.getValue();
        progressBar.clear();
        barGlow.clear();

        if (currentWidth > 0) {
          progressBar.fillStyle(0x3e5c9a, 1);
          progressBar.fillRoundedRect(barX + 3, barY + 3, currentWidth - 6, barHeight - 6, 4);

          progressBar.fillStyle(0x5c7cba, 1);
          progressBar.fillRoundedRect(barX + 3, barY + 3, currentWidth - 6, (barHeight - 6) / 2, 4);

          barGlow.fillStyle(0xffffff, 0.15);
          barGlow.fillRoundedRect(barX + 5, barY + 5, currentWidth - 10, 6, 3);
        }
      }
    });

    this.cargasCompletadas = false;
    this.load.on('complete', () => {
      this.cargasCompletadas = true;
    });

    // START LOADING REMAINING ASSETS
    this.load.spritesheet('animatedAgenda', agendaSheet, {
      frameWidth: 1536,
      frameHeight: 922
    });
    this.load.image('configScene', configScene);
    this.load.image('tutorialAnimals1', tutorialAnimals1);
    this.load.image('tutorialAnimals2', tutorialAnimals2);
    this.load.image('tutorialAnimals3', tutorialAnimals3);
    this.load.image('tutorialInfo', tutorialInfo);
    this.load.image('textCloud', textCloud);
    this.load.image('flamingo', flamingo);
    this.load.image('blackMarketMessage', blackMarketMessage);
    this.load.image('presidente', presidente);
    this.load.image('photoNormal', photoNormal);
    this.load.image('photoBlink', photoBlink);
    this.load.image('photoSleep', photoSleep);
    this.load.image('goodEnding', goodEnding);
    this.load.image('badEnding', badEnding);
    this.load.image('map', map);
    this.load.image('districtTemplate', districtTemplate);
    this.load.image('districtBorrascalScene1', districtBorrascalScene1);
    this.load.image('districtElNidoScene1', districtElNidoScene1);
    this.load.image('districtGuineaScene1', districtGuineaScene1);
    this.load.image('districtNuevaPraderaScene1', districtNuevaPraderaScene1);
    this.load.image('districtSaharScene1', districtSaharScene1);
    this.load.image('districtSomosaguaScene1', districtSomosaguaScene1);
    this.load.image('districtBorrascalScene2', districtBorrascalScene2);
    this.load.image('districtElNidoScene2', districtElNidoScene2);
    this.load.image('districtGuineaScene2', districtGuineaScene2);
    this.load.image('districtNuevaPraderaScene2', districtNuevaPraderaScene2);
    this.load.image('districtSaharScene2', districtSaharScene2);
    this.load.image('districtSomosaguaScene2', districtSomosaguaScene2);
    this.load.image('districtBorrascal', districtBorrascal);
    this.load.image('districtElNido', districtElNido);
    this.load.image('districtGuinea', districtGuinea);
    this.load.image('districtNuevaPradera', districtNuevaPradera);
    this.load.image('districtSahar', districtSahar);
    this.load.image('districtSomosagua', districtSomosagua);
    this.load.image('districtBorrascalSpecial', districtBorrascalSpecial);
    this.load.image('districtElNidoSpecial', districtElNidoSpecial);
    this.load.image('districtGuineaSpecial', districtGuineaSpecial);
    this.load.image('districtNuevaPraderaSpecial', districtNuevaPraderaSpecial);
    this.load.image('districtSaharSpecial', districtSaharSpecial);
    this.load.image('districtSomosaguaSpecial', districtSomosaguaSpecial);
    this.load.image('buildingCinema', buildingCinema);
    this.load.image('buildingComercialCenter', buildingComercialCenter);
    this.load.image('buildingFactory', buildingFactory);
    this.load.image('buildingHospital', buildingHospital);
    this.load.image('buildingHotel', buildingHotel);
    this.load.image('buildingHouse', buildingHouse);
    this.load.image('buildingPark', buildingPark);
    this.load.image('specialBuildingBorrascal', specialBuildingBorrascal);
    this.load.image('specialBuildingElNido', specialBuildingElNido);
    this.load.image('specialBuildingGuinea', specialBuildingGuinea);
    this.load.image('specialBuildingNuevaPradera', specialBuildingNuevaPradera);
    this.load.image('specialBuildingSahar', specialBuildingSahar);
    this.load.image('specialBuildingSomosagua', specialBuildingSomosagua);
    this.load.image('specialBuildingMafia', specialBuildingMafia);
    this.load.image('districtStoreBg', districtStoreBg);
    this.load.image('blockerDistrict', blockerDistrict);
    this.load.image('missionTemplate', missionTemplate);
    this.load.image('missionCorruptTemplate', missionCorruptTemplate);
    this.load.image('regularSceneBorrascal', regularSceneBorrascal);
    this.load.image('upMoneySceneBorrascal', upMoneySceneBorrascal);
    this.load.image('downMoneySceneBorrascal', downMoneySceneBorrascal);
    this.load.image('upPopularitySceneBorrascal', upPopularitySceneBorrascal);
    this.load.image('downPopularitySceneBorrascal', downPopularitySceneBorrascal);
    this.load.image('downCorruptionSceneBorrascal', downCorruptionSceneBorrascal);
    this.load.image('regularSceneElNido', regularSceneElNido);
    this.load.image('upMoneySceneElNido', upMoneySceneElNido);
    this.load.image('downMoneySceneElNido', downMoneySceneElNido);
    this.load.image('upPopularitySceneElNido', upPopularitySceneElNido);
    this.load.image('downPopularitySceneElNido', downPopularitySceneElNido);
    this.load.image('downCorruptionSceneElNido', downCorruptionSceneElNido);
    this.load.image('regularSceneGuinea', regularSceneGuinea);
    this.load.image('upMoneySceneGuinea', upMoneySceneGuinea);
    this.load.image('downMoneySceneGuinea', downMoneySceneGuinea);
    this.load.image('upPopularitySceneGuinea', upPopularitySceneGuinea);
    this.load.image('downPopularitySceneGuinea', downPopularitySceneGuinea);
    this.load.image('downCorruptionSceneGuinea', downCorruptionSceneGuinea);
    this.load.image('regularSceneNuevaPradera', regularSceneNuevaPradera);
    this.load.image('upMoneySceneNuevaPradera', upMoneySceneNuevaPradera);
    this.load.image('downMoneySceneNuevaPradera', downMoneySceneNuevaPradera);
    this.load.image('upPopularitySceneNuevaPradera', upPopularitySceneNuevaPradera);
    this.load.image('downPopularitySceneNuevaPradera', downPopularitySceneNuevaPradera);
    this.load.image('downCorruptionSceneNuevaPradera', downCorruptionSceneNuevaPradera);
    this.load.image('regularSceneSahar', regularSceneSahar);
    this.load.image('upMoneySceneSahar', upMoneySceneSahar);
    this.load.image('downMoneySceneSahar', downMoneySceneSahar);
    this.load.image('upPopularitySceneSahar', upPopularitySceneSahar);
    this.load.image('downPopularitySceneSahar', downPopularitySceneSahar);
    this.load.image('downCorruptionSceneSahar', downCorruptionSceneSahar);
    this.load.image('regularSceneSomosagua', regularSceneSomosagua);
    this.load.image('upMoneySceneSomosagua', upMoneySceneSomosagua);
    this.load.image('downMoneySceneSomosagua', downMoneySceneSomosagua);
    this.load.image('upPopularitySceneSomosagua', upPopularitySceneSomosagua);
    this.load.image('downPopularitySceneSomosagua', downPopularitySceneSomosagua);
    this.load.image('downCorruptionSceneSomosagua', downCorruptionSceneSomosagua);
    this.load.image('fondoMemory', fondoMemory);
    this.load.image('retro1', memoryRetro1);
    this.load.image('retro2', memoryRetro2);
    this.load.image('retro3', memoryRetro3);
    this.load.image('retro4', memoryRetro4);
    this.load.image('retro5', memoryRetro5);
    this.load.image('retro6', memoryRetro6);
    this.load.image('retro7', memoryRetro7);
    this.load.image('memoryImage1', memoryImage1);
    this.load.image('memoryImage2', memoryImage2);
    this.load.image('memoryImage3', memoryImage3);
    this.load.image('memoryImage4', memoryImage4);
    this.load.image('memoryImage5', memoryImage5);
    this.load.image('memoryImage6', memoryImage6);
    this.load.image('memoryImage7', memoryImage7);
    this.load.image('memoryImage8', memoryImage8);
    this.load.image('whacFrameInicio', whacFrameInicio);
    this.load.image('whacFrame2', whacFrame2);
    this.load.image('whacFrame3', whacFrame3);
    this.load.image('whacFrame4', whacFrame4);
    this.load.image('whacFrame5', whacFrame5);
    this.load.image('whacFrame6', whacFrame6);
    this.load.image('whacFrame7', whacFrame7);
    this.load.image('whacFrame8', whacFrame8);
    this.load.image('whacFrame9', whacFrame9);
    this.load.image('whacFrame10', whacFrame10);
    this.load.image('whacFrame11', whacFrame11);
    this.load.image('whacFrame12', whacFrame12);
    this.load.image('whacFrame13', whacFrame13);
    this.load.image('whacFrame14', whacFrame14);
    this.load.image('whacFrame15', whacFrame15);
    this.load.image('fondoWordle', fondoWordle);
    this.load.image('fondoPlinko', fondoPlinko);
    this.load.image('coinPlinko', coinPlinko);
    this.load.image('bagPlinko', bagPlinko);
    this.load.image('vendedor', vendedor);
    this.load.image('vendedorSilueta', vendedorSilueta);
    this.load.image('news_icon', news_icon);
    this.load.image('hotel_icon', hotel_icon);
    this.load.image('votes_icon', votes_icon);
    this.load.image('bridge_icon', bridge_icon);
    this.load.image('coffee_icon', coffee_icon);
    this.load.image('evil_icon', evil_icon);
    this.load.image('planet_icon', planet_icon);
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
    this.load.image('battery', battery);
    this.load.image('endDayNormal', endDayNormal);
    this.load.image('endDayBright', endDayBright);
    this.load.image('endDayPressed', endDayPressed);
    this.load.image('confirmationUI', confirmationUI);
    this.load.image('lowBarUI', lowBarUI);
    this.load.image('marketBtnNormal', marketBtnNormal);
    this.load.image('marketBtnBright', marketBtnBright);
    this.load.image('marketBtnPressed', marketBtnPressed);
    this.load.image('marketBtnBlocked', marketBtnBlocked);
    this.load.image('popularityBar', popularityBar);
    this.load.image('mapBtnNormal', mapBtnNormal);
    this.load.image('mapBtnBright', mapBtnBright);
    this.load.image('mapBtnPressed', mapBtnPressed);
    this.load.image('lowBarMarketUI', lowBarMarketUI);
    this.cache.json.add('regularMissions', RegularMission);
    this.cache.json.add('upMoney', UpMoneyMission);
    this.cache.json.add('upPopularity', UpPopularityMission);
    this.cache.json.add('downCorruption', downCorruptionMission);
    this.cache.json.add('downPopularity', downPopularityMission);
    this.cache.json.add('downMoney', downMoneyMission);
    this.cache.json.add('minigameMoney', minigameMission);
    this.cache.json.add('mapCutout', mapCutout);
    this.cache.json.add('whacJSON2', whacJSON2);
    this.cache.json.add('whacJSON3', whacJSON3);
    this.cache.json.add('whacJSON4', whacJSON4);
    this.cache.json.add('whacJSON5', whacJSON5);
    this.cache.json.add('whacJSON6', whacJSON6);
    this.cache.json.add('whacJSON7', whacJSON7);
    this.cache.json.add('whacJSON8', whacJSON8);
    this.cache.json.add('whacJSON9', whacJSON9);
    this.cache.json.add('whacJSON10', whacJSON10);
    this.cache.json.add('whacJSON11', whacJSON11);
    this.cache.json.add('whacJSON12', whacJSON12);
    this.cache.json.add('whacJSON13', whacJSON13);
    this.cache.json.add('whacJSON14', whacJSON14);
    this.cache.json.add('whacJSON15', whacJSON15);
    this.load.audio('quack', quackAudio);
    this.load.audio('blackMarketAudio', blackMarketAudio);
    this.load.audio('introSceneAudio', introSceneAudio);
    this.load.audio('bgMusic', gameAudio);
    this.load.audio('openDistrict', openDistrict);
    this.load.audio('closeDistrict', closeDistrict);
    this.load.audio('key', key);
    this.load.audio('money', money);

     this.load.audio('ball1', ball1);
    this.load.audio('ball2', ball2);
    this.load.audio('ball3', ball3);
    this.load.audio('mission', mission);
    this.load.audio('corruptMission', corruptMission);
    this.load.audio('exitMission', exitMission);
    this.load.audio('alarm', alarm);
    this.load.audio('closeBriefcase', closeBriefcase);
    this.load.audio('trumpet', trumpet);
    this.load.audio('nightAmbience', nightAmbience);

    this.load.start();

    urna.on('animationrepeat', () => {
      if (this.cargasCompletadas) {
        urna.stop();
        this.scene.start('introScene');
      }
    });
  }
}