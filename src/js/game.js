import LevelSelector   from './scenes/LevelSelector.js';
import MenuScene from './scenes/MenuScene.js';
import ControlsScene from './scenes/ControlsScene.js';
import HistoryScene from './scenes/HistoryScene.js';
import PauseScene from './scenes/PauseScene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"),
    width:  SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    pixelArt: PIXELART,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: SCREEN_MIN_WIDTH,
            height: SCREEN_MIN_HEIGHT
        },
		max: {
            width: SCREEN_MAX_WIDTH,
            height: SCREEN_MAX_HEIGHT
        },
		zoom: ZOOM
    },
    scene: [MenuScene,
        ControlsScene,
        HistoryScene,
        PauseScene,
        LevelSelector],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: DEBUG 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: GAME_TITLE,
    version: GAME_VERSION,
    transparent: TRANSPARENT
};

new Phaser.Game(config);