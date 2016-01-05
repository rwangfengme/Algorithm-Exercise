/* reference:
 * http://www.geekviewpoint.com/java/sorting/countingsort
 * http://stackoverflow.com/questions/14368392/radix-sort-vs-counting-sort-vs-bucket-sort-whats-the-difference
 */

/**************** Preparations *******************/
var arr = [], 
	arrLen, 
	count, 
	tmpArr, 
	max=0;
generateNums(200, 1000, arr);

function generateNums(nums, scope, arr){
	for(var i = 0; i < nums; i++){
		var temp = Math.floor(Math.random()*scope);
		temp > max ? (max = temp) : true; 
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

initialArr();
console.log(arr);

/*
* Quote: "Because counting sort creates a bucket for each value, an imposing restriction is :
*     	  the maximum value in the input array be known beforehand."
* The biggest problem for counting sort is, we should create a list which length equals to maxVal,
* and count each element then record it in that list. But it will cause a big waste of space. Like
* [1, 2, 1000], only 3 elements, but we still need to create a list which has 1001 slots to hold it.
* the best / average / wrost case both O(N), need N+r space , stable
*/
function countingSort(arr, maxVal){
	var countingArr = [],
		result = [],
		i = maxVal;

	while(i >= 0){
		countingArr[i] = 0;
		i -- ;
	}

	for(var j in arr){
		countingArr[arr[j]] += 1;
	}

	for(var k = 0; k < countingArr.length; k++){
		while(countingArr[k]>0){
			result.push(k);
			countingArr[k] --;
		}
	};

	return result;
};



var result = countingSort(arr, max);
console.log("Counting Sort", result, testCorrect(result));



/*
 * Quote:
 * Time Complexity of Solution:
 *   Best Case O(k*n); Average Case O(k*n); Worst Case O(k*n),
 *   where k is the length of the longest number and n is the
 *   size of the input array.
 *
 *   Note: if k is greater than log(n) then an n*log(n) algorithm would be a
 *         better fit. In reality we can always change the radix to make k
 *         less than log(n).
 */

function radixSort(arr, max){
	var radix = 10,
		mod = 10,
		result = arr,
		bucketArr = [];

	var maxDigitNum = String(max).split("").length;
	console.log(maxDigitNum);
	for(var i = 0; i < radix; i++){
		bucketArr[i] = [];
	};

	for(var j = 0; j < maxDigitNum; j++, mod*=10){
		for(var k = 0; k < arr.length; k++){
			var digit = parseInt((result[k] % mod) / (mod / 10));
			bucketArr[digit].push(result[k]);
		}
		
		result = [];
		for(var t = 0; t < radix; t++){
			while(bucketArr[t].length > 0){
				result.push(bucketArr[t].shift());
			}
		}
	}
	

	

	return result;
};

var result = radixSort(arr, max);
console.log("Radix Sort", result, testCorrect(result));













