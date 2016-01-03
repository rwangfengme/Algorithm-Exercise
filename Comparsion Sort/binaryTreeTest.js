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


function convertArrToBST(arr, BST){
	for(var i = 0; i<arr.length; i++){
		BST._add(arr[i], i);
	}
};

function outputTraversalArr(BST, orderFunc){
	var orderedElements = [];
	orderFunc.call(BST, (function(node){
		orderedElements.push(node);
	}));
	var sortedArr = [];

	for(var j = 0; j < orderedElements.length; j++){
		for(var k = 0; k<orderedElements[j].valueList.length; k++){
			sortedArr.push(orderedElements[j].key);
		}
	}
	return sortedArr;
};

/****************** sorting test **********************
 By using Binary Search Tree, we can easily get an sorted arr from the input.
just built a BST and then do inorder travel, here's an example
*/
initialArr();

var BST = new BinarySearchTree();
convertArrToBST(arr, BST);

var result = outputTraversalArr(BST, BST._inorderTraversal);
console.log("BinarySearchTree Sort", testCorrect(result), result);


/****************** preorder traversal test *************
40, 25, 10, 7, 32, 31, 35, 78 is the right order
*/
var preorderArr = [40, 25, 78, 10, 32, 7, 31, 35];
var preorderBST = new BinarySearchTree();

convertArrToBST(preorderArr, preorderBST);

var result = outputTraversalArr(preorderBST, preorderBST._preorderTraversal);

console.log(result);
console.log(preorderBST._getDepth());



/****************** postorder traversal test *************
7, 10 ,31, 35, 32, 25, 78, 40 is the right order
*/
var postorderArr = [40, 25, 78, 10, 32, 7, 31, 35];
var postorderBST = new BinarySearchTree();

convertArrToBST(postorderArr, postorderBST);

var result = outputTraversalArr(postorderBST, postorderBST._postorderTraversal);

console.log(result);



/****************** breadth first traversal test *************
7, 10 ,31, 35, 32, 25, 78, 40 is the right order
*/
var bfsArr = [40, 25, 78, 10, 32, 7, 31, 35];
var bfsBST = new BinarySearchTree();

convertArrToBST(bfsArr, bfsBST);

var result = outputTraversalArr(bfsBST, bfsBST._breadthFirstTravseal);

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

convertArrToBST(testArr, testBST);

testBST._remove(toRemove, toRemoveValue);

//After removal, we can check the correctness of the remaining BST by checking the correctness
//of the sorted array

var result = outputTraversalArr(testBST, testBST._inorderTraversal);

console.log(result, testCorrect(result));


