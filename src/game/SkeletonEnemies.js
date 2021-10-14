// hoang code
import Phaser from '../lib/phaser.js'
import Weapon from './Weapon.js';
import Enemy from './Enemy.js';

const GRAVITY = 600
export default class SkeletonEnemy extends Enemy {
    velocityX = 0
    velocityY = 0
    isStanding = true
    health = 20
    rangeX
    rangeY
    moveX = 0
    moveY = 0
    healthBar
    first = 0
    shootThunder = false
    canShoot = true

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.anims.play('anim-skeleton-dance'); 

        this.lightEnemy = scene.lights.addLight(x, y, 200)
        .setColor(0x75d9a5)
        .setIntensity(1);
        
        // Add Skeleton to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);
        
        this.body.setSize(80, 120)
        .setOffset(40, 40);

        // Add health statement
        this.healthBar = scene.add.graphics({ x: x - 5, y: y - 80 });
        this.healthBarBorder = scene.add.graphics({ x: x - 5, y: y - 80 });
        this.healthBarBorder.lineStyle(1, '#444444', 1);
        this.healthBarBorder.strokeRect(0, 0, 70, 5);

        // Add weapon
        this.weapons = scene.physics.add.group({
            classType: Weapon
        });
        this.weapon = this.weapons.get(x, y, '');
        this.weapon.play('anim-flame', true);
        this.weapon.body.setSize(60, 20).setOffset(40, 20);
        this.weapon.setVisible(false);

        this.thunder = this.weapons.get(-1, -1, '')
        this.thunder.play('anim-thunder', true);
        this.thunder.body.setSize(40, 150).setOffset(40, 20);
        this.thunder.setVisible(false);
    }

    setDestroy() {
        this.anims.play('anim-skeleton-death');
        this.lightEnemy.setIntensity(0);
        this.weapon.destroy();
        this.weapon.lightWeapon.setIntensity(0);
        this.thunder.destroy();
        setTimeout(() => {
            this.healthBar.destroy();
            this.healthBarBorder.destroy();
            this.destroy();
        }, 1300);
    }

    stayHealthBar(x, y) {
        this.healthBar.x = x - 5;
        this.healthBar.y = y - 80;
        this.healthBarBorder.x = x - 5;
        this.healthBarBorder.y = y - 80;
        this.healthBar.fillStyle('0x000000', 1);
        this.healthBar.fillRect(0, 0, 70, 5);
        this.healthBar.fillStyle('0xff0000', 1);
        this.healthBar.fillRect(0, 0, 70 * (this.health >= 0 ? this.health : 0) / 20, 5);
    }

    makeShoot(scene, x, y, playerX, playerY) {
        if (Math.abs(x - this.weapon.x) > 700 || Math.abs(y - this.weapon.y) > 700) {
            this.weapon.x = x;
            this.weapon.y = y;
            this.weapon.setStay();
            this.weapon.setVisible(false);
        }

        // shoot when player near this skeleton
        if (Math.abs(playerX - x) < 500 && Math.abs(playerY - y) < 500 
        && this.weapon.stay == 1 && this.canShoot == 1) {
            this.canShoot = false;
            setTimeout(() => {
                this.canShoot = true;
            }, 1000);
            this.play('anim-skeleton-attack');
            if (x > playerX) {
                this.weapon.flipX = true;
            } else {
                this.weapon.flipX = false;
            }
            this.weapon.setVisible(true);
            if (this.flipX == false) {
                this.weapon.shoot(GRAVITY / 2, GRAVITY / 2 / (playerX - x) * (playerY - y));
                if (playerY > y) {
                    this.weapon.setAngle(180 * Math.atan(Math.abs((playerY - y) / (playerX - x))) / 3);
                } else {
                    this.weapon.setAngle(-180 * Math.atan(Math.abs((playerY - y) / (playerX - x))) / 3);
                }
            } else {
                this.weapon.shoot(-GRAVITY / 2, -GRAVITY / 2 / (playerX - x) * (playerY - y));
                if (playerY > y) {
                    this.weapon.setAngle(-180 * Math.atan(Math.abs((playerY - y) / (playerX - x))) / 3);
                } else {
                    this.weapon.setAngle(180 * Math.atan(Math.abs((playerY - y) / (playerX - x))) / 3);
                }
            }
            setTimeout(() => {
                this.play('anim-skeleton-dance');
            }, 500);
        }

        // Shoot back when distance > 499
        if (Math.abs(this.weapon.x - x) > 499) {
            this.weapon.go = 0;
            this.weapon.back = 0;
            this.weapon.stay = 1;
            this.shootExact = false;
            this.weapon.x = x;
            this.weapon.y = y;
            this.weapon.setStay();
            this.weapon.setVisible(false);
        }
        if (this.weapon.back == 1) {
            this.goBack(x, y);
        }

        // Keep the weapon beside the enemy when player go away
        if (this.weapon.stay == 1) {
            this.weapon.x = x;
            this.weapon.y = y;
        }

    }

    // collect weapon immediately
    goBack(x, y) {
        if (y == this.weapon.y) {
            this.weapon.setVelocityX(-this.weapon.velocityX);
        } else {
            this.weapon
            .setVelocityX(-this.weapon.velocityX)
            .setVelocityY(-this.weapon.velocityX / (x - this.weapon.x) * (y - this.weapon.y))
        }
        if (Math.abs(x - this.weapon.x) < 50 && Math.abs(y - this.weapon.y) < 50) {
            this.weapon.go = 0;
            this.weapon.back = 0;
            this.weapon.stay = 1;
            this.shootExact = false;
            this.weapon.setStay();
            this.weapon.setVisible(false);
        }
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