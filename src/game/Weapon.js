// hoang code
import Phaser from '../lib/phaser.js'

export default class Weapon extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0
    velocityY = 0
    stay = 1
    go = 0
    back = 0
    lightWeapon

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setOrigin(0.5)
        .setFlipX(1);
        this.lightWeapon = scene.lights.addLight(x, y, 500)
        .setColor(0x75d9a5)
        .setIntensity(1);

    }
    preload() {
    }
    create() {
    }

    // Set light 
    setLight(x, y) {
        this.lightWeapon.x = x;
        this.lightWeapon.y = y;
    }

    // Shooting while player typing space
    shoot(vX, vY) {
        this.stay = 0;
        this.go = 1;
        this.velocityX = vX;
        this.velocityY = vY;
        this.setVelocityX(vX)
        .setVelocityY(vY);
    }

    // The weapon auto coming back when distance > 700
    shootBack() {
        this.go = 0;
        this.back = 1;
    }

    // Keep the weapon beside the player
    setStay() {
        this.setVelocityX(0)
        .setVelocityY(0);
        this.velocityX = 0;
        this.velocityY = 0;
    }
}
// hoang code end