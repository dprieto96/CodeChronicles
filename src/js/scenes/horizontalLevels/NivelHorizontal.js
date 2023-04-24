/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import Astronaut from '../../obj/player/Astronaut.js';
import HorizontalBackground from './HorizontalBackground.js';
export default class NivelHorizontal extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(ctrl) {
		super("nivelHorizontal"+Utils.digitsToStr(ctrl.getCurrentHId(),2),ctrl);
		this.introDone 	= false;
	}

	continuar(){
		this.resume();
	}

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
   	    this.load.plugin('rexvirtualjoystickplugin', url, true);

   	    this.load.image('button', 'assets/img/button.png');

		this.planet = this.st["planet"];
		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,0,720);

		this.gameState='running';
	}
	
	continuar(){
		this.resume();
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
			x: 155,
			y: SCREEN_HEIGHT-155,
			radius: 100,
			base: this.add.circle(0, 0, 50, 0x888888),
			thumb: this.add.circle(0, 0, 25, 0xcccccc),
	  	});

	 	
		this.physics.world.gravity.y = GRAVITY_FACTOR * this.planetSettings["gravity"] ;
		this.player.create();
		this.bg.create();
		var platGroup = this.physics.add.staticGroup();
		var posx = 10;

		// Bucle que itera en el json para colocar las plataformas en su sitio
		for(var i = 0; i < 12; i++ )
		{
			platGroup.create(posx, 790, 'platform');
			posx += 85;
			
		}

		platGroup.children.iterate(function(plat) {
    		plat.body.immovable = true;
		});
		platGroup.enableBody = true;
		platGroup.setDepth(999); 
		this.physics.add.collider(this.player,platGroup);

		this.physics.world.setBounds(0, 0, 8000, 800);


		this.cameras.main.setBounds(0, 0, 8000, 800);
		this.cameras.main.setZoom(1.5);
  		this.cameras.main.startFollow(this.player, true,true);
  		//this.cameras.main.setDeadzone(SCREEN_WIDTH/2 - 400, SCREEN_HEIGHT/2+400 ,150, 300);

  		this.pauseButton = this.add.image(0,0,'button').setInteractive();
			this.pauseButton.setDepth(999);
			this.pauseButton.setScale(0.1);
			//this.buttonSTART.setInteractive();
			this.pauseButton.inputEnabled = true;
			this.gameState = 'running';
    
			
			// agrega un evento al botón para cambiar el estado del juego
			this.pauseButton.on('pointerdown', function () {
				//this.musicBG.pause();
				this.scene.pause(this.key);
				this.scene.launch('PauseScene',{clave:this.clave});				
				this.gameState = 'paused';
			  }, this);


			// Crear el contenedor de la cámara y agregar el botón al contenedor
		var cameraContainer = this.add.container(0, 0, [ this.pauseButton ]);
		var joyStickContainer = this.add.container(this.joyStick.x, this.joyStick.y, [ this.joyStick.base, this.joyStick.thumb ]);

		// Fijar el scrollFactor del contenedor a cero para que se fije a la posición de la cámara
		cameraContainer.scrollFactorX = 0;
		cameraContainer.scrollFactorY = 0;

		joyStickContainer.scrollFactorX = 0;
		joyStickContainer.scrollFactorY = 0;

		this.joystickCursors = this.joyStick.createCursorKeys();
	 	this.jostickmovement='null';


		// Establecer la posición del botón en el centro de la cámara
		this.pauseButton.setPosition(this.cameras.main.width*3/4, this.pauseButton.height / 2 - 30);
		this.joyStick.setPosition(this.cameras.main.width/2, this.joyStick.height / 2 );
		cameraContainer.setDepth(999);
	}

	jostickMovement(){

		if (this.joystickCursors.up.isDown){
			this.jostickmovement='UP';

		}

		if (this.joystickCursors.down.isDown){
			this.jostickmovement='DOWN';
			
		}

		if (this.joystickCursors.left.isDown){
			this.jostickmovement='LEFT';
		}

		if (this.joystickCursors.right.isDown){
			this.jostickmovement='RIGHT';
			
		}

		console.log('EL JOSCTICK ES: '+this.jostickmovement);
		this.player.jostickMovement(this.jostickmovement);
		this.jostickmovement='null';

	}
	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		
		if(this.gameState==='paused')this.musicBG.resume();
		console.log('ESTADO: '+this.gameState);

		if(!this.introDone){ this.bg.launch(); }
		this.player.handleMovement();
	}

	victoryCondition(){}
}
