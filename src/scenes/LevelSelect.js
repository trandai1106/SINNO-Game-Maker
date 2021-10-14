import Phaser from '../lib/phaser.js';

export default class LevelSelect extends Phaser.Scene {
    title
    progressBar
    processBarBorder
    progressText

    constructor() {
        super("level-select");
    }

    preload() {
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 0, 0, 'background-05')
        .setDisplaySize(1200, 580)
        .setOrigin(0);

        this.add.image(600, 290, 'select-level-frame');

        this.level01Button = this.add.image(435, 250, 'level-01-button')
        .setInteractive();

        this.levelComingSoonButton = this.add.image(535, 250, 'level-coming-soon-button')
        .setInteractive();

        this.backButton = this.add.image(600, 490, 'back-button')
        .setInteractive();

        this.level01Button.on('pointerover', () => {
            this.level01Button.setTexture('level-01-button-hover');
        });
        this.level01Button.on('pointerout', () => {
            this.level01Button.setTexture('level-01-button');
        });
        this.level01Button.on('pointerdown', () => {
            this.level01Button.setTexture('level-01-button-click');
        });
        this.level01Button.on('pointerup', () => {
            this.scene.bringToTop('level-01');    
            this.scene.start('level-01');
        });
        
        this.levelComingSoonButton.on('pointerover', () => {
            this.levelComingSoonButton.setTexture('level-coming-soon-button-hover');
        });
        this.levelComingSoonButton.on('pointerout', () => {
            this.levelComingSoonButton.setTexture('level-coming-soon-button');
        });
        this.levelComingSoonButton.on('pointerdown', () => {
            this.levelComingSoonButton.setTexture('level-coming-soon-button-click');
        });
        this.levelComingSoonButton.on('pointerup', () => {
            this.levelComingSoonButton.setTexture('level-coming-soon-button');
        });
        
        this.backButton.on('pointerover', () => {
            this.backButton.setTexture('back-button-hover');
        });
        this.backButton.on('pointerout', () => {
            this.backButton.setTexture('back-button');
        });
        this.backButton.on('pointerdown', () => {
            this.backButton.setTexture('back-button-click');
        });
        this.backButton.on('pointerup', () => {
            this.scene.start('menu');
        });
    }
}