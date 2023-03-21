export default class HorizontalBackground extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, 0, 0);
        this.scene = scene;
        this.auxSpeed = 0;
        this.framesToReachSpace = 300;

        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet, getImgV(this.scene.planet));
    }

    create(){
        this.graphics = this.scene.add.graphics();
        let st = this.scene.planetSettings[this.scene.planet];
		this.graphics.fillStyle(st["atmosColor"], 1);
		this.atmosphere = this.graphics.fillRect(0, 0, VERTICAL_LEVELS_WIDTH, VERTICAL_LEVELS_HEIGHT);
        this.atmosphere.alpha = st["transparency"];
        this.planetImg = this.scene.add.image(0, VERTICAL_LEVELS_HEIGHT, this.scene.planet).setOrigin(0, 1);
    }

    launch(){
        if(!this.scene.introDone){
            this.auxSpeed += 0.035;
            if(this.scene.player.x != AST_INITIAL_X){
                this.scene.player.speedX += this.auxSpeed;
            }
            else{ 
                this.scene.player.speedX = 0;
                //this.scene.player.play("standingRight",true);
                this.scene.introDone = true;
            }
        }
    }
}