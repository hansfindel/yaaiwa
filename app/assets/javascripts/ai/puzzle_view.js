// PuzzleView = {
// 	puzzle: Puzzle, 
// 	id: null, 
// 	init: function(value){
// 		this.puzzle.init(value);
// 		if(this.puzzle){
// 			self = this; 
// 			$(".puzzle-container").html(self._htmlRepresentation(self))
// 			$(".cell").unbind("click")
// 			$(".cell").click(function(e){
// 				// console.log("e: ", e)
// 				var target = e.target; 
// 				// console.log("t: ", target)
// 				var value  = $(target).data("cell-id")
// 				if(value > 0){
// 					moveable = PuzzleView.puzzle.isMoveable(value);
// 					if(moveable == 1){
// 						console.log("aaaa")
// 						PuzzleView.simpleMove(value);
// 						console.log("bbbb")
// 					}
// 				}
// 			})
// 		}
// 	}, 
// 	setId: function(_id){
// 		if(typeof(id) == "string"){
// 			this.id = _id
// 		}
// 	}, 
// 	_id: function(){
// 		if(this.id){
// 			return "id='" + this.id + "'";
// 		} else {
// 			return "";
// 		}
// 	}, 
// 	_htmlRepresentation: function(self){
// 		// console.log("this: ", self)
// 		var puzzle = self.puzzle;
// 		// console.log("puzzle: ", puzzle)
// 		var side = puzzle.side; 
// 		// console.log("side; ", side)
// 		if(puzzle.side > 0){
// 			var html = "<div class='puzzle "+ puzzle.side +"_side' " + self._id() + " >";
// 			var counter = 0;
// 			for(var i = 0; i < puzzle.side; i++){
// 				html += "<div class='row' data-row='"+i+"'>"
// 				for(var j = 0; j < puzzle.side; j++){
// 					var val = puzzle.array[counter];
// 					html += "<div class='cell' data-cell-id='"+ val +"' data-cell-index='"+counter+"' data-row='"+i+"' data-col='"+j+"'>"+ this.cellValue(val) + "</div>"
// 					counter++;
// 				}
// 				html += "</div>"
// 			}
// 			html += "</div>"
// 			return html;
// 		} else {
// 			return ""
// 		}
// 	}, 
// 	cellValue: function(val){
// 		return (val > 0 ? val : "")
// 	}, 
// 	simpleMove: function(value){
// 		var cellIndex   = this.puzzle.findIndexFor(value); 
// 		var nearbyZeros = this.puzzle.findNearbyZeros(cellIndex); 
// 		var zeros_count = nearbyZeros.length; 
// 		if(zeros_count == 1){
// 			var zeroIndex = nearbyZeros[0];
// 			this.puzzle.simpleMove(cellIndex, zeroIndex)
// 			var from = $("[data-cell-index='"+cellIndex+"'")
// 			var to   = $("[data-cell-index='"+zeroIndex+"'")
// 			var f_v  = from.data("cell-id")
// 			var t_v  = to.data("cell-id") 
// 			console.log("tv: ", t_v)
// 			console.log("f_v: ", f_v)	
// 			if((f_v == "0" && t_v) || (f_v  && t_v == "0")) {
// 				from.data("cell-id", t_v)
// 				from.text(this.cellValue(t_v))
// 				to.data("cell-id", f_v)
// 				to.text(this.cellValue(f_v))
// 			}	
// 		}
// 	}
// }

function PuzzleView(){
	this.puzzle = null  
	this.id = null
	this.container = ".puzzle-container" // default 
	this.init = function(value, container){
		this.setContainer(container)
		this.puzzle = new Puzzle() 
		this.puzzle.init(value);
		if(this.puzzle){
			self = this; 
			this.id |= this.randomID()
			$(this.container).html(self._htmlRepresentation(self))
			$(this.container).data("container-name", this.container)
			var cells = $(".cell", self.container)
			// no unbinding since the trigger is very specific
			// may reuse if re-rendering is a possibility
			// cells.unbind("click") 
			cells.click(function(e){
				// this == cell clicked
				var context = this.parentElement.parentElement.parentElement; // container > matrix > row > cell
				var containerName = $(context).data("container-name")
				// console.log("context: ", context)
				// console.log("containerName: ", containerName)
				var target = e.target; 
				var value  = $(target).data("cell-id")
				var puzzleView = PuzzleController.getPuzzleView(containerName)
				if(value > 0){
					$(".selected", containerName).removeClass("selected")
					// get puzzle view clicked -> puzzle object
					if(puzzleView){
						moveable = puzzleView.puzzle.isMoveable(value);
						console.log("moveable ", moveable)
						if(moveable == 1){
							puzzleView.simpleMove(value, puzzleView);
						} else {
							$(this).addClass("selected")
						}
					}
				} else {
					// if selected tile, then move
					e = $(".selected", containerName)
					from = $(e).data("cell-index")
					to = $(this).data("cell-index")
					// check that are near
					dif = Math.abs(to - from)
					// same_row = puzzleView.puzzle.sameRow(from, to)
					// same_col = puzzleView.puzzle.sameCol(from, to)
					// console.log("sameRow = ", same_row)
					// console.log("sameCol = ", same_col)
					// if(same_row || same_col){
					if(dif == 1 || dif == puzzleView.puzzle.side){ 
						puzzleView.move(from, to, puzzleView)	
					}
					e.removeClass("selected")
				}
			})
		}
	}
	this.randomID = function(){
		return Date.now() + "-" + parseInt(Math.random() * 100)
	}
	this.setContainer = function(_container){
		if(_container){
			this.container = _container
		}
	}
	this.setId =  function(_id){
		if(typeof(id) == "string"){
			this.id = _id
		}
	}
	this._id =  function(){
		if(this.id){
			return "id='" + this.id + "'";
		} else {
			return "";
		}
	}
	this._htmlRepresentation = function(self){
		// console.log("this: ", self)
		var puzzle = self.puzzle;
		// console.log("puzzle: ", puzzle)
		var side = puzzle.side; 
		// console.log("side; ", side)
		if(puzzle.side > 0){
			var html = "<div class='puzzle "+ puzzle.side +"_side' " + self._id() + " >";
			var counter = 0;
			for(var i = 0; i < puzzle.side; i++){
				html += "<div class='row' data-row='"+i+"'>"
				for(var j = 0; j < puzzle.side; j++){
					var val = puzzle.array[counter];
					html += "<div class='cell' data-cell-id='"+ val +"' data-cell-index='"+counter+"' data-row='"+i+"' data-col='"+j+"'>"+ this.cellValue(val) + "</div>"
					counter++;
				}
				html += "</div>"
			}
			html += "</div>"
			return html;
		} else {
			return ""
		}
	}
	this.cellValue = function(val){
		return (val > 0 ? val : "")
	}
	this.simpleMove = function(value, puzzleView){
		var puzzle  = puzzleView.puzzle;
		// var context = puzzleView.container;

		var cellIndex   = puzzle.findIndexFor(value); 
		var nearbyZeros = puzzle.findNearbyZeros(cellIndex); 
		var zeros_count = nearbyZeros.length;
		console.log("cellIndex: ", cellIndex)
		if(zeros_count == 1){
			var zeroIndex = nearbyZeros[0];
			console.log("zeroIndex ", zeroIndex)
			this.move(cellIndex, zeroIndex, puzzleView)
		}
	}
	this.move = function(from, to, puzzleView){
		var puzzle  = puzzleView.puzzle;
		var context = puzzleView.container;
		console.log("move - ", from, " - ", to)
		puzzle.simpleMove(from, to);
		var from = $("[data-cell-index='"+from+"']", context);
		var to   = $("[data-cell-index='"+to+"']", context);
		var f_v  = from.data("cell-id");
		var t_v  = to.data("cell-id") ;
		if((f_v == "0" && t_v) || (f_v  && t_v == "0")) {
			from.data("cell-id", t_v);
			from.text(this.cellValue(t_v));
			to.data("cell-id", f_v);
			to.text(this.cellValue(f_v));
		}
	}
}