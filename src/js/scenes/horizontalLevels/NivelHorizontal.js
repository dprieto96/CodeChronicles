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

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		this.planet = this.st["planet"];
		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,0,320);
	}
	
	continuar(){
		this.resume();
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		this.physics.world.gravity.y = GRAVITY_FACTOR * this.planetSettings["gravity"] ;
		this.player.create();
		this.bg.create();
		var platGroup = this.physics.add.staticGroup();
		var posx = 10;


		for(var i = 0; i < 12; i++ )
		{
			platGroup.create(posx, 800, 'platform');
			posx += 85;
			
		}

		platGroup.create(50, 100, 'platform');

		platGroup.children.iterate(function(plat) {
    		plat.body.immovable = true;
		});
		platGroup.enableBody = true;
		platGroup.setDepth(999); 
		this.physics.add.collider(this.player,platGroup);


		this.cameras.main.setBounds(0, 0, 8000, 8000);
		this.cameras.main.setZoom(1.5);
  		this.cameras.main.startFollow(this.player, true,true);
  		this.cameras.main.setDeadzone(SCREEN_WIDTH/2 - 400, SCREEN_HEIGHT/2+20 ,150, 300);

	}

	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		
		if(!this.introDone){ this.bg.launch(); }
		this.player.handleMovement();
	}

	victoryCondition(){}
}
