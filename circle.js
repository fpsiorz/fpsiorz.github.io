function Circle(args) {
	this.pos = args.pos || new Vector(0,0);
	this.parent = args.parent || {pos: new Vector(0,0)};
	this.color = args.color || "black";
	this.factor = args.factor || 1;
	this.children = [];
	this.draw = function(context) {
		var parent = this.parent, factor = this.factor;
		while(parent && parent.factor != null) {
			factor *= parent.factor;
			parent = parent.parent;
		}
		var pos = this.pos.copy().scale(factor/this.factor).translate(this.parent.pos);
		context.beginPath();
		context.arc(pos.x, pos.y, factor, 0, 2*Math.PI, false);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
		for(var i = 0; i < this.children.length; i++)
			this.children[i].draw(context);
	};
	this.update = function(){}
	if(this.parent.children)
		this.parent.children.push(this);
	else
		this.parent.children = [this];	
}


