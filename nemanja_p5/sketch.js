var s;
var scl = 20;
var food;
var matrix = [];
var frameCnt = 0;
var lastFrame = 0;
var bot = true;

function setup() {
    createCanvas(1000,1000);
    s = new Snake;
    s.brojPoteza = 0;
    s.prvi = false;
    frameRate(30);
    pickLoaction();
	
	for(var i=0; i < height/scl; i++) {
    	matrix[i] = new Array(width/scl);
	}

	for (var i = 0 ; i < height/scl ; i++){
		for (var j = 0 ; j < width/scl ; j++){
			matrix[i][j] = -1;
		}

	}
}

function draw() {
    background(50);
    
    s.death();

    if (bot) s.move1();

    s.update();

    s.show(); 

    if (s.eat(food)){
    	pickLoaction();
    }

	//console.log(s.tail);
	
    fill(255,0,0);
    rect(food.x , food.y , scl, scl);

    frameCnt++;
}
/*
function mouseClicked(){
	s.total++;
	print("HELLO");
}
*/
function pickLoaction(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	
	food = createVector(floor(random(cols)), floor(random(rows)),0);
	food.mult(scl);

	if (food.x === s.x && food.y === s.y){
		pickLoaction();
	}
	for (var i = 0 ; i < s.tail.length ; i++){
		if (food.x === s.tail[i].x && food.y === s.tail[i].y){
			pickLoaction();
		}
	}
}

function keyPressed(){
	if (keyCode === UP_ARROW){
		if (s.yspeed != 1){
			if (lastFrame != frameCnt){
				lastFrame = frameCnt;
				s.dir(0,-1);
				return;
			}
		}
	}else if (keyCode === DOWN_ARROW){
		if (s.yspeed != -1){
			if (lastFrame != frameCnt){
				lastFrame = frameCnt;
				s.dir(0,1);
				return;
			}
		}
	}else if (keyCode === RIGHT_ARROW){
		if (s.xspeed != -1){
			if (lastFrame != frameCnt){
				lastFrame = frameCnt;
				s.dir(1,0);
				return;
			}
		}
	}else if (keyCode === LEFT_ARROW){
		if (s.xspeed != 1){
			if (lastFrame != frameCnt){
				lastFrame = frameCnt;
				s.dir(-1,0);
				return;
			}
		}
	}
}