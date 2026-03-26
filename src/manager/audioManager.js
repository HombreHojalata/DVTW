import Phaser from 'phaser';

export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.music = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.5;
    }

    play(key, config = {}) {
        this.scene.sound.play(key, {
            volume: this.sfxVolume,
            ...config
        });
    }

    playMusic(key) {
        if (this.music && this.music.key === key && this.music.isPlaying) {
            return;
        }

        if (this.music) {
            this.music.stop();
        }

        this.music = this.scene.sound.add(key, {
            loop: true,
            volume: this.musicVolume
        });

        this.music.play();
    }

    setMusicVolume(value) {
        this.musicVolume = Phaser.Math.Clamp(value, 0, 1);

        if (this.music) {
            this.music.setVolume(this.musicVolume);
        }
    }

    setSfxVolume(value) {
        this.sfxVolume = Phaser.Math.Clamp(value, 0, 1);
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    }
}