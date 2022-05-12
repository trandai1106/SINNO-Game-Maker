// hoang code
import Phaser from '../lib/phaser.js'
import Weapon from './Weapon.js';
import Enemy from './Enemy.js';

const GRAVITY = 600
export default class SlimeEnemy extends Enemy {
    velocityX = 50
    velocityY = 0
    isStanding = true
    health = 5
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

        this.lightEnemy = scene.lights.addLight(x, y, 200)
        .setColor(0x75d9a5)
        .setIntensity(1);
        
        // Add Slime to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);
        
        this.body.setSize(120, 80).setOffset(40, 40);
        this.anims.play('anim-slime-orange').setPipeline('Light2D');

        // add health statement
        // this.healthBar = scene.add.graphics({ x: x - 30, y: y - 80 });
        // this.healthBarBorder = scene.add.graphics({ x: x - 30, y: y - 80 });
        // this.healthBarBorder.lineStyle(1, '#444444', 1);
        // this.healthBarBorder.strokeRect(0, 0, 70, 5);
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

    // stay health bar
    stayHealthBar(x, y) {
        this.healthBar.x = x - 30;
        this.healthBar.y = y - 80;
        this.healthBarBorder.x = x - 30;
        this.healthBarBorder.y = y - 80;
        this.healthBar.fillStyle('0x000000', 1);
        this.healthBar.fillRect(0, 0, 70, 5);
        this.healthBar.fillStyle('0xff0000', 1);
        this.healthBar.fillRect(0, 0, 70 * (this.health >= 0 ? this.health : 0) / 5, 5);
    }

    // set Light 
    setLight(x, y) {
        this.lightEnemy.x = x;
        this.lightEnemy.y = y;
    }

    // set enemy direct (allways looks at player)
    setFace(x, playerX) {
        if (x > playerX) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
    }

    // set range movement
    setRangeMove(x, y, ox, oy, vx, vy) {
        this.rangeX = x;
        this.rangeY = y;
        this.moveX = ox;
        this.moveY = oy;
        this.velocityX = vx;
        this.velocityY = vy;
    }

    // set enemies movement
    setMove(x, y) {
        if (this.moveX == 1) {
            if (x <= this.rangeX) {
                this.setVelocityX(this.velocityX > 0 ? this.velocityX : -this.velocityX);
            }
            if (x >= this.rangeY) {
                this.setVelocityX(this.velocityX > 0 ? -this.velocityX : this.velocityX);
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