"use strict";

function Circle(args) {
	this.pos = args.pos ? 
		Vector.prototype.copy.apply(args.pos) : 
		new Vector(0,0);
	this.parent = args.parent;
	this.color = args.color || "black";
	this.factor = args.factor || 1;
	this.children = [];
	this.bgchildren = [];

	this.draw = function(context) {
		context.save();
		context.translate(this.pos.x, this.pos.y);
		context.scale(this.factor, this.factor);
		for(var i = 0; i < this.bgchildren.length; i++)
			this.bgchildren[i].draw(context);
		this.drawMe(context);
		for(var i = 0; i < this.children.length; i++)
			this.children[i].draw(context);
		context.restore();
	};

	this.drawMe = function(context) {
		context.beginPath();
		context.arc(0, 0, 1, 0, 2*Math.PI, false);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
	};

	this.update = function(){}
	if(this.parent && this.parent.children) {
		if(args.behind)
			this.parent.bgchildren.push(this);
		else		
			this.parent.children.push(this);
	} else if(this.parent)
		this.parent.children = [this];	
}


