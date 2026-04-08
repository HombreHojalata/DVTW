import Phaser from 'phaser';

export default class AudioManager {
    constructor(scene) {
        this.scene = scene;

        this.music = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.5;

        this.currentMusicKey = null;
        this.previousMusicKey = null;

        this.musicLibrary = {};
        this.sfxLibrary = {};
    }

    registerMusic(key, config = {}) {
        this.musicLibrary[key] = {
            loop: config.loop ?? true,
            volumeMultiplier: config.volumeMultiplier ?? 1
        };
    }

    registerSfx(key, config = {}) {
        this.sfxLibrary[key] = {
            volumeMultiplier: config.volumeMultiplier ?? 1
        };
    }

    playSfx(key, config = {}) {
        if (!key) return;

        const sfxConfig = this.sfxLibrary[key] || {};
        const volumeMultiplier = config.volumeMultiplier ?? sfxConfig.volumeMultiplier ?? 1;

        this.scene.sound.play(key, {
            volume: this.sfxVolume * volumeMultiplier,
            ...config
        });
    }

    // Alias for backward compatibility
    play(key, config = {}) {
        this.playSfx(key, config);
    }

    playMusic(key, options = {}) {
        if (!key) return;

        const trackConfig = this.musicLibrary[key] || {};
        const loop = options.loop ?? trackConfig.loop ?? true;
        const volumeMultiplier = options.volumeMultiplier ?? trackConfig.volumeMultiplier ?? 1;

        if (this.music && this.currentMusicKey === key && this.music.isPlaying) {
            return;
        }

        if (this.currentMusicKey && this.currentMusicKey !== key) {
            this.previousMusicKey = this.currentMusicKey;
        }

        if (this.music) {
            this.music.stop();
            this.music.destroy();
            this.music = null;
        }

        this.music = this.scene.sound.add(key, {
            loop,
            volume: this.musicVolume * volumeMultiplier
        });

        this.music.play();
        this.currentMusicKey = key;
    }

    switchMusic(key, options = {}) {
        this.playMusic(key, options);
    }

    resumePreviousMusic(fallbackKey = null) {
        const keyToResume = this.previousMusicKey || fallbackKey;
        if (!keyToResume) return;

        this.previousMusicKey = null;
        this.playMusic(keyToResume);
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music.destroy();
            this.music = null;
        }

        this.currentMusicKey = null;
    }

    setMusicVolume(value) {
        this.musicVolume = Phaser.Math.Clamp(value, 0, 1);

        if (this.music) {
            const currentConfig = this.musicLibrary[this.currentMusicKey] || {};
            const volumeMultiplier = currentConfig.volumeMultiplier ?? 1;
            this.music.setVolume(this.musicVolume * volumeMultiplier);
        }
    }

    setSfxVolume(value) {
        this.sfxVolume = Phaser.Math.Clamp(value, 0, 1);
    }

    getCurrentMusicKey() {
        return this.currentMusicKey;
    }
}