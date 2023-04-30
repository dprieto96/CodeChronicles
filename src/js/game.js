import LevelSelector   from './scenes/LevelSelector.js';
import MenuScene from './scenes/MenuScene.js';
import ControlsScene from './scenes/ControlsScene.js';
import HistoryScene from './scenes/HistoryScene.js';
import PauseScene from './scenes/PauseScene.js';
import ProgressScene from './scenes/ProgessScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import LoreScene from './scenes/LoreScene.js';
import ControlsScene2 from './scenes/ControlScene2.js';

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
        mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,   
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
        
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
    scene: [
        ProgressScene,
        MenuScene,
        ControlsScene,
        ControlsScene2,
        LoreScene,
        HistoryScene,
        PauseScene,
        GameOverScene,
        LevelSelector],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: false 
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