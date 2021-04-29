class EntityManager {

    constructor(frequency) {

        this.entity_idx = 0;
        this.entities = [];
        this.planets = [];
        this.loadPlanets();
        this.particles = [];
    }


    remove(index) {

        //remove the obj 
        //console.log("Deleting" + this.entities[index]);
        delete (this.entities[index]);

    }

    getRandomInt(max, min) {

        return Math.floor(Math.random() * (max - min) + min);

    }
    createMeteor() {
        var spawnVals;

        //get faster spawn as distance increases 
        if (tick % (PLANET_SPAWN_FREQUENCY / 2) == 0) {
            console.log("Meteor spawn increase: " + METEOR_SPAWN_FREQUENCY);
            if (METEOR_SPAWN_FREQUENCY > 5) {
                METEOR_SPAWN_FREQUENCY = METEOR_SPAWN_FREQUENCY - METEOR_SPAWN_INCREMENT;
            }
        }
        // console.log(tick);
        if (tick % METEOR_SPAWN_FREQUENCY == 0) {

            var edge = this.getRandomInt(4, 0);
            //console.log(edge);
            switch (edge) {

                //left edge 
                case 0:
                    spawnVals = [0, this.getRandomInt(GAME_HEIGHT / 2, 0), this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED), this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED)];

                    break;

                //right edge
                case 1:
                    spawnVals = [GAME_WIDTH, this.getRandomInt(GAME_HEIGHT / 2, 0), -this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED), this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED)];

                    break;


                //top edge 
                case 2:
                case 3:
                    spawnVals = [this.getRandomInt(GAME_WIDTH, 0), 0, this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED), this.getRandomInt(METEOR_MAX_SPEED, METEOR_MIN_SPEED)];
                    break;
            }



            // console.log(spawnVals);
            this.entities.push(new Meteor(spawnVals[0], spawnVals[1], 50, 50, spawnVals[2], spawnVals[3], './resources/placeholders/Meteor_Placeholder.png', this.entity_idx));
            this.entities[this.entity_idx].init();

            this.entity_idx++;
            // console.log(this.entities.length);
            //console.log(this.entity_idx);
            //console.log("Asteroid Created");

        }
    }

    createDeadPlayer() {

        if (topPlayers.length > 0) {

            if (distanceTravelled == topPlayers[topPlayers.length - 1][0]) {
                //console.log("OK");
                
                this.entities.push(new deadRocket(this.getRandomInt(GAME_WIDTH - 100, 100), 0, 149, 140, 3, './resources/final_images/DeadRocket.png', this.entity_idx, topPlayers[topPlayers.length - 1][1] ));
                this.entities[this.entity_idx].init();
                topPlayers.pop();
                this.entity_idx++;

            }
            
            
          }
    }

    createParticle() {
        if (tick % PARTICLE_SPAWN_RATE == 0) {
            var particle = new smokeParticle(player.getX() + player.width/2 - 6, player.getY() + player.height + 2, 30, 30, this.getRandomInt(5, -5), this.getRandomInt(6, 4), './resources/placeholders/Smoke_Placeholder.png');
        particle.init();
            this.particles.push(particle)
        }
        //console.log(particle);
    }


    createFuel() {

        if (tick % FUEL_SPAWN_FREQUENCY == 0) {
            var spawnVals = [this.getRandomInt(GAME_WIDTH * 9 / 10, GAME_WIDTH / 10), 0];
            this.entities.push(new fuel(spawnVals[0], spawnVals[1], 50, 50, 5, './resources/placeholders/Fuel_Placeholder.png', this.entity_idx));
            this.entities[this.entity_idx].init();

            this.entity_idx++;
        }
    }

    loadPlanets() {
        GAME_WIDTH = innerWidth;
        let width = 680;
        let height = 680;
        let earth = new Planet(GAME_WIDTH / 5 - width / 2, 0, 680, 680, 1, './resources/final_images/Planets/Earth.png');
        let mars = new Planet(GAME_WIDTH / 5 - width / 2, -height, 680, 680, 1, './resources/final_images/Planets/Mars.png');
        let jupiter = new Planet(GAME_WIDTH / 5 - width / 2, -height, 680, 680, 1, './resources/final_images/Planets/Jupiter.png');
        let saturn = new Planet(GAME_WIDTH / 5 - width, -height, 1360, 537, 1, './resources/final_images/Planets/Saturn.png');
        let uranus = new Planet(GAME_WIDTH / 5 - width / 2, -height, 680, 680, 1, './resources/final_images/Planets/Uranus.png');
        let neptune = new Planet(GAME_WIDTH / 5 - width / 2, -height, 680, 680, 1, './resources/final_images/Planets/Neptune.png');
        let pluto = new Planet(GAME_WIDTH / 5 - width / 2, -height, 680, 680, 1, './resources/final_images/Planets/Pluto.png');
        this.planets.push(pluto);
        this.planets.push(neptune);
        this.planets.push(uranus);
        this.planets.push(saturn);
        this.planets.push(jupiter);
        this.planets.push(mars);
        this.planets.push(earth);
        for (var i in this.planets) {
            this.planets[i].init();
        }
    }

    moveObjs() {
        for (var i in this.entities) {
            this.entities[i].move();
        }

    }
    moveParticles() {
        for (var i in this.particles) {
            if (typeof this.particles[i] != "undefined") {
                this.particles[i].move();
               
                if (this.particles[i].opacity < 0.2) {
                    this.particles[i].delete
                    //console.log("ok");
                }
            }
        }
    }

    // Are two elements currently colliding?
    isColliding(o1, o2) {
        let o1Left = o1.x + 15;
        let o1Right = o1.x + o1.width - 15;
        let o1Top = o1.y + 15;
        let o1Bottom = o1.y + o1.height - 15;

        let o2Left = o2.x;
        let o2Right = o2.x + o2.width;
        let o2Top = o2.y;
        let o2Bottom = o2.y + o2.height;
        // left of o1 collides with o2
        if (o1Left < o2Right && o1Right > o2Left) {
            if (o1Top < o2Bottom && o1Bottom > o2Top)
                return true;
        }
        return false;
    }


    checkPlayerCollisions() {

        if (gameRunning) {
            for (var i = 1; i < this.entities.length; ++i) {
                // console.log(this.entities[i])
                if (typeof this.entities[i] != "undefined") {
                    if (this.isColliding(this.entities[0], this.entities[i])) {
                        // console.log("Big Dead");

                        if (this.entities[i].type == "Meteor" || this.entities[i].type == "deadPlayer") {

                            if (this.entities[i].type == "Meteor") {
                                causeOfDeath = username + " Was Hit By A Meteor!";
                                document.getElementById("twitterButton").setAttribute('href', "https://twitter.com/intent/tweet?text=I,%20" + username + ",%20made%20it%20" + distanceTravelled + "%20thousand%20miles%20before%20crashing%20into%20a%20meteorite.%20Can%20you%20beat%20my%20highscore?%20&hashtags=RocketRush");
                            } else {
                            causeOfDeath = username + " Collided With " + this.entities[i].name + " !!!";
                            document.getElementById("twitterButton").setAttribute('href', "https://twitter.com/intent/tweet?text=I,%20" + username + ",%20made%20it%20" + distanceTravelled + "%20thousand%20miles%20before%20crashing%20into%20" + this.entities[i].name + ".%20Can%20you%20beat%20my%20highscore?%20&hashtags=RocketRush");
                           // A Previous Mission!";
                            }
                            gameRunning = false;

                        } else if (this.entities[i].type == "fuel") {
                            sfxFuel.play();
                            fuelGuage.angle = Math.max(-Math.PI, fuelGuage.angle - Math.PI / 4);
                            playedAlarm = false;
                            this.remove(i);
                        }

                    }
                }
            }
        }

    }

    checkObjectBounds() {
        if (this.entities.length > 1) {
            for (var i = 1; i < this.entities.length; ++i) {
                if (typeof this.entities[i] != "undefined") {
                    if (this.entities[i].getX() < 0 || this.entities[i].getY() < 0 || this.entities[i].getX() > GAME_WIDTH || this.entities[i].getY() > GAME_HEIGHT) {
                        //console.log(this.entities[i]);
                        this.remove(i);
                        return true;

                    }
                }
            }
        }
    }
}


