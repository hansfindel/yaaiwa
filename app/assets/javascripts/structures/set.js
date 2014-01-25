var Set = function() {}

Set.prototype.add = function(o) { this[o] = true; }
Set.prototype.remove = function(o) { delete this[o]; }
Set.prototype.contains = function(o) { return this[o] }


var MySet = function(){}
MySet.prototype = new Set(); 
MySet.prototype.add = function(o){
	if(this.contains(o)){
		return false; 
	} else {
		this[o] = true; 
		return true; 	
	}
}