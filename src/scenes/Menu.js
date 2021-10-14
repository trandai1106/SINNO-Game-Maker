import Phaser from '../lib/phaser.js';

export default class Menu extends Phaser.Scene {
    title
    progressBar
    processBarBorder
    progressText

    constructor() {
        super("menu");
    }

    preload() {
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 0, 0, 'background-05')
        .setDisplaySize(1200, 580)
        .setOrigin(0);

        this.add.image(600, 290, 'menu-frame');

        this.playButton = this.add.image(600, 250, 'play-button')
        .setInteractive();
        this.aboutButton = this.add.image(600, 370, 'about-button')
        .setInteractive();

        this.playButton.on('pointerover', () => {
            this.playButton.setTexture('play-button-hover');
        });
        this.playButton.on('pointerout', () => {
            this.playButton.setTexture('play-button');
        });
        this.playButton.on('pointerdown', () => {
            this.playButton.setTexture('play-button-click');
        });
        this.playButton.on('pointerup', () => {
            this.scene.bringToTop('level-select');    
            this.scene.start('level-select');
        });
        
        this.aboutButton.on('pointerover', () => {
            this.aboutButton.setTexture('about-button-hover');
        });
        this.aboutButton.on('pointerout', () => {
            this.aboutButton.setTexture('about-button');
        });
        this.aboutButton.on('pointerdown', () => {
            this.aboutButton.setTexture('about-button-click');
        });        
        this.aboutButton.on('pointerup', () => {
            this.scene.bringToTop('about');    
            this.scene.start('about');
        });
    }
}