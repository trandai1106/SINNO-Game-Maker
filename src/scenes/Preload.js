import Phaser from '../lib/phaser.js';

export default class Preload extends Phaser.Scene {
    title
    progressBar
    processBarBorder
    progressText

    constructor() {
        super("preload");
    }

    preload() {
        // Title
        const titleStyle = { color: '#000000', fontSize: 70, fontFamily: 'monospace' };
        const style = { color: '#000000', fontSize: 50, fontFamily: 'monospace' };
        this.title = this.add.text(600, 140, 'Mossy', titleStyle)
            .setOrigin(0.5);
        this.progressText = this.add.text(600, 240, 'Loading 0%', style)
            .setOrigin(0.5);    
        
        // Loading bar
        this.progressBar = this.add.graphics({x: 300, y: 340});
        this.processBarBorder = this.add.graphics({x: 300, y: 340});
        this.processBarBorder.lineStyle(4, '0x000000', 1);
        this.processBarBorder.strokeRect(0, 0, 600, 30);
        
        // Music  and sound effect
        this.load.audio('bg-music-01', 'assets/sounds/bg-music-01.ogg');

        // Load background
        this.load.image('background-03', 'assets/sprites/Environment/Background/background-03.jpg');
        this.load.image('background-05', 'assets/sprites/Environment/Background/background-05.png');
        this.load.image('background-06', 'assets/sprites/Environment/Background/background-06.png');

        // Load GUI
        this.load.image('infor-frame', 'assets/sprites/GUI/infor-frame.png');
        this.load.image('menu-frame', 'assets/sprites/GUI/menu_frame.png');
        this.load.image('select-level-frame', 'assets/sprites/GUI/select-level_frame.png');
        this.load.image('pause-frame', 'assets/sprites/GUI/pause_frame.png');
        this.load.image('win-frame', 'assets/sprites/GUI/win_frame.png');
        this.load.image('lose-frame', 'assets/sprites/GUI/lose_frame.png');
        this.load.image('about', 'assets/sprites/GUI/About.png');
        this.load.image('guide', 'assets/sprites/GUI/Guide.png');
        this.load.image('health-bar', 'assets/sprites/GUI/Health-bar.png');
        this.load.image('pause-button', 'assets/sprites/GUI/Pause.png');
        this.load.image('pause-button-hover', 'assets/sprites/GUI/Pause_hover.png');
        this.load.image('pause-button-click', 'assets/sprites/GUI/Pause_click.png');
        this.load.image('resume-button', 'assets/sprites/GUI/Resume.png');
        this.load.image('resume-button-hover', 'assets/sprites/GUI/Resume_hover.png');
        this.load.image('resume-button-click', 'assets/sprites/GUI/Resume_click.png');
        this.load.image('music-button', 'assets/sprites/GUI/Music.png');
        this.load.image('music-button-hover', 'assets/sprites/GUI/Music_hover.png');
        this.load.image('music-button-click', 'assets/sprites/GUI/Music_click.png');
        this.load.image('music-button-off', 'assets/sprites/GUI/Music_off.png');
        this.load.image('music-button-off-hover', 'assets/sprites/GUI/Music_off_hover.png');
        this.load.image('music-button-off-click', 'assets/sprites/GUI/Music_off_click.png');
        this.load.image('play-button', 'assets/sprites/GUI/Play_button.png');
        this.load.image('play-button-hover', 'assets/sprites/GUI/Play_button_hover.png');
        this.load.image('play-button-click', 'assets/sprites/GUI/Play_button_click.png');
        this.load.image('about-button', 'assets/sprites/GUI/About_button.png');
        this.load.image('about-button-hover', 'assets/sprites/GUI/About_button_hover.png');
        this.load.image('about-button-click', 'assets/sprites/GUI/About_button_click.png');
        this.load.image('guide-button', 'assets/sprites/GUI/Guide_button.png');
        this.load.image('guide-button-hover', 'assets/sprites/GUI/Guide_button_hover.png');
        this.load.image('guide-button-click', 'assets/sprites/GUI/Guide_button_click.png');
        this.load.image('back-button', 'assets/sprites/GUI/Back_button.png');
        this.load.image('back-button-hover', 'assets/sprites/GUI/Back_button_hover.png');
        this.load.image('back-button-click', 'assets/sprites/GUI/Back_button_click.png');
        this.load.image('resume-button-2', 'assets/sprites/GUI/Resume_button.png');
        this.load.image('resume-button-2-hover', 'assets/sprites/GUI/Resume_button_hover.png');
        this.load.image('resume-button-2-click', 'assets/sprites/GUI/Resume_button_click.png');
        this.load.image('restart-button', 'assets/sprites/GUI/Restart_button.png');
        this.load.image('restart-button-hover', 'assets/sprites/GUI/Restart_button_hover.png');
        this.load.image('restart-button-click', 'assets/sprites/GUI/Restart_button_click.png');
        this.load.image('exit-button', 'assets/sprites/GUI/exit_button.png');
        this.load.image('exit-button-hover', 'assets/sprites/GUI/exit_button_hover.png');
        this.load.image('exit-button-click', 'assets/sprites/GUI/exit_button_click.png');
        this.load.image('next-level-button', 'assets/sprites/GUI/Next_level_button.png');
        this.load.image('next-level-button-hover', 'assets/sprites/GUI/Next_level_button_hover.png');
        this.load.image('next-level-button-click', 'assets/sprites/GUI/Next_level_button_click.png');
        this.load.image('level-01-button', 'assets/sprites/GUI/level-01.png');
        this.load.image('level-01-button-hover', 'assets/sprites/GUI/level-01_hover.png');
        this.load.image('level-01-button-click', 'assets/sprites/GUI/level-01_click.png');
        this.load.image('level-coming-soon-button', 'assets/sprites/GUI/level-coming-soon.png');
        this.load.image('level-coming-soon-button-hover', 'assets/sprites/GUI/level-coming-soon_hover.png');
        this.load.image('level-coming-soon-button-click', 'assets/sprites/GUI/level-coming-soon_click.png');
        this.load.image('full-screen-button', 'assets/sprites/GUI/btnFullScreen.png');

        // Particle system
        this.load.image('ps-seed', 'assets/sprites/Environment/ParticleSystem/particle-system-seed.png');
        this.load.image('rain', 'assets/sprites/Environment/ParticleSystem/rain.png');

        // Load platform tilemap
        this.load.tilemapTiledJSON('map-01', 'assets/sprites/Environment/MossyTileset/map-01.json');
        this.load.tilemapTiledJSON('map-02', 'assets/sprites/Environment/MossyTileset/map-02.json');
        this.load.tilemapTiledJSON('map-03', 'assets/sprites/Environment/MossyTileset/map-03.json');
        
        this.load.image('tileset-1', 'assets/sprites/Environment/MossyTileset/Mossy - TileSet.png');
        
        // Scene details

        this.load.atlas('scene-decoration', 'assets/sprites/Environment/MossyTileset/scene_decoration.png', 
        'assets/sprites/Environment/MossyTileset/scene_decoration.json');
        
        this.load.image('drop-platform', 'assets/sprites/Environment/MossyTileset/drop-platform.png');

        // Load Mossy
        this.load.spritesheet('mossy-idle', 'assets/sprites/BlueWizard/mossy-idle.png', {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('mossy-hurt', 'assets/sprites/BlueWizard/mossy-hurt.png', {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('mossy-walk', 'assets/sprites/BlueWizard/mossy-walk.png', {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('mossy-jump', 'assets/sprites/BlueWizard/mossy-jump.png', {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('mossy-dash', 'assets/sprites/BlueWizard/mossy-dash.png', {
            frameWidth: 256,
            frameHeight: 256
        });

        // Load plant spritesheets
        this.load.spritesheet('blue-flower-1', 'assets/sprites/Environment/Plant Animations/blue-flower-1.png', {
            frameWidth: 768,
            frameHeight: 768
        });
        this.load.spritesheet('blue-flower-2', 'assets/sprites/Environment/Plant Animations/blue-flower-2.png', {
            frameWidth: 768,
            frameHeight: 768
        });
        // this.load.spritesheet('plant-2', 'assets/sprites/Environment/Plant Animations/plant-2.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('plant-3', 'assets/sprites/Environment/Plant Animations/plant-3.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('plant-4', 'assets/sprites/Environment/Plant Animations/plant-4.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('plant-5', 'assets/sprites/Environment/Plant Animations/plant-5.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('plant-6', 'assets/sprites/Environment/Plant Animations/plant-6.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('plant-7', 'assets/sprites/Environment/Plant Animations/plant-7.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        this.load.spritesheet('plant-jump-idle', 'assets/sprites/Environment/Plant Animations/plant-jump-idle.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.spritesheet('plant-jump-elastic', 'assets/sprites/Environment/Plant Animations/plant-jump-elastic.png', {
            frameWidth: 512,
            frameHeight: 512
        });

        // // Enemy
        // this.load.spritesheet('t-rex-idle', 'assets/sprites/T-Rex/t-rex-idle.png', {
        //     frameWidth: 200,
        //     frameHeight: 175
        // });
        // this.load.spritesheet('t-rex-walk', 'assets/sprites/T-Rex/t-rex-walk.png', {
        //     frameWidth: 200,
        //     frameHeight: 175
        // });
        // this.load.spritesheet('t-rex-attack', 'assets/sprites/T-Rex/t-rex-attack.png', {
        //     frameWidth: 225,
        //     frameHeight: 175
        // });
        // this.load.spritesheet('skeleton-idle', 'assets/sprites/Skeleton Lord/Idle.png', {
        //     frameWidth: 167.25,
        //     frameHeight: 173
        // });
        // this.load.spritesheet('skeleton-attack', 'assets/sprites/Skeleton Lord/Attack.png', {
        //     frameWidth: 183.25,
        //     frameHeight: 177
        // });
        // this.load.spritesheet('skeleton-special-attack', 'assets/sprites/Skeleton Lord/SpecialAttack.png', {
        //     frameWidth: 180,
        //     frameHeight: 186
        // });
        // this.load.spritesheet('skeleton-walk', 'assets/sprites/Skeleton Lord/Walk.png', {
        //     frameWidth: 180,
        //     frameHeight: 186
        // });
        // this.load.spritesheet('skeleton-run', 'assets/sprites/Skeleton Lord/Run.png', {
        //     frameWidth: 200,
        //     frameHeight: 172
        // });
        // this.load.spritesheet('skeleton-death', 'assets/sprites/Skeleton Lord/Death.png', {
        //     frameWidth: 231.5,
        //     frameHeight: 229
        // });
        // this.load.spritesheet('skeleton-dance', 'assets/sprites/Skeleton Lord/Dance.png', {
        //     frameWidth: 185,
        //     frameHeight: 182.5
        // });

        // // Spell
        // this.load.spritesheet('fireball-blue', 'assets/sprites/Weapon/fireball_blue.png', {
        //     frameWidth: 128,
        //     frameHeight: 96
        // });
        // this.load.spritesheet('fireball-blue-explode', 'assets/sprites/Weapon/fireball_blue_explode.png', {
        //     frameWidth: 128,
        //     frameHeight: 96
        // });
        // this.load.spritesheet('flame', 'assets/sprites/Skeleton Lord/Flame.png', {
        //     frameWidth: 160,
        //     frameHeight: 53
        // });
        // this.load.spritesheet('heal', 'assets/sprites/Effect/heal.png', {
        //     frameWidth: 192,
        //     frameHeight: 192
        // });
        this.load.spritesheet('effect-1', 'assets/sprites/Effect/effect1.png', {
            frameWidth: 192,
            frameHeight: 192
        });
        // this.load.spritesheet('shield', 'assets/sprites/Effect/shield.png', {
        //     frameWidth: 192,
        //     frameHeight: 192
        // });
        // this.load.spritesheet('smoke', 'assets/sprites/Effect/smoke.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });
        // this.load.spritesheet('skull-smoke-green', 'assets/sprites/Effect/skull_smoke_green.png', {
        //     frameWidth: 96,
        //     frameHeight: 128
        // });
        // this.load.spritesheet('sphere-blue', 'assets/sprites/Effect/sphere_blue.png', {
        //     frameWidth: 128,
        //     frameHeight: 128
        // });
        // this.load.spritesheet('thunder', 'assets/sprites/Skeleton Lord/Thunder.png', {
        //     frameWidth: 140,
        //     frameHeight: 235
        // });
        
        // Loading statement
        this.load.on('progress', (val) => {
            // Text
            this.progressText.text = 'Loading ' + (Math.round(val * 100)) + '%';
            // Bar
            this.progressBar.clear();
            this.progressBar.fillStyle('0x55a455', 1);
            this.progressBar.fillRect(0, 0, val * 600, 30);
        }, this);
    }

    create() {
        // Mossy animations
        this.anims.create({ key: "anim-mossy-idle",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("mossy-idle", { start: 0, end: 19 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-mossy-hurt",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("mossy-hurt", { start: 0, end: 19 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-mossy-walk",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("mossy-walk", { start: 0, end: 19 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-mossy-jump",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("mossy-jump", { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-mossy-dash",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("mossy-dash", { start: 0, end: 15 }),
            repeat: -1
        });

        // Plant animations
        this.anims.create({ key: "anim-blue-flower-1",
            frameRate: 16,
            frames: this.anims.generateFrameNumbers("blue-flower-1", { start: 0, end: 59 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-blue-flower-2",
            frameRate: 18,
            frames: this.anims.generateFrameNumbers("blue-flower-2", { start: 0, end: 59 }),
            repeat: -1
        });
        // // this.anims.create({ key: "anim-plant-1",
        // //     frameRate: 18,
        // //     frames: this.anims.generateFrameNumbers("plant-1", { start: 0, end: 89 }),
        // //     repeat: -1
        // // });
        // this.anims.create({ key: "anim-plant-2",
        //     frameRate: 20,
        //     frames: this.anims.generateFrameNumbers("plant-2", { start: 0, end: 89 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-plant-3",
        //     frameRate: 20,
        //     frames: this.anims.generateFrameNumbers("plant-3", { start: 0, end: 89 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-plant-4",
        //     frameRate: 16,
        //     frames: this.anims.generateFrameNumbers("plant-4", { start: 0, end: 59 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-plant-5",
        //     frameRate: 16,
        //     frames: this.anims.generateFrameNumbers("plant-5", { start: 0, end: 59 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-plant-6",
        //     frameRate: 16,
        //     frames: this.anims.generateFrameNumbers("plant-6", { start: 0, end: 59 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-plant-7",
        //     frameRate: 16,
        //     frames: this.anims.generateFrameNumbers("plant-7", { start: 0, end: 59 }),
        //     repeat: -1
        // });
        this.anims.create({ key: "anim-plant-jump-idle",
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("plant-jump-idle", { start: 0, end: 19 }),
            repeat: -1
        });
        this.anims.create({ key: "anim-plant-jump-elastic",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("plant-jump-elastic", { start: 0, end: 19 }),
            repeat: 0
        });
        
        this.anims.create({ key: "anim-slime-orange",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("slime-orange", { start: 0, end: 29 }),
            repeat: -1
        });

        // // Enemy
        // this.anims.create({ key: "anim-t-rex-idle",
        //     frameRate: 12,
        //     frames: this.anims.generateFrameNumbers("t-rex-idle", { start: 0, end: 11 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-t-rex-walk",
        //     frameRate: 14,
        //     frames: this.anims.generateFrameNumbers("t-rex-walk", { start: 0, end: 11 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-t-rex-attack",
        //     frameRate: 12,
        //     frames: this.anims.generateFrameNumbers("t-rex-attack", { start: 0, end: 11 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-idle",
        //     frameRate: 7,
        //     frames: this.anims.generateFrameNumbers("skeleton-idle", { start: 0, end: 6 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-attack",
        //     frameRate: 12,
        //     frames: this.anims.generateFrameNumbers("skeleton-attack", { start: 0, end: 6 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-special-attack",
        //     frameRate: 6,
        //     frames: this.anims.generateFrameNumbers("skeleton-special-attack", { start: 0, end: 10 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-walk",
        //     frameRate: 6,
        //     frames: this.anims.generateFrameNumbers("skeleton-walk", { start: 0, end: 6 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-run",
        //     frameRate: 6,
        //     frames: this.anims.generateFrameNumbers("skeleton-run", { start: 0, end: 6 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-dance",
        //     frameRate: 6,
        //     frames: this.anims.generateFrameNumbers("skeleton-dance", { start: 0, end: 9 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-skeleton-death",
        //     frameRate: 6,
        //     frames: this.anims.generateFrameNumbers("skeleton-death", { start: 0, end: 8 }),
        //     repeat: -1
        // });

        // // Spell
        // this.anims.create({ key: "anim-fireball-blue",
        //     frameRate: 30,
        //     frames: this.anims.generateFrameNumbers("fireball-blue", { start: 0, end: 35 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-fireball-blue-explode",
        //     frameRate: 15,
        //     frames: this.anims.generateFrameNumbers("fireball-blue-explode", { start: 0, end: 3 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-flame",
        //     frameRate: 18,
        //     frames: this.anims.generateFrameNumbers("flame", { start: 0, end: 7 }),
        //     repeat: -1
        // });
        // this.anims.create({ key: "anim-heal",
        //     frameRate: 15,
        //     frames: this.anims.generateFrameNumbers("heal", { start: 0, end: 14 }),
        //     repeat: 0
        // });
        this.anims.create({ key: "anim-effect-1",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("effect-1", { start: 0, end: 19 }),
            repeat: -1
        });
        // this.anims.create({ key: "anim-shield",
        //     frameRate: 15,
        //     frames: this.anims.generateFrameNumbers("shield", { start: 0, end: 14 }),
        //     repeat: 0
        // });
        // this.anims.create({ key: "anim-smoke",
        //     frameRate: 30,
        //     frames: this.anims.generateFrameNumbers("smoke", { start: 0, end: 87 }),
        //     repeat: 0
        // });
        // this.anims.create({ key: "anim-skull-smoke-green",
        //     frameRate: 30,
        //     frames: this.anims.generateFrameNumbers("skull-smoke-green", { start: 0, end: 37 }),
        //     repeat: 0
        // });
        // this.anims.create({ key: "anim-sphere-blue",
        //     frameRate: 20,
        //     frames: this.anims.generateFrameNumbers("sphere-blue", { start: 0, end: 29 }),
        //     repeat: 0
        // });
        // this.anims.create({ key: "anim-thunder",
        //     frameRate: 18,
        //     frames: this.anims.generateFrameNumbers("thunder", { start: 0, end: 7 }),
        //     repeat: -1
        // });

        this.scene.start('menu');
        // this.scene.start('level-3');
    }
}