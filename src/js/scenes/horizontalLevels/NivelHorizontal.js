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
	constructor(ctrl,secondRound) {
		super("nivelHorizontal"+Utils.digitsToStr(ctrl.getCurrentHId(),2),ctrl);
		this.introDone 	= false;
		this.secondRound = secondRound;
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


   	    this.load.image('jumpscare', 'assets/img/horizontalLevels/jumpscare.png')
   	    this.load.image('pause', 'assets/img/pause.png');
   	    this.load.image('door', 'assets/img/horizontalLevels/gate.png');
		this.load.audio('bgH', 'assets/music/bgm/bgHorizontal.mp3');
		this.load.audio('jsSound', 'assets/music/bgm/jumpScare.mp3');

		this.bgST = this.st;
		this.planet = this.st["planet"];
		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,0,this.st["initPos"]);

		this.gameState='running';
		this.numeroAleatorio = 0;

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		this.cursors = this.input.keyboard.createCursorKeys();

		if(Utils.getSecondRound()) 
			{
				this.timer = this.st["timer2"];
				this.numeroAleatorio = Phaser.Math.Between(600, this.st["timer2"] + 1200);
				this.scare = this.add.image(0,0,'jumpscare');
				this.scare.setVisible(false);
				this.scare.setScrollFactor(0);
				this.scare.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
				this.scare.setDepth(1000);
				this.scare.setScale(0.6);
				this.scareSound = this.sound.add('jsSound');
				if(this.planet == "MOON")
				{
					this.theEND = new Astronaut(this,1690,1700);
					this.theEND.play("standingLeft", true);
					this.theEND.setDepth(999);
					this.theEND.setScale(2.5);
				}
			}
		else this.timer = this.st["timer"];

		this.game.sound.stopAll();
		this.musicBGH=this.sound.add('bgH');


		this.textoContador = this.add.text(10, 10, '00:00', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

		this.scene.bringToTop('PauseScene');
		//this.scene.moveBelow(this.key,'gameOverScene');TODAVIA NO IMPLEMENTADO

		if (Utils.isMobile()){
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
	}		

		var door = this.add.sprite(this.st["door"]["x"], this.st["door"]["y"], 'door');
	 	door.setDepth(998);
		this.physics.world.gravity.y = GRAVITY_FACTOR * this.planetSettings["gravity"] ;
		this.player.create();
		this.bg.create();
		var platGroup = this.physics.add.staticGroup();
		var stConfig = this.st["decorations"];
		var st = this.st["decorations"]["platform"];
		let posx = 10;
		let j = 0;
		let encontrado = false;

		// Plataformas del suelo
		for(let i = 0; i < stConfig["floor"]["nPlats"]; i++)
		{

			while(j < stConfig["holes"].length && !encontrado)
			{
				if(stConfig["holes"][j]["n"] == i) encontrado = true;
				j++;
			}
			if(!encontrado) platGroup.create(posx, stConfig["floor"]["posy"], 'platform');
			encontrado = false;
			posx += 87;
			j = 0;
		}
		
		// Plataformas del mapa
		for(let i = 0; i < st.length; i++ )
		{
			let obj = st[i];
			platGroup.create(obj["x"], obj["y"], 'platform');
		}

		platGroup.children.iterate(function(plat) {
    		plat.body.immovable = true;
		});
		platGroup.enableBody = true;
		platGroup.setDepth(998); 
		this.physics.add.collider(this.player,platGroup);

		this.physics.world.setBounds(0, 0, this.st["bounds"]["x"], this.st["bounds"]["y"]);
		this.cameras.main.setBounds(0, 0, this.st["bounds"]["x"], this.st["bounds"]["y"]);
		this.cameras.main.setZoom(3);
  		this.cameras.main.startFollow(this.player, true,true);
  		//this.cameras.main.setDeadzone(SCREEN_WIDTH/2 - 400, SCREEN_HEIGHT/2+400 ,150, 300);

  		this.pauseButton = this.add.image(0,0,'pause').setInteractive();
		this.pauseButton.setDepth(999);
		this.pauseButton.setScale(0.1);
		//this.buttonSTART.setInteractive();
		this.pauseButton.inputEnabled = true;
		this.gameState = 'running';


		if(!Utils.isMute())this.musicBGH.play();
		this.pauseButton.on('pointerup', function () {
				//this.musicBG.pause();
				if(!Utils.isMute()){
					this.musicBGH.pause();
				}
				this.scene.pause(this.key);
				this.scene.launch('PauseScene',{clave:this.key});				
				this.gameState = 'paused';
				
			  }, this);

		this.pauseButton.setScrollFactor(0);
		this.pauseButton.setPosition(SCREEN_WIDTH - 200, SCREEN_HEIGHT/2  - 220);

		this.textoContador.setDepth(999);
		this.textoContador.setScrollFactor(0);
		this.textoContador.setPosition(150, SCREEN_HEIGHT/2  - 220);


	}

	pad(number, length) {
	    var str = "" + number;
	    while (str.length < length) {
	        str = "0" + str;
	    }
	    return str;
	}

	jostickMovement(){
		this.jostickmovement='null';

		if (Utils.isMobile()){
			if (this.joystickCursors.up.isDown){
				this.jostickmovement='UP';

			}

			else if (this.joystickCursors.down.isDown){
				this.jostickmovement='DOWN';
				
			}

			else if (this.joystickCursors.left.isDown){
				this.jostickmovement='LEFT';
			}

			else if (this.joystickCursors.right.isDown){
				this.jostickmovement='RIGHT';
				
			}

			else this.jostickmovement='null';
		}

		//console.log('EL JOSCTICK ES: '+this.jostickmovement);
		//this.player.jostickMovement(this.jostickmovement);
		//this.jostickmovement='null';
		return this.jostickmovement;

	}
	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		//console.log(this.player.anims.currentAnim);
		//console.log('MUTE ES: '+Utils.isMute());
		//if(!Utils.isMute())this.musicBGH.play();
		
		if(this.gameState==='paused' && !Utils.isMute()) {
			this.musicBGH.resume();
		}

		this.timer--;

		if(Utils.getSecondRound())
		{
			if(this.timer == this.numeroAleatorio){
				this.scare.setVisible(true);
				this.scareSound.play();
			}
			if(this.numeroAleatorio - 60 == this.timer) 
			{
				this.scare.setVisible(false);
				this.scareSound.pause();
			}
		}

		
		//this.player.anims.currentAnim.setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("standingLeft").setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningRight").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningLeft").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		//if(this.gameState==='paused')this.musicBG.resume();
		//console.log('ESTADO: '+this.gameState);
		if(this.planet == "VENUS") this.player.venus = true;
		this.player.handleMovement(this.jostickMovement()); 

		if(this.st["bounds"]["y"]-28 < this.player.y)
		{
			this.scene.restart();
		}

		if(!this.introDone){ 	
			this.bg.launch();
			//this.joyStick.setVisible(false);
			this.pauseButton.setVisible(false);
			this.cameras.main.zoomTo(1.5, 2500);
		}
		else{
		
			this.pauseButton.setVisible(true);
			//this.joyStick.setVisible(true);
			//this.jostickMovement();
			//if(!Utils.isMute())this.musicBGH.resume();
		}

		if(this.checkEndOfGame())
		{
			this.cameras.main.zoomTo(2.5, 2500);
			this.finishLevel();
		}

		var minutos = this.pad(Math.floor(this.timer / 3600),2);
    	var segundos = this.pad(Math.floor((this.timer % 3600) / 60),2);
    
		this.textoContador.setText(minutos + ':' + segundos);

		if(this.timer <= 0) this.scene.restart();

	}

	victoryCondition(){ return (this.player.x > this.st["door"]["x"] - 50 && this.player.x < this.st["door"]["x"] + 50) && (this.player.y > this.st["door"]["y"]-50 && this.player.y < this.st["door"]["y"] + 50);}
}
