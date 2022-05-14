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
        .setDisplaySize(1280, 720)
        .setOrigin(0);

        this.add.image(640, 360, 'menu-frame');

        this.playButton = this.add.image(640, 280, 'play-button')
        .setInteractive();

        this.guideButton = this.add.image(640, 380, 'guide-button')
        .setInteractive();

        this.aboutButton = this.add.image(640, 480, 'about-button')
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
            // this.scene.bringToTop('level-select');    
            // this.scene.start('level-select');
            this.scene.bringToTop('level-1');    
            this.scene.start('level-1');
        });

        
        this.guideButton.on('pointerover', () => {
            this.guideButton.setTexture('guide-button-hover');
        });
        this.guideButton.on('pointerout', () => {
            this.guideButton.setTexture('guide-button');
        });
        this.guideButton.on('pointerdown', () => {
            this.guideButton.setTexture('guide-button-click');
        });
        this.guideButton.on('pointerup', () => {
            this.scene.bringToTop('guide');    
            this.scene.start('guide');
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