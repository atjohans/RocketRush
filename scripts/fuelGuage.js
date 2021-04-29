

class FuelGuage{

    constructor(x, y, radius) {

        this.x = x;
        this.y = y;
        this.radius = radius; 
        this.angle = -Math.PI;
        this.dy =  .001;

    }

    tick() {
        
       this.angle = this.angle + this.dy; 
        //console.log(this.angle);

    }

}

