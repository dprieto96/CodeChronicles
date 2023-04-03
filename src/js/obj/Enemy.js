import Utils from "../../Utils.js"
export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  create_Anim(key,x,y,framerate){
    Utils.createAnim(this.scene, key, this.graphicName, x, y, framerate, -1);
  }

  handleMovement(){}
   
    
    constructor(scene, x, y, imageSrc, initFrame) {
    super(scene, x, y, "astronaut");
    this.scene = scene;
    this.speed = 50; // velocidad de movimiento de cada enemigo
    this.setScale(2); // escala inicial de cada enemigo
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(false); // los enemigos no salen de los límites del mundo
    this.setGravityY(1000); // gravedad que afecta a cada enemigo
   

}

  create(){
    this.setTexture(this.graphicName);
    this.setFrame(this.initFrame);    
    this.scene.physics.add.existing(this);
    this.scene.physics.world.enable(this);   
    this.setDepth(999); //prioridad de capa
    this.setCollideWorldBounds(false);
    console.log("HOLA");

  }
}