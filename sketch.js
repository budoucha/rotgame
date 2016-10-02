function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  frameRate(60);
  short = min(width, height);
  long = max(width, height);
  vgrid = height / 8;
  hgrid = width / 8;
  du = min(vgrid, hgrid);

  tsize = du / 2;
  rateX = width / 360;
  rateY = width / 180;
  rateZ = width / 360;
  rectH = tsize / 2;
  pixelDensity(1);
  bulletExists = false;
  bulletSize = long / 32;

  rectWidth = long / 4;
  rectHeight = long / 26;
  reflecNoise = long / 255;
  score = 0;
}

function draw() {

  background(0);
  update();
  drawBar();
  drawBullet();
  drawScore();
}

function update() {
  updateRot();
  updateBullet();
  check();
  score++;
}


function updateRot() {
  rotZ = radians(-rotationZ);
  rotX = rotationX;
  rotY = rotationY;
}

function updateBullet() {
  if (bulletExists === false) {
    mkBullet();
  }

  if (abs(bulletX + bulletVX) + bulletSize >= width / 2) {
    bulletVX = -bulletVX + random(-reflecNoise, reflecNoise);
    bulletVY += random(-reflecNoise, reflecNoise);
  }
  if (abs(bulletY + bulletVY) + bulletSize >= height / 2) {
    bulletVX += random(-reflecNoise, reflecNoise);
    bulletVY = -bulletVY + random(-reflecNoise, reflecNoise);
  }
  bulletX += bulletVX;
  bulletY += bulletVY;
}

function check() {
  if (abs(bulletX) - bulletSize < rectWidth && abs(bulletY) - bulletSize < rectHeight) {
    mkBullet();
  }
}

function mkBullet() {
  bulletX = 0;
  bulletY = height / 2 - bulletSize;
  v0 = long / 160;
  theta0 = random(0, -PI);
  bulletVY = v0 * sin(theta0);
  bulletVX = v0 * cos(theta0);
  score = 0;
  bulletExists = true;
}

function rmBullet() {
  bulletX = -100;
  bulletY - 100;
  bulletVX = 0;
  bulletVY = 0;
  bulletExists = false;
}

function mouseClicked() {
  mkBullet();
}

function drawBar() {
  push();
  translate(width / 2, height / 2);
  rotate(rotZ);
  fill(255);
  rectMode(RADIUS);
  rect(0, 0, rectWidth, rectHeight);
  pop();
}

function drawBullet() {
  push();
  translate(width / 2, height / 2);
  ellipseMode(RADIUS);
  fill(255, 0, 0);
  ellipse(bulletX, bulletY, bulletSize, bulletSize);
  pop();
}

function drawScore() {
  push();
  translate(width / 2, height / 2);
  fill(0, 216, 255);
  textAlign(CENTER);
  textSize(short / 12);
  text("SCORE:\n"+score, 0, -vgrid*3);
  pop();
}

function windowResized() {
  setup();
}