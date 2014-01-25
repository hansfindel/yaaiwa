var MyMinHeap = function() { 
	this.content = []; 
}

MyMinHeap.prototype.push = function(o) { 
	this.content.push(o); 
	this.sort(true)

}
	
MyMinHeap.prototype.pop = function() { 
	this.content[0] = null; 
	this.sort(false)
}
MyMinHeap.prototype.sort = function(add) { 
	// check if not null
	// if not null expects to respond to the to_value method.
	content = this.content;
	function sortSubtree(index){
		var e     = this.content[    index      ];
		var left  = this.content[2 * index  + 1 ];
		var right = this.content[2 * (index + 1)];
		if(left){  
			var l_val = left.to_value()
		}
		if(right){
			var r_val = right.to_value()
		}
		var min;
		if(l_val && r_val){
			min = l_val < r_val ? l_val : r_val
		}
		else{
			min = l_val || r_val
		}
		// if null probably removed
		// check children, 
		// if possible replace with smaller one and keep going
		if(min){
			if(min == l_val){
				this.content[index] = left;
				sortSubtree(2 *  index + 1 )
			} else {
				this.content[index] = right;
				sortSubtree(2 * (index + 1))
			}
		}	
	}
	function sortRoot(index){
		var parentIndex = parseInt((index/2) - 1)
		if(parentIndex == -1){
			return;
		}
		var child  = content[index];
		var parent = content[parentIndex];
		if(child.to_value() < parent.to_value()){
			// var temp = parent; 
			this.content[parentIndex] = child 
			this.content[index] = parent; 
			sortRoot(parentIndex);
		}
	}
	if(add){
		length = this.content.length
		if(length > 0){
			length = length - 1
		}
		sortRoot(length)
	} else {
		sortSubtree(0)
	}
}

MyMinHeap.prototype.print = function(){
	var content = this.content;
	function printSubtree(indexes){
		var new_array = []
		var values = []
		indexes.map(function(index){
			var left  = 2 * index + 1
			var right = 2 * index + 2
			var l_val = content[left]
			if(l_val){
				new_array.push(left)
			}
			var r_val = content[right]
			if(r_val){				
				new_array.push(right)
			}
			// console.log(content[index].to_value())
			values.push(content[index].to_value())
		})
		console.log(values.join("\t"))
		console.log("----------------------------------")
		if(new_array.length > 0){
			printSubtree(new_array)
		}
	}
	printSubtree([0])
}


q = new MyMinHeap()
q.push(new e(178))
q.push(new e(124))
q.push(new e(1512))
q.push(new e(4212))
q.push(new e(55512))
q.push(new e(1212))
q.print()
console.log("****************************************")
q.push(new e(1))
q.push(new e(111))
q.push(new e(13321))
q.push(new e(1331221))
q.push(new e(13324441))
q.print()
console.log("****************************************")
q.push(new e(13321222))
q.push(new e(13321333))
q.push(new e(1))
q.print()