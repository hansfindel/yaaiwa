function PuzzleSolverView(puzzleView){
	this.solver = new PuzzleSolver(puzzleView);

	this.moves = [];
	this.movesCount = 0;

	this.timeout = 1000;

	this.setSpeed = function(val){
		if(typeof(val)=="string"){
			speed = ["slow", "normal", "fast"].indexOf(val);
		} else {
			speed = val;
		}
		if(typeof(speed) == "number"){
			speed = parseInt(speed)
			time = 3 - speed
			this.timeout = Math.pow(10, time)
		}
	}

	this.setMoves = function(){
		this.moves = [];
		var steps = this.solver.minimalSteps
		// console.log("steps: ", steps)
		for(var i = 1; i < steps.length; i++){
			var move = this.getMove(steps[i-1], steps[i]);
			this.moves.push(move);
		}
		this.movesCount = this.moves.length;
	}
	this.getMove = function(step1, step2){
		var array1 = step1.split("-")
		var array2 = step2.split("-")
		for(var i = 0; i < array1.length; i++){
			if(array1[i] != array2[i]){
				if(array1[i] == 0){
					from_value = 0
					from = i
				} else {
					to_value = 0
					to = i
				}
			}
		}
		// puzzleView simpleMove works with values 
		// but move works with indexes (and puzzleView as a third parameter)
		return [from, to]
	}
	this.solve = function(){
		this.solver.brute_force_solve(false, false);
		// solver.minimalSteps has the steps, which have to be converted into 
		this.setMoves()
		// console.log("this : ", this)
		this.doMove(0)
	}
	this.doMove = function(i){
		self = this;
		var move = this.moves[i];
		if(!move){
			return;
		}
		// console.log(move)
		puzzleView.move(move[1], move[0], puzzleView)

		// fire next movement
		setTimeout(function(){
			if(i < self.movesCount){
				self.doMove(i + 1);
			}
		}, this.timeout)
	}
}