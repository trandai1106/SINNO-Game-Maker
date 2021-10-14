import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super("pause");
    }

    init(data) {
        this.playingMusic = data.playingMusic;
        this.sceneKey = data.key;
    }

    create() {
        this.add.image(600, 290, 'pause-frame');

        this.resumeButton = this.add.image(1194, 6, 'resume-button')
        .setOrigin(1, 0)
        .setInteractive();

        this.resumeButton2 = this.add.image(600, 200, 'resume-button-2')
        .setInteractive();

        this.restartButton = this.add.image(600, 300, 'restart-button')
        .setInteractive();

        this.exitButton = this.add.image(600, 400, 'exit-button')
        .setInteractive();

        this.resumeButton.on('pointerover', () => {
            this.resumeButton.setTexture('resume-button-hover');
        });
        this.resumeButton.on('pointerdown', () => {
            this.resumeButton.setTexture('resume-button-click');
        });
        this.resumeButton.on('pointerup', () => {
            this.resumeButton.setTexture('resume-button');
            this.scene.bringToTop('level-01');
            if (this.playingMusic) this.sound.resumeAll();
            this.scene.resume('level-01');
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
            this.scene.bringToTop('level-01');
            if (this.playingMusic) this.sound.resumeAll();
            this.scene.resume('level-01');
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
            this.scene.start('level-01');
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
            this.scene.bringToTop('menu');    
            this.scene.start('menu');
        });
        this.exitButton.on('pointerout', () => {
            this.exitButton.setTexture('exit-button');
        });
    }
}