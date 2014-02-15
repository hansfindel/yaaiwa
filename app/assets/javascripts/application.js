// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
// require turbolinks
//= require_tree .
//= require_tree ../../../vendor/assets/javascripts/

$(document).ready(function(){
	//PuzzleView.init(16)	
	// var _puzzleView = new PuzzleView()
	// _puzzleView.init(16)

	// var _puzzleView2 = new PuzzleView()
	// _puzzleView2.init(9, ".little-one")

	// var _puzzleView = PuzzleController.new(16)
	var _puzzleView = PuzzleController.new([0, 5, 3, 2, 1, 0, 4, 6, 0])
	var _puzzleView2 = PuzzleController.new(9, ".little-one")

})

