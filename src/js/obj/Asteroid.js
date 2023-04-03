import Utils from "../Utils.js"
import Enemy from "./Enemy.js"
export default class Asteroid extends Enemy {
  constructor(scene, x, y, texture, vector) {
    super(scene, x, y, "verticalAtlas", texture);
    this.texture = texture;
    this.vector  = vector;
    this.health  = 100; // aumentamos la salud del jefe
    this.damage  = 50; // daño que inflige 
    this.speed   = 20; // velocidad 
  }

    /*
    constructor(scene, x, y){
      super(scene, x, y,"spaceship", 1);
      
      //load of graphics:
      this.scene.load.spritesheet(this.graphicName,Utils.getImgV(this.graphicName), {
          frameWidth: SPACESHIP_WIDTH,
          frameHeight: SPACESHIP_HEIGHT
      });
    }
    
    
    spawnEnemy() {
      const x = Phaser.Math.Between(0, game.config.width);
      const y = Phaser.Math.Between(0, game.config.height);
      const enemy = new Enemy(this, x, y, 'enemyTexture');
    }
  */

  create(){
    super.create();    
    this.body.allowRotation = true;
    this.setVelocity(this.vector[0], this.vector[1]);
    this.setAngularVelocity(this.vector[2]);
  }

  update() {
    //this.rotation += this.vector[2];
    // código que se ejecuta en cada fotograma del juego
    // aquí podrías poner el movimiento y la lógica específica del jefe
  }

}