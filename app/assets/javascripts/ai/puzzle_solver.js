function PuzzleSolver(puzzleView){
	this.puzzleView = puzzleView;
	this.puzzle = puzzleView.puzzle; // maybe pass a puzzleView 
	this.minimal = [];
	this.solutions = []; 

	// brute_force_solve attributes 
	this.reached = new MySet(); // add returns if added 
	this.parents = {};
	this.count = 0; 
	this.limit = 100;
	this.brute_force_count = 0;
	// could modify this and the iterate method to store when it reached it 


	// solve attributes 
	this.reached = new MySet(); // add returns if added 
	this.parents = {};
	this.count = 0;
	this.a_star_count = 0;
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
		this.parents = {};
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
		var new_configuration_count = 0; 
		var configuration_count     = 0;
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
				configuration_count += 1;
				if( all_options_per_iteration || this.reached.add(id) ){
					if(!all_options_per_iteration){
						// reached for the first time
						if(!this.parents[id]){
							this.parents[id] = this.parents[id] || instanceID;	
							new_configuration_count += 1;
						}
					}
					// console.log("added")
					if(newArraySet.add(puzzleInstanceSolver.getPuzzleIdentifier())){
						// add only once
						new_array.push(puzzleInstanceSolver);	
					}
				}
			}
		}
		console.log("Instances generated: ", configuration_count)
		console.log("Totally new instances: ", new_configuration_count)
		// console.log("**************************************************************")
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
		star = new PuzzleAStar(instance)
		return star.h()
	}
	this.solve = function(many_plans, all_options_per_iteration){
		initial_time = Date.now();
		this.limit = 1000000;
		this.count = 0; 
		this.a_star_count = 0;
		var instance = new PuzzleInstanceSolver(this.puzzle)
		var id = instance.getPuzzleIdentifier()
		this.parents = {};
		this.parents[id] = "";
		this.reached.add(id)
		var iteration = new MyMinHeap();
		iteration.push(instance)
		// console.log(iteration)
		var solution = this.starIterate(iteration, many_plans, all_options_per_iteration)

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
	this.starIterate = function(queue, many_plans, all_options_per_iteration){
		// if solved return path
		// else prepare next iteration
		var newArraySet = new MySet(); // add returns if added 
		// var new_configuration_count = 0; 
		// var configuration_count     = 0;
		this.count = this.count + 1; 
		console.log("**************************************************************")
		console.log("ITERATION: ", this.count)
		console.log("Array size: ", queue.content.length);
		var instance = queue.pop()
		console.log("instance: ", instance)
		var instanceID = instance.getPuzzleIdentifier();
		var puzzles = instance.generateNextSteps();
		
		// this.brute_force_count = this.brute_force_count  + 1; // count nodes expanded
		if(instance.isReady()){
			return instanceID;
		}
		for(var j = 0; j < puzzles.length; j++){
			var puzzleInstanceSolver = puzzles[j];
			var id = puzzleInstanceSolver.getPuzzleIdentifier();
			// console.log("	watching instance: ", id)
			// configuration_count += 1;
			if( all_options_per_iteration || this.reached.add(id) ){
				if(!all_options_per_iteration){
					// reached for the first time
					if(!this.parents[id]){
						this.parents[id] = this.parents[id] || instanceID;	
						// new_configuration_count += 1;
					}
				}
				// console.log("added")
				if(newArraySet.add(puzzleInstanceSolver.getPuzzleIdentifier())){
					// add only once
					// console.log("puzzleInstanceSolver: ", puzzleInstanceSolver, " - value=", puzzleInstanceSolver.to_value())
					queue.push(puzzleInstanceSolver);	
				}
			}
		}
		
		// console.log("Instances generated: ", configuration_count)
		// console.log("Totally new instances: ", new_configuration_count)
		// console.log("**************************************************************")
		// if reached here... try a new iteration if any
		if( queue.content.length == 0 || this.count >= this.limit ){
			return null; // impossible to reach a solution
		}
		console.log("queue: ", queue)
		return this.starIterate(queue, many_plans, all_options_per_iteration)
	}
	
}


getStar = function(selector){
	if(!selector){ 
	  selector = ".little-one"
	}
	pv = PuzzleController.getPuzzleView(selector)
	p = pv.puzzle
	solver1 = new PuzzleSolver(pv)
	solver1.solve(false, false)
	solver2 = new PuzzleSolver(pv)
	solver2.brute_force_solve(false, false)
	instance = new PuzzleInstanceSolver(p)
	star = PuzzleAStar(instance)
}