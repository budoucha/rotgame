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
}

function draw() {

  background(0);
  update();
  drawBar();
  drawBullet();
}

function update() {
  updateRot();
  updateBullet();


}


function updateRot() {
  rotZ = rotationZ;
  rotX = rotationX;
  rotY = rotationY;
}

function updateBullet() {
  if (bulletExists === false) {
    mkBullet();
  }

  if (abs(bulletX + bulletVX - width / 2) >= width / 2) {
    bulletVX = -bulletVX;
  }
  if (abs(bulletY + bulletVY - height / 2) >= height / 2) {
    bulletVY = -bulletVY;
  }
  bulletX += bulletVX;
  bulletY += bulletVY;
}


function mkBullet() {
  bulletX = width / 2;
  bulletY = height;
  bulletVY = random(-long / 160, long / 160);
  bulletVX = random(-long / 160, long / 160);
  bulletExists = true;
}

function rmBullet() {
  bulletX = -100;
  bulletY - 100;
  bulletVX = 0;
  bulletVY = 0;
  bulletExists = false;
}

function mouseClicked(){
  mkBullet();
}

function drawBar() {
  push();
  translate(width / 2, height / 2);
  rotate(radians(-rotZ));
  fill(255);
  rectMode(RADIUS);
  rect(0, 0, long / 4, long / 26);
  pop();
}

function drawBullet() {
  ellipseMode(RADIUS);
  fill(255, 0, 0);
  ellipse(bulletX, bulletY, long / 32, long / 32);
}

function windowResized() {
  setup();
}