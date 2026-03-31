import Phaser from 'phaser';

export default class ConfigurationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'configurationScene' });
    }

    init(data) {
        this.returnScene = data?.returnScene || 'gameScene';
        this.openedFromPause = data?.openedFromPause || false;
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        console.log('configurationScene opened', this.returnScene, this.openedFromPause);

        this.scene.bringToTop('configurationScene');
    

        this.audioManager = this.registry.get('audioManager');

        // Saved values currently in the real audio manager
        this.initialMusicVolume = this.audioManager?.musicVolume ?? 0.5;
        this.initialSfxVolume = this.audioManager?.sfxVolume ?? 0.5;

        // Temporary values while user moves sliders
        this.pendingMusicVolume = this.initialMusicVolume;
        this.pendingSfxVolume = this.initialSfxVolume;

        // Background fitted to screen while keeping whole image visible
        this.add.rectangle(0, 0, width, height, 0x111111, 0.96).setOrigin(0);

        const bg = this.add.image(width / 2, height / 2, 'configScene');
        const scale = Math.min(width / bg.width, height / bg.height);
        bg.setScale(scale);

        // Right metal panel bounds
        const panel = {
            x: 950,
            y: 430,
            width: 360,
            height: 500
        };

        const panelLeft = panel.x - panel.width / 2;

        // Subtle overlay
        this.add.rectangle(panel.x, panel.y, panel.width, panel.height, 0xffffff, 0.04)
            .setStrokeStyle(2, 0x6f6f6f, 0.35);

        // Title
        this.add.text(panel.x, 120, 'AUDIO SETTINGS', {
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#1d1d1d',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(panel.x, 155, 'Adjust your presidential audio controls', {
            fontSize: '13px',
            color: '#4a4a4a',
            fontFamily: 'Courier'
        }).setOrigin(0.5);

        // Slider layout
        const labelX = panelLeft + 28;
        const sliderX = panelLeft + 180;
        const sliderWidth = 180;
        const percentOffset = 34;

        this.add.text(labelX, 250, 'Música', {
            fontSize: '22px',
            color: '#222222',
            fontFamily: 'Courier'
        }).setOrigin(0, 0.5);

        this.musicSlider = this.createMetalSlider(
            sliderX,
            270,
            sliderWidth,
            this.pendingMusicVolume,
            percentOffset,
            (value) => {
                this.pendingMusicVolume = value;
            }
        );

        this.add.text(labelX, 335, 'Sonido', {
            fontSize: '22px',
            color: '#222222',
            fontFamily: 'Courier'
        }).setOrigin(0, 0.5);

        this.sfxSlider = this.createMetalSlider(
            sliderX,
            355,
            sliderWidth,
            this.pendingSfxVolume,
            percentOffset,
            (value) => {
                this.pendingSfxVolume = value;
            }
        );

        // Buttons aligned nicely at bottom
        const buttonY = panel.y + panel.height / 2 - 55;
        const buttonGap = 18;
        const buttonWidth = 118;
        const buttonHeight = 42;

        const totalButtonsWidth = buttonWidth * 2 + buttonGap;
        const firstButtonX = panel.x - totalButtonsWidth / 2 + buttonWidth / 2;
        const secondButtonX = firstButtonX + buttonWidth + buttonGap;

        this.backButton = this.createPanelButton(
            firstButtonX,
            buttonY,
            'BACK',
            buttonWidth,
            buttonHeight,
            0x35425a,
            0x465674,
            0x222b3a
        );

        this.saveButton = this.createPanelButton(
            secondButtonX,
            buttonY,
            'SAVE',
            buttonWidth,
            buttonHeight,
            0x99261d,
            0xb13227,
            0x6f1d17
        );

        this.backButton.on('pointerup', () => {
            this.scene.stop();

            if (this.openedFromPause) {
                this.scene.start('PauseScene', { returnScene: this.returnScene });
                return;
            }

            if (this.returnScene === 'introScene') {
                this.scene.start('introScene');
            } else if (this.returnScene === 'gameScene') {
                this.registry.set('flagShow', false);
                this.scene.resume('gameScene');
            }
        });

        this.saveButton.on('pointerup', () => {
            if (this.audioManager?.setMusicVolume) {
                this.audioManager.setMusicVolume(this.pendingMusicVolume);
            }
            if (this.audioManager?.setSfxVolume) {
                this.audioManager.setSfxVolume(this.pendingSfxVolume);
            }

            this.scene.stop();

            if (this.openedFromPause) {
                this.scene.start('PauseScene', { returnScene: this.returnScene });
                return;
            }

            if (this.returnScene === 'introScene') {
                this.scene.start('introScene');
            } else if (this.returnScene === 'gameScene') {
                this.registry.set('flagShow', false);
                this.scene.resume('gameScene');
            }
        });

        this.createLaunchButton();
    }

    createPanelButton(x, y, text, width, height, baseColor, hoverColor, pressedColor) {
        const container = this.add.container(x, y);

        const shadow = this.add.rectangle(0, 4, width, height, 0x000000, 0.22)
            .setStrokeStyle(0);

        const rect = this.add.rectangle(0, 0, width, height, baseColor)
            .setStrokeStyle(2, 0x161616)
            .setInteractive();

        this.setPointerCursor(rect);

        const highlight = this.add.rectangle(0, -height / 2 + 6, width - 6, 8, 0xffffff, 0.08);

        const label = this.add.text(0, 0, text, {
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#f8f4ee',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        container.add([shadow, rect, highlight, label]);

        rect.on('pointerover', () => {
            rect.setFillStyle(hoverColor);
            container.setScale(1.02);
        });

        rect.on('pointerout', () => {
            rect.setFillStyle(baseColor);
            container.setScale(1);
            container.y = y;
        });

        rect.on('pointerdown', () => {
            rect.setFillStyle(pressedColor);
            container.y = y + 2;
        });

        rect.on('pointerup', () => {
            rect.setFillStyle(hoverColor);
            container.y = y;
        });

        return rect;
    }

    createMetalSlider(x, y, width, initialValue = 0.5, percentOffset = 34, onChange) {
        const minX = x - width / 2;
        const maxX = x + width / 2;

        this.add.rectangle(x, y + 1, width, 10, 0x000000, 0.18);

        const track = this.add.rectangle(x, y, width, 10, 0x505861)
            .setStrokeStyle(2, 0x2b2b2b)
            .setInteractive();

        this.setPointerCursor(track);

        const fill = this.add.rectangle(minX, y, width * initialValue, 10, 0x7acb68)
            .setOrigin(0, 0.5)
            .setInteractive();

        this.setPointerCursor(fill);

        const knobShadow = this.add.circle(minX + width * initialValue, y + 2, 12, 0x000000, 0.18);

        const knob = this.add.circle(
            minX + width * initialValue,
            y,
            12,
            0xe4e4e4
        )
            .setStrokeStyle(3, 0x2e2e2e)
            .setInteractive();

        this.setPointerCursor(knob);
        this.input.setDraggable(knob);

        const percentText = this.add.text(maxX + percentOffset, y, `${Math.round(initialValue * 100)}%`, {
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#202020',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);

        const updateSlider = (pointerX) => {
            const clampedX = Phaser.Math.Clamp(pointerX, minX, maxX);
            const value = (clampedX - minX) / width;

            knob.x = clampedX;
            knobShadow.x = clampedX;
            fill.width = clampedX - minX;
            percentText.setText(`${Math.round(value * 100)}%`);

            if (onChange) onChange(value);
        };

        knob.on('drag', (pointer, dragX) => {
            updateSlider(dragX);
        });

        knob.on('pointerover', () => {
            knob.setScale(1.05);
        });

        knob.on('pointerout', () => {
            knob.setScale(1);
        });

        track.on('pointerdown', (pointer) => {
            updateSlider(pointer.x);
        });

        fill.on('pointerdown', (pointer) => {
            updateSlider(pointer.x);
        });

        return {
            track,
            fill,
            knob,
            percentText,
            getValue: () => (knob.x - minX) / width
        };
    }

    createLaunchButton() {
        const x = 600;
        const y = 580;

        this.launchGlow = this.add.ellipse(x, y, 250, 185, 0xffd54a, 0.0)
            .setStrokeStyle(4, 0xffd54a, 0.0)
            .setDepth(5);

        this.launchPressOverlay = this.add.ellipse(x, y + 2, 170, 120, 0x000000, 0)
            .setDepth(6);

        const hotspot = this.add.ellipse(x, y, 230, 180, 0xff0000, 0.001)
            .setInteractive()
            .setDepth(7);

        this.setPointerCursor(hotspot);

        hotspot.on('pointerover', () => {
            this.tweens.killTweensOf(this.launchGlow);

            this.launchGlow.setAlpha(0.18);
            this.launchGlow.setStrokeStyle(4, 0xffd54a, 0.25);

            this.tweens.add({
                targets: this.launchGlow,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 120
            });
        });

        hotspot.on('pointerout', () => {
            this.tweens.killTweensOf(this.launchGlow);

            this.launchGlow.setAlpha(0);
            this.launchGlow.setScale(1);
            this.launchGlow.setStrokeStyle(4, 0xffd54a, 0);
        });

        hotspot.on('pointerdown', () => {
            if (this.audioManager?.play) {
                this.audioManager.play('quack');
            }

            this.launchPressOverlay.setAlpha(0.22);

            this.tweens.killTweensOf(this.launchPressOverlay);
            this.tweens.add({
                targets: this.launchPressOverlay,
                alpha: 0,
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 120,
                yoyo: false,
                onComplete: () => {
                    this.launchPressOverlay.setScale(1);
                    this.launchPressOverlay.setAlpha(0);
                }
            });

            this.launchGlow.setAlpha(0.22);
            this.launchGlow.setStrokeStyle(4, 0xffd54a, 0.35);
            this.launchGlow.setScale(0.96);

            this.tweens.killTweensOf(this.launchGlow);
            this.tweens.add({
                targets: this.launchGlow,
                scaleX: 1.08,
                scaleY: 1.08,
                alpha: 0,
                duration: 180,
                onComplete: () => {
                    this.launchGlow.setScale(1);
                    this.launchGlow.setAlpha(0);
                    this.launchGlow.setStrokeStyle(4, 0xffd54a, 0);
                }
            });

            this.cameras.main.shake(100, 0.0015);
        });

        hotspot.on('pointerup', () => {
            console.log('Launch activated');
            // this.scene.start('someScene');
        });

        this.launchHotspot = hotspot;
    }

    setPointerCursor(gameObject) {
        gameObject.on('pointerover', () => {
            this.input.manager.canvas.style.cursor = 'pointer';
        });

        gameObject.on('pointerout', () => {
            this.input.manager.canvas.style.cursor = 'default';
        });
    }
}