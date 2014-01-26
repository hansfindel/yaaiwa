// Puzzle = {
// 	array : [],
// 	side  : 0,
// 	// id    : null, 

// 	init : function(val){
// 		if(typeof(val) == "number"){
// 			this._initByNumber(val)
// 		}
// 		else if(typeof(val) == "object"){
// 			this._initByArray(val)
// 		}
// 	}, 
// 	// size < 0 do not matter, only square values
// 	// 1 is empty and trivial, so do not accept!
// 	_initByArray: function(array){
// 		var size = array.length;
// 		if(size > 3){
// 			var sqrt = Math.sqrt(size);
// 			// can build a square
// 			if(sqrt == parseInt(sqrt)){
// 				// check the numbers are consecutive
// 				var numbers = []
// 				for(var i = 0; i < size; i++){
// 					var val = array[i];
// 					if(typeof(val) != "number"){
// 						// check if all numbers
// 						return; 
// 					}
// 					if(val >= size || val < 0){
// 						// out of borders
// 						return; 
// 					}
// 					if(numbers[val]){
// 						// could make an exception for 0 (empty-space)
// 						// already there
// 						return;
// 					} else {
// 						numbers[val] = true	
// 					}
// 				}
// 				this.array = array;
// 				this.side = sqrt;
// 			}
// 		}
// 	},
// 	_initByNumber: function(size){
// 		if(size > 3){
// 			var sqrt = Math.sqrt(size);
// 			// can build a square
// 			if(sqrt == parseInt(sqrt)){
// 				this.side = sqrt;
// 				// empty array if there was something there before
// 				this.array = []; 
// 				for(var i = 0; i < size; i++){
// 					this.array.push(i)
// 				}
// 			}
// 		}	
// 	}, 
// 	isOrdered: function(){
// 		if(this.side > 0){
// 			for(var i = 0; i < this.array.length; i++){
// 				if(this.array[i] != i){
// 					return false;
// 				}
// 			}
// 			return true;
// 		}
// 		return false; 
// 	}, 
// 	isMultiZero: function(){
// 		// $("[data-cell-id='"+0+"']").length == 1 ? false : true; 
// 		var count = 0; 
// 		for(var i = 0; i < this.array.length; i++){
// 			if(this.array[i]==0){
// 				count++;
// 			}
// 		}
// 		return count > 1;
// 	}, 
// 	isMoveable: function(val){
// 		// easy way: search 0 and then the adjacents
// 		// var adjacent = [] 
// 		// this way: implemented from cell to search 0's (multi-0 case)

// 		// jQuery
// 		// var multiMove = this.isMultiZero();
// 		// var count = 0; 
// 		// var cell = $("[data-cell-id='"+val+"']") 
// 		// var y = $(cell).data("row")
// 		// var x = $(cell).data("col")
// 		// for(var i = -1; i <= 1; i++){
// 		// 	var _y = y + i;
// 		// 	if(_y >= 0 && y < this.side){
// 		// 		for(var j = -1; j <= 1; j++){
// 		// 			var _x = x + j; 
// 		// 			if(_x >= 0 && x < this.side){
// 		// 				var sum = Math.abs(i) + Math.abs(j)
// 		// 				if(sum == 1){
// 		// 					// only one active
// 		// 					var selector = "[data-row='"+_y+"'][data-col='"+_x+"']"
// 		// 					var _cell = $(selector)
// 		// 					var _val = $(_cell).val() 
// 		// 					count++; 
// 		// 					if(!multiMove){
// 		// 						return count; 
// 		// 					}
// 		// 				}
// 		// 			}
// 		// 		}
// 		// 	}
// 		// }
// 		// return count; // if count == 0 -> false equivalent

// 		// js-data implementation
// 		var cellIndex   = this.findIndexFor(val); 
// 		var nearbyZeros = this.findNearbyZeros(cellIndex); 
// 		var zeros_count = nearbyZeros.length; 
		
// 		return zeros_count; // if count == 0 -> false equivalent
// 	}, 
// 	findIndexFor: function(val){
// 		// asume val != 0
// 		cellIndex = -1; 
// 		for(var i = 0; i < this.array.length && cellIndex < 0; i++){
// 			if(this.array[i] == val){
// 				cellIndex = i; 
// 			}
// 		}
// 		return cellIndex;
// 	}, 
// 	findNearbyZeros: function(index){
// 		// index is the position of the value
// 		var nearbyZeros = []
// 		for(var pos = -1; pos <= 1; pos++){
// 			if(pos != 0){
// 				var next = index + pos; // next in the row - left or right
// 				if(next >= 0 && next < this.array.length){
// 					var next_val = this.array[next]
// 					if(next_val == 0){
// 						nearbyZeros.push(next)
// 					}
// 					var offset = index + pos * this.side; // row adjacent - up or down
// 					if(offset >= 0 && offset < this.array.length){
// 						next_val = this.array[offset]
// 						if(next_val == 0){
// 							nearbyZeros.push(offset)
// 						}
// 					}
// 				}
// 			}
// 		}
// 		return nearbyZeros; 
// 	}, 
// 	validIndex: function(index){
// 		return (index >= 0 && index < this.array.length)
// 	}, 
// 	simpleMove: function(index1, index2){
// 		if(this.validIndex(index1) && this.validIndex(index2)){
// 			var temp = this.array[index1]
// 			this.array[index1] = this.array[index2]
// 			this.index2 = temp; 
// 		}
// 	}
// }


function Puzzle (){
	this.array = []
	this.side  = 0
	// id    : null, 

	this.init = function(val){
		if(typeof(val) == "number"){
			this._initByNumber(val)
		}
		else if(typeof(val) == "object"){
			this._initByArray(val)
		}
	}
	// size < 0 do not matter, only square values
	// 1 is empty and trivial, so do not accept!
	this._initByArray = function(array){
		var size = array.length;
		if(size > 3){
			var sqrt = Math.sqrt(size);
			// can build a square
			if(sqrt == parseInt(sqrt)){
				// check the numbers are consecutive
				var numbers = []
				for(var i = 0; i < size; i++){
					var val = array[i];
					if(typeof(val) != "number"){
						// check if all numbers
						return; 
					}
					if(val >= size || val < 0){
						// out of borders
						return; 
					}
					if(numbers[val] && val != 0){
						// an exception for 0 (empty-space) for multiZero puzzles
						// already there
						return;
					} else {
						numbers[val] = true	
					}
				}
				this.array = array;
				this.side = sqrt;
			}
		}
	}
	this._initByNumber = function(size){
		if(size > 3){
			var sqrt = Math.sqrt(size);
			// can build a square
			if(sqrt == parseInt(sqrt)){
				this.side = sqrt;
				// empty array if there was something there before
				this.array = []; 
				for(var i = 0; i < size; i++){
					this.array.push(i)
				}
			}
		}	
	}
	this.isOrdered = function(){
		// unstrict order ([x|y..] || x < y || y out of bounds)
		if(this.side > 0){
			var previous = 0; 
			for(var i = 0; i < this.array.length; i++){
				var current = this.array[i]; 
				if( previous > current ){
					return false;
				}
				previous = current; 
			}
			return true;
		}
		return false; 
	}
	this.isMultiZero = function(){
		// $("[data-cell-id='"+0+"']").length == 1 ? false : true; 
		var count = 0; 
		for(var i = 0; i < this.array.length; i++){
			if(this.array[i]==0){
				count++;
			}
		}
		return count > 1;
	}
	this.isMoveable = function(val){
		var cellIndex   = this.findIndexFor(val); 
		var nearbyZeros = this.findNearbyZeros(cellIndex); 
		var zeros_count = nearbyZeros.length; 
		
		return zeros_count; // if count == 0 -> false equivalent
	}
	this.findIndexFor = function(val){
		// asume val != 0
		cellIndex = -1; 
		for(var i = 0; i < this.array.length && cellIndex < 0; i++){
			if(this.array[i] == val){
				cellIndex = i; 
			}
		}
		return cellIndex;
	}
	this.findNearbyZeros = function(index){
		// index is the position of the value
		var nearbyZeros = []
		for(var pos = -1; pos <= 1; pos++){
			if(pos != 0){
				var next = index + pos; // next in the row - left or right
				if(next >= 0 && next < this.array.length){
					var next_val = this.array[next]
					if(next_val == 0){
						nearbyZeros.push(next)
					}
					var offset = index + pos * this.side; // row adjacent - up or down
					if(offset >= 0 && offset < this.array.length){
						next_val = this.array[offset]
						if(next_val == 0){
							nearbyZeros.push(offset)
						}
					}
				}
			}
		}
		return nearbyZeros; 
	}
	this.validIndex = function(index){
		return (index >= 0 && index < this.array.length)
	}
	this.simpleMove = function(index1, index2){
		if(this.validIndex(index1) && this.validIndex(index2)){
			var temp = this.array[index1];
			this.array[index1] = this.array[index2]
			this.array[index2] = temp; 
		}
	}
}