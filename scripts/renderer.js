

class Renderer {
//the canvas/context we will render to 

    constructor() {

        this.gameWindow = {
            canvasContainer: document.getElementById("canvasContainer"),
            canvas: document.createElement("canvas"),
            init: function () {
                this.canvas.width = GAME_WIDTH;
                this.canvas.height = GAME_HEIGHT;
                this.context = this.canvas.getContext("2d");
                //insert canvas in HTML 
                this.canvasContainer.appendChild(this.canvas);

                //this.context.fillStyle = "black";
                //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            }
    };


    }

    getCenter() {
        let center = [this.gameWindow.canvas.width / 2, this.gameWindow.canvas.height / 2];
        return (center);
    }

//must be asyn to await img load before draw
	drawObj(obj) {
		//console.log(obj);
		this.gameWindow.context.drawImage(obj.img, obj.getX(), obj.getY(), obj.getWidth(), obj.getHeight());

		if (obj.type == "deadPlayer") {
			this.gameWindow.context.fillStyle = "white";
			this.gameWindow.context.font = "15px Arial";
			this.gameWindow.context.fillText(obj.name, obj.x + (this.gameWindow.context.measureText(obj.name).width / 2) , obj.y - 10);
        }

    }

	renderParticles(particles) {

		for (var i in particles) {
			if (typeof particles[i] != "undefined") {
			this.gameWindow.context.globalAlpha = particles[i].opacity;
			this.drawObj(particles[i]);
			this.gameWindow.context.globalAlpha = 1 ;
			}
		}

    }
  

//redraw the canvas, and all contained objects 
    renderBackgroundColor(color) {
         //refresh canvas 

        this.gameWindow.context.clearRect(0, 0, this.gameWindow.canvas.width, this.gameWindow.canvas.height);
        this.gameWindow.context.fillStyle = color;
       // this.gameWindow.context.fillRect(0, 0, this.gameWindow.canvas.width, this.gameWindow.canvas.height);

    }



	renderFuelGuage() {

		this.gameWindow.context.lineWidth = 20; 
		this.gameWindow.context.strokeStyle = fuelGaugeColor;
		//console.log(fuelGaugeColor);
		this.gameWindow.context.beginPath();
		//x,y,radius,startAngle,endAngle, counterclockwise?
		this.gameWindow.context.arc(fuelGuage.x, fuelGuage.y, fuelGuage.radius, fuelGuage.angle,0 ,false);
		this.gameWindow.context.stroke();
		this.gameWindow.context.closePath();

		this.gameWindow.context.fillStyle = "red";
		this.gameWindow.context.font = "15px Arial";
		this.gameWindow.context.fillText("FUEL", fuelGuage.x - (this.gameWindow.context.measureText("FUEL").width/2), fuelGuage.y-20);
    }


    renderObjects(objs){
   
        //draw objs 
       // this.drawObj(back);
        
        for (var i in objs) {
            this.drawObj(objs[i]);
        }
        
    }
}

class BGElm {
		constructor(yStart, imgSrc, height, width) {
			this.y = yStart;
			this.img = imgSrc;
			this.height = height;
			this.width = width;
		}
}

class RenderBackground {
	constructor(usePlaceholder) {
		this.para1 = [];
		this.para2 = [];
		this.para3 = [];
		this.usePH = usePlaceholder;
	}
	
	drawElt(obj) {
		obj.width = GAME_WIDTH;
		renderer.gameWindow.context.drawImage(obj.img, 0, obj.y, obj.width, obj.height);



	}
	renderBackgroundScrolling(speed) {
		let bgSpeed = speed/1000;
		for (var i in this.para3) {
			this.para3[i].y += bgSpeed/12;
			this.drawElt(this.para3[i]);
		}
		
		for (var i in this.para2) {
			this.para2[i].y += bgSpeed/5;
			this.drawElt(this.para2[i]);
		}
		updatePlanet();
		for (var i in this.para1) {
			this.para1[i].y += bgSpeed;
			this.drawElt(this.para1[i]);
		}
	}
	
	spawnNew(arr, depth) {
		let last = arr[arr.length - 1];
		
		if (arr.length == 0) {
			let imgURL = "";
			let height = 0;
			let image = new Image();
			switch (depth) {
				case 1:
					if (this.usePH)
						image.src = "./resources/placeholders/BG1.png";
					else
						image.src = "./resources/final_images/BG/BG1.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
				case 2:
					if (this.usePH)
						image.src = "./resources/placeholders/BG2.png";
					else
						image.src = "./resources/final_images/BG/BG2.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
				case 3:
					if (this.usePH)
						image.src = "./resources/placeholders/BG3.png";
					else
						image.src = "./resources/final_images/BG/BG3.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
			}
		}
		else if (last.y > 0) {
			let imgURL = "";
			let height = 0;
			let image = new Image();
			switch (depth) {
				case 1:
					if (this.usePH)
						image.src = "./resources/placeholders/BG1.png";
					else
						image.src = "./resources/final_images/BG/BG1.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
				case 2:
					if (this.usePH)
						image.src = "./resources/placeholders/BG2.png";
					else
						image.src = "./resources/final_images/BG/BG2.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
				case 3:
					if (this.usePH)
						image.src = "./resources/placeholders/BG3.png";
					else
						image.src = "./resources/final_images/BG/BG3.png";
					height = 1024;
					arr.push(new BGElm(-height, image, height, GAME_WIDTH));
					break;
			}
		}
	}
	
	deleteOld(arr) {
		for (var i in arr) {
			if (arr[i].y > GAME_HEIGHT){
				delete arr[i];
				//console.log("Deleted Old BG Element " + i);
			}
		}
	}
	update(speed) {
		this.spawnNew(this.para1, 1);
		this.spawnNew(this.para2, 2);
		this.spawnNew(this.para3, 3);
		
		this.deleteOld(this.para1);
		this.deleteOld(this.para2);
		this.deleteOld(this.para3);
		
		this.renderBackgroundScrolling(speed);
	}

}
