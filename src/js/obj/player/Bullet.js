import Utils from "../../Utils.js"
export default class Bullet extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

        this.scene = scene;
    }

    newItem(x = 17, y = 30) {
        var item = this.create(this.scene.player.x + x, this.scene.player.y - y, "verticalAtlas","shoot00")
            .setActive(true)
            .setVisible(true)
            .setDepth(2);

        Utils.createAnimFromAtlas(this.scene, "shootBegin", "verticalAtlas", "shoot", 4, 2, 15, 0);
        Utils.createAnimFromAtlas(this.scene, "shootEnd",   "verticalAtlas", "shootEnd", 1, 2, 20, -1);

        item.setScale(2);
        item.body.velocity.y = -200;
        item.outOfBoundsKill = true;


        // Configura la animación 1 para que se ejecute solo una vez
        item.on('animationcomplete-shootBegin', () => {
            item.play('shootEnd', { loop: true });
        }, this);

        // Inicia la animación 1
        item.play('shootBegin');
    }

}