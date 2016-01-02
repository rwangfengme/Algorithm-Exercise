/**************** Preparations for sorting *******************/
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
40, 25, 10, 7, 32, 31, 35, 78 is the right order
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

var result = [];
for(var j in preorderElements){
	result.push(preorderElements[j].key);
}
console.log(result);
console.log(preorderBST._getDepth());



/****************** postorder traversal test *************
7, 10 ,31, 35, 32, 25, 78, 40 is the right order
*/
var postorderArr = [40, 25, 78, 10, 32, 7, 31, 35];
var postorderBST = new BinarySearchTree();

for(var i = 0; i<postorderArr.length; i++){
	postorderBST._add(postorderArr[i], i);
}

var postorderElements = [];
postorderBST._postorderTraversal(function(node){
	postorderElements.push(node);
});

var result = [];
for(var j in postorderElements){
	result.push(postorderElements[j].key);
}
console.log(result);



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


