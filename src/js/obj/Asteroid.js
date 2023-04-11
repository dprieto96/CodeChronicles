import Enemy from "./Enemy.js"
import Utils from "../Utils.js"
export default class Asteroid extends Enemy {
  constructor(scene, x, y, texture, vector) {
    super(scene, x, y, "verticalAtlas", texture);
    //this.spriteBounds = sprite.getBounds();
    this.texture = texture;
    this.vector  = vector;
    this.health  = 100; // aumentamos la salud del jefe
    this.damage  = 50; // daño que inflige 
    this.speed   = 20; // velocidad 
  }

  create(){
    super.create();  
      
    this.body.allowRotation = true;
    this.setVelocity(this.vector[0], this.vector[1]);
    this.setAngularVelocity(this.vector[2]);
    this.body.setCircle(undefined);
    //this.setActive(true)
    //this.setVisible(true)
    //his.setDepth(2);

    Utils.createAnimFromAtlas(this, "boomBeach", "verticalAtlas", "boom", 8, 2, 20, 0);

    this.on('animationcomplete-boomBeach', () => {
      this.destroy(); 
    }, this.scene);
  }

  update() {
    // aquí podrías poner el movimiento y la lógica específica del jefe
  }
}