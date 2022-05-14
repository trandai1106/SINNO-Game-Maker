import Phaser from '../lib/phaser.js';

import Mossy from '../game/Mossy.js'
import Thorn from '../game/Thorn.js'
import Elastic from '../game/Elastic.js'
import SlimeEnemy from '../game/SlimeEnemies.js';
import TRex from '../game/TrexEnemies.js';
import Skeleton from '../game/SkeletonEnemies.js';
import SkeletonEnemy from '../game/SkeletonEnemies.js';

const RUN_SPEED = 300;
const JUMP_SPEED = 650;
const GRAVITY = 600;
const BULLET_SPEED = 350;

export default class Level2 extends Phaser.Scene {

    isStanding
    canShoot = true
    vol = 0.1

    constructor() {
        super("level-2");
    }
    
    init() {
        this.isGameOver = false;
    }

    create() {
        // Light effect
        this.lights.enable().setAmbientColor(0x30b3ac);

        // Background
        this.bg = this.add.tileSprite(0, 0, 0, 0, 'background-03')
        .setDisplaySize(1280, 720)
        .setOrigin(0)
        .setScrollFactor(0, 0)
        .setPipeline('Light2D');

        // BG Layers
        const map = this.make.tilemap({ key: 'map-02' });
        const tileset = map.addTilesetImage('tileset', 'tileset-1');

        // Rain effect
        var particles = this.add.particles('light')
        .setPipeline('Light2D');

        particles.createEmitter({
            x: { min: 0, max: 4000 },
            y: { min: 0, max: 1000 },
            speedX: { min: -10, max: 10 },
            speedY: { min: -10, max: 10 },
            lifespan: 4000,
            scale: { min: 0.1, max: 0.5 },
            // quantity: 4,
            blendMode: 'ADD'
        });
        // var particles = this.add.particles('rain')
        // .setPipeline('Light2D');

        // particles.createEmitter({
        //     x: { min: 100, max: 2900 },
        //     y: 10,
        //     speedX: { min: -75, max: -50 },
        //     speedY: { min: 200, max: 400 },
        //     lifespan: 4000,
        //     scale: { min: 0.1, max: 0.5 },
        //     // quantity: 4,
        //     blendMode: 'ADD'
        // });
        
        // Player

        this.player = new Mossy(this, 600, 800);
        // this.player = new Mossy(this, 3700, 800);
        
        this.gate = this.physics.add.sprite(3800, 800, '')
        .setPipeline('Light2D');
        this.gate.anims.play('anim-effect-1', true);
        this.gate.anims.yoyo = true;
        this.gate.body.setSize(80, 80).setOffset(60, 60);
        var scene = this;
        this.physics.add.overlap(
            this.player,
            this.gate,
            function (_player, _gate) {
                if (scene.isGameOver) return;
                
                else {
                    scene.isGameOver = true;
                    setTimeout(() => { 
                        scene.scene.pause();
                        scene.sound.removeAll();
                        scene.scene.bringToTop('level-3');   
                        scene.scene.launch('level-3');
                        
                        // scene.scene.pause();
                        // scene.sound.removeAll();
                        // scene.scene.bringToTop('game-over');    
                        // scene.scene.launch('game-over', {
                        //     sceneKey: 'level-2',
                        //     hasWon: true
                        // });
                    }, 500);
                }
            }
        );

        // light
        var light0 = this.lights.addLight(900, 400, 30)
        .setColor(0x75d9a5)
        .setIntensity(2);
        light0.rate = 1;
        this.tweens.add({
            targets: light0,
            duration: 2500,
            loop: -1,
            yoyo: true,
            x: {from: 900, to: 950},
            y: {from: 400, to: 430},
            onYoyo: function () { 
                // console.log('onYoyo'); 
                light0.rate *= -1;
            },
            onUpdate: function () { 
                // console.log('onUpdate'); 
                light0.radius += light0.rate;
            }
        });

        var light = this.lights.addLight(1800, 600, 240)
        .setColor(0x75d9a5)
        .setIntensity(2);
        light.rate = 1;
        var tween = this.tweens.add({
            targets: light,
            duration: 2500,
            loop: -1,
            yoyo: true,
            x: {from: 1900, to: 1950},
            y: {from: 600, to: 630},
            onYoyo: function () { 
                // console.log('onYoyo'); 
                light.rate *= -1;
            },
            onUpdate: function () { 
                // console.log('onUpdate'); 
                light.radius += light.rate;
            }
        });
        this.blueFlower0 = this.add.sprite(160, 660, '')
        .setScale(0.2)
        .setOrigin(0.5)
        .setFlipX(1)
        .setAngle(-20)
        .setPipeline('Light2D');
        this.blueFlower0.anims.play('anim-blue-flower-2', true);
        var lightFlower = this.lights.addLight(180, 630, 40)
        .setColor(0x75d9a5)
        .setIntensity(2);
        lightFlower.rate = 1;
        this.tweens.add({
            targets: lightFlower,
            duration: 6500,
            loop: -1,
            yoyo: true,
            x: {from: 180, to: 230},
            y: {from: 630, to: 680},
            onYoyo: function () { 
                // console.log('onYoyo'); 
                lightFlower.rate *= -1;
            },
            onUpdate: function () { 
                // console.log('onUpdate'); 
                lightFlower.radius += lightFlower.rate;
            }
        });
        this.blueFlower1 = this.add.sprite(3410, 660, '')
        .setFlipX(true)
        .setScale(0.2)
        .setOrigin(0.5)
        .setFlipX(1)
        .setAngle(-20)
        .setPipeline('Light2D');
        this.blueFlower1.anims.play('anim-blue-flower-1', true);
        this.lightFlower = this.lights.addLight(3430, 630, 600)
        .setColor(0x75d9a5)
        .setIntensity(2);
        
        // thorn
        // this.__thorn1 = this.add.image(1200, 800, 'scene-decoration', 'Thorn_1.png').setPipeline('Light2D');
        // this.__thorn2 = this.add.image(1300, 800, 'scene-decoration', 'Thorn_2.png').setPipeline('Light2D');
        // this.__thorn4 = new Thorn(this, 3500, 950, 'scene-decoration', 'Thorn_3.png');

        this.__elastic1 = new Elastic(this, 2480, 950, '');
        this.physics.add.overlap(
            this.player,
            this.__elastic1,
            function (_player, _elastic) {
                if (_player.body.velocity.y >= 0) {
                    _elastic.onJump();
                    
                    _player.anims.play('anim-mossy-jump', true);
                    _player.y -= 1;
                    _player.setVelocityY(-JUMP_SPEED * 1.5);
                }
            }
        );
        
        var light2 = this.lights.addLight(2600, 400, 80)
        .setColor(0x75d9a5)
        .setIntensity(2);
        light2.rate = 1;
        this.tweens.add({
            targets: light2,
            duration: 2500,
            loop: -1,
            yoyo: true,
            x: {from: 2600, to: 2650},
            y: {from: 600, to: 630},
            onYoyo: function () { 
                // console.log('onYoyo'); 
                light2.rate *= -1;
            },
            onUpdate: function () { 
                // console.log('onUpdate'); 
                light2.radius += light2.rate;
            }
        });

        // this.__thorn3 = this.add.image(2500, 950, 'scene-decoration', 'Thorn_3.png').setPipeline('Light2D').setScale(0.75);
        // this.__thorn4 = this.add.image(2600, 950, 'scene-decoration', 'Thorn_3.png').setPipeline('Light2D').setScale(0.75);
        // this.__flower1 = this.add.image(1800, 800, 'scene-decoration', 'Moss_6.png').setPipeline('Light2D');
        // this.__flower2 = this.add.image(1900, 800, 'scene-decoration', 'Moss_5.png').setPipeline('Light2D');

        // slime enemies
        this.slimeEnemy = [];
        // this.__slime = this.add.sprite(1200, 920, '').setPipeline('Light2D');;
        // this.__slime.anims.play('anim-slime-orange');
        // this.slimeEnemy.push(new SlimeEnemy(this, 6580, 400));
        // this.slimeEnemy.push(new SlimeEnemy(this, 7000, 400));
        // this.slimeEnemy.push(new SlimeEnemy(this, 2600, 400));
        // this.slimeEnemy.push(new SlimeEnemy(this, 1800, 280));
        // this.slimeEnemy.push(new SlimeEnemy(this, 1200, 400));
        // this.slimeEnemy.push(new SlimeEnemy(this, 4600, 400));
        // this.slimeEnemy[0].setRangeMove(1286, 600, 1, 0, 50, 0);
        // this.slimeEnemy[1].setRangeMove(6730, 7300, 1, 0, -50, 0);
        // this.slimeEnemy[2].setRangeMove(2350, 2850, 1, 0, 50, 0);
        // this.slimeEnemy[3].setRangeMove(1600, 1980, 1, 0, -50, 0);
        // this.slimeEnemy[4].setRangeMove(1200, 1550, 1, 0, 50, 0);
        // this.slimeEnemy[5].setRangeMove(4300, 4900, 1, 0, 50, 0);

        // // T-Rex enemies
        // this.tRexEnemy = new TRex(this, 10800, 400);
        // this.tRexEnemy.setRangeMove(10500, 11240, 1, 0, 300, 0);
        // // Skeleton enemies
        // this.skeletonEnemy = new Skeleton(this, 14800, 400);
        // this.skeletonEnemy.setRangeMove(14700, 14900, 1, 0, 100, 0);
        // hoang code end
        
        // this.blueFlower2 = this.add.sprite(340, 420, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower2.anims.play('anim-blue-flower-2', true);
        // this.lightFlower = this.lights.addLight(360, 390, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);

        // this.plant3 = this.add.sprite(50, 290, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant3.anims.play('anim-plant-3', true);

        // this.plant2 = this.add.sprite(1470, 420, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant2.anims.play('anim-plant-2', true);

        // this.plant4 = this.add.sprite(1850, 320, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant4.anims.play('anim-plant-4', true);
        // this.plant5 = this.add.sprite(1850, 340, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant5.anims.play('anim-plant-5', true);
        // this.plant6 = this.add.sprite(1850, 320, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant6.anims.play('anim-plant-6', true);
        
        // this.blueFlower2_2 = this.add.sprite(2060, 420, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower2_2.anims.play('anim-blue-flower-2', true);
        // this.lightFlower = this.lights.addLight(2080, 390, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);
        
        // this.plant5_2 = this.add.sprite(2450, 440, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant5_2.anims.play('anim-plant-5', true);
        // this.plant7 = this.add.sprite(2420, 440, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant7.anims.play('anim-plant-7', true);

        // this.plant4_1 = this.add.sprite(3150, 300, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant4_1.anims.play('anim-plant-4', true);
        // this.plant5_3 = this.add.sprite(3140, 300, '')
        // .setOrigin(0.5)
        // .setScale(0.25)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant5_3.anims.play('anim-plant-5', true);
        
        // this.blueFlower_1 = this.physics.add.sprite(3550, 290, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower_1.body.setSize(300, 560).setOffset(280, 120);
        // this.blueFlower_1.anims.play('anim-blue-flower-1', true);
        // this.lightFlower_1 = this.lights.addLight(3570, 260, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);
        // this.physics.add.overlap(this.player, this.blueFlower_1, () => {
        //     if (this.player.health == this.player.MAX_HEALTH) return;
        //     this.blueFlower_1.body.destroy();
        //     setTimeout(() => {
        //         this.lights.removeLight(this.lightFlower_1);
        //         this.player.heal();
        //         const healAnimation = this.add.sprite(this.blueFlower_1.x, this.blueFlower_1.y, '')
        //         .setOrigin(0.5);
        //         healAnimation.anims.play('anim-heal');
        //         setTimeout(() => healAnimation.destroy(), 1000);
        //     }, 100);
        // });

        // this.plant4_3 = this.add.sprite(3930, 330, '')
        // .setOrigin(0.5)
        // .setScale(0.25)
        // .setPipeline('Light2D');
        // this.plant4_3.anims.play('anim-plant-4', true);
        // this.plant6_2 = this.add.sprite(3960, 310, '')
        // .setOrigin(0.5)
        // .setScale(0.25)
        // .setPipeline('Light2D');
        // this.plant6_2.anims.play('anim-plant-6', true);
        // this.plant7_2 = this.add.sprite(3900, 300, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant7_2.anims.play('anim-plant-7', true);
        
        // this.plant3_2 = this.add.sprite(4900, 420, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant3_2.anims.play('anim-plant-3', true);
        // this.plant5_4 = this.add.sprite(4900, 440, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant5_4.anims.play('anim-plant-5', true);
        // this.blueFlower2_3 = this.add.sprite(4900, 400, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower2_3.anims.play('anim-blue-flower-2', true);
        // this.lightFlower = this.lights.addLight(4920, 370, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);

        // this.blueFlower2_4 = this.add.sprite(5900, 360, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower2_4.anims.play('anim-blue-flower-2', true);
        // this.lightFlower = this.lights.addLight(5920, 330, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);
        // this.plant4_4 = this.add.sprite(6100, 460, '')
        // .setOrigin(0.5)
        // .setScale(0.25)
        // .setPipeline('Light2D');
        // this.plant4_4.anims.play('anim-plant-4', true);
        // this.plant6_3 = this.add.sprite(6130, 440, '')
        // .setOrigin(0.5)
        // .setScale(0.25)
        // .setPipeline('Light2D');
        // this.plant6_3.anims.play('anim-plant-6', true);
        // this.plant7_3 = this.add.sprite(6070, 430, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant7_3.anims.play('anim-plant-7', true);
        // this.plant2_1 = this.add.sprite(6070, 430, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant2_1.anims.play('anim-plant-2', true);
        
        // this.plant3_3 = this.add.sprite(7780, 290, '')
        // .setOrigin(0.5)
        // .setScale(0.4)
        // .setPipeline('Light2D');
        // this.plant3_3.anims.play('anim-plant-3', true);
        // this.plant2_2 = this.add.sprite(7780, 290, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setPipeline('Light2D');
        // this.plant2_2.anims.play('anim-plant-2', true);

        // this.blueFlower1_2 = this.physics.add.sprite(8090, 270, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower1_2.body.setSize(300, 560).setOffset(280, 120);
        // this.blueFlower1_2.anims.play('anim-blue-flower-1', true);
        // this.lightFlower_2 = this.lights.addLight(8110, 240, 500)
        // .setColor(0x75d9a5)
        // .setIntensity(1);
        // this.physics.add.overlap(this.player, this.blueFlower1_2, () => {
        //     if (this.player.health == this.player.MAX_HEALTH) return;
        //     this.blueFlower1_2.body.destroy();
        //     setTimeout(() => {
        //         this.lights.removeLight(this.lightFlower_2);
        //         this.player.heal();
        //         const healAnimation = this.add.sprite(this.blueFlower1_2.x, this.blueFlower1_2.y, '')
        //         .setOrigin(0.5);
        //         healAnimation.anims.play('anim-heal');
        //         setTimeout(() => healAnimation.destroy(), 1000);
        //     }, 100);
        // });

        // this.plant7_4 = this.add.sprite(8064, 290, '')
        // .setOrigin(0.5)
        // .setScale(0.2)
        // .setPipeline('Light2D');
        // this.plant7_4.anims.play('anim-plant-7', true);

        // this.blueFlower1_3 = this.physics.add.sprite(11550, 270, '')
        // .setScale(0.2)
        // .setOrigin(0.5)
        // .setFlipX(1)
        // .setAngle(-20)
        // .setPipeline('Light2D');
        // this.blueFlower1_3.body.setSize(300, 560).setOffset(280, 120);
        // this.blueFlower1_3.anims.play('anim-blue-flower-1', true);
        // this.lightFlower_3 = this.lights.addLight(11570, 240, 90)
        // .setColor(0x75d9a5)
        // .setIntensity(2);
        // this.physics.add.overlap(this.player, this.blueFlower1_3, () => {
        //     if (this.player.health == this.player.MAX_HEALTH) return;
        //     this.blueFlower1_3.body.destroy();
        //     setTimeout(() => {
        //         this.lights.removeLight(this.lightFlower_3);
        //         this.player.heal();
        //         const healAnimation = this.add.sprite(this.blueFlower1_3.x, this.blueFlower1_3.y, '')
        //         .setOrigin(0.5);
        //         healAnimation.anims.play('anim-heal');
        //         setTimeout(() => healAnimation.destroy(), 1000);
        //     }, 100);
        // });

        // Thorn layer
        const layerThorn = map.createFromObjects('Thorn', [
            { gid: 818, key: 'scene-decoration', frame: 'Thorn_1.png' },
            { gid: 819, key: 'scene-decoration', frame: 'Thorn_2.png' },
            { gid: 820, key: 'scene-decoration', frame: 'Thorn_3.png' },
            { gid: 821, key: 'scene-decoration', frame: 'Thorn_4.png' },
            { gid: 822, key: 'scene-decoration', frame: 'Thorn_5.png' },
            { gid: 823, key: 'scene-decoration', frame: 'Thorn_6.png' },
        ]);
        for (var i = 0; i < layerThorn.length; i++) {
            layerThorn[i].setPipeline('Light2D');
        }

        // // Plant layer
        // const layerPlant = map.createFromObjects('Plant', [
        //     { gid: 790, key: 'scene-decoration', frame: 'Grass_1.png' },
        //     { gid: 791, key: 'scene-decoration', frame: 'Grass_2.png' },
        //     { gid: 792, key: 'scene-decoration', frame: 'Grass_3.png' },
        //     { gid: 793, key: 'scene-decoration', frame: 'Grass_4.png' },
        //     { gid: 794, key: 'scene-decoration', frame: 'Grass_5.png' },
        //     { gid: 795, key: 'scene-decoration', frame: 'Grass_6.png' },
        //     { gid: 796, key: 'scene-decoration', frame: 'Grass_7.png' },
        //     { gid: 785, key: 'scene-decoration', frame: 'Branch_Leaf_1.png' },
        //     { gid: 786, key: 'scene-decoration', frame: 'Branch_Leaf_2.png' },
        //     { gid: 805, key: 'scene-decoration', frame: 'Moss_1.png' },
        //     { gid: 806, key: 'scene-decoration', frame: 'Moss_2.png' },
        //     { gid: 807, key: 'scene-decoration', frame: 'Moss_3.png' },
        //     { gid: 808, key: 'scene-decoration', frame: 'Moss_4.png' },
        //     { gid: 809, key: 'scene-decoration', frame: 'Moss_5.png' },
        //     { gid: 810, key: 'scene-decoration', frame: 'Moss_6.png' }
        // ]);
        // for (var i = 0; i < layerPlant.length; i++) {
        //     layerPlant[i].setPipeline('Light2D');
        // }
        
        // Ground layer
        const layerGround = map.createLayer('Ground', tileset, 0, 0)
        .setOrigin(0)
        .setPipeline('Light2D');

        // Platform layer
        const layerPlatform = map.createLayer('Platform', tileset, 0, 0)
        .setOrigin(0)
        .setPipeline('Light2D');
        
        // Rock layer
        const layerRock = map.createFromObjects('Rock', [
            { gid: 811, key: 'scene-decoration', frame: 'Rock_1.png' },
            { gid: 812, key: 'scene-decoration', frame: 'Rock_2.png' },
            { gid: 813, key: 'scene-decoration', frame: 'Rock_3.png' }
        ]);
        for (var i = 0; i < layerRock.length; i++) {
            layerRock[i].setPipeline('Light2D');
        }
        
        // Hill layer
        const layerHill = map.createFromObjects('Hill', [
            { gid: 797, key: 'scene-decoration', frame: 'Large_Hill_1.png' },
            { gid: 798, key: 'scene-decoration', frame: 'Large_Hill_2.png' },
            { gid: 799, key: 'scene-decoration', frame: 'Large_Hill_3.png' },
            { gid: 814, key: 'scene-decoration', frame: 'Small_Hill_1.png' },
            { gid: 815, key: 'scene-decoration', frame: 'Small_Hill_2.png' },
            { gid: 816, key: 'scene-decoration', frame: 'Small_Hill_3.png' },
            { gid: 817, key: 'scene-decoration', frame: 'Small_Hill_4.png' }
        ]);
        for (var i = 0; i < layerHill.length; i++) {
            layerHill[i].setPipeline('Light2D');
        }

        // Collider of platforms
        layerGround.forEachTile(tile => {
            if (tile.index == -1) return;
            else if (30 < tile.index && tile.index < 282 && tile.index % 28 == 2) {
                tile.setCollision(1, 0, 0, 0);
            }
            else if (39 < tile.index && tile.index < 282 && tile.index % 28 == 11) {
                tile.setCollision(0, 1, 0, 0);
            }
            else if (30 < tile.index && tile.index < 39) {
                tile.setCollision(0, 0, 1, 0);
            }
            else if (282 < tile.index && tile.index < 291) {
                tile.setCollision(0, 0, 0, 1);
            }
            else if (tile.index == 30) {
                tile.setCollision(1, 0, 1, 0);
            }
            else if (tile.index == 39) {
                tile.setCollision(0, 1, 1, 0);
            }
            else if (tile.index == 282) {
                tile.setCollision(1, 0, 0, 1);
            }
            else if (tile.index == 291) {
                tile.setCollision(0, 1, 0, 1);
            }
            else if (tile.index == 103 || tile.index == 131) {
                tile.setCollision(0, 1, 0, 0);
            }
            else if (tile.index == 106 || tile.index == 134) {
                tile.setCollision(1, 0, 0, 0);
            }
            else if (tile.index == 76 || tile.index == 77) {
                tile.setCollision(0, 0, 1, 0);
            }
            else if (tile.index == 160 || tile.index == 161) {
                tile.setCollision(0, 0, 0, 1);
            }
        });
        layerPlatform.forEachTile(tile => {
            if (tile.index == -1) return;
            else if (368 < tile.index && tile.index < 373) {
                tile.setCollision(0, 0, 1, 0);
            }
            else if (396 < tile.index && tile.index < 401) {
                tile.setCollision(0, 0, 0, 1);
            }
            else if (tile.index == 368) {
                tile.setCollision(1, 0, 1, 0);
            }
            else if (tile.index == 396) {
                tile.setCollision(1, 0, 0, 1);
            }
            else if (tile.index == 373) {
                tile.setCollision(0, 1, 1, 0);
            }
            else if (tile.index == 401) {
                tile.setCollision(0, 1, 0, 1);
            }
        });

        // Collider of map
        this.map_collider_1 = this.physics.add.sprite(0, 290, 'back-button')
        .setSize(10, 600)
        .setVisible(0)
        .setImmovable(1)
        .setPipeline('Light2D');
        this.physics.add.collider(this.player, this.map_collider_1);
        this.map_collider_2 = this.physics.add.sprite(16000, 290, 'back-button')
        .setSize(10, 600)
        .setVisible(0)
        .setImmovable(1)
        .setPipeline('Light2D');
        this.physics.add.collider(this.player, this.map_collider_2);

        // Set Thorn body collider
        this.thorn_collider_1 = this.physics.add.sprite(1400, 1060, '')
        .setSize(400, 50)
        .setVisible(0);
        this.physics.add.overlap(this.player, this.thorn_collider_1, () => {
            this.scene.restart();
        });
        this.thorn_collider_2 = this.physics.add.sprite(2000, 1060, '')
        .setSize(400, 50)
        .setVisible(0);
        this.physics.add.overlap(this.player, this.thorn_collider_2, () => {
            this.scene.restart();
        });
        this.thorn_collider_3 = this.physics.add.sprite(2600, 1060, '')
        .setSize(400, 50)
        .setVisible(0);
        this.physics.add.overlap(this.player, this.thorn_collider_3, () => {
            this.scene.restart();
        });
        // this.thorn_collider_2 = this.physics.add.sprite(5210, 500, 'back-button')
        // .setSize(500, 10)
        // .setVisible(0);
        // this.physics.add.overlap(this.player, this.thorn_collider_2, () => {
        //     this.player.isHurt = true;
        //     this.player.hurt(2);
        //     this.player.setVelocityY(-JUMP_SPEED);
        //     this.player.anims.play('anim-mossy-jump', true);
        // });
        // this.thorn_collider_3 = this.physics.add.sprite(3500, 510, 'back-button')
        // .setSize(1500, 10)
        // .setVisible(0);
        // this.physics.add.overlap(this.player, this.thorn_collider_3, () => {
        //     this.player.isHurt = true;
        //     this.player.hurt(2);
        //     this.player.setVelocityY(-JUMP_SPEED);
        //     this.player.anims.play('anim-mossy-jump', true);
        // });
        // this.thorn_collider_4 = this.physics.add.sprite(11500, 510, 'back-button')
        // .setSize(800, 10)
        // .setVisible(0);
        // this.physics.add.overlap(this.player, this.thorn_collider_4, () => {
        //     this.player.isHurt = true;
        //     this.player.hurt(2);
        //     this.player.setVelocityY(-JUMP_SPEED);
        //     this.player.anims.play('anim-mossy-jump', true);
        // });
        // this.thorn_collider_5 = this.physics.add.sprite(9320, 520, 'back-button')
        // .setSize(500, 10)
        // .setVisible(0);
        // this.physics.add.overlap(this.player, this.thorn_collider_5, () => {
        //     this.player.isHurt = true;
        //     this.player.hurt(2);
        //     this.player.setVelocityY(-JUMP_SPEED);
        //     this.player.anims.play('anim-mossy-jump', true);
        // });

        // GUI
        // this.add.image(4, 4, 'infor-frame')
        // .setOrigin(0)
        // .setScrollFactor(0);
        // this.healthBar = this.add.image(184, 42, 'health-bar')
        // .setOrigin(0, 0.5)
        // .setScrollFactor(0);
        // Button 
        this.pauseButton = this.add.image(1274, 6, 'pause-button')
        .setScrollFactor(0)
        .setOrigin(1, 0);
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerover', () => {
            this.pauseButton.setTexture('pause-button-hover');
        });
        this.pauseButton.on('pointerdown', () => {
            this.pauseButton.setTexture('pause-button-click');
        });
        this.pauseButton.on('pointerup', () => {
            this.pauseButton.setTexture('pause-button');
            this.scene.pause();
            this.sound.pauseAll();
            this.scene.bringToTop('pause');
            this.scene.launch('pause', {
                sceneKey: 'level-2',
                playingMusic: !(this.musicButton.texture.key == 'music-button-off')
            });
        });
        this.pauseButton.on('pointerout', () => {
            this.pauseButton.setTexture('pause-button');
        });
        
        this.musicButton = this.add.image(1198, 6, 'music-button')
        .setScrollFactor(0)
        .setOrigin(1, 0);
        this.musicButton.setInteractive();
        this.musicButton.on('pointerover', () => {
            if (this.musicButton.texture.key == 'music-button') {
                this.musicButton.setTexture('music-button-hover');
            }
            else if (this.musicButton.texture.key == 'music-button-off') {
                this.musicButton.setTexture('music-button-off-hover');
            }
        });
        this.musicButton.on('pointerdown', () => {
            if (this.musicButton.texture.key == 'music-button-hover') {   
                this.musicButton.setTexture('music-button-click');
            }
            else if (this.musicButton.texture.key == 'music-button-off-hover') {   
                this.musicButton.setTexture('music-button-off-click');
            }
        });
        this.musicButton.on('pointerup', () => {
            if (this.musicButton.texture.key == 'music-button-click') {
                this.sound.pauseAll();
                this.musicButton.setTexture('music-button-off');
            }
            else if (this.musicButton.texture.key == 'music-button-off-click') {
                this.sound.resumeAll();
                this.musicButton.setTexture('music-button');
            }
        });
        this.musicButton.on('pointerout', () => {
            if (this.musicButton.texture.key == 'music-button-hover') {
                this.musicButton.setTexture('music-button');
            }
            else if (this.musicButton.texture.key == 'music-button-off-hover') {
                this.musicButton.setTexture('music-button-off');
            }
        });
        // Full screen button
        this.fullScreenButton = this.add.image(1240, 680, 'full-screen-button')
        .setScale(0.3)
        .setScrollFactor(0)
        .setInteractive();

        this.fullScreenButton.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            }
            else {
                this.scale.stopFullscreen();
            }
        });

        // Physical collision detection
        // Player
        this.physics.add.collider(this.player, layerGround, () => {
            if (this.player.body.onFloor()) this.isStanding = true;
        });
        this.physics.add.collider(this.player, layerPlatform, () => {
            if (this.player.body.onFloor()) this.isStanding = true;
        });

        // Music
        this.sound.play('bg-music-01', {
            loop: true,
            volume: this.vol
        });
        // this.sound.play('fighting-music', {
        //     loop: true,
        //     volume: 0.2
        // });

        // hoang code

        // add overlap

        // Slime
        // for (var i = 0; i < this.slimeEnemy.length; i++) {
        //     this.physics.add.overlap(
        //         this.player.weapon,
        //         this.slimeEnemy[i],
        //         this.killEnemy,
        //         undefined,
        //         this
        //     );
        //     this.physics.add.overlap(
        //         this.slimeEnemy[i],
        //         this.player,
        //         () => {
        //             this.player.isHurt = true;
        //             this.player.hurt(2);
        //         },
        //         undefined,
        //         this.slimeEnemy[i]
        //     );
        // }

        // T-Rex
        // this.physics.add.overlap(
        //     this.player.weapon,
        //     this.tRexEnemy,
        //     this.killEnemy,
        //     undefined,
        //     this
        // );
        // this.physics.add.overlap(
        //     this.tRexEnemy,
        //     this.player,
        //     () => {
        //         this.player.isHurt = true;
        //         this.player.isStun = true;
        //         this.player.hurt(4);
        //         const direct = this.tRexEnemy.flipX ? 1 : -1;
        //         this.player.setVelocity(3 * RUN_SPEED * direct, - GRAVITY * 0.5);
        //         setTimeout(() => {
        //             this.player.isStun = false;
        //         }, 800);
        //     }, 
        //     undefined,
        //     this.tRexEnemy
        // );

        // Skeleton
        // this.physics.add.overlap(
        //     this.player.weapon,
        //     this.skeletonEnemy,
        //     this.killEnemy, 
        //     undefined,
        //     this
        // );

        // this.physics.add.overlap(
        //     this.skeletonEnemy.weapon,
        //     this.player,
        //     () => {
        //         // if (child.weapon.back == 1) return
        //         this.skeletonEnemy.weapon.go = 0;
        //         this.skeletonEnemy.weapon.back = 0;
        //         this.skeletonEnemy.weapon.stay = 1;
        //         this.skeletonEnemy.shootExact = false;
        //         this.skeletonEnemy.weapon.setStay();
        //         this.skeletonEnemy.weapon.setVisible(false);
        //         this.skeletonEnemy.weapon.x = this.skeletonEnemy.x;
        //         this.skeletonEnemy.weapon.y = this.skeletonEnemy.y;
        //         this.player.isHurt = true;
        //         this.player.hurt(4);
        //     }, // called on overlap
        //     undefined,
        //     this.skeletonEnemy.weapon
        // );

        // hoang code end

        // Bound the camera
        this.cameras.main.setBounds(0, 0, 4400, 3080)
        .startFollow(this.player)
        .setDeadzone(this.scale.width * 0.2, this.scale.height * 0.35);
        // Fix bug line between tiles of tilemap
        this.cameras.main.roundPixels = true;

        // Debug map mode
        // this.cameras.main.setZoom(0.5);

        // Debug ground layer and platform layer mode
        // const debugGraphics1 = this.add.graphics().setAlpha(0.7);
        // layerGround.renderDebug(debugGraphics1, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(104, 103, 18, 200),
        //     faceColor: new Phaser.Display.Color(239, 240, 37, 255)
        // });
        // const debugGraphics3 = this.add.graphics().setAlpha(0.7);
        // layerPlatform.renderDebug(debugGraphics3, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(104, 103, 18, 200),
        //     faceColor: new Phaser.Display.Color(239, 240, 37, 255)
        // });
        // End debug mode

        // Moving handle
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Background scrolling
        this.bg.tilePositionX = this.cameras.main.scrollX;

        // hoang code

        // Player collect weapon when enemy is shooted exactly
        // if (this.player.shootExact == true) {
        //     this.player.goBack(this.player.x, this.player.y);
        // }

        // Player make shooting
        // this.player.makeShoot(this, this.player.x, this.player.y);

        // Update statement of the player and weapon
        this.player._update(this, this.player.x, this.player.y);

        // for (var i = 0; i < this.slimeEnemy.length; i++) {
        //     if (!this.slimeEnemy[i].active || this.slimeEnemy[i].health <= 0) continue;
        //     if (Math.abs(this.slimeEnemy[i].x - this.player.x) < 1200
        //     && Math.abs(this.slimeEnemy[i].y - this.player.y) < 1200) {
        //         // set enemy light and health bar
        //         this.slimeEnemy[i].setLight(this.slimeEnemy[i].x, this.slimeEnemy[i].y);
        //         this.slimeEnemy[i].stayHealthBar(this.slimeEnemy[i].x, this.slimeEnemy[i].y);
        //         // set the enemy looks player
        //         this.slimeEnemy[i].setFace(this.slimeEnemy[i].x, this.player.x);
        //         // set enemy auto running
        //         this.slimeEnemy[i].setMove(this.slimeEnemy[i].x, this.slimeEnemy[i].y);
        //     } else {
        //         this.slimeEnemy[i].setVelocityX(0);
        //         this.slimeEnemy[i].first = 0;
        //     }
        // }

        // Set T-Rex activities
        // if (this.tRexEnemy.active && this.tRexEnemy.health > 0) {
        //     if (Math.abs(this.tRexEnemy.x - this.player.x) < 1200 
        //     && Math.abs(this.tRexEnemy.y - this.player.y) < 1200) {
        //         // set enemy light and health bar
        //         this.tRexEnemy.setLight(this.tRexEnemy.x, this.tRexEnemy.y);
        //         this.tRexEnemy.stayHealthBar(this.tRexEnemy.x, this.tRexEnemy.y);

        //         // set enemy auto running
        //         this.tRexEnemy.setMove(this.tRexEnemy.x, this.tRexEnemy.y);

        //         if (Math.abs(this.tRexEnemy.x - this.player.x) < 200) {
        //             this.tRexEnemy.anims.play('anim-t-rex-attack', true);
        //         } else {
        //             this.tRexEnemy.anims.play('anim-t-rex-walk', true);
        //         }
        //     } else {
        //         this.tRexEnemy.setVelocityX(0);
        //         this.tRexEnemy.first = 0;
        //     }
        // }

        // if (this.skeletonEnemy.active && this.skeletonEnemy.health > 0) {
        //     if (Math.abs(this.skeletonEnemy.x - this.player.x) < 1200
        //     && Math.abs(this.skeletonEnemy.y - this.player.y) < 1200) {
        //         // set enemy light and health bar
        //         this.skeletonEnemy.setLight(this.skeletonEnemy.x, this.skeletonEnemy.y);
        //         this.skeletonEnemy.stayHealthBar(this.skeletonEnemy.x, this.skeletonEnemy.y);
        //         this.skeletonEnemy.setFace(this.skeletonEnemy.x, this.player.x);
        //         this.skeletonEnemy.setMove(this.skeletonEnemy.x, this.skeletonEnemy.y);
        //         this.skeletonEnemy.makeShoot(
        //             this, 
        //             this.skeletonEnemy.x, 
        //             this.skeletonEnemy.y, 
        //             this.player.x, 
        //             this.player.y
        //         );
        //         if (this.skeletonEnemy.shootThunder == false) {
        //             setTimeout(() => {
        //                 if (this.player.active && !this.isGameOver) {
        //                     this.skeletonEnemy.shootThunder = true;
        //                     this.skeletonEnemy.thunder.x = this.player.x;
        //                     this.skeletonEnemy.thunder.y = this.player.y;
        //                     this.skeletonEnemy.thunder.setVisible(true);
        //                     this.player.isHurt = true;
        //                     this.player.hurt(3);
        //                     setTimeout(() => {
        //                         this.skeletonEnemy.thunder.setVisible(false);
        //                     }, 2000);
        //                 }
        //             }, 5000);
        //         }
        //     } else {
        //         this.skeletonEnemy.setVelocityX(0);
        //         this.skeletonEnemy.first = 0;
        //         this.skeletonEnemy.shootThunder = false;
        //     }
        // }

        if (this.player.health <= 0) {
            if (this.player.active) this.player.anims.play('anim-death', true);
            if (!this.isGameOver) {
                this.isGameOver = true;
                setTimeout(() => {
                    this.scene.pause();
                    this.sound.removeAll();
                    this.scene.bringToTop('game-over');    
                    this.scene.launch('game-over', {
                        sceneKey: 'level-2',
                        hasWon: false
                    });
                }, 2000);
            }
            return;
        }
        if (this.player.isStun) {
            this.player.anims.play('anim-mossy-hurt', true);
            return;
        }

        // Dash
        // if (this.cursors.down.isDown) {
        //     this.player.anims.play('anim-mossy-dash', true);
        //     const direct = this.player.flipX ? -1 : 1;
        //     this.player.setVelocityX(RUN_SPEED * 3 * direct);
        //     return;
        // }
        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
            if (this.player.isImmortal) this.player.anims.play('anim-mossy-hurt', true);
            else if (this.isStanding) this.player.anims.play('anim-mossy-idle', true);
            else this.player.anims.play('anim-mossy-jump', true);
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.isStanding) {
            this.isStanding = false;
            if (this.player.isImmortal) this.player.anims.play('anim-mossy-hurt', true);
            else this.player.anims.play('anim-mossy-jump', true);
            if (this.player.body.velocity.y >= 0) this.player.setVelocityY(-JUMP_SPEED);
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-RUN_SPEED);
            if (this.player.isImmortal) this.player.anims.play('anim-mossy-hurt', true);
            else if (this.isStanding) this.player.anims.play('anim-mossy-walk', true);
            this.player.flipX = true;
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(RUN_SPEED);
            if (this.player.isImmortal) this.player.anims.play('anim-mossy-hurt', true);
            else if (this.isStanding) this.player.anims.play('anim-mossy-walk', true);
            this.player.flipX = false;
        }
    }

    // hoang code

    // Callback function when player shoot enemy
    // killEnemy(player, enemy) {
    //     this.player.weapon.anims.play('anim-fireball-blue-explode');
    //     if (this.player.weapon.stay == 1) return;
    //     enemy.health -= 1;
    //     if (enemy.health == 0) {
    //         this.physics.world.disableBody(enemy.body);
    //         enemy.healthBar.setVisible(0);
    //         enemy.healthBarBorder.setVisible(0);
    //         enemy.setDestroy();
    //         if (SkeletonEnemy.prototype.isPrototypeOf(enemy) && !this.isGameOver) {
    //             this.isGameOver = true;
    //             setTimeout(() => {
    //                 this.scene.pause();
    //                 this.sound.removeAll();
    //                 this.scene.bringToTop('game-over');    
    //                 this.scene.launch('game-over', {
    //                     sceneKey: 'level-01',
    //                     hasWon: true
    //                 });
    //             }, 1500);
    //         }
    //     }
    //     this.player.shootExact = true;
    //     this.player.goBack(this.player.x, this.player.y)
    // }
    // hoang code end
}