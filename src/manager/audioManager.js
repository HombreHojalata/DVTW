class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.music = null;
    }

    play(key, config = {}) {
        this.scene.sound.play(key, config);
    }

    playMusic(key) {
        if (this.music && this.music.isPlaying) return;

        this.music = this.scene.sound.add(key, {
            loop: true,
            volume: 0.5
        });
        this.music.play();
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    }
}

export default AudioManager;