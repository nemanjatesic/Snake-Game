function Snake(){
	this.score = 0;
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.route = [];
    this.brojPoteza;
    this.prvi;

	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.death = function(){
		if (this.x > width-scl || this.x < 0 || this.y > height-scl || this.y < 0)
			this.reset();
		for (var i = 0 ; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if (d === 0)
				this.reset();
		}
	}

	this.reset = function(){
		this.xspeed = 0;
		this.yspeed = 0;
		this.tail = [];
		this.total = 0;
		this.score = 0;
		this.x = floor(random(floor(width/scl)))*scl;
		this.y = floor(random(floor(height/scl)))*scl;
		window.alert("You lost");
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d === 0) {
			this.total++;
            this.score += 10;
			return true;
		}else return false;
        
	}

    this.highestValue = function(){
        var k = createVector(0,0);
        var l = -1;
        for (var i = 0 ; i < height/scl ; i++){
            for (var j = 0 ; j < width/scl ; j++){
                if (matrix[i][j] > l){
                    l = matrix[i][j];
                    k = createVector(i,j);
                }
            }
        }
        return k;
    }

	this.update = function(){
		if (this.total === this.tail.length){
			for (var i = 0; i < this.tail.length-1 ; i++) {
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
		
	}

	this.show = function(){
		var a = 100;
		//fill(103, 255, 94);
		for (var i = this.tail.length - 1 ; i >= 0 ; i--) {
			fill(0,a++,0);
            //fill(random(0,255),random(0,255),random(0,255));
			rect(this.tail[i].x, this.tail[i].y,scl,scl);
		}
		fill(0, 100, 0);
		rect(this.x, this.y,scl,scl);
	}

    this.findPath = function(n,m){   //Nije scalovano
        par = new Par();
        par.x = n * scl;
        par.y = m * scl;
        var aray = [];
        var maxBroj = matrix[food.y/scl][food.x/scl];

        aray[maxBroj - 1] = par;

        maxBroj--;

        while (maxBroj > 0){
            if (m - 1 >= 0){
                if (matrix[m][n]-1 === matrix[m-1][n]){
                    par1 = new Par;
                    par1.x = n* scl;
                    par1.y = (m-1) * scl;
                    m = m - 1;
                    aray[maxBroj - 1] = par1;
                    maxBroj--;
                    continue;
                }
            }
            if (m + 1 <= height/scl - 1){
                if (matrix[m][n]-1 === matrix[m+1][n]){
                    par2 = new Par;
                    par2.x = n * scl;
                    par2.y = (m+1) * scl;
                    m = m + 1;
                    aray[maxBroj - 1] = par2;
                    maxBroj--;
                    continue;
                }
            }
            if (n - 1 >= 0){
                if (matrix[m][n]-1 === matrix[m][n-1]){
                    par3 = new Par;
                    par3.x = (n-1) * scl;
                    par3.y = m * scl;
                    n = n - 1;
                    aray[maxBroj - 1] = par3;
                    maxBroj--;
                    continue;
                }
            }
            if (n + 1 <= width/scl - 1){
                if (matrix[m][n]-1 === matrix[m][n+1]){
                    par4 = new Par;
                    par4.x = (n+1) * scl;
                    par4.y = m * scl;
                    n = n + 1;
                    aray[maxBroj - 1] = par4;
                    maxBroj--;
                    continue;
                }
            }    
        }

        this.route = aray;
    }
    
    this.possible1 = function(n,m){
        if (n >= width) return false;
        if (n < 0) return false;
        if (m < 0) return false;
        if (m >= height) return false;
        
        for (var k = 0 ; k < this.tail.length ; k++){
            if (n === this.tail[k].x && m === this.tail[k].y)
                return false;
        }

        return true;
    }

    this.possible = function(n,m){ // n je tacka na x osi * scl

        if (n >= width) return false;
        if (n < 0) return false;
        if (m < 0) return false;
        if (m >= height) return false;
        
        for (var k = 0 ; k < this.tail.length ; k++){
            if (n === this.tail[k].x && m === this.tail[k].y)
                return false;
        }

        if (matrix[m/scl][n/scl] != -1)
            return false;
        
        return true;
    }

    this.move = function(){
        /*
        var i = 0;
        var a = [];
        a[0] = createVector(0,-1);
        a[1] = createVector(0, 1);
        a[2] = createVector(1, 0);
        a[3] = createVector(-1,0);
        do {
            i  = random(0,4);
            i = floor(i);
        }while (this.possible1(this.x + a[i].x * scl, this.y + a[i].y * scl) != true);
        this.dir(a[i].x, a[i].y);
        */
        
        console.log(this);
        if (this.xspeed === 0 && this.yspeed === -1){ // UP
            if (this.possible1(this.x, this.y - scl))
                return;
            else {
                if (this.possible1(this.x + scl , this.y)){
                    this.dir(1,0);
                    return;
                }else if (this.possible1(this.x - scl , this.y)){
                    this.dir(-1,0);
                    return;
                }
            }
        }else if (this.xspeed === 0 && this.yspeed === 1){ // DOWN
            if (this.possible1(this.x, this.y + scl))
                return;
            else {
                if (this.possible1(this.x - scl , this.y)){
                    this.dir(-1,0);
                    return;
                }else if (this.possible1(this.x + scl , this.y)){
                    this.dir(1,0);
                    return;
                }
            }
        }else if (this.xspeed === 1 && this.yspeed === 0){ // RIGHT
            if (this.possible1(this.x + scl, this.y))
                return;
            else {
                if (this.possible1(this.x , this.y + scl)){
                    this.dir(0,1);
                    return;
                }else if (this.possible1(this.x , this.y - scl)){
                    this.dir(0,-1);
                    return;
                }
            }
        }else if (this.xspeed === -1 && this.yspeed === 0){ // LEFT
            if (this.possible1(this.x - scl, this.y))
                return;
            else {
                if (this.possible1(this.x , this.y - scl)){
                    this.dir(0,-1);
                    return;
                }else if (this.possible1(this.x , this.y + scl)){
                    this.dir(0,1);
                    return;
                }
            }
        }
    }

	this.move1 = function(){
		if (this.route.length != 0){
			if (this.route[0].x === this.x && this.route[0].y === this.y + scl){
                if (this.yspeed != -1){
                    this.dir(0,1);
                } 
            }else if (this.route[0].x === this.x && this.route[0].y === this.y - scl){
                if (this.yspeed != 1){
                    this.dir(0,-1);
                } 
            }else if (this.route[0].x === this.x + scl && this.route[0].y === this.y){
                if (this.xspeed != -1){
                    this.dir(1,0);
                }
            }else if (this.route[0].x === this.x - scl && this.route[0].y === this.y){
                if (this.xspeed != 1){
                    this.dir(-1,0);
                }
            }
            
            this.route.splice(0, 1);
            return;
		}else {
            if (this.prvi){
                for (var z = 0 ; z < height/scl ; z++){
                    for (var zz = 0 ; zz < width/scl ; zz++){
                        matrix[z][zz] = -1;
                    }
                }
            }
            matrix[this.y/scl][this.x/scl] = 0;
            
            var bufferCitanje = [];
            var bufferPisanje = [];
            var bufferPrazan = false;
            p = new Par();
            p.x = this.x/scl;
            p.y = this.y/scl;
            bufferCitanje[0] = p;

            var counter = 1;
            var counterZaPisanje = 0;
            do {

                for (var i = 0 ; i < bufferCitanje.length ; i++){
                    if (this.possible(bufferCitanje[i].x * scl + scl, bufferCitanje[i].y * scl)){
                        p1 = new Par;
                        p1.x = (bufferCitanje[i].x + 1);
                        p1.y = (bufferCitanje[i].y);
                        matrix[p1.y][p1.x] = counter;
                        bufferPisanje[counterZaPisanje++] = p1;
                    }
                    if (this.possible(bufferCitanje[i].x * scl - scl, bufferCitanje[i].y * scl)){
                        p2 = new Par;
                        p2.x = (bufferCitanje[i].x - 1);
                        p2.y = (bufferCitanje[i].y);
                        matrix[p2.y][p2.x] = counter;
                        bufferPisanje[counterZaPisanje++] = p2;
                    }
                    if (this.possible(bufferCitanje[i].x * scl, bufferCitanje[i].y * scl + scl)){
                        p3 = new Par;
                        p3.x = (bufferCitanje[i].x);
                        p3.y = (bufferCitanje[i].y + 1);
                        matrix[p3.y][p3.x] = counter;
                        bufferPisanje[counterZaPisanje++] = p3;
                    }
                    if (this.possible(bufferCitanje[i].x * scl, bufferCitanje[i].y * scl - scl)){
                        p4 = new Par;
                        p4.x = (bufferCitanje[i].x);
                        p4.y = (bufferCitanje[i].y - 1);
                        matrix[p4.y][p4.x] = counter;
                        bufferPisanje[counterZaPisanje++] = p4;
                    }
                }

                bufferCitanje = [];
                
                for (var q = 0 ; q < bufferPisanje.length ; q++){
                    bufferCitanje[q] = bufferPisanje[q];
                }     
                
                counter++;
                counterZaPisanje = 0;

                if (bufferPisanje.length === 0){
                    bufferPrazan = true;
                    break;
                }

                bufferPisanje = [];
                
            }while(matrix[food.y/scl][food.x/scl] === -1);
            this.prvi = true;
            
            if (bufferPrazan){
                /*var k = this.highestValue();
                console.log(k);
                this.findPath(k.x, k.y);
                console.table(matrix);
                this.move1();
                */
                console.log("Dosta lose");
                this.move();
                //console.table(matrix);
                return;
            }else {
                
                this.route = [];

                this.findPath(food.x/scl,food.y/scl);

                this.move1();
            } 
        }
	}
}
