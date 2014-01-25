function PuzzleAStar(instance){
	this.instance = instance
	this.h = function(){ 
		// compute distance from cells to position 
		var distance = 0
		for(var i = 0; i < this.instance.copy.array.length; i++){
			if(this.instance.copy.array[i] != 0){
				var t = this.minMovesFor(i); 
				// console.log("t: ", t) 
				distance += t;
			}
		}
		return distance;
	}
	this.zeroCount = function(){
		var zeroCount = 0
		for(var i = 0; i < this.instance.copy.array.length; i++){
			if(this.instance.copy.array[i] == 0){
				zeroCount = zeroCount + 1; 
			}
		}
		return zeroCount;
	}
	this.proposedIndex = function(index){
		return this.instance.copy.array[index] + this.zeroCount() - 1;
	}
	this.minMovesFor = function(index){
		var position = this.proposedIndex(index)
		var side = this.instance.copy.side;
		return this.countMoves(index, position, side)
	}
	this.countMoves = function(from, to, side){		
		if(from == to){
			return 0; 
		} else{
			// if in the same row 
			var r1 = parseInt(from / side); 
			var r2 = parseInt(to   / side); 
			if(r1 == r2){
				return Math.abs(from - to)
			}
			if(from < to){
				return 1 + this.countMoves(from + side, to, side) 
			}
			return 1 + this.countMoves(from - side, to, side) 
		} 
	}
}