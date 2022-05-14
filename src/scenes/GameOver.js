import Phaser from '../lib/phaser.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    init(data) {
        this.sceneKey = data.sceneKey
        this.hasWon = data.hasWon;
    }

    create() {
        if (this.hasWon) {
            this.add.image(640, 360, 'win-frame');

            this.nextLevelButton = this.add.image(640, 330, 'next-level-button')
            .setInteractive();

            this.restartButton = this.add.image(640, 430, 'restart-button')
            .setInteractive();

            this.exitButton = this.add.image(640, 530, 'exit-button')
            .setInteractive();
            
            this.nextLevelButton.on('pointerover', () => {
                this.nextLevelButton.setTexture('next-level-button-hover');
            });
            this.nextLevelButton.on('pointerdown', () => {
                this.nextLevelButton.setTexture('next-level-button-click');
            });
            this.nextLevelButton.on('pointerup', () => {
                this.nextLevelButton.setTexture('next-level-button');
            });
            this.nextLevelButton.on('pointerout', () => {
                this.nextLevelButton.setTexture('next-level-button');
            });
            
            this.restartButton.on('pointerover', () => {
                this.restartButton.setTexture('restart-button-hover');
            });
            this.restartButton.on('pointerdown', () => {
                this.restartButton.setTexture('restart-button-click');
            });
            this.restartButton.on('pointerup', () => {
                this.restartButton.setTexture('restart-button');
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
                this.restartButton.setTexture('restart-button');
                this.scene.bringToTop('level-select');    
                this.scene.start('level-select');
            });
            this.exitButton.on('pointerout', () => {
                this.exitButton.setTexture('exit-button');
            });
        }        
        else {
            this.add.image(600, 290, 'lose-frame');
            
            this.restartButton = this.add.image(600, 250, 'restart-button')
            .setInteractive();

            this.exitButton = this.add.image(600, 370, 'exit-button')
            .setInteractive();
            
            this.restartButton.on('pointerover', () => {
                this.restartButton.setTexture('restart-button-hover');
            });
            this.restartButton.on('pointerdown', () => {
                this.restartButton.setTexture('restart-button-click');
            });
            this.restartButton.on('pointerup', () => {
                this.restartButton.setTexture('restart-button');
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
                this.restartButton.setTexture('restart-button');
                this.scene.bringToTop('level-select');    
                this.scene.start('level-select');
            });
            this.exitButton.on('pointerout', () => {
                this.exitButton.setTexture('exit-button');
            });
        }
    }
}