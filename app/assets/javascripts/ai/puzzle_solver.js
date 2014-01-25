function PuzzleSolver(puzzle){
	this.puzzle = puzzle; // maybe pass a puzzleView 
	this.minimal = [];
	this.solutions = []; 

	// this.seen = new Set(); // do not save the expanded nodes of these ones
	this.reached = new MySet(); // add returns if added 
	this.parents = {};
	this.count = 0; 
	this.limit = 100;
	this.brute_force_count = 0;
	// could modify this and the iterate method to store when it reached it 

	// make method to work with A*

	/* ********************************************************
	// solution consists of an ordered array of actions
	// each action is cell-ids as (from, to)
	// in single empty-space puzzles the to could be ignored
    // ******************************************************** */

	this.brute_force_solve = function(many_plans, all_options_per_iteration){
		initial_time = Date.now();
		this.count = 0; 
		this.brute_force_count = 0;
		var instance = new PuzzleInstanceSolver(this.puzzle)
		var id = instance.getPuzzleIdentifier()
		this.parents[id] = "";
		this.reached.add(id)
		var iteration = [instance];

		var solution = this.iterate(iteration, many_plans, all_options_per_iteration)

		if(solution == null){
			return console.log("NO SOLUTION...")
		}

		var steps = this.traceSolution(solution, []);
		console.log("Solution:")
		console.log(steps);

		var time = Date.now() - initial_time;
		console.log("total time: ", time/1000, "s")
		// if(many_plans){
		// 	// countinue searching other solutions
		// }
	}
	this.iterate = function(array, many_plans, all_options_per_iteration){
		// if solved return path
		// else prepare next iteration
		var new_array = [];
		var newArraySet = new MySet(); // add returns if added 
		this.count = this.count + 1; 
		console.log("**************************************************************")
		console.log("ITERATION: ", this.count)
		console.log("Array size: ", array.length);
		for(var i = 0; i < array.length; i++){
			var instance = array[i];
			var instanceID = instance.getPuzzleIdentifier();
			var puzzles = instance.generateNextSteps();
			// console.log("instance: ", instanceID, " ----- posibilities: ", puzzles)
			this.brute_force_count = this.brute_force_count  + 1; // count nodes expanded
			if(instance.isReady()){
				return instanceID;
			}
			for(var j = 0; j < puzzles.length; j++){
				var puzzleInstanceSolver = puzzles[j];
				var id = puzzleInstanceSolver.getPuzzleIdentifier();
				// console.log("	watching instance: ", id)
				if( all_options_per_iteration || this.reached.add(id) ){
					if(!all_options_per_iteration){
						// reached for the first time
						this.parents[id] = instanceID;	
					}
					// console.log("added")
					if(newArraySet.add(puzzleInstanceSolver.getPuzzleIdentifier())){
						// add only once
						new_array.push(puzzleInstanceSolver);	
					}
				}
			}
		}
		console.log("**************************************************************")
		// if reached here... try a new iteration if any
		if( new_array.length == 0 || this.count >= this.limit ){
			return null; // impossible to reach a solution
		}
		// console.log("size: ", new_array.length)
		return this.iterate(new_array, many_plans, all_options_per_iteration)
	}

	this.traceSolution = function(sol, array){
		var prev = this.parents[sol]
		array.push(sol);
		if(prev != ""){
			return this.traceSolution(prev, array)
		}
		var solutionByStep = []
		for(var i = array.length - 1; i >= 0; i--){
			solutionByStep.push(array[i])
		}
		return solutionByStep;
	}
	this.h = function(instance){
		// f = g + h
		star = new AStar(instance)
		return star.h()
	}

	
}

function AStar(instance){
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

function PuzzleInstanceSolver(puzzle){
	this.copy = new Puzzle();
	this.copy.init(puzzle.array);

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
		return new PuzzleInstanceSolver(puzzle)
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
}


getStar = function(){
	pv = PuzzleController.getPuzzleView(".little-one")
	p = pv.puzzle
	instance = new PuzzleInstanceSolver(p)
	solver = new PuzzleSolver(p)
	solver.brute_force_solve(false, false)
	star = AStar(instance)
}