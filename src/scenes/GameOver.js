import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    init(data) {
        this.playingMusic = data.playingMusic;
        this.sceneKey = data.key;
    }

    create() {
        this.add.image(600, 290, 'pause-frame');

        this.restartButton = this.add.image(600, 300, 'restart-button')
        .setInteractive();

        this.exitButton = this.add.image(600, 400, 'exit-button')
        .setInteractive();
        
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