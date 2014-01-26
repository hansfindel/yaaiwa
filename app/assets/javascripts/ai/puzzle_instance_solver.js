function PuzzleInstanceSolver(puzzle){
	this.copy = new Puzzle();
	this.copy.init(puzzle.array);

	this._g = 0;

	this.isReady = function(){
		return this.copy.isOrdered();
	}
	this.generateNextSteps = function(){
		var puzzles = [];
		var options = this.possible_steps();
		// console.log("generateNextStep::option = ", options)
		for(var i = 0; i < options.length; i++){
			puzzles.push(this.generateNextStep(options[i]))
		}
		return puzzles;
	}

	this.generateNextStep = function(move){

		var from = move[0];
		var to   = move[1];
		var array = []
		for(var i = 0; i < this.copy.array.length; i++){
			array.push(this.copy.array[i])
		}
		var temp    = array[from]
		array[from] = array[to]
		array[to]   = temp 

		var puzzle = new Puzzle();
		puzzle.init(array);
		// console.log("generateNextStep::puzzle = ", puzzle, " -- array = ", array)
		var instance = new PuzzleInstanceSolver(puzzle)
		instance.set_g(this.g() + 1);
		return instance
	}

	this.possible_steps = function(){
		// search for every 0 and list valid positions
		// return array of (from, to=thisZero.index)
		var options = []
		for(var i = 0; i < this.copy.array.length; i++){
			var positions = this.nearbyValidPositions(i);
			if(positions){
				positions.map(function(position){
					var move = [position, i];
					options.push(move)
				})
				
			}
		}
		return options; 
	}
	this.nearbyValidPositions = function(index){
		if(this.copy.array[index] != 0){
			// no return if not 0
			return null;
		}
		var valids = []
		for(var i=-1; i <= 1; i++){
			if(i!=0){
				var adjacent = index + i; 
				if(this.isValidIndex(adjacent)){
					valids.push(adjacent)
				}
				var distant  = index + i*this.copy.side; 
				if(this.isValidIndex(distant)){
					valids.push(distant)
				}
			}
		}
		return valids; 
	}
	this.isValidIndex = function(index){
		var size = this.copy.array.length;
		var side = this.copy.side; 
		if(index < 0 || index >= size){
			// out of index
			return false; 
		}
		// zero is not a valid value
		return this.copy.array[index] != 0;
	}

	this.getPuzzleIdentifier = function(){
		// identifier of puzzle 
		return this.copy.array.join("-");
	}

	this.f = function(instance){
		return this.g() + this.h(instance)
	}
	this.set_g = function(val){
		this._g = val; 
	}
	this.g = function(){
		return this._g;
	}
	this.h = function(instance){
		// f = g + h
		star = new PuzzleAStar(instance)
		var val = star.h()
		return val;
	}
	this.to_value = function(){
		this.g(this)
	}
}



e = function(i) { this.to_value = function(){return i;}}