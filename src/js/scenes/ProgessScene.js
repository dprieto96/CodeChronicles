
import Utils from "../Utils.js";
export default class ProgressScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Progress' });
    }

    preload() {
        //EJEMPLO DE CARGA
        /*
        this.load.image('fondo', 'ruta/a/la/imagen/fondo.png');
        this.load.spritesheet('jugador', 'ruta/al/spritesheet/jugador.png', { frameWidth: 32, frameHeight: 48 });
        */

        //CARGAS VERTICAL
        this.load.image('button', 'assets/img/button.png');
		this.load.audio('bgmusic', 'assets/music/bgm/bgVertical.mp3');
		this.load.atlas('verticalAtlas', Utils.getImgV("templates"), Utils.getJson("verticalLevelElements"));
        this.load.image('skip', 'assets/img/Skip.png');   

        //CARGAS MENU
        this.load.image('mute', 'assets/img/mute.png'); 
        this.load.image('sound', 'assets/img/sound.png');
        this.load.image('pc', 'assets/img/pc.png');
        this.load.image('mobile', 'assets/img/mobile.png');
        this.load.image('icon', 'assets/img/web/CodeChronicles.png');
        this.load.image('created', 'assets/img/web/Game-created-by.png');
        this.load.image('git','assets/img/git.png');
        this.load.image('cover','assets/img/buttonHover.png');
        this.load.image('screen','assets/img/screen.png');

        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('Xote', 'assets/img/Xote.png');
        this.load.image('book', 'assets/img/book.gif');

        this.load.spritesheet("spaceship",Utils.getImgV("spaceship"), {frameWidth: SPACESHIP_WIDTH, frameHeight: SPACESHIP_HEIGHT});

        this.load.image('bg', 'assets/img/button.png');
        this.load.image('home', 'assets/img/home.png');
        this.load.image('reload', 'assets/img/reload.png');
		
        /*this.scene.load.spritesheet(this.graphicName, Utils.getImgH(this.graphicName), {
			frameWidth: SPRITE_WIDTH,
			frameHeight: SPRITE_HEIGHTsss
		});

        /*this.planetImg = this.scene.add.image(0, VERTICAL_LEVELS_HEIGHT, this.scene.planet).setOrigin(0, 1);
        this.planetImg.setDepth(2);
        */

        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('book', 'assets/img/book.gif');
        this.load.image('controls', 'assets/img/controls.png');
        this.load.image('arrow', 'assets/img/arrow.png');

        this.load.image('pause', 'assets/img/pause.png');


        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 320, 50);
        
        // Registra un evento de actualización de carga
        this.load.on('progress', this.actualizarBarraDeProgreso, this);
        this.load.audio('shoot', 'assets/music/bgm/shoot.mp3');
   
    }

    actualizarBarraDeProgreso(valor) {
        // Actualiza la barra de progreso
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(250, 280, 300 * valor, 30);
    }   

    create() {
        // Se ejecuta después de cargar los recursos
        // Inicia la escena principal del juego        
        this.scene.start('menuScene');
    }
}
