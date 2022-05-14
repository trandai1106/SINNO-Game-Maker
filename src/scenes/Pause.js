import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super("pause");
    }

    init(data) {
        this.playingMusic = data.playingMusic;
        this.sceneKey = data.sceneKey;
    }

    create() {
        this.add.image(640, 350, 'pause-frame');

        this.resumeButton = this.add.image(1274, 6, 'resume-button')
        .setOrigin(1, 0)
        .setInteractive();

        this.resumeButton2 = this.add.image(640, 270, 'resume-button-2')
        .setInteractive();

        this.restartButton = this.add.image(640, 370, 'restart-button')
        .setInteractive();

        this.exitButton = this.add.image(640, 470, 'exit-button')
        .setInteractive();

        this.resumeButton.on('pointerover', () => {
            this.resumeButton.setTexture('resume-button-hover');
        });
        this.resumeButton.on('pointerdown', () => {
            this.resumeButton.setTexture('resume-button-click');
        });
        this.resumeButton.on('pointerup', () => {
            this.resumeButton.setTexture('resume-button');
            this.scene.bringToTop(this.sceneKey);
            if (this.playingMusic) this.sound.resumeAll();
            this.scene.resume(this.sceneKey);
        });
        this.resumeButton.on('pointerout', () => {
            this.resumeButton.setTexture('resume-button');
        });
        
        this.resumeButton2.on('pointerover', () => {
            this.resumeButton2.setTexture('resume-button-2-hover');
        });
        this.resumeButton2.on('pointerdown', () => {
            this.resumeButton2.setTexture('resume-button-2-click');
        });
        this.resumeButton2.on('pointerup', () => {
            this.resumeButton2.setTexture('resume-button-2');
            this.scene.bringToTop(this.sceneKey);
            if (this.playingMusic) this.sound.resumeAll();
            this.scene.resume(this.sceneKey);
        });
        this.resumeButton2.on('pointerout', () => {
            this.resumeButton2.setTexture('resume-button-2');
        });
        
        this.restartButton.on('pointerover', () => {
            this.restartButton.setTexture('restart-button-hover');
        });
        this.restartButton.on('pointerdown', () => {
            this.restartButton.setTexture('restart-button-click');
        });
        this.restartButton.on('pointerup', () => {
            this.restartButton.setTexture('restart-button');
            this.sound.removeAll();
            this.scene.bringToTop(this.sceneKey);
            this.scene.start(this.sceneKey);
        });
        this.restartButton.on('pointerout', () => {
            this.restartButton.setTexture('restart-button');
        });
        
        this.exitButton.on('pointerover', () => {
            this.exitButton.setTexture('exit-button-hover');
        });
        this.exitButton.on('pointerdown', () => {
            this.exitButton.setTexture('exit-button-click');
        });
        this.exitButton.on('pointerup', () => {
            this.exitButton.setTexture('exit-button');
            this.sound.removeAll();
            this.scene.bringToTop('level-select');    
            this.scene.start('level-select');
        });
        this.exitButton.on('pointerout', () => {
            this.exitButton.setTexture('exit-button');
        });
    }
}