import Phaser from '../lib/phaser.js'

export default class Thorn extends Phaser.Physics.Arcade.Image {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setScale(0.8);
        this.setPipeline('Light2D');
        
        this.lightPlayer = scene.lights.addLight(x, y, 900)
        .setColor(0x75d9a5)
        .setIntensity(2);

        // Add player to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);

        this.body.setCircle(110, 0, 0);
    }
}