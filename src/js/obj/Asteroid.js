class ASteroid extends Enemy {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
      this.health = 100; // aumentamos la salud del jefe
      this.damage = 50; // daño que inflige 
      this.speed = 20; // velocidad 
      this.setScale(4); 
    }

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
  
    update() {
      // código que se ejecuta en cada fotograma del juego
      // aquí podrías poner el movimiento y la lógica específica del jefe
    }

    
  }