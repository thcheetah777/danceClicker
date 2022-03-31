// Dance Clicker
/*^*^*^*^*^*^*^*
script.js
The main script for Dance Clicker.
*^*^*^*^*^*^*^*/

let game = {
  dancers: 0
};
class Game extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    // ********** Game setup **********
    // ---------- Engine ----------
    this.engine = new Engine(this);

    // ---------- Load assets ----------
    this.load.image("stickman0", "assets/stickman0.png");
    this.load.image("stickman1", "assets/stickman1.png");
    this.load.image("stickman2", "assets/stickman2.png");
    this.load.image("addButton", "assets/addButton.png");
    for (var i = 0; i < 10; i++) {
      this.load.image(`${i}`, `assets/${i}.png`);
    }
  }
  create() {
    // Add the custom pixel cursor
    // this.engine.pixelCursor();

    // Groups
    game.dancersGroup = this.physics.add.group();

    // Add buttons
    game.addButton = this.add.image(this.engine.gameWidthCenter, this.engine.gameHeight - 50, "addButton").setScale(8).setInteractive();
    game.addButton.on("pointerdown", () => {
      game.addButton.setScale(6.5);
      game.dancers++;
      game.dancersGroup.create(Math.random() * this.engine.gameWidth, Math.random() * (this.engine.gameHeight - 150 + game.addButton.height), "stickman").setScale(8).setGravityY(-1500);
    });
    this.input.on("pointerup", () => {
      game.addButton.setScale(8);
    });

    // ---------- Animations ----------
    this.engine.addAnimation("dance", 10, false, true, "stickman0", "stickman1", "stickman2");
  }
  update() {
    game.dancersGroup.getChildren().forEach(stickman => {
      stickman.anims.play("dance", true);
    });
  }
}
