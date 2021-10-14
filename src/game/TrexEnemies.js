// hoang code
import Phaser from '../lib/phaser.js'
import Enemy from './Enemy.js';
export default class TrexEnemy extends Enemy {
    velocityX = 300
    velocityY = 0
    shootExact = false
    isShooted = false
    health = 10
    rangeX
    rangeY
    moveX = 0
    moveY = 0
    healthBar
    first = 0

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setFlipX(1);

        this.lightEnemy = scene.lights.addLight(x, y, 200)
        .setColor(0x75d9a5)
        .setIntensity(1);

        // Add T-Rex to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);

        this.body.setSize(80, 120).setOffset(40, 40);
        this.anims.play('anim-t-rex-walk'); 

        // Add health statement
        this.healthBar = scene.add.graphics({ x: x - 50, y: y - 100 });
        this.healthBarBorder = scene.add.graphics({ x: x - 50, y: y - 100 });
        this.healthBarBorder.lineStyle(1, '#444444', 1);
        this.healthBarBorder.strokeRect(0, 0, 70, 5);
    }

    setDestroy() {
        this.anims.play('anim-skull-smoke-green');
        setTimeout(() => {
            this.lightEnemy.setIntensity(0);
            this.healthBar.destroy();
            this.healthBarBorder.destroy();
            this.destroy();
        }, 2000);
    }

    stayHealthBar(x, y) {
        this.healthBar.x = x - 50;
        this.healthBar.y = y - 100;
        this.healthBarBorder.x = x - 50;
        this.healthBarBorder.y = y - 100;
        this.healthBar.fillStyle('0x000000', 1);
        this.healthBar.fillRect(0, 0, 70, 5);
        this.healthBar.fillStyle('0xff0000', 1);
        this.healthBar.fillRect(0, 0, 70 * (this.health >= 0 ? this.health : 0) / 10, 5);
    }

    setLight(x, y) {
        this.lightEnemy.x = x;
        this.lightEnemy.y = y;
    }

    setRangeMove(x, y, ox, oy, vx, vy) {
        this.rangeX = x;
        this.rangeY = y;
        this.moveX = ox;
        this.moveY = oy;
        this.velocityX = vx;
        this.velocityY = vy;
    }

    setMove(x, y) {
        if (this.moveX == 1) {
            if (x <= this.rangeX) {
                this.velocityX = this.velocityX > 0 ? this.velocityX : -this.velocityX;
                this.setVelocityX(this.velocityX);
                this.flipX = true;
            }
            if (x >= this.rangeY) {
                this.velocityX = this.velocityX > 0 ? -this.velocityX : this.velocityX;
                this.setVelocityX(this.velocityX);
                this.flipX = false;
            }
            if (x > this.rangeX && x < this.rangeY && this.first == 0) {
                this.setVelocityX(this.velocityX);
                this.first = 1;
            }
        }
    }

    _update(x, y) {

    }
}

// hoang code end