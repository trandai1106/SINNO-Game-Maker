import Phaser from './lib/phaser.js';

import Preload from './scenes/Preload.js';
import Menu from './scenes/Menu.js';
import LevelSelect from './scenes/LevelSelect.js';
import Level01 from './scenes/Level-01.js';
import Pause from './scenes/Pause.js';
import About from './scenes/About.js';
import GameOver from './scenes/GameOver.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 580,
    backgroundColor: '#5fdeb6',
    scene: [
        Preload,
        Menu,
        LevelSelect,
        About,
        Level01,
        Pause,
        GameOver
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
});