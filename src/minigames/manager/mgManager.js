export default class MGManager {
    constructor(scene, gameManager) {
        this.scene = scene;
        this.gameManager = gameManager;
    }

    launch(key, returnScene = 'level') {
        this.scene.scene.start(key, {
            returnScene,
            gameManager: this.gameManager
        });
    }

    applyResult(result) {
        if (!result) return;

        const player = this.gameManager.getPlayer();

        if (result.money && player.addMoney) player.addMoney(result.money);
        if (result.popularity && player.addPopularity) player.addPopularity(result.popularity);
        if (result.corruption && player.addCorruption) player.addCorruption(result.corruption);
        if (result.energy && player.addEnergy) player.addEnergy(result.energy);
    }
}