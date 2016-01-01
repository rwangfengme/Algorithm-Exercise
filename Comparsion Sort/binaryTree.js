/*************** Binary Search Tree ******************
reference: http://wuzhiwei.net/ds_app_bst/
		   http://khan4019.github.io/front-end-Interview-Questions/bst.html
*/
function BinarySearchTree(){
	this.root = null;
	this.height = 0;
}

function BstNode(key, value, parent){
	this.key = key;
	this.valueList = [value];
	this.parent = parent || null;
	this.left = null;
	this.right = null;
};

BinarySearchTree.prototype._find = function(key){
	var node = this.root;
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

BinarySearchTree.prototype._findMin = function(root){
	while(root && root.left){
		root = root.left;
	}

	return root;
};

BinarySearchTree.prototype._findMax = function(root){
	while(root && root.right){
		root = root.right;
	}

	return root;
};

BinarySearchTree.prototype._add = function(key, value){
	if(this.root == null){
		this.root = new BstNode(key, value);
		return;
	};

	var node = this.root;

	while(node){
		if(key < node.key){
			if(node.left){
				node = node.left;
			}else{
				node.left = new BstNode(key, value, node);
				return;
			}
		}else if(key > node.key){
			if(node.right){
				node = node.right;
			}else{
				node.right = new BstNode(key, value, node);
				return;
			}
		}else{
			node.valueList.push(value);
			return;
		}
	}
};

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
		return ;
	}else{
		node.left ? node.parent.left = node.left : node.parent.right = node.right;
		return;
	}
};

// The order is Left / Node / Right
BinarySearchTree.prototype._inorderTraversal = function(func){
	var node = this.root;
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

// The order is Node / Left / Right
BinarySearchTree.prototype._preorderTraversal = function(func){
	var node = this.root;
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


/**************** Preparations *******************/
var arr = [], arrLen, count, tmpArr;
generateNums(1000, 10000, arr);

function generateNums(nums, scope, arr){
	for(var i = 0; i < nums; i++){
		var temp = Math.floor(Math.random()*scope);
		arr.push(temp);
	}
};

function initialArr(){
	tmpArr = arr.slice();
	count = 0;
	arrLen = tmpArr.length;
};

function testCorrect(arr){
	for(var i = 0; i < arrLen-1; i++){
		if(arr[i]>arr[i+1]){
			return false;
		}
	}
	return true;
};


/****************** sorting test **********************
 By using Binary Search Tree, we can easily get an sorted arr from the input.
just built a BST and then do inorder travel, here's an example
*/
initialArr();

var BST = new BinarySearchTree();
for(var i = 0; i<arrLen; i++){
	BST._add(arr[i], i);
}

function outputSortedArr(BST){
	var orderedElements = [];
	BST._inorderTraversal(function(node){
		orderedElements.push(node);
	});
	var sortedArr = [];

	for(var j = 0; j < orderedElements.length; j++){
		for(var k = 0; k<orderedElements[j].valueList.length; k++){
			sortedArr.push(orderedElements[j].key);
		}
	}

	return sortedArr;
}

var result = outputSortedArr(BST);
console.log("BinarySearchTree Sort", testCorrect(result), result);



/****************** preorder traversal test *************
*/
var preorderArr = [40, 25, 78, 10, 32, 7, 31, 35];
var preorderBST = new BinarySearchTree();

for(var i = 0; i<preorderArr.length; i++){
	preorderBST._add(preorderArr[i], i);
}

var preorderElements = [];
preorderBST._preorderTraversal(function(node){
	preorderElements.push(node);
});

console.log(preorderElements);



/****************** remove test **********************
_remove(key, value, node)
we only use two parameters
*/

var toRemove = 11;
//because this BST accept the same key, their difference(value) stored in BstNode.valueList
//So when we try to remove a key with specific value, we should provide the value, or it'll
//del the first value in the valueList
var toRemoveValue; 

var testBST = new BinarySearchTree();
var testArr = [15,11,17,8,12,16,18,7,10,13,9,8];
for(var i = 0; i<testArr.length; i++){
	testBST._add(testArr[i], i);
}

testBST._remove(toRemove, toRemoveValue);

//After removal, we can check the correctness of the remaining BST by checking the correctness
//of the sorted array

var result = outputSortedArr(testBST);

console.log(result, testCorrect(result));











