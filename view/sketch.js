let width = 1600;
let height = 900;

let map;

function preload(){
  LoadAllImg();

  map = new SectionMap("name");
  map.addSection(new Section(0,0,pathTexture));
  map.addSection(new Section(1,0,pathTexture));
  map.addSection(new Section(0,1,pathTexture));
  map.addSection(new Section(1,1,pathTexture));
  map.addSection(new Section(1,3,grassTexture));
  map.addSection(new Section(1,5,playerTexture));
  map.addLayer();



  map.FindSection(1,3).addLayer(new Layer(playerTexture,0));
  map.addDynObject(new DynObject(1,playerTexture,100,125,50,50));
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(0);
  map.Render();
}