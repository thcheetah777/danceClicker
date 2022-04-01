// Dance Clicker
/*^*^*^*^*^*^*^*
script.js
The main script for Dance Clicker.
*^*^*^*^*^*^*^*/

let game = {
  dancers: 0,
  money: 1,
  dancerPrice: 1,
  dancerPriceIncrement: 10
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
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("stickman0", "assets/stickman0.png");
    this.load.image("stickman1", "assets/stickman1.png");
    this.load.image("stickman2", "assets/stickman2.png");
    this.load.image("addButton", "assets/addButton.png");
  }
  create() {
    // Add the custom pixel cursor
    this.engine.pixelCursor();

    // Groups
    game.dancersGroup = this.physics.add.group();

    // Add buttons
    game.addButton = this.add.image(this.engine.gameWidthCenter - 40, this.engine.gameHeight - 50, "addButton").setScale(8).setInteractive();
    game.addButton.on("pointerdown", () => {
      if (game.money >= game.dancerPrice) {
        game.addButton.setScale(6.5);
        game.dancers++;
        game.perSecondText.text = `$${game.dancers * 1.5} per second`;
        game.perSecondText.x = this.engine.gameWidthCenter - game.perSecondText.width / 2;
        game.dancersGroup.create(Math.random() * this.engine.gameWidth, this.engine.randomBetween(200 + game.addButton.height, this.engine.gameHeight - 150 + game.addButton.height), "stickman").setScale(8).setGravityY(-1500);
        game.money -= game.dancerPrice;
        game.moneyText.text = "$" + String(game.money);
        game.dancerPrice += game.dancerPriceIncrement;
        game.dancerPriceIncrement++
        game.addDancerText.text = `$${game.dancerPrice}`;
      }
    });
    this.input.on("pointerup", () => {
      game.addButton.setScale(8);
    });

    // Add text
    game.moneyText = this.add.text(this.engine.gameWidthCenter - 40, 20, `$${game.money}`, {
      fontSize: "80px",
      fill: "#000000"
    });
    game.moneyText.x = this.engine.gameWidthCenter - game.moneyText.width / 2;
    game.perSecondText = this.add.text(this.engine.gameWidthCenter - 20, 90, "$0 per second", {
      fontSize: "40px",
      fill: "#000000"
    });
    game.perSecondText.x = this.engine.gameWidthCenter - game.perSecondText.width / 2;
    game.addDancerText = this.add.text(this.engine.gameWidthCenter + 40, this.engine.gameHeight - 70, `$${game.dancerPrice}`, {
      fontSize: "40px",
      fill: "#000000"
    });

    // ---------- Intervals ----------
    this.engine.setPhaserInterval(() => {
      game.money += game.dancers * 1.5;
      game.moneyText.text = "$" + String(game.money);
      game.moneyText.x = this.engine.gameWidthCenter - game.moneyText.width / 2;
    }, 1000);

    // ---------- Animations ----------
    this.engine.addAnimation("dance", 10, false, true, "stickman0", "stickman1", "stickman2");
  }
  update() {
    this.engine.updatePixelCursor();
    game.dancersGroup.getChildren().forEach(stickman => {
      stickman.anims.play("dance", true);
    });
  }
}
