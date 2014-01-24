PuzzleController = {
	puzzleViews: [], 
	new: function(value, container){
		var _puzzleView = new PuzzleView();
		_puzzleView.init(value, container)
		if(_puzzleView.puzzle){
			this.puzzleViews.push(_puzzleView);
			return _puzzleView
		} else {
			return null;
		}
	}, 
	getPuzzleView: function(container){
		// console.log("**********************************")
		var options = this.puzzleViews.filter(function(_puzzleView){
			return _puzzleView.container == container
		})
		var e = options[0]
		if(e){
			return e;
		} else {
			return null;
		}
	}
}