// hoang code
import Phaser from '../lib/phaser.js'
import Weapon from './Weapon.js';

const GRAVITY = 1000
const MAX_HEALTH = 20

export default class Mossy extends Phaser.Physics.Arcade.Sprite {
    MAX_HEALTH = MAX_HEALTH
    velocityX = 0
    velocityY = 0
    isStanding = true
    isHurt = false
    isImmortal = false
    isStun = false
    weapon
    shootExact = false
    main = false
    health = MAX_HEALTH
    canShoot = true

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(0.8);
        this.setPipeline('Light2D');
        
        this.lightPlayer = scene.lights.addLight(x, y, 900)
        .setColor(0x75d9a5)
        .setIntensity(2);

        // particle system         
        var particles = scene.add.particles('ps-seed').setPipeline('Light2D');
        this.movementEffect = scene.add.image(x, y, '').setVisible(false).setPipeline('Light2D');
        
        // var emit = particles.createEmitter({
        //     speed: 0,
        //     lifespan: { start: 2000, end: 0 },
        //     alpha: { start: 1, end: 0 },
        //     scale: { start: 0.1, end: 0 },
        //     x: 0,
        //     y: 50,
        //     quantity: 1,
        //     blendMode: 'ADD'
        // });
        // emit.startFollow(this.movementEffect);

        // Add player to physics world
        scene.physics.add.existing(this);
        scene.add.layer(this);

        this.setGravityY(GRAVITY);
        this.body.setSize(56, 140).setOffset(100, 75);
        this.anims.play('anim-mossy-idle');

        // Adding weapon
        // this.weapons = scene.physics.add.group({
        //     classType: Weapon

        // })
        // this.weapon = this.weapons.get(x, y, '');
        // this.weapon.body.setSize(20, 20).setOffset(60, 40);
        // this.weapon.setVisible(false);

    }

    // active when type space
    // makeShoot(scene, x, y) {

    //     // fix bug player loss its weapon
    //     if (Math.abs(x - this.weapon.x) > 700 || Math.abs(y - this.weapon.y) > 700) {
    //         this.weapon.x = x
    //         this.weapon.y = y
    //             // this.shootExact = false
    //         this.weapon.setStay()
    //         this.weapon.setVisible(false)
    //     }

    //     // shoot
    //     if (scene.cursors.space.isDown && this.weapon.stay == 1 && this.canShoot == 1) {
    //         this.canShoot = false;
    //         setTimeout(() => {
    //             this.canShoot = true;
    //         }, 800);
    //         this.weapon.anims.play('anim-fireball-blue');
    //         this.weapon.setVisible(true);
    //         this.weapon.flipX = this.flipX;
    //         if (this.flipX == false) {
    //             this.weapon.shoot(550, 0)
    //         } else {
    //             this.weapon.shoot(-550, 0)
    //         }
    //     }

    //     // shoot back if distance > 400
    //     if (Math.abs(x - this.weapon.x) > 400) {
    //         // this.weapon.shootBack()
    //         this.weapon.go = this.weapon.back = 0
    //         this.weapon.stay = 1
    //         this.shootExact = false
    //         this.weapon.setStay()
    //         this.weapon.setVisible(false)
    //     }
    //     if (this.weapon.back == 1) {
    //         this.goBack(x, y)
    //     }

    //     // Keep the weapon beside the player when dont type space
    //     if (this.weapon.stay == 1) {
    //         this.weapon.x = x
    //         this.weapon.y = y
    //             // this.shootExact = false
    //     }
    // }

    // collect weapon immediately
    // goBack(x, y) {
    //     if (y == this.weapon.y) {
    //         this.weapon.setVelocityX(-this.weapon.velocityX)
    //     } else {
    //         this.weapon
    //         .setVelocityX(-this.weapon.velocityX)
    //         .setVelocityY(-this.weapon.velocityX / (x - this.weapon.x) * (y - this.weapon.y))
    //     }
    //     if (Math.abs(x - this.weapon.x) < 50 && Math.abs(y - this.weapon.y) < 50) {
    //         this.weapon.go = this.weapon.back = 0
    //         this.weapon.stay = 1
    //         this.shootExact = false
    //         this.weapon.setStay()
    //         this.weapon.setVisible(false)
    //     }
        
    //     this.weapon.setVisible(false)
    // }

    // set Light 
    setLight(x, y) {
        this.lightPlayer.x = x
        this.lightPlayer.y = y
    }

    _update(scene, x, y) {
        this.setLight(x, y)
        this.movementEffect.x = x
        this.movementEffect.y = y + 30
        // scene.healthBar.setScale((this.health >= 0 ? this.health : 0) / this.MAX_HEALTH, 1)
    }

    die() {
        this.resetPipeline();
        this.body.destroy();
        this.setScale(1.5);
    }

    // hurt(damage) {
    //     if (this.isHurt == true && this.isImmortal == false) {
    //         this.health -= damage;
    //         this.isHurt = false
    //         if (this.health <= 0) {
    //             this.health = 0;
    //             this.die();
    //             setTimeout(() => {
    //                 this.destroy();
    //             }, 1000);
    //         }
    //         this.isImmortal = true
    //         setTimeout(() => {
    //             this.isImmortal = false
    //         }, 2000);
    //     }
    // }

    // heal() {
    //     this.health += 5;
    //     if (this.health > this.MAX_HEALTH) this.health = this.MAX_HEALTH;
    // }
}

// hoang code end