//O(NlogN) by divide&conquer
function findMaxSubArray(arr, low, high){
	if(arr && arr.constructor == Array && arr.length > 0){
		if(low == high){
			return {"start" : low, 
					"end":high, 
					"sum":arr[low]};
		}else{
			var mid = parseInt((low + high)/2);
			var leftMax = findMaxSubArray(arr, low, mid);
			var rightMax = findMaxSubArray(arr, mid+1, high);
			var crossMax = findCrossMaxSubArray(arr, low, mid, high);

			if(leftMax.sum >= rightMax.sum && leftMax.sum >= crossMax.sum){
				return leftMax;
			}else if(rightMax.sum >= leftMax.sum && rightMax.sum >= crossMax.sum){
				return rightMax;
			}else{
				return crossMax;
			}
		}
	}else{
		throw "is not an array or the array is empty";
	}
};

function findCrossMaxSubArray(arr, low, mid, high){
	var maxLeft, maxRight;
	var leftSum = -Infinity;
	var sum = 0;
	for(var i = mid; i >= low; i--){
		sum = sum + arr[i];
		if(sum > leftSum){
			leftSum = sum;
			maxLeft = i;
		}
	}

	var rightSum = -Infinity;
	sum = 0;
	for(var j = mid+1; j <= high; j++){
		sum = sum + arr[j];
		if(sum > rightSum){
			rightSum = sum;
			maxRight = j;
		}
	}

	return {"start" : maxLeft,
			"end" : maxRight,
			"sum" : leftSum + rightSum};
};

var testData = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
var allNegativeData = [-6, -2, -3, -4, -1, -5, -5];
console.log(findMaxSubArray(testData, 0, testData.length-1));
console.log(findMaxSubArray(allNegativeData, 0, testData.length-1));


//O(N) by Kanade's algo
function KanadeMSA(arr){
	var currentMax = 0,
		max = -Infinity,
		maxStart = 0,
		maxEnd = 0,
		maxStartIndexUntilNow = 0;

	for(var i = 0; i < arr.length; i++){
		currentMax += arr[i];
		if(currentMax > max){
			max = currentMax;
			maxStart = maxStartIndexUntilNow;
			maxEnd = i;
		}
		if(currentMax < 0){
			maxStartIndexUntilNow = i+1;
			currentMax = 0;
		}
	}

	return {"start" : maxStart,
			"end" : maxEnd,
			"sum" : max};
};

console.log(KanadeMSA(testData));
console.log(KanadeMSA(allNegativeData));