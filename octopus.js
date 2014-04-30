"use strict";

function Stage() {
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");

	// ----
	var parent = new Circle({pos: new Vector(100, 100), factor: 35, color: "green"});
	var child = new Circle({parent: parent, pos: new Vector(1, 1), factor: 0.5, color: "red"});
	parent.update = function(){this.pos.x++;this.factor*=0.99;};
	// ----

	this.objects = [new Octopus({context: this.context, pos:{x: 200, y: 200}, r:35}), parent];
	
	this.tick = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for(var i = 0; i < this.objects.length; i++) {
			this.objects[i].update();
			this.objects[i].draw(this.context);
		}
		this.context.fillStyle = "black";
		this.context.fillText(this.objects[0].direction.toString(), 10, 10);
	}
}

var stage;

window.onload = function() {
	stage = new Stage();
	setInterval("stage.tick();", 50);
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
	var leftEye = new Circle({parent: this.body, factor: 30/70, pos: {x: 0.25, y: 0},color: "white"});
	var rightEye = new Circle({parent: this.body, factor: 33/70, pos: {x: 0.75, y: 0}, color: "white"});

	this.direction = new Vector(3, 3);

	this.draw = function(context) {
		this.body.draw(context);
	};

	this.update = function() {
		var pos = this.body.pos;
		this.direction.turn(50*Math.random()-25);
		if((pos.x < 0 && this.direction.x < 0) || (pos.x > stage.canvas.width && this.direction.x > 1))
			this.direction.x = -this.direction.x;
		if((pos.y < 0 && this.direction.y < 0) || (pos.y > stage.canvas.height && this.direction.y > 1))
			this.direction.y = -this.direction.y;
		pos.x += this.direction.x;
		pos.y += this.direction.y;
	};
}

