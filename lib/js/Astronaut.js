export default class Astronaut extends Phaser.Physics.Arcade.Sprite{
	create_Anim(key,x,y,framerate){
        createAnim(this.scene, key, 'astronaut', x, y, framerate, -1);
    }
	constructor(scene, x, y){
		super(scene, x, y, "astronaut");
		this.scene.add.existing(this);
		this.jump = 300;
		this.direction = "Right";
		this.movement = "standing"
		this.scene.add.existing(this);

		//load of graphics:
		this.scene.load.spritesheet("astronaut", getImgH("astronaut.png"), {frameWidth: SPRITE_WIDTH, frameHeight: SPRITE_HEIGHT});
	}

	create()
	{
		this.setTexture("astronaut");
		this.setFrame(0);

		//creating animations:        
        this.create_Anim("standingRight",     	0,  3,  IDLE_FRAME_RATE);
        this.create_Anim("standingLeft",    	4,  7,  IDLE_FRAME_RATE);
        this.create_Anim("upRight",   			8,  8,  1);
        this.create_Anim("upLeft",        		12, 12, 1);
        this.create_Anim("runningRight",      	8,  11, MOVI_FRAME_RATE);
        this.create_Anim("runningLeft",    		12, 15, MOVI_FRAME_RATE);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth(999);

        this.setCollideWorldBounds(true);

	}

	handleMovement(t, dt){
        if(this.scene.introDone){
            
            //velocidad vertical:
            if(this.scene.w.isDown){ 
                this.movement = "up";
                this.speedY -= SPACESHIP_SPEED;
            }
            else
            {
            	this.movement = "standing";
            	this.speedY = 0;
            }
            
            if(this.scene.a.isDown && this.scene.d.isDown)
            {
            	this.movement = "standing";
            	this.speedX = 0;
            }else
            {
            	//velocidad horizontal:
	            if(this.scene.a.isDown){
	            	this.movement = "running";
	                this.direction = "Left";
	                this.speedX -= SPACESHIP_SPEED;
	            }
	            else if(this.scene.d.isDown){
	            	this.movement = "running";
	                this.direction = "Right";
	                this.speedX += SPACESHIP_SPEED;
	            }
	            else
	            {
	            	this.movement = "standing";
            		this.speedX = 0;
	            }

	            //si toca suelo:
	            //this.movement = "standing"
            }

            this.x += this.speedX;
            this.y += this.speedY;
            this.play(this.movement+this.direction,true);
        }
        else { this.play(""+this.movement+this.direction,true); }
    }

	preUpdate(t, dt)
	{
		super.preUpdate(t, dt);
		//handleMovement(t, dt);
	}

}