
/*************** Binary Search Tree ******************
reference: http://wuzhiwei.net/ds_app_bst/
*/
function BinarySearchTree(){
	this.root = null;
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
		node.valueList.splice(node.valueList.indexOf(value), 1);
		return;
	}else if(node.left && node.right){
		var rightMin = this._findMin(node.right);
		if(node == node.parent.left){
			node.parent.left.key = rightMin.key;
			node.parent.left.valueList = rightMin.valueList;
		}else{
			node.parent.right.key = rightMin.key;
			node.parent.right.valueList = rightMin.valueList;
		}
		
		this._remove(key, value, rightMin);
	}else if(!node.left && !node.right){
		(node == node.parent.left)? node.parent.left = null : node.parent.right = null;
		return ;
	}else{
		if(node.left){
			node.parent.left = node.left;
		}else{
			node.parent.right = node.right;
		}
		
		return;
	}
};

BinarySearchTree.prototype._inOrderTravel = function(){
	var node = this.root;
	var stack = [];

	var orderedArr = [];

	while(node){
		if(node.left){
			stack.push(node);
			node = node.left;
		}else{
			orderedArr.push(node);
			while(!node.right){
				node = stack.pop();
				if(!node){
					return orderedArr;
				}
				orderedArr.push(node);
			}
			node = node.right;
		}
	}

	return orderedArr;
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

/* By using Binary Search Tree, we can easily get an sorted arr from the input.
just built a BST and then do inorder travel
*/
/*initialArr();

var BST = new BinarySearchTree();
for(var i = 0; i<arrLen; i++){
	BST._add(arr[i], i);
}

var orderedElements = BST._inOrderTravel();
var sortedArr = [];

for(var j = 0; j < orderedElements.length; j++){
	for(var k = 0; k<orderedElements[j].valueList.length; k++){
		sortedArr.push(orderedElements[j].key);
	}
}

console.log("BinarySearchTree Sort", testCorrect(sortedArr), sortedArr);*/

/*remove*/
var testBST = new BinarySearchTree();
var testArr = [15,11,17,8,12,16,18,7,10,13,9];
for(var i = 0; i<testArr.length; i++){
	testBST._add(testArr[i], i);
}


var toRemove = 11;

testBST._remove(toRemove);

var orderedElements = testBST._inOrderTravel();
var sortedArr = [];

for(var j = 0; j < orderedElements.length; j++){
	for(var k = 0; k<orderedElements[j].valueList.length; k++){
		sortedArr.push(orderedElements[j].key);
	}
}

console.log(sortedArr);











