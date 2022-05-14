import Phaser from '../lib/phaser.js'

export default class Elastic extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setPipeline('Light2D');
        
        this.setScale(0.4)
        
        this.lightPlayer = scene.lights.addLight(x, y, 900)
        .setColor(0x75d9a5)
        .setIntensity(2);

        // Add player to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);

        this.body.setSize(320, 200).setOffset(100, 150);
        this.body.setImmovable(true);
        this.anims.play('anim-plant-jump-idle');
    }

    onJump() {
        this.anims.play('anim-plant-jump-elastic', true);
        this.anims.playAfterRepeat('anim-plant-jump-idle', true);
        // this.anims
    }
}