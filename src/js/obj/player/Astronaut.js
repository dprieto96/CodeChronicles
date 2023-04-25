import Player from "./Player.js";
import Utils from "../../Utils.js"
export default class Astronaut extends Player{
	createAnimations(){      
		this.create_Anim("standingRight", 0,  3,  IDLE_FRAME_RATE);
		this.create_Anim("standingLeft",  4,  7,  IDLE_FRAME_RATE);
		this.create_Anim("runningRight",  8,  11, MOVI_FRAME_RATE);
		this.create_Anim("runningLeft",  12, 15,  MOVI_FRAME_RATE);
		this.create_Anim("upRight",   	  8,  8,  1);
		this.create_Anim("upLeft",       12, 12,  1);
	}

	constructor(scene, x, y){
		super(scene, x, y, "astronaut", 0);
		this.jumpVelocity = -200;
		this.movement = "standing";
		this.isJumping = false;
		this.scene.introDone = false;

		//load of graphics:
		this.scene.load.spritesheet(this.graphicName, Utils.getImgH(this.graphicName), {
			frameWidth: SPRITE_WIDTH,
			frameHeight: SPRITE_HEIGHT
		});
	}


	handleMovement(t, dt){
		super.handleMovement();
        if(this.scene.introDone){

            if(this.y >= SCREEN_HEIGHT-35 || this.body.touching.down){
	           	this.movement = "standing";
	            this.isJumping = false;
	        }
	        else{
	        	this.movement = "up";
	        	this.isJumping = true;
	        }
            
            //velocidad vertical:
            if(this.scene.w.isDown){ 
            	if(!this.isJumping){
                	this.movement = "up";
                	this.body.velocity.y = this.jumpVelocity;
   					this.isJumping = true;
            	} 
            }
          
      

            if(this.scene.a.isDown && this.scene.d.isDown){
            	if(!this.isJumping) this.movement = "standing";
            	this.speedX = 0;
            }
			else {
            	//velocidad horizontal:
	            if(this.scene.a.isDown){
	            	if(!this.isJumping)this.movement = "running";
	                this.hDirection = "Left";
	                this.speedX = (-ASTRONAUT_SPEED );
	            }
	            else if(this.scene.d.isDown){
	            	if(!this.isJumping) this.movement = "running";
	                this.hDirection = "Right";
	                this.speedX = (ASTRONAUT_SPEED );
	            }
	            else{
	            	if(!this.isJumping) this.movement = "standing";
            		this.speedX = 0;
	            }
            }

            this.body.velocity.x = this.speedX;
            this.play(this.movement+this.hDirection,true);
        }
        else { 
			//initial running cutscene:
			this.play("runningRight",true);
			this.body.velocity.x = ASTRONAUT_SPEED - 150;
			if(this.x >= AST_INITIAL_X - 20) {
				this.scene.introDone = true;
			}
			//this.play(""+this.movement+this.hDirection,true);
		}
    }

}
