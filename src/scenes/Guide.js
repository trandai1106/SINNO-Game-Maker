import Phaser from '../lib/phaser.js';

export default class Guide extends Phaser.Scene {
    constructor() {
        super("guide");
    }

    init() {
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 0, 0, 'background-05')
        .setDisplaySize(1280, 720)
        .setOrigin(0);

        this.add.image(640, 360, 'guide');

        this.backButton = this.add.image(640, 600, 'back-button')
        .setScale(0.75)
        .setInteractive();
        
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
            this.backButton.setTexture('back-button');
            this.scene.bringToTop('menu');    
            this.scene.start('menu');
        });
    }
}