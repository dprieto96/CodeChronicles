/*
    <script src="lib/js/Utils.js"></script>
    <script src="lib/js/Player.js"></script>
    <script src='lib/js/main.js'></script>
    <link rel="stylesheet" href="lib/css/main.css">
    <div class="NPC" id="player"></div>
*/

//no tocar partir de este punto: =======================
//HORIZONTAL LEVELS: -----------------------------------
const IDLE    = 0;
const MOVING  = 1;
const JUMPING = 2;
const RIGHT   = 0;
const LEFT    = 1;
//======================================================

class Player {
  constructor(x, y, imageSrc) {
    this.x = x; // posición en el eje X
    this.y = y; // posición en el eje Y
    this.imgName = imageSrc; // imagen asociada al jugador
    
    this.myImg = document.createElement("img");
    //this.myImg.setAttribute("src",getImg(this.imgName));
    this.myImg.style.position = "absolute"; // establece posición absoluta
    this.myImg.style["border-style"] = "none";
    document.getElementById("player").append(this.myImg);

    this.setSpritePosition(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

    // inicializa el buffer de entrada
    this.inputBuffer    = "";    
    this.state          = IDLE;
    this.facing         = RIGHT;
    this.onAir          = false;  //whether the player is currently jumping or not
    this.ySpeed         = 0;      //used for jumps
    this.airTime        = 0;      //used to track the time during a jump or free fall
    this.spriteCounter  = 0;      //used to know how to update the sprite animations
  }

  setState(newState){ this.state = newState; }

  // método para recortar la hoja de sprites y mostrar solo una zona de la misma
  setSpritePosition(spriteX, spriteY, spriteWidth, spriteHeight) {
    this.myImg.style.backgroundImage    = `url(${getImg(this.imgName)})`;
    this.myImg.style.backgroundPosition = `-${spriteX}px -${spriteY}px`;
    this.myImg.style.width              = `${spriteWidth}px`;
    this.myImg.style.height             = `${spriteHeight}px`;
  }

  // método para actualizar la posición del jugador en pantalla
  updatePosition() {
    this.myImg.style.left = this.x + "px";
    this.myImg.style.top  = this.y + "px";
  }

  // método para mover el jugador hacia la izquierda
  moveLeft() {
    this.inputBuffer = "left";
    this.facing = LEFT;
  }

  // método para mover el jugador hacia la derecha
  moveRight() {
    this.inputBuffer = "right"; 
    this.facing = RIGHT;
  }

  // método para hacer saltar al jugador
  jump() { if(!this.onAir) { this.inputBuffer = "jump"; } }

  update(time){
    this.updateMovement(time);
    this.updateSprite(time);
  }

  // método para actualizar la posición del jugador basado en el buffer de entrada
  updateMovement(time) {
    if(this.onAir){
      //aplicar parábola
      this.y = FLOORHEIGHT + (this.ySpeed*this.airTime - (GRAVITY*this.airTime*this.airTime)/2) * (-1);
      if(this.y > FLOORHEIGHT){
        //SI TOCA EL SUELO:
        this.onAir   = false;
        this.y       = FLOORHEIGHT;
        this.ySpeed  = 0;
      }
      else{
        this.ySpeed  = JUMPFORCE - GRAVITY*this.airTime;
      }
      this.airTime++;
    }

    // comprueba si hay alguna entrada en el buffer
    if (this.inputBuffer.length > 0) {
      if (this.inputBuffer == "jump"){
        this.airTime  = 0;
        this.onAir    = true;
        this.ySpeed   = JUMPFORCE;
      }
      else{
        switch (this.inputBuffer) {
          case "left":
            this.x -= SPEED;
            break;
          case "right":
            this.x += SPEED;
            break;
        }
      }
    }
    
    //actualiza el estado:
    if(this.onAir)                        { this.state = JUMPING; }
    else if (this.inputBuffer.length > 0) { this.state = MOVING;  }
    else                                  { this.state = IDLE;    }

    // actualiza la posición del jugador en pantalla
    this.updatePosition();
    this.inputBuffer = "";
  }

  updateSprite(time){
    if (this.state == JUMPING){
      this.setSpritePosition(0, (2 + this.facing)*SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
    else{
      this.setSpritePosition((this.spriteCounter%4)*SPRITE_WIDTH, (this.state*2 + this.facing)*SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT);
      let updater = this.state == MOVING ? MOVI_FRAME_RATE : IDLE_FRAME_RATE;
      if(time % updater == 0){ this.spriteCounter++; }
    }
  }
}