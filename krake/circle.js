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
		for(var i = 0; i < this.bgchildren.length; i++)
			this.bgchildren[i].draw(context);
		var pos = this.absolutePos();
		var rad = this.absoluteRadius();
		context.beginPath();
		context.arc(pos.x, pos.y, rad, 0, 2*Math.PI, false);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
		for(var i = 0; i < this.children.length; i++)
			this.children[i].draw(context);
	};
	this.absolutePos = function(){
		if(!this.parent)
			return this.pos.copy();
		var pos = this.parent.absolutePos();
		var relPos = this.pos.copy().scale(this.parent.absoluteRadius())
		pos.translate(relPos);
		return pos;
	};
	this.absoluteRadius = function() {
		if(!this.parent)
			return this.factor;
		return this.factor * this.parent.absoluteRadius();
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


