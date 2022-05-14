import Phaser from '../lib/phaser.js'

export default class DropPlatform extends Phaser.Physics.Arcade.Image {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    scene
    isDropped = false
    constructor(_scene, x, y, texture) {
        super(_scene, x, y, texture);
        this.scene = _scene;
        this.setPipeline('Light2D');
        
        this.setScale(0.25)
        
        this.lightPlayer = _scene.lights.addLight(x, y, 900)
        .setColor(0x75d9a5)
        .setIntensity(2);

        // Add player to physics world
        _scene.physics.add.existing(this);
        _scene.add.layer(this);

        this.body.setSize(320, 200).setOffset(100, 150);
        this.body.setImmovable(true);
    }

    onJump() {
        // drop
        if (this.isDropped) return;
        this.isDropped = true;
        console.log('dropppp');
        var _this = this;
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            loop: 7,
            yoyo: true,
            x: {from: this.x - 5, to: this.x + 5},
            onComplete: function () {
                var __this = _this;
                _this.scene.tweens.add({
                    targets: __this,
                    duration: 500,
                    loop: 0,
                    y: {from: __this.y, to: __this.y + 800},
                    onComplete: function () { 
                        var ___this = __this;
                        __this.scene.tweens.add({
                            targets: ___this,
                            delay: 2000,
                            duration: 1500,
                            loop: 0,
                            y: {from: ___this.y, to: ___this.y - 800},
                            onComplete: function () { 
                                ___this.isDropped = false;
                            }
                        });
                    }
                });
            }
        });
    }
}