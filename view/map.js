class SectionMap {
    constructor(name){
        this.name = name;
        this.sections = [];
        this.sectionSize = 50;

        this.dynobjects = [];
    }
}

SectionMap.prototype.addSection = function(tail) {
    let exist = false;
    this.sections.forEach(obj =>{
        if(obj.index.x === tail.index.x && obj.index.y === tail.index.y){
            console.log("Trying to overide a existing section");
            exist = true;
        }
    });
    if(!exist){
        this.sections.push(tail);
    }
}

SectionMap.prototype.addDynObject = function(object){
    let exist = false;
    this.dynobjects.forEach(obj =>{
        if(obj.id == object.id){
            console.log("Object already exist");
            exist = true;
        }
    });
    if(!exist){
        this.dynobjects.push(object);
    }
}

SectionMap.prototype.Render = function() {
    this.sections.forEach(section =>{
        for(let i = 0; i < section.layers.length; i++){
            image(section.layers[i].texture, section.index.x * this.sectionSize, section.index.y * this.sectionSize, this.sectionSize, this.sectionSize);
        }
    });

    this.dynobjects.forEach(object =>{
        image(object.texture.img, object.pos.x, object.pos.y, object.texture.width, object.texture.height);
    });
}

SectionMap.prototype.FindSection = function(sectionX,sectionY) {
    return this.sections.find(function(section){
        return section.index.x === sectionX && section.index.y === sectionY;
    });
}

SectionMap.prototype.FindDynObject = function(id){
    return this.dynobjects.find(function(object){
        return object.id === id;
    });
}

class Section {
    constructor(x1,y1,img){
        this.index = {
            x: x1,
            y: y1,
        }
        this.layers = [new Layer(img,0)];
    }
}

Section.prototype.addLayer = function(layer) {
    this.layers.forEach(seclayer =>{
        if(seclayer.index === layer.index){
            console.log("Trying to overide a existing layer");
            return null;
        }
    });
    this.layers.push(layer);
}

class Layer {
    constructor(img,y) {
        this.index = y;
        this.texture = img;
    }
}

class DynObject {
    constructor(id,img,x,y,w,h){
        this.index = id;
        this.texture = {
            img: img,
            width: w,
            height: h,
        }
        this.pos = {
            x: x,
            y: y,
        }
    }
}