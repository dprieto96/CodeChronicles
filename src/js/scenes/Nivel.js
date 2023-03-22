/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

export default class Nivel extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(key, planet, ctrl) {
		super({ key: key });
		this.introDone 	= false;
		this.planet 	= planet;
		this.ctrl		= ctrl;
		this.key = key;
	}
	
	/**
	 * Cargamos todos los assets que vamos a necesitar
	*/
	preload(){
		//this.load.image('background', getImg("universeBg"));
		this.load.spritesheet("spaceship",getImgV("spaceship"), {frameWidth: SPACESHIP_WIDTH, frameHeight: SPACESHIP_HEIGHT});
		this.load.json("config",getJson('planetsSettings'));
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//this.setCollideWorldBounds(true);
		this.planetSettings = this.cache.json.get("config");

        this.a  = this.input.keyboard.addKey("A");
		this.s  = this.input.keyboard.addKey("S");
		this.d  = this.input.keyboard.addKey("D");
		this.w  = this.input.keyboard.addKey("W");
		this.sp = this.input.keyboard.addKey("space");

        /*
		//Pintamos un botón de Empezar
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer    => { console.log("pulsando"); });
	    sprite.on('pointerup', pointer      => { this.scene.start('animation'); /*Cambiamos a la escena de juego });
		sprite.on('pointerover', ()         => { console.log("hola") });
	    sprite.on('pointerout', ()          => { console.log("adios") });

		//textos:
		text = this.add.text(x,y,message);
		text.setFont("Times New Roman");
		text.setFontSize(50);
		text.setStroke(20); //borde
		text.setStroke(hexColor,size); //color borde
		text.setFill(hexcolor);
		text.setShadow(posX,posY,hexcolor,alpha);

		//importante:
		text.setScrollFactor(0,0);

		//camara:
		//...

		//bitmapTexts:
		scene.load.bitmapFont("imgKey","path/to/img.png","path/to/xml");
		this.add.bitmapText(x,y,fontName,message,size);

		//external fonts:
		this.load.script()
        */
	}

	/**
	* Loop del juego
	*/
    update(){ 
		super.update();
	
		//cerrar escena:
		if(this.sp.isDown){
			this.ctrl.startNextLevel(this);			
		}
	}
}