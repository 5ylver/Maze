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
  this.load.image("wall", "assets/block_h.png");
  this.load.image("wall-v", "assets/block_v.png");
  this.load.spritesheet("character", "assets/character.png", {
    frameWidth: 32,
    frameHeight: 62,
  });
  this.load.audio("ambient_sound", "assets/sounds/ghost-whispers.mp3");
  this.load.audio("step_sound", "assets/sounds/footstep.ogg");
}

function create() {
  walls = this.physics.add.staticGroup();

  // Border
  walls.create(850, 18, "wall").setDisplaySize(1540, 35).refreshBody(); //top
  walls.create(18, 380, "wall-v").setDisplaySize(35, 757).refreshBody(); //left
  walls.create(805, 740, "wall").setDisplaySize(1540, 35).refreshBody(); //bottom
  walls.create(1520, 250, "wall-v").setDisplaySize(35, 757).refreshBody(); //right

  walls.create(180, 120, "wall").setDisplaySize(150, 35).refreshBody(); //1
  walls.create(120, 180, "wall-v").setDisplaySize(35, 150).refreshBody(); //2
  walls.create(350, 130, "wall-v").setDisplaySize(35, 300).refreshBody(); //3
  walls.create(400, 270, "wall").setDisplaySize(600, 35).refreshBody(); //4
  walls.create(210, 360, "wall-v").setDisplaySize(35, 150).refreshBody(); //5
  walls.create(130, 520, "wall").setDisplaySize(180, 35).refreshBody(); //6
  walls.create(500, 620, "wall").setDisplaySize(700, 35).refreshBody(); //7
  walls.create(420, 500, "wall-v").setDisplaySize(35, 200).refreshBody(); //8
  walls.create(550, 420, "wall").setDisplaySize(280, 35).refreshBody(); //9
  walls.create(680, 360, "wall-v").setDisplaySize(35, 150).refreshBody(); //10
  walls.create(750, 150, "wall").setDisplaySize(450, 35).refreshBody(); //11
  walls.create(950, 240, "wall-v").setDisplaySize(35, 150).refreshBody(); //12
  walls.create(1050, 320, "wall").setDisplaySize(220, 35).refreshBody(); //13
  walls.create(1150, 380, "wall-v").setDisplaySize(35, 150).refreshBody(); //14
  walls.create(1050, 450, "wall").setDisplaySize(220, 35).refreshBody(); //15
  walls.create(1050, 600, "wall-v").setDisplaySize(35, 300).refreshBody(); //16
  walls.create(1150, 100, "wall-v").setDisplaySize(35, 150).refreshBody(); //17
  walls.create(1390, 220, "wall").setDisplaySize(220, 35).refreshBody(); //18
  walls.create(1350, 380, "wall-v").setDisplaySize(35, 350).refreshBody(); //19
  walls.create(1390, 620, "wall").setDisplaySize(220, 35).refreshBody(); //20

  character = this.physics.add.sprite(60, 0, "character");
  // .setPipeline("Light2D");
  character.setCollideWorldBounds(true);

  const light = this.lights.addLight(0, 0, 200);
  this.lights.enable().setAmbientColor(0x555555);
  this.input.on("pointermove", (pointer) => {
    light.x = pointer.x;
    light.y = pointer.y;
  });

  ambientSound = this.sound.add("ambient_sound", { volume: 0.5 });
  ambientSound.loop = true;
  // ambientSound.play();

  stepSound = this.sound.add("step_sound", { volume: 1 });

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
