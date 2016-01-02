/*************** Binary Search Tree ******************
reference: http://wuzhiwei.net/ds_app_bst/
		   http://khan4019.github.io/front-end-Interview-Questions/bst.html

If a function name has a _R suffix, it's recursion. Or it implement by iteration.

TODO: checkBalanced
*/
function BinarySearchTree(){
	this.root = null;
	this.size = 0;
}

function BstNode(key, value, parent){
	this.key = key;
	// store elements which has same key but different values
	// useful when sorting an array which has duplicate elements
	// can be ignored if you just want a simple BST
	this.valueList = [value];
	this.parent = parent || null;
	this.left = null;
	this.right = null;
	this.depth = parent? parent.depth + 1 : 1;
};

BinarySearchTree.prototype._find = function(key, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	while(node){
		if(node.key == key){
			return node;
		}

		if(node.key > key){
			node = node.left;
		}

		if(node.key < key){
			node = node.right;
		}
	}
	return node;
};

BinarySearchTree.prototype._find_R = function(key, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	if(node){
		if(node.key == key){
			return node;
		}else if(node.key > key){
			return this._find_R(key, node.left);
		}else{
			return this._find_R(key, node.right);
		}
	}
};

BinarySearchTree.prototype._findMin = function(root){
	while(root && root.left){
		root = root.left;
	}

	return root;
};

BinarySearchTree.prototype._findMin_R = function(root){
	if(root && root.left){
		return this._findMin_R(root.left);
	}
};

BinarySearchTree.prototype._findMax = function(root){
	while(root && root.right){
		root = root.right;
	}

	return root;
};

BinarySearchTree.prototype._findMax_R = function(root){
	if(root && root.right){
		return this._findMax_R(root.right);
	}
};

BinarySearchTree.prototype._add = function(key, value){
	if(this.root == null){
		this.root = new BstNode(key, value);
		this.root.depth = 1;
		this.size ++ ;
		return;
	};

	var node = this.root;

	while(node){
		if(key < node.key){
			if(node.left){
				node = node.left;
			}else{
				node.left = new BstNode(key, value, node);
				this.size ++;
				return;
			}
		}else if(key > node.key){
			if(node.right){
				node = node.right;
			}else{
				node.right = new BstNode(key, value, node);
				this.size ++;
				return;
			}
		}else{
			node.valueList.push(value);
			return;
		}
	}
};

BinarySearchTree.prototype._add_R = function(key, value, node){
	if(this.root == null){
		this.root = new BstNode(key, value);
		this.root.depth = 1;
		this.size ++ ;

		return;
	}

	if(node.key < key){
		node.left == null ? 
			node.left = new BstNode(key, value, node) :
			this._add_R(key, value, node.left);
	}else if(node.key > key){
		node.right == null ?
			node.right = new BstNode(key, value, node) :
			this._add_R(key, value, node.right);
	}else{
		node.valueList.push(value);
		return;
	}

}


BinarySearchTree.prototype._remove = function(key, value, node){
	var node = node || this._find(key);

	if(!node){
		return;
	}
	
	if(node.valueList.length > 1){
		var index = node.valueList.indexOf(value);
		node.valueList.splice(index ? index : 0, 1);
		return;
	}else if(node.left && node.right){
		var rightMin = this._findMin(node.right);
		
		node.key = rightMin.key;
		node.valueList = rightMin.valueList;
		
		//After we copy the rightMin parameter to the toRemoved BstNode, the BST is broken
		//actually now there're two nodes == rightMin, and by using _find() function, we can only get the first one
		//what we want and need to remove is the second(original) rightMin, so the third parament is introduced
		//it directly set the node to be removed and skip the _find() process
		this._remove(key, value, rightMin);
	}else if(!node.left && !node.right){
		(node == node.parent.left)? node.parent.left = null : node.parent.right = null;
		this.size --;
		return ;
	}else{
		node.left ? node.parent.left = node.left : node.parent.right = node.right;
		this.size --;
		return;
	}
};

// The order is Left / Node / Right
BinarySearchTree.prototype._inorderTraversal = function(func, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	var stack = [];


	while(node){
		if(node.left){
			stack.push(node);
			node = node.left;
		}else{
			func(node);
			while(!node.right){
				node = stack.pop();
				if(!node){
					return ;
				}
				func(node);
			}
			node = node.right;
		}
	}

	return orderedArr;
};

BinarySearchTree.prototype._inorderTraversal_R = function(func, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	if(node){
		this._inorderTraversal_R(func, node.left);
		func(node);
		this._inorderTraversal_R(func, node.right);
	}
};

// The order is Node / Left / Right
BinarySearchTree.prototype._preorderTraversal = function(func, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	var stack = [];

	while(node){
		func(node);
		if(node.left){
			if(stack[stack.length-1]!=node){
				stack.push(node);
			}
			node = node.left;
		}else{
			while(!node.right){
				node = stack.pop();
				if(!node){
					return;
				}
			}

			node = node.right;
			stack.push(node);
		}
	}
};

// The order is Left / Right / Node
BinarySearchTree.prototype._postorderTraversal = function(func, node){
	var node = node || this.root;
	if(!(node instanceof BstNode)){
		throw "invalid node";
	};

	var stack = [];

	while(node){
		if(node.left){
			stack.push({"node" : node, visited : false});
			node = node.left;
		}else{
			var visitedNode;
			while(!node.right){
				func(node);

				visitedNode = stack.pop();
				node = visitedNode.node;

				if(!node){
					return;
				}
			}

			while(visitedNode){
				if(visitedNode.visited == false){
					stack.push({"node":visitedNode.node, visited : true});
					node = node.right;
					visitedNode = null;
				}else{
					func(visitedNode.node);
					if(stack.length > 0){
						visitedNode = stack.pop();
						node = visitedNode.node;
					}else{
						visitedNode = null;
						return ;
					}
				};
			}

			
		}

	}
};

//can simply done by traverse the whole tree
BinarySearchTree.prototype._getDepth = function(){
	var depth = 0;
	this._inorderTraversal(function(node){
		if(node.depth > depth){
			depth = node.depth;
		}
	});

	return depth;
};