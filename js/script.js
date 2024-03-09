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
  this.load.image("block_h", "assets/block_h.png");
  this.load.image("block_v", "assets/block_v.png");
  this.load.image("torch", "assets/torch.png");
  this.load.spritesheet("character", "assets/character.png", {
    frameWidth: 32,
    frameHeight: 62,
  });
  this.load.audio("ambient_sound", "assets/sounds/ghost-whispers.mp3");
  this.load.audio("step_sound", "assets/sounds/footstep.ogg");
}

function create() {
  // this.lights.addLight(500, 500, 100).setColor(0x555555).setIntensity(9.0);

  otherImage = this.physics.add.staticGroup();
  otherImage.create(100, 300, "torch").setVisible(false);
  otherImage.create(100, 500, "torch");

  walls = this.physics.add.staticGroup();

  // Border
  walls
    .create(850, 18, "block_h")
    .setDisplaySize(1540, 35)
    .refreshBody()
    .setPipeline("Light2D"); //top
  walls
    .create(18, 380, "block_v")
    .setDisplaySize(35, 757)
    .refreshBody()
    .setPipeline("Light2D"); //left
  walls
    .create(805, 740, "block_h")
    .setDisplaySize(1540, 35)
    .refreshBody()
    .setPipeline("Light2D"); //bottom
  walls
    .create(1520, 250, "block_v")
    .setDisplaySize(35, 757)
    .refreshBody()
    .setPipeline("Light2D"); //right

  // Blocks
  walls
    .create(180, 120, "block_h")
    .setDisplaySize(150, 35)
    .refreshBody()
    .setPipeline("Light2D"); //1
  walls
    .create(120, 180, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //2
  walls
    .create(350, 130, "block_v")
    .setDisplaySize(35, 300)
    .refreshBody()
    .setPipeline("Light2D"); //3
  walls
    .create(400, 270, "block_h")
    .setDisplaySize(600, 35)
    .refreshBody()
    .setPipeline("Light2D"); //4
  walls
    .create(210, 360, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //5
  walls
    .create(130, 520, "block_h")
    .setDisplaySize(180, 35)
    .refreshBody()
    .setPipeline("Light2D"); //6
  walls
    .create(500, 620, "block_h")
    .setDisplaySize(700, 35)
    .refreshBody()
    .setPipeline("Light2D"); //7
  walls
    .create(420, 500, "block_v")
    .setDisplaySize(35, 200)
    .refreshBody()
    .setPipeline("Light2D"); //8
  walls
    .create(550, 420, "block_h")
    .setDisplaySize(280, 35)
    .refreshBody()
    .setPipeline("Light2D"); //9
  walls
    .create(680, 360, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //10
  walls
    .create(750, 150, "block_h")
    .setDisplaySize(450, 35)
    .refreshBody()
    .setPipeline("Light2D"); //11
  walls
    .create(950, 240, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //12
  walls
    .create(1050, 320, "block_h")
    .setDisplaySize(220, 35)
    .refreshBody()
    .setPipeline("Light2D"); //13
  walls
    .create(1150, 380, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //14
  walls
    .create(1050, 450, "block_h")
    .setDisplaySize(220, 35)
    .refreshBody()
    .setPipeline("Light2D"); //15
  walls
    .create(1050, 600, "block_v")
    .setDisplaySize(35, 300)
    .refreshBody()
    .setPipeline("Light2D"); //16
  walls
    .create(1150, 100, "block_v")
    .setDisplaySize(35, 150)
    .refreshBody()
    .setPipeline("Light2D"); //17
  walls
    .create(1390, 220, "block_h")
    .setDisplaySize(220, 35)
    .refreshBody()
    .setPipeline("Light2D"); //18
  walls
    .create(1350, 380, "block_v")
    .setDisplaySize(35, 350)
    .refreshBody()
    .setPipeline("Light2D"); //19
  walls
    .create(1390, 620, "block_h")
    .setDisplaySize(220, 35)
    .refreshBody()
    .setPipeline("Light2D"); //20

  character = this.physics.add
    .sprite(60, 0, "character")
    .setPipeline("Light2D");
  character.setCollideWorldBounds(true);

  const light = this.lights.addLight(0, 0, 200);
  this.lights.enable().setAmbientColor(0); //0x555555
  this.input.on("pointermove", (pointer) => {
    light.x = pointer.x;
    light.y = pointer.y;
  });

  ambientSound = this.sound.add("ambient_sound", { volume: 0.5 });
  ambientSound.loop = true;
  // ambientSound.play();

  stepSound = this.sound.add("step_sound", { volume: 1 });

  this.physics.add.collider(
    character,
    otherImage,
    collisionHandler,
    null,
    this
  );

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
    if (!stepSound.isPlaying) stepSound.play();
  } else if (cursors.left.isDown) {
    character.setVelocityX(-move);
    character.anims.play("left", true);
    if (!stepSound.isPlaying) stepSound.play();
  } else if (cursors.down.isDown) {
    character.setVelocityY(move);
    character.anims.play("down", true);
    if (!stepSound.isPlaying) stepSound.play();
  } else if (cursors.up.isDown) {
    character.anims.play("up", true);
    character.setVelocityY(-move);
    if (!stepSound.isPlaying) stepSound.play();
  } else {
    character.anims.play("turn");
  }
}

function collisionHandler() {
  otherImage.children.entries[0].setVisible(true);
}
