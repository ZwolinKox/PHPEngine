 $(window).ready(() => {
     start();
     update();
 })



 function getInput() {
    document.body.addEventListener("keydown", (e) => {
        keys[e.keyCode] = true;
    })

    document.body.addEventListener("keyup", (e) => {
        keys[e.keyCode] = false;
    })

    document.body.addEventListener("mousedown", (e) => {
        if(e.button == 0) {
            mouse[0] = true; //LPM
        }
        else if(e.mouse == 1) {
            mouse[1] = true; //ŚPM
        }
        else {
            mouse[2] = true; //PPM
        }
    })

    document.body.addEventListener("mouseup", (e) => {
        if(e.button == 0) {
            mouse[0] = false; //LPM
        }
        else if(e.mouse == 1) {
            mouse[1] = false; //ŚPM
        }
        else {
            mouse[2] = false; //PPM
        }
    })
 }

 function collision(o1, o2) { //Prosta funkcja, jak obiekty nachodzą na siebie zwracamy true
    if(o1.x + o1.w > o2.x && o1.x < o2.x + o2.w && o1.y + o1.h > o2.y && o1.y < o2.y + o2.h) 
    {
        if(o2.collision != "undefinded")
        {
            if(o2.collision)
                return true;
            else 
                return false;
        }    
        else 
            return true;
    }
        
    return false;
 }

 class Screen {
     init(cnv) {
         this.canvas = cnv;
         this.ctx = this.canvas.getContext("2d");

         this.canvas.width = window.innerWidth;
         this.canvas.height = window.innerHeight;
         
         this.fps = 60;
     }

    getFps() {
         return this.fps;
     }

     //Te metody zwracają wysokośc i szerokość, żeby nie trzeba było pisać
     w() {
        return this.canvas.width;
     }

     h() {
        return this.canvas.height;
     }
 }

 class Tile {
     constructor(tileH, tileW, tileX, tileY, tileColor, tileCollision) {
        this.h = tileH;
        this.w = tileW;
        this.x = tileX;
        this.y = tileY;
        this.color = tileColor;
        this.collision = tileCollision;
     }
 }

 class Map {

    init() {
        this.tileH = 50;
        this.tileW = 50;

        this.h = 15;
        this.w = 20;

        this.map = [
            1, 1, 1, 1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0 , 0, 0, 1, 0, 1, 0, 0, 0, 1, 0 , 0, 1, 0, 0, 0, 1,
            1, 1, 0, 1 , 0, 1, 0, 0, 1, 0, 0, 0, 1, 0 , 0, 0, 0, 0, 0, 1,
            1, 1, 0, 0 , 0, 1, 1, 0, 1, 0, 0, 0, 0, 0 , 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 , 0, 0, 0, 0, 0, 1,
            1, 1, 0, 1 , 0, 1, 1, 0, 0, 1, 0, 0, 1, 0 , 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0 , 0, 0, 1, 0, 1, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 1,
            1, 1, 1, 0 , 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 , 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0 , 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 , 0, 1, 0, 0, 0, 1,
            1, 1, 0, 1 , 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 , 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 , 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0 , 1, 1, 0, 1, 0, 1, 1, 1, 0, 0 , 0, 0, 1, 0, 0, 1,
            1, 1, 1, 1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1, 1, 1, 1, 1, 1,
        ];
    

    }

     update() {
        tiles = [];

        //System niezbyt mi się tutaj podoba
        //Opiera się jednocześnie na 2 sposobach opisania mapy. Ma to plusy? No ma
        //Można zrobić większą dynamikę, ale trzeba to wykminić lepiej xD
        for(let i = 0; i < this.h; i++) {
            let tmp = [];
            for(let j = 0; j < this.w; j++) {
                let tileCollision;
                let thisTile = this.map[(i*this.w)+j];

                let image = new Image();
                image.src = textures[thisTile].url;
                    
                tileCollision = textures[thisTile].collision;

                let tmpTile = new Tile(this.tileH, this.tileW, j*this.tileW, i*this.tileH, this.map[thisTile], tileCollision);
                tmp.push(tmpTile);

                screen.ctx.drawImage(image, j*this.tileW, i*this.tileH, this.tileW, this.tileH);
            }
            tiles.push(tmp);
        }
     }
 }

 function loadTextures() {
    let pathTexture = new Texture("textures/path.png", "path", false);
    textures.push(pathTexture);

    let grassTexture = new Texture("textures/grass.png", "grass", true);
    textures.push(grassTexture);
 }

 class Texture {
     constructor(url, name, collision) {
        this.url = url;
        this.name = name;
        this.collision = collision;
     }
 }

 class Player {
    init() {
        this.w = 50;
        this.h = 50;

        this.x = screen.w() / 2 - this.w / 2;
        this.y = screen.h() / 2 - this.h / 2;

        //screen.ctx.fillRect(0, 0, this.w, this.h);
    }

    checkCollision() {
        for(let i = 0; i < tiles.length; i++) {
            for(let j = 0; j < tiles[i].length; j++) {
                if(collision(this, tiles[i][j]))
                    return tiles[i][j];
            }
        }

        return false;
    }

    update() {
        //Renderowanie wg koloru
        //screen.ctx.fillStyle = "red";
        //screen.ctx.fillRect(this.x, this.y, this.w, this.h);

        const image = new Image();
        image.src = "textures/player.png";
        screen.ctx.drawImage(image, this.x, this.y, this.w, this.h);


        if(keys[87]) {  //W
            this.y -= this.speed;

            let checkCol = this.checkCollision();

            if(checkCol != false)
                this.y = checkCol.y + checkCol.h;
        }
        if(keys[83]) { //S
            this.y += this.speed;
            
            let checkCol = this.checkCollision();

            if(checkCol != false)
                this.y = checkCol.y - checkCol.h;
        }
        if(keys[65]) { //A
            this.x -= this.speed;
            
            let checkCol = this.checkCollision();

            if(checkCol != false)
                this.x = checkCol.x + checkCol.w;
        }
         if(keys[68]) { //D

            this.x += this.speed;

            let checkCol = this.checkCollision();
            
            if(checkCol != false)
                this.x = checkCol.x - checkCol.w;
        }


        //Prowizoryczne edytowanie mapy 
        if(mouse[0]) { //LPM
            $( document ).on( "mousemove", ( event ) => {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY;
            });
           let dragTiles = Math.floor(mousePos.x/50) + ((Math.ceil(mousePos.y/50) -1 ) * map.w);

            map.map[dragTiles] = 0;
        }

        if(mouse[2]) //PPM
        {
            $( document ).on( "mousemove", ( event ) => {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY;
            });
            
            let dragTiles = Math.floor(mousePos.x/50) + ((Math.ceil(mousePos.y/50) -1 ) * map.w);

            map.map[dragTiles] = 1;
        }
}

    get speed() {
        return 5;
    }
 }

 let mousePos = {
    x: 0,
    y: 0
};

 //Instancje
 let screen = new Screen(); //Nasza instancja okna gry
 let player = new Player();
 let map = new Map();
 let tiles = []; //Wszystkie bloki na mapie
 let textures = [];

 let keys = [];
 let mouse = [];

 function start() {
    loadTextures();
    screen.init(document.querySelector("#game"));
    player.init();
    map.init();

    getInput();
 }

 function update() {
     setTimeout(() => {
         update();
     }, 1000 / screen.getFps());

     if(screen.ctx == null) 
     { return; }

     screen.ctx.clearRect(0, 0, screen.w(), screen.h());
     screen.fillRect;
     map.update();
     player.update();

 }

 window.onresize = function () { 
     obj.x *= screen.w() / oldW;
     obj.y *= screen.h() / oldH;

     oldW = screen.w();
     oldH = screen.h();

 }