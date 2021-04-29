
function haltMusic() {
	bgmEarth.stop();
	bgmMars.stop();
	bgmJupiter.stop();
	bgmSaturn.stop();
	bgmUranus.stop();
	bgmNeptune.stop();
	bgmPluto.stop();
	bgmDown.stop();
}
class Sound {

    constructor(src,id,loop) {
        this.src = src;
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.id = id;
        this.sound.loop = loop;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.volume = .2;
		
		this.sound.addEventListener('ended', function () {
			if (this.id == "bgmEarth")
				bgmMars.play();
			else if (this.id == "bgmMars")
				bgmJupiter.play();
			else if (this.id == "bgmJupiter")
				bgmSaturn.play();
			else if (this.id == "bgmSaturn")
				bgmUranus.play();
			else if (this.id == "bgmUranus")
				bgmNeptune.play();
			else if (this.id == "bgmNeptune")
				bgmPluto.play();
			else if (this.id == "bgmPluto")
				bgmPluto.play();
			else if (this.id == "bgmDown")
				bgmDown.play();
		});
        document.body.appendChild(this.sound);
		
    }
    play() {
        this.sound.play();
    }
    stop(){
    this.sound.pause();
}

	//fadeAudio = setInterval(function () {
		//
		//if (this.sound.volume > 0) {
		//this.sound.volume -= .1;
		//}
		//if (this.sound.volume == 0) {
		//	this.sound.stop();
		//}

	//}, 200);


}