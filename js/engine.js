/*




			



							++==	+==	   ==+	===+  ++===+    |
						    ||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at 2019/7/8
									  Explosion-Effect








*/
var canvas = document.querySelector('canvas');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 var c = canvas.getContext('2d');

 function range(min, max){
 	return Math.floor(Math.random()*(max-min+1)+min);
 }
 var mouse = {
 	x:undefined,
 	y:undefined
 };
 window.addEventListener('mousemove', function(e){
 	mouse.x = e.x;
 	mouse.y = e.y;
 });
 /*
 window.addEventListener('resize', function(e){
 	canvas.width = window.innerWidth;
 	canvas.height = window.innerHeight;
 	init();
 
 });
 */
 function color(){
	var r = Math.floor(Math.random()*1000)%200;
	var g = Math.floor(Math.random()*1000)%230;
	var b = Math.floor(Math.random()*1000)%230;
	return 'rgb('+r+','+g+','+b+')';
}


 
 function Ball(x, y,radius, color,lt){
 	this.x = x;
 	this.y = y;
 	this.radius = radius;
 	this.color = color;
 	this.sx = 5;
 	this.sy = 50;
 	this.diff = radius+1;
 	this.max_x_shake = x+this.diff;
    this.lt = lt;
    this.wait = 200;
   

 	this.update = ()=>{
 		if((this.x+this.radius > this.max_x_shake || this.x-this.radius < this.max_x_shake-2*this.diff) 
 			&& counter < this.wait){
 			this.sx = -this.sx;
 			counter++;

 		}
 		if(counter < this.wait){
 			this.x += this.sx;
 			this.draw();
 		}else{
 			letters.push(new Letter(this.x, this.y, this.r, this.lt));
			exp.forEach(e=>{
 				e.update();
 			});	
			
 			
 		}

 	};
 	this.draw = ()=>{
 		c.beginPath();
 		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
 		c.fillStyle = this.color;
 		c.fill();
 		c.closePath();

 	};
 }
 function Letter(x,y,r,l){
 	this.x = x-30;
 	this.y = y+30;
 	this.r = r;
 	this.chr = l;
 	this.update = ()=>{
 		this.draw();
 	};
 	this.draw = ()=>{
 			c.beginPath();
 			c.fillStyle = 'white';
 			c.font = "bold 100pt TimesNewRoman";
 			c.fillText(this.chr, this.x, this.y);
 			c.closePath();
 	}
 }
 
 	
 function Explode(x,y,r,col){
 	this.x = x;
 	this.y = y;
 	this.r = r;
 	this.color = col;
 	this.expspeed = 2;
 	
 	this.update = ()=>{
 		if(this.r < 100){
 			this.r += this.expspeed;
 			this.draw();
 		}
 		this.draw();
 	};
 	this.draw = ()=>{
 		c.beginPath();
 		c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
 		c.fillStyle=this.color;
 		c.fill();
 		c.closePath();
 		
 	};
 }
 var balls;
 var exp;
 var counter;
 var letters;
 
 function init(){
 	counter = 0;
 	letters = [];
 	balls = [];
 	exp = [];
 		for(let t = 0; t < 5; t++){
	 		const rbig = 100;
	 		let xbig = range(rbig, innerWidth-rbig);
	 		let ybig = range(innerHeight/2-rbig, innerHeight/2+rbig);
	 		const col = color();
	 		let lt = "";
	 		if(t != 0){
	 			for(let s = 0; s < balls.length; s++){
					if(distance(xbig,ybig,balls[s].x,balls[s].y)-2*rbig-20 < 0){
						xbig = range(rbig, innerWidth-rbig);
			 			ybig = range(innerHeight/2-rbig, innerHeight/2+rbig);
			 			s=-1;
			 		}
			 		
	 			}
	 			
	 		}
	 		
	 		balls.push(new Ball(xbig,ybig,rbig,col,''));

			
		 	var x=0,y=0;
		 	r = 15;
		 	
	 		for(var i = 0; i < 5; i++){
	 			
			 	x = range(xbig-rbig/2, xbig+rbig/2);
			 	y = range(ybig-rbig/2, ybig+rbig/2);
			 	if(i != 0){
					for(let j = 0; j < exp.length; j++){
						if(distance(x,y,exp[j].x,exp[j].y)-2*r < 0){
							x = range(xbig-rbig/2, xbig+rbig/2);
			 				y = range(ybig-rbig/2, ybig+rbig/2);
			 				j=-1;
						}
					}
				}
				
			 	exp.push(new Explode(x,y,r,col));
			 	
			}
	 	}
	 	
	 	//Sort the objects according to it's x 
	 	var min = 0;
	 	var tempx = 0;
	 	var tempy = 0;
	 	for(var i = 0; i < balls.length; i++){
	 			min = i;
	 		for(var j = i+1; j < balls.length; j++){
	 			if(balls[min].x > balls[j].x){
	 				min = j;
	 			}
	 		}
	 		tempc = balls[i].color;
	 		tempx = balls[i].x;
	 		tempy = balls[i].y;
			balls[i].x = balls[min].x;
			balls[i].y = balls[min].y;
			balls[i].color = balls[min].color;
			balls[min].x = tempx;
			balls[min].y = tempy;
			balls[min].color = tempc;
			
	 	}
	 	for(var i = 0; i < balls.length; i++){
	 	switch(i){
	 		case 0:lt = "E";break;
	 		case 1:lt = "M";break;
	 		case 2:lt = "A";break;
	 		case 3:lt = "N";break;
	 		case 4:lt = "T";break;
	 			}
	 		
	 	balls[i].lt = lt;
	 }

 	}

 function distance(x1, y1, x2, y2){
 	xDiff = x2-x1;
 	yDiff = y2-y1;
 	return Math.sqrt(Math.pow(xDiff, 2)+Math.pow(yDiff,2));
 }
 
 function animate(){

 	requestAnimationFrame(animate);
 	
 	//c.fillStyle='rgba(0,0,255,0.5)';
 	
 	c.clearRect(0,0,innerWidth,innerHeight);
 	balls.forEach(ball=>{
 		ball.update();
 	});
 
 	letters.forEach(up=>{
 		up.update();
 	});

 }
 
 init();
 animate();