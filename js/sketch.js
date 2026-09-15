let anguloLlantas = 0;
let rotaLlantas = 50;

let bus;
let edificios;
let andes;

let posX = 0;
let direccionX = 1;
let velocidadX = 14;

const baseW = 640;
const baseH = 480;

const andesW = 640;
const andesH = 193;
const edificiosW = 640;
const edificiosH = 145;
const busW = 918;
const busH = 200;

function preload() {
  bus = loadImage("img/sketch/bus-5x.png");
  edificios = loadImage("img/sketch/edificios-5x.png");
  andes = loadImage("img/sketch/andes-5x.png");
}

function setup() {
  const holder = document.getElementById("hero-sketch");
  const c = createCanvas(holder.clientWidth, holder.clientWidth / 2);
  c.parent("hero-sketch");
  frameRate(4);
}

function windowResized() {
  const holder = document.getElementById("hero-sketch");
  resizeCanvas(holder.clientWidth, holder.clientWidth / 2);
}

function draw() {
  background(255);

  const s = width / baseW;
  push();
  translate(0, height - baseH * s);
  scale(s);

  // cargando imágenes
  image(andes, 0, 156.893, andesW, andesH);
  image(edificios, 0, 244.641, edificiosW, edificiosH);
  image(bus, posX - 800, 290, busW, busH);

  // parte blanca de las llanticas
  noStroke();
  fill(255);
  ellipse(posX - 50, 448.309, 48, 48);

  noStroke();
  fill(255);
  ellipse(posX - 291, 448.309, 48, 48);

  noStroke();
  fill(255);
  ellipse(posX - 584, 448.309, 48, 48);

  // llanticas que se mueven
  anguloLlantas += rotaLlantas;

  drawLlanta(posX - 50, 448.309);
  drawLlanta(posX - 291, 448.309);
  drawLlanta(posX - 584, 448.309);

  // movimiento del bus
  posX = posX + velocidadX * direccionX;

  if (direccionX == 1) {
    posX = posX + 1;
  }

  // vuelve a entrar por la izquierda una vez que sale de cuadro
  if (posX - 800 > baseW + busW) {
    posX = 0;
  }

  pop();

  // lluvia (en espacio de pantalla para que se vea bien en cualquier tamaño de canvas)
  const rainCount = 400;
  stroke(0);
  strokeWeight(0.75 * s);
  for (let i = 0; i < rainCount; i = i + 1) {
    let lluviaX = random(0, width);
    let lluviaY = random(0, height);
    line(lluviaX, lluviaY, lluviaX + 5 * s, lluviaY + 5 * s);
  }
}

function drawLlanta(x, y) {
  push();
  translate(x, y);
  rotate(radians(anguloLlantas));

  const tireR = 24;
  const rimR = 14.4;
  const hubStrokeR = 12;
  const boltOrbitR = 6.72;
  const boltR = 2.16;

  noStroke();
  fill(15);
  circle(0, 0, tireR * 2);

  fill(143, 145, 148);
  circle(0, 0, rimR * 2);

  noFill();
  stroke(15);
  strokeWeight(0.7);
  circle(0, 0, hubStrokeR * 2);

  noStroke();
  fill(241);
  for (let i = 0; i < 8; i++) {
    const angle = -90 + i * 45;
    const bx = boltOrbitR * cos(radians(angle));
    const by = boltOrbitR * sin(radians(angle));
    circle(bx, by, boltR * 2);
  }

  pop();
}
