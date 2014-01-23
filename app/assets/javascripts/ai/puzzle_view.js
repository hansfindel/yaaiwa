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
	this.init = function(value){
		this.puzzle = new Puzzle() 
		this.puzzle.init(value);
		if(this.puzzle){
			self = this; 
			$(".puzzle-container").html(self._htmlRepresentation(self))
			$(".cell").unbind("click")
			$(".cell").click(function(e){
				// console.log("e: ", e)
				var target = e.target; 
				// console.log("t: ", target)
				var value  = $(target).data("cell-id")
				if(value > 0){
					console.log("this: ", this)
					moveable = self.puzzle.isMoveable(value);
					if(moveable == 1){
						console.log("aaaa")
						self.simpleMove(value);
						console.log("bbbb")
					}
				}
			})
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
	this.simpleMove = function(value){
		var cellIndex   = this.puzzle.findIndexFor(value); 
		var nearbyZeros = this.puzzle.findNearbyZeros(cellIndex); 
		var zeros_count = nearbyZeros.length; 
		if(zeros_count == 1){
			var zeroIndex = nearbyZeros[0];
			this.puzzle.simpleMove(cellIndex, zeroIndex)
			var from = $("[data-cell-index='"+cellIndex+"'")
			var to   = $("[data-cell-index='"+zeroIndex+"'")
			var f_v  = from.data("cell-id")
			var t_v  = to.data("cell-id") 
			console.log("tv: ", t_v)
			console.log("f_v: ", f_v)	
			if((f_v == "0" && t_v) || (f_v  && t_v == "0")) {
				from.data("cell-id", t_v)
				from.text(this.cellValue(t_v))
				to.data("cell-id", f_v)
				to.text(this.cellValue(f_v))
			}	
		}
	}
}