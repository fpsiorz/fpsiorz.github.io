"use strict";

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.translate = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
};

Vector.prototype.diff = function(v) {
	return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.abs =  function() {
	return Math.sqrt(this.x*this.x+this.y*this.y);
}

Vector.prototype.scale = function(l) {
	this.x *= l;
	this.y *= l;
	return this;
}

Vector.prototype.normalize = function() {
	this.scale(1/this.abs());
	return this;
}

Vector.prototype.neg = function() {
	this.x = -this.x;
	this.y = -this.y;
	return this;
}

Vector.prototype.copy = function(){
	return new Vector(this.x, this.y);
};

Vector.prototype.angle = function() {
	return Math.atan2(this.y, this.x);

};

Vector.prototype.turn = function(degrees) {
	degrees = +degrees;
	var rad = degrees / 180 * Math.PI;
	var x = this.x, y = this.y;
	this.x = x * Math.cos(rad) - y * Math.sin(rad);
	this.y = x * Math.sin(rad) + y * Math.cos(rad);
};

Vector.prototype.towards = function(v, s) {
	return this.copy().translate(v.diff(this).scale(s));
};


Vector.prototype.toString = function() {
	return "("+this.x+","+this.y+")";
};
