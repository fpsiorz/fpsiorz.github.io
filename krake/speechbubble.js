"use strict";

function SpeechBubble(args) {
	console.log("SpeechBubble constructor\n");
	if(!args.color)
		args.color = "white"
	var ratio = args.ratio || 0.5; // y/x
	var text = args.text || "Hello";
	Circle.call(this, args);
	this.drawMe = function(context) {
		context.beginPath();
		var corner = this.pos.copy().scale(-0.75*this.factor);
		context.moveTo(corner.x, corner.y);
		var phi = corner.angle();
		context.save();
		context.scale(1, ratio);
		context.arc(0, 0, 1, phi+0.2, phi+2*Math.PI-0.2, false);
		context.restore();
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
		context.strokeStyle = "black";
		context.lineWidth = 0.05;
		context.stroke();

		context.save();
		context.scale(0.01,0.01);		
		context.font = "50px sans-serif";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "black";
		context.fillText(text,0,0);
		context.restore();
	};
}

SpeechBubble.prototype = Object.create(Circle.prototype);
SpeechBubble.prototype.constructor = SpeechBubble;
