import Player from "./Player.js";
export default class Astronaut extends Player{
	createAnimations(){      
		this.create_Anim("standingRight", 0,  3,  IDLE_FRAME_RATE);
		this.create_Anim("standingLeft",  4,  7,  IDLE_FRAME_RATE);
		this.create_Anim("upRight",   	 8,  8,  1);
		this.create_Anim("upLeft",       12, 12,  1);
		this.create_Anim("runningRight",  8,  11, MOVI_FRAME_RATE);
		this.create_Anim("runningLeft",   12, 15, MOVI_FRAME_RATE);
	}

	constructor(scene, x, y){
		super(scene, x, y, "astronaut", 0);
		this.jump 	  = 300;
		this.movement = "standing"

		//load of graphics:
		this.scene.load.spritesheet(this.graphicName, getImgH(this.graphicName), {
			frameWidth: SPRITE_WIDTH,
			frameHeight: SPRITE_HEIGHT
		});
	}


	handleMovement(t, dt){
		super.handleMovement();
        if(this.scene.introDone){
            
            //velocidad vertical:
            if(this.scene.w.isDown){ 
                this.movement = "up";
                this.speedY -= SPACESHIP_SPEED;
            }
            else            {
            	this.movement = "standing";
            	this.speedY = 0;
            }
            
            if(this.scene.a.isDown && this.scene.d.isDown){
            	this.movement = "standing";
            	this.speedX = 0;
            }
			else {
            	//velocidad horizontal:
	            if(this.scene.a.isDown){
	            	this.movement = "running";
	                this.hDirection = "Left";
	                this.speedX -= SPACESHIP_SPEED;
	            }
	            else if(this.scene.d.isDown){
	            	this.movement = "running";
	                this.hDirection = "Right";
	                this.speedX += SPACESHIP_SPEED;
	            }
	            else{
	            	this.movement = "standing";
            		this.speedX = 0;
	            }

	            //si toca suelo:
	            //this.movement = "standing"
            }

            this.x += this.speedX;
            this.y += this.speedY;
            this.play(this.movement+this.hDirection,true);
        }
        else { 
			//initial running cutscene:
			this.scene.player.play("runningRight",true);
			//this.play(""+this.movement+this.hDirection,true);
		}
    }

}
