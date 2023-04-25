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
			x: 200,
			y: SCREEN_HEIGHT-200,
			radius: 50,
			base: this.add.circle(0, 0, 25, 0x888888),
			thumb: this.add.circle(0, 0, 12, 0xcccccc),
	  	});
		
		this.joystickCursors = this.joyStick.createCursorKeys();
	 	this.jostickmovement='null';

	 	this.joyStick.setScrollFactor(0);
	 	this.joyStick.base.setDepth(999);
	 	this.joyStick.thumb.setDepth(999);

	 	
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
		this.cameras.main.setZoom(3);
  		this.cameras.main.startFollow(this.player, true,true);
  		//this.cameras.main.setDeadzone(SCREEN_WIDTH/2 - 400, SCREEN_HEIGHT/2+400 ,150, 300);

  		this.pauseButton = this.add.image(0,0,'button').setInteractive();
		this.pauseButton.setDepth(999);
		this.pauseButton.setScale(0.1);
		//this.buttonSTART.setInteractive();
		this.pauseButton.inputEnabled = true;
		this.gameState = 'running';

		this.pauseButton.on('pointerup', function () {
				//this.musicBG.pause();
				this.scene.pause(this.key);
				this.scene.launch('PauseScene',{clave:this.clave});				
				this.gameState = 'paused';
			  }, this);

		this.pauseButton.setScrollFactor(0);
		this.pauseButton.setPosition(SCREEN_WIDTH - 200, SCREEN_HEIGHT/2  - 220);

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
		//console.log(this.player.anims.currentAnim);


		//this.player.anims.currentAnim.setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("standingLeft").setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningRight").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningLeft").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		if(this.gameState==='paused')this.musicBG.resume();
		console.log('ESTADO: '+this.gameState);

		this.player.handleMovement(); 
		if(!this.introDone){ 	
			this.bg.launch();
			this.joyStick.setVisible(false);
			this.pauseButton.setVisible(false);
			this.cameras.main.zoomTo(1.5, 2500);
		}
		else{
		
			this.pauseButton.setVisible(true);
			this.joyStick.setVisible(true);
		}
		

	}

	victoryCondition(){}
}
