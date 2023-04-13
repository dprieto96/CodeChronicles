//export default class Spaceship extends Phaser.GameObjects.Sprite{
import Player from "./Player.js";
import Utils from "../../Utils.js"
export default class Spaceship extends Player{
    createAnimations(){      
        this.create_Anim("NE",        1,  1, SPACESHIP_IDLE_FR);
        this.create_Anim("leftNE",    0,  0, SPACESHIP_IDLE_FR);
        this.create_Anim("rightNE",   3,  3, SPACESHIP_IDLE_FR);
        this.create_Anim("UP",        4,  5, SPACESHIP_MOVI_FR);
        this.create_Anim("DOWN",      6,  7, SPACESHIP_MOVI_FR);
        this.create_Anim("leftUP",    8,  9, SPACESHIP_MOVI_FR);
        this.create_Anim("rightUP",  10, 11, SPACESHIP_MOVI_FR);
        this.create_Anim("leftDOWN", 12, 13, SPACESHIP_MOVI_FR);
        this.create_Anim("rightDOWN",14, 15, SPACESHIP_MOVI_FR); 
    }

    constructor(scene, x, y){
        super(scene, x, y,"spaceship", 1);
        
        //load of graphics:
        this.scene.load.spritesheet(this.graphicName,Utils.getImgV(this.graphicName), {
            frameWidth: SPACESHIP_WIDTH,
            frameHeight: SPACESHIP_HEIGHT
        });
    }


/*
//var bg_1 = this.add.tileSprite(0,0,this.sys.game.canvas,width,this.sys.game.height,"spriteFileName"); //para crear un fondo "tileado"
var map = this.make.tilemap({key: "map"});
var tiles = map.addTilesetImage("plataformas","tiles");
var fondo = map.createLayer("fondo",tiles,0,0);
var layer = map.createLayer("layer",tiles,0,0); //suelo
layer.setCollisionByExclusion(-1,true);
this.player = new(Player(this,50, 100);
this.physics.collide(this.player,layer);
this.physics.add.collider(this.player,layer);
*/

    
    
    handleMovement(t, dt){
        super.handleMovement();
        this.vDirection = "NE";
        
        let centerX = this.displayWidth  / 2;
        let centerY = this.displayHeight / 2;

        //velocidad vertical:
        if(this.scene.w.isDown){ 
            this.vDirection = "UP";
            this.speedY -= SPACESHIP_SPEED;

            //if(this.y - centerY <= Math.abs(this.speedY)) { this.speedY = 0; }
        }
        else if(this.scene.s.isDown){
            this.vDirection = "DOWN";
            this.speedY += SPACESHIP_SPEED;

            let btmLimit = VERTICAL_LEVELS_HEIGHT - centerY;
            //if(this.y + centerY + this.speedY >= btmLimit) { this.speedY = 0; }
        }
            
        //velocidad horizontal:
        if(this.scene.a.isDown){
            this.hDirection = "left";
            this.speedX -= SPACESHIP_SPEED;

            //if(this.x - centerX <= Math.abs(this.speedX)) { this.speedX = 0; }
        }
        else if(this.scene.d.isDown){
            this.hDirection = "right";
            this.speedX += SPACESHIP_SPEED;
            let rightLimit = VERTICAL_LEVELS_WIDTH - centerX;
            //if(this.x + centerX + this.speedX >= rightLimit) { this.speedX = 0; }
        }
        else{ this.hDirection = ""; }

        this.setVelocity(this.speedX,this.speedY);
        //this.y += this.speedY;
        this.play(this.hDirection+this.vDirection,true);
    }
}