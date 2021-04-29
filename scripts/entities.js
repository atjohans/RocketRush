
//all game objects will have these properties
class gameObject {

    constructor(x, y, width, height,img_src, entity_index) {

        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.img_src = img_src;
        this.entity_index = entity_index;

        this.img = new Image();
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

    setX(x) {

        this.x = x; 
    }
    setY(y) {
        this.y = y;
    }

    init() {
        this.img.src = this.img_src;
        this.img.width = this.width;
        this.img.height = this.height;
    }

}

//the player object
class Rocket extends gameObject{

    constructor(x, y, width, height, speed, img_src, entity_index) {

        super(x, y, width, height,img_src,entity_index);

        this.speed = speed; 
      
    }

    move() {
        //move based off speed constant, distance to mouse 
        //offset by width to center on mouse 
        var dx = (MOUSE_X - this.width/2) - this.x ;
        var dy = (MOUSE_Y - this.height/2) - this.y ;
        

        var distance = Math.sqrt(dx * dx + dy * dy);
        var scale = distance / this.speed;
        var x_speed = dx / scale;
        var y_speed = dy / scale;
        //lower sensitivity to stop jumpiness around cursor 
        if (Math.abs(dx) < 5) { x_speed = 0; }
        if (Math.abs(dy) < 5) { y_speed = 0; }
        this.x = this.x + x_speed; 
        this.y = this.y + y_speed;    
    }
}
class Meteor extends gameObject {

    constructor(x, y, width, height, dx, dy, img_src, entity_index) {

        super(x, y, width, height,img_src,entity_index);
        this.type = "Meteor";
        this.dx = dx;
        this.dy = dy;
    }

    move() {
        
        this.x += this.dx; 
        this.y += this.dy;
    }
}


class fuel extends gameObject {

    constructor(x, y, width, height, dy, img_src, entity_index) {

        super(x, y, width, height, img_src, entity_index);

        this.type = "fuel";
        this.dy = dy;
    }

    move() {
        /*
    	if ((this.x + this.dx < 0) || (this.x + this.dx > innerWidth)) {
    		this.dx = -this.dx;
    	}
    	if ((this.y + this.dy < 0) || (this.y + this.dy > innerHeight)) {
    		this.dy = -this.dy;
    	}
        */
       
        this.y += this.dy;
    }
}


class Planet extends gameObject {

    constructor(x, y, width, height, dy, img_src) {

        super(x, y, width, height, img_src, -0.1);

        this.type = "Planet";
        this.dy = dy;
    }

    move() {
    
        this.y += this.dy;
    }
}
class smokeParticle extends gameObject {

    constructor(x, y, width, height, dx, dy, img_src) {

        super(x, y, width, height, img_src, -1);
        this.opacity = 1;
        this.dx = dx;
        this.dy = dy;
    }

    move() {
  
        this.opacity -= .01;
       // console.log(this.opacity);
        this.x += this.dx;
        this.y += this.dy;
    }
}


class deadRocket extends gameObject {

    constructor(x, y, width, height, dy, img_src,entity_index, name) {

        super(x, y, width, height, img_src, entity_index);

        this.name = name; 
        this.type = "deadPlayer";
        this.dy = dy;
    }

    move() {

        this.y += this.dy;
    }
}