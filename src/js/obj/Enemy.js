import Utils from "../Utils.js"
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  
  create_Anim(key,x,y,framerate){
    Utils.createAnim(this.scene, key, this.graphicName, x, y, framerate, -1);
  }
  
  createAnimFromAtlas(key,prefix,begin,numFrames,framerate){
    Utils.createAnimFromAtlas(this.scene, key, this.texture, prefix, begin, begin+numFrames, 2, framerate, -1);
  }
  
  handleMovement(){} 
    
  constructor(scene, x, y, imageSrc, frame) {
    super(scene, x, y, imageSrc, frame);
    this.scene = scene;
    this.speed = 50; // velocidad de movimiento de cada enemigo
    this.setScale(1); // escala inicial de cada enemigo
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(false); // los enemigos ss salen de los límites del mundo
  }

  create(){   
    this.scene.physics.world.enable(this);   
    this.setDepth(998); //prioridad de capa
  }
}