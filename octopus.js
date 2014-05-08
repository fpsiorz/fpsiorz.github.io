"use strict";

function randomColor() {
	var hexdigits = '0123456789ABCDEF';
	var color = '#';
	for(var i = 0; i < 6; i++)
		color += hexdigits[Math.round(15 * Math.random())];
	return color;
}

function Stage() {
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");

	// ---- currently not used!
	var parent = new Circle({pos: new Vector(100, 100), factor: 35, color: "green"});
	var child = new Circle({parent: parent, pos: new Vector(1, 1), factor: 0.5, color: "red"});
	parent.update = function(){this.pos.x++;this.factor*=0.99;};
	// ----

	this.objects = [new Octopus({pos: {x: 200, y: 200}, r: 10})];
	
	this.tick = function() {
		var background = this.context.createLinearGradient(0,0,0,this.canvas.height);
		background.addColorStop(0,"lightblue");
		background.addColorStop(1,"blue");
		this.context.fillStyle = background;

		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		for(var i = 0; i < this.objects.length; i++) {
			this.objects[i].update();
			this.objects[i].draw(this.context);
		}
	}

	this.spawn = function() {
		this.objects.push(new Octopus({pos: {x: Math.random() * 200, y: Math.random() * 200}, r: Math.random() * 10, color: randomColor()}));
	}
}

var stage;

window.onload = function() {
	stage = new Stage();
	function tick() {
		stage.tick();
	}
	function spawn() {
		stage.spawn();
	}
	setInterval(tick, 50);
	setInterval(spawn, 5000);
	stage.canvas.height = window.innerHeight;
	stage.canvas.width = window.innerWidth;
}

window.onresize = function() {
	stage.canvas.height = window.innerHeight;
	stage.canvas.width = window.innerWidth;
}

function circle(context, x, y, r, color) {
	context.beginPath();
	context.arc(x, y, r, 0, 2*Math.PI, false);
	context.closePath();
	context.fillStyle = color;
	context.fill();
}

function Octopus(args) {
	var r = +(args.r || 35);
	var color = ""+(args.color || "#960096");
/*
	var eyerad = +(args.eyes && args.eyes.r || r*16/35);
	var eyecol = ""+(args.eyes && args.eyes.color || "white");
	var eyeheight = -(args.eyes && args.eyes.height || 0);
	var eyedist = +(args.eyes && args.eyes.distance || 2*eyerad);
*/
	this.body = new Circle({color: color, factor: r, pos: args.pos});
	var leftEye = new Circle({parent: this.body, factor: 30/70, pos: {x: 0.5, y: 0},color: "white"});
	var rightEye = new Circle({parent: this.body, factor: 33/70, pos: {x: -0.5, y: 0}, color: "white"});
	var leftPupil = new Circle({parent: leftEye, factor: 1/2, color: "black"});
	var rightPupil = new Circle({parent: rightEye, factor: 1/2, color: "black"});

	this.direction = new Vector(3, 3);

	this.draw = function(context) {
		this.body.draw(context);
/*
		var text = 
			"Octopus: pos = " + this.body.absolutePos() +
			"rad = " + this.body.absoluteRadius() +
			"Left Eye: pos = " + leftEye.absolutePos()  +
			"rad = " + leftEye.absoluteRadius() +
			"Right Eye: pos = " + rightEye.absolutePos() +
			"rad = " + rightEye.absoluteRadius();

		context.fillStyle = "black";
		context.fillText(text, 10, 10);
*/	
	};

	this.update = function() {
		var pos = this.body.pos;
		this.body.factor *= Math.pow(100/this.body.factor,0.001);
		this.direction.turn(50*Math.random()-25);
		if((pos.x < 0 && this.direction.x < 0) || (pos.x > stage.canvas.width && this.direction.x > 1))
			this.direction.x = -this.direction.x;
		if((pos.y < 0 && this.direction.y < 0) || (pos.y > stage.canvas.height && this.direction.y > 1))
			this.direction.y = -this.direction.y;
		pos.x += this.direction.x;
		pos.y += this.direction.y;
		leftPupil.pos.x = rightPupil.pos.x = this.direction.x;
		leftPupil.pos.y = rightPupil.pos.y = this.direction.y;
		leftPupil.pos.normalize().scale(0.3);
		rightPupil.pos.normalize().scale(0.3);
	};
}

