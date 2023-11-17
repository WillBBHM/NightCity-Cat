let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

let player = document.getElementById('playerCanvas');
let player_ctx = player.getContext('2d');

ctx.imageSmoothingEnabled = false;

let bg = new Image();
bg.src = "./assets/background/background.jpg";

let idle_data = ["idle_1", "idle_2", "idle_3", "idle_4", "idle_5", "idle_6", "idle_7", "idle_8", "idle_9", "idle_10", "idle_11", "idle_12", "idle_13", "idle_14"];
let walk_data = ["walk_1", "walk_2", "walk_3", "walk_4"];
let crouch_data = ["crouch_1", "crouch_2", "crouch_3", "crouch_4"];

let frameCount = 0;

const etoileFilantes = [];
const particules = [];

let mouseX = 0;
let mouseY = 0;

let idle = [];
for (let i = 0; i < 14; i += 1) {
    let img = new Image();
    img.src = "./assets/idle/" + idle_data[i] + ".png";
    idle.push(img);
}

let walk = [];
for (let i = 0; i < 4; i += 1) {
    let img = new Image();
    img.src = "./assets/walk/" + walk_data[i] + ".png";
    walk.push(img);
}

let crouch = [];
for (let i = 0; i < 4; i += 1) {
    let img = new Image();
    img.src = "./assets/crouch/" + crouch_data[i] + ".png";
    crouch.push(img);
}

let player_idle_id = 0;
let walk_id = 0;
let crouch_id = 0;
let animation_id = 0;
let player_pos = [0, 600]

function idle_player() {
    player_idle_id += 1;
    if (player_idle_id == 14) {
        player_idle_id = 0;
        animation_id += 1;
    }
    player_ctx.drawImage(idle[player_idle_id], player_pos[0], player_pos[1], 256, 128);
}

function walk_player() {
    walk_id += 1;
    if (walk_id == 4) {
        walk_id = 0;
        animation_id += 1;
    }
    player_ctx.drawImage(walk[walk_id], player_pos[0], player_pos[1], 256, 128);
    player_pos[0] += 2;
    if (player_pos[0] > cnv.width) {
        player_pos[0] = -256;
    }
}

function crouch_player() {
    crouch_id += 1;
    if (crouch_id >= 4) {
        player_ctx.drawImage(crouch[3], player_pos[0], player_pos[1] - 256/2, 256, 256);
        animation_id += 1;
    }
    if (crouch_id < 4) {
        player_ctx.drawImage(crouch[crouch_id], player_pos[0], player_pos[1]-256/2, 256, 256);
    }
}

cnv.addEventListener("mousemove", function(event) {
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
});

function genEtoile() {
  const etoileFilante = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height - 500,
    velocityX: -Math.random() * 0 - 5,
    velocityY: Math.random() * 2 - 0,
    length: 10,
    width: 2,
  };
  etoileFilantes.push(etoileFilante);
}

function updateEtoile() {
  for (let i = 0; i < etoileFilantes.length; i++) {
    // Update the shooting star's position
    etoileFilantes[i].x += etoileFilantes[i].velocityX;
    etoileFilantes[i].y += etoileFilantes[i].velocityY;
    if (etoileFilantes[i].x < 0 || etoileFilantes[i].x > cnv.width || etoileFilantes[i].y < 0 || etoileFilantes[i].y > cnv.height - 600) {
      etoileFilantes.splice(i, 1);
      i--;
    }
  }
}

function drawEtoile() {
  for (let i = 0; i < etoileFilantes.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(etoileFilantes[i].x, etoileFilantes[i].y, etoileFilantes[i].length, etoileFilantes[i].width);
  }
}


function genParticule() {
  const particule = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    size: Math.random() * 5 + 1,
    color: `#${Math.random().toString(16).substring(2, 8)}`,
  };
  particules.push(particule);
}

function updateParticules() {
  for (let i = 0; i < particules.length; i++) {
    particules[i].x += particules[i].vx;
    particules[i].y += particules[i].vy;
    if (particules[i].x < 0 || particules[i].x > cnv.width || particules[i].y < 0 || particules[i].y > cnv.height) {
      particules.splice(i, 1);
      i--;
    }
  }
}

function drawParticules() {
  for (let i = 0; i < particules.length; i++) {
    ctx.fillStyle = particules[i].color;
    ctx.fillRect(particules[i].x, particules[i].y, particules[i].size, particules[i].size);
  }
}

const glitchParticules = [];

function genGlitchParticule() {
  const glitchParticule = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    size: Math.random() * 5 + 1,
    color: `#${Math.random().toString(16).substring(2, 8)}`,
  };
  glitchParticules.push(glitchParticule);
}

function updateGlitchParticules() {
  for (let i = 0; i < glitchParticules.length; i++) {
      glitchParticules[i].x += glitchParticules[i].vx;
      glitchParticules[i].y += glitchParticules[i].vy;

      if (glitchParticules.length > 0) {
        if (glitchParticules[i].size > 0) {
            glitchParticules[i].size -= 0.1;
        }
        if (glitchParticules[i].size <= 0) {
            glitchParticules[i].size = 0;
        }
        if (glitchParticules[i].color != "white") {
            glitchParticules[i].color = "white";
        }
        else {
            glitchParticules[i].color = `#${Math.random().toString(16).substring(2, 8)}`;
        }
        if (glitchParticules[i].x > mouseX - 50 && glitchParticules[i].x < mouseX + 50 && glitchParticules[i].y > mouseY - 50 && glitchParticules[i].y < mouseY + 50) {
            glitchParticules[i].color = `#${Math.random().toString(16).substring(2, 8)}`;
        }
      }

      if (glitchParticules[i].x < 0 || glitchParticules[i].x > cnv.width || glitchParticules[i].y < 0 || glitchParticules[i].y > cnv.height) {
          glitchParticules.splice(i, 1);
          i--;
      }
  }
}


function drawGlitchParticules() {
  for (let i = 0; i < glitchParticules.length; i++) {
      ctx.fillStyle = glitchParticules[i].color;
      ctx.fillRect(glitchParticules[i].x, glitchParticules[i].y, glitchParticules[i].size, glitchParticules[i].size);
  }
}


function player_update() {
  player_ctx.clearRect(0, 0, player.width, player.height);
  if(animation_id == 0) {
      idle_player();
  }
  if(animation_id > 0 && animation_id <= 16) {
      walk_player();
  }
  if(animation_id > 16) {
      crouch_player();
  }
  if(animation_id > 30) {
      animation_id = 0;
  }
}

function anim() {
  ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
  frameCount += 1;
  if (frameCount % 20 == 0) {
      genEtoile();
  }

  if (frameCount % 5 === 0) {
      genParticule();
  }

  if (frameCount % 5 === 0) {
      genGlitchParticule();
  }

  updateEtoile();
  updateParticules();
  updateGlitchParticules();

  drawEtoile();
  drawParticules();
  drawGlitchParticules();
}

function update() {
  requestAnimationFrame(anim);
  if (frameCount % 10 === 0) {
    player_update();
  }
}

//setInterval(animation, 20);
setInterval(update, 20);

