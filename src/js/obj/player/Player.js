import Utils from "../../Utils.js"
export default class Player extends Phaser.Physics.Arcade.Sprite {
  create_Anim(key,x,y,framerate){
    Utils.createAnim(this.scene, key, this.graphicName, x, y, framerate, -1);
  }

  createAnimations(){}
  handleMovement(){}

  constructor(scene, x, y, imageSrc, initFrame) {
    super(scene, x, y, "astronaut");
    this.graphicName = imageSrc;
    this.initFrame = initFrame;
    this.speedX = 0;
    this.speedY = 0;

    this.vDirection = "NE";
    this.hDirection = "Right";
    
    this.scene.add.existing(this);
  }

  create(){
    this.setTexture(this.graphicName);
    this.setFrame(this.initFrame);    
    this.createAnimations();
    this.scene.physics.add.existing(this);
    this.scene.physics.world.enable(this);   
    this.setDepth(999); //prioridad de capa
    this.setCollideWorldBounds(true);
    //this.body.setCircle(20,20,20);
  }
}