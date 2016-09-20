function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  frameRate(60);
  vgrid = height / 8;
  hgrid = width / 8;
  du = min(vgrid, hgrid);

  tsize = du / 2;
  rateX = width / 360;
  rateY = width / 180;
  rateZ = width / 360;
  rectH = tsize / 2;
  pixelDensity(1);
}

function draw() {
  update();
  background(0);
  translate(width / 2, height / 2);
  rotate(-rotZ);
  fill(255);
  rectMode(RADIUS);
  rect(0,0,hgrid*2,vgrid/4);

  fill(255);

}

function update() {
  rotZ = rotationZ;
  rotX = rotationX;
  rotY = rotationY;
}

function windowResized() {
  setup();
}