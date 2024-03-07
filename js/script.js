let config = {
  type: Phaser.AUTO,
  width: window.innerWidth - 1, //1535
  height: window.innerHeight - 5, //757
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

function preload() {
  this.load.image("wall", "assets/base.png");
  this.load.spritesheet("character", "assets/character.png", {
    frameWidth: 32,
    frameHeight: 62,
  });
}

function create() {
  walls = this.physics.add.staticGroup();
  walls.create(765, 780, "wall").setScale(0.75).refreshBody();
  walls.create(765, -25, "wall").setScale(0.75).refreshBody();

  character = this.physics.add.sprite(0, 690, "character");

  character.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("character", { start: 8, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("character", {
      start: 11,
      end: 13,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("character", {
      start: 5,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("character", {
      start: 1,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "character", frame: 0 }],
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(character, walls);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const move = 200;
  character.setDrag(2000);

  if (cursors.right.isDown) {
    character.setVelocityX(move);
    character.anims.play("right", true);
  } else if (cursors.left.isDown) {
    character.setVelocityX(-move);
    character.anims.play("left", true);
  } else if (cursors.down.isDown) {
    character.setVelocityY(move);
    character.anims.play("down", true);
  } else if (cursors.up.isDown) {
    character.anims.play("up", true);
    character.setVelocityY(-move);
  } else {
    character.anims.play("turn");
  }
}
