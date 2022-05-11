import Phaser from './lib/phaser.js';

import Preload from './scenes/Preload.js';
import Menu from './scenes/Menu.js';
import LevelSelect from './scenes/LevelSelect.js';
import Guide from './scenes/Guide.js';
import Level1 from './scenes/Level1.js';
import Pause from './scenes/Pause.js';
import About from './scenes/About.js';
import GameOver from './scenes/GameOver.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#5fdeb6',
    scene: [
        Preload,
        Menu,
        LevelSelect,
        Guide,
        About,
        Level1,
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