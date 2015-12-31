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


/*************** Selection Sort ******************
The simplest sorting algorithm, for each turn, find the minium number from the unsorted area, 
and place it to the end of the sorted area.
the best case / average / wrost case are both O(n^2), need 1 extra memory and not stable
*/

initialArr();

function selectionSort(arr){
	var tmp;
	for(var i = 0; i < arrLen - 1; i++){
		for(var j = i+1; j < arrLen; j++){
			if(arr[i] > arr[j]){
				tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
			count++;
		}
	}
};

selectionSort(tmpArr);
console.log("Selection Sort", testCorrect(tmpArr), tmpArr, count);



/*************** Bubble Sort ******************
Compare adjacent two elements, swap them if the first element is bigger,
so for every turn, we put the biggest number of the unsorted area into the right place.
The best case is O(n), if the array is already sorted, the average and wrost case both O(n^2).
Need 1 extra memory and stable
*/

initialArr();

function bubbleSort(arr){

	var swapped, tmp;
	var newEndIndex = arrLen;

	do{
		swapped = false;
		var endIndex = newEndIndex;

		for(var i = 1; i < endIndex; i++){
			if(arr[i] < arr[i-1]){
				tmp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = tmp;

				swapped = true;
				newEndIndex = i;
			}
			count ++;
		}

	}while(swapped);
};

bubbleSort(tmpArr);
console.log("Bubble Sort", testCorrect(tmpArr), tmpArr, count);



/*************** Cocktail Sort ******************
An optimized version of bubble sort, it do bubble sort in two direction, to avoid the "turtles".
To the original bubble sort, if the minimum number located at the last of the array, it takes n-1 step to move forward.
It provides only marginal performance improvement.
*/

initialArr();

function cocktailSort(arr){
	var swapped, tmp;
	var newStartIndex=0, 
		newEndIndex = arrLen;

		startIndex = newStartIndex;
		endIndex = newEndIndex;

	do{
		swapped = false;
		
		startIndex = newStartIndex;

		for(var i = startIndex+1; i < endIndex; i++){
			if(arr[i] < arr[i-1]){
				tmp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = tmp;

				newEndIndex = i;
				swapped = true;
			}
			count ++;
		}

		endIndex = newEndIndex;

		for(var j = endIndex-1; j > startIndex; j--){
			if(arr[j] < arr[j-1]){
				tmp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = tmp;

				newStartIndex = j;
				swapped = true;
			}
			count ++;
		}
	}while(swapped)
};

cocktailSort(tmpArr);
console.log("Cocktail Sort", testCorrect(tmpArr), tmpArr, count);



/*************** Insertion Sort ******************
For every turn, insert one element to the right position of the sorted area
The best case is O(n), the average and wrost case both (n^2)
Need 1 extra memory and stable
*/

initialArr();

function insertionSort(arr){
	for(var i = 1; i < arrLen; i++){
		var key = arr[i];
		var j = i - 1;

		count++;
		
		while(j >= 0 && arr[j] > key){
			arr[j+1] = arr[j];
			j -- ;	

			count ++;
		}

		arr[j+1] = key;
	}
};


insertionSort(tmpArr);
console.log("Insertion Sort", testCorrect(tmpArr), tmpArr, count);



/*************** Merge Sort ******************
By using divide & conque, split the array to each one element and merge them into a ordered new arry
The best / average / wrost case are both O(nlogn), need n memory space and stable
*/

initialArr();

function mergeSort(arr){
	var arrLen = arr.length;

	if(arrLen < 2){
		return arr;
	}

	var middle = Math.floor(arrLen/2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle, arrLen);

	return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right){
	var mergedArr = [];

	while(left.length && right.length){
		if(left[0] > right[0]){
			mergedArr.push(right.shift());
		}else{
			mergedArr.push(left.shift());
		}

		count ++;
	}

	if(!left.length){
		mergedArr = mergedArr.concat(right);
	}else{
		mergedArr = mergedArr.concat(left);
	}

	return mergedArr;
};

tmpArr = mergeSort(tmpArr);
console.log("Merge Sort", testCorrect(tmpArr), tmpArr, count);



/*************** Quick Sort ******************
Set a pivot, then move the number less than pivot to left and bigger number to the right, do it recursively.
the best / average case is O(nlogn) and the wrost case is O(n^2) when you choose the largest / smallest number to be the pivot
typically non-stable and takes logn memory in average, n in wrost case.
It's important to choose appropriate pivot. Median of 3 is a common function to do this.
*/

initialArr();

function quickSort(arr){
	var arrLen = arr.length;
	if(arrLen < 2){
		return arr;
	}

	var pivot = parseInt(arrLen/2);
	var left = [], right = [];

	for(var i = 0; i < arrLen; i++){
		count ++;
		if(i == pivot){
			continue;
		}

		if(arr[i] < arr[pivot]){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat(arr[pivot], quickSort(right));
};

tmpArr = quickSort(tmpArr);
console.log("Quick Sort", testCorrect(tmpArr), tmpArr, count);


//Another quickSort program

initialArr();

function quickSort2(arr, leftIndex, rightIndex){
	function choosePivot(left, median, right){
		return medianOf3(left, median, right);
	}

	function medianOf3(a, b, c){
		return ((a-b)*(b-c) > -1 ? b : (a-b)*(a-c) < 1 ? a : c);
	}

	var medianIndex = parseInt((leftIndex + rightIndex)/2);
	var pivot = choosePivot(arr[leftIndex], arr[medianIndex], arr[rightIndex]);

	var i = leftIndex, j = rightIndex, tmp;

	while(i<=j){
		while(arr[i] < pivot){
			i ++;
			count ++;
		}

		while(arr[j] > pivot){
			j --;
			count ++;
		}

		if(i<=j){
			tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
			i ++;
			j --;
		}
		count++;
	}

	if(leftIndex < j){
		quickSort2(arr, leftIndex, j);
	}
	if(i < rightIndex){
		quickSort2(arr, i, rightIndex);
	}
	
	return arr;
};

tmpArr = quickSort2(tmpArr, 0, arrLen-1);
console.log("Quick Sort 2", testCorrect(tmpArr), tmpArr, count);



/*************** Heap Sort ******************
recursively build a max heap, then swap the root of the heap with the last element of the array
both the best/average/wrost case is O(nlogn), memory space 1, not stable;
*/

initialArr();

function heapSort(arr){
	buildMaxHeap(arr);

	for(var i = arrLen - 1; i > 0; i--){
		swap(arr, 0, i);
		maxHeapify(arr, 0, i);
	}

	return arr;
};

function swap(arr, firstIndex, secondIndex){
	var temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
};

function buildMaxHeap(arr){
	var iParent = Math.floor(arrLen / 2) - 1;

	for(var i = iParent; i>=0; i--){
		maxHeapify(arr, i, arrLen);
	}
};

function maxHeapify(arr, index, heapSize){
	count ++;

	var iMax, iLeft, iRight;
	iMax = index;
	iLeft = index*2 +1;
	iRight = index*2 +2;

	if(iLeft < heapSize && arr[iMax] < arr[iLeft]){
		iMax = iLeft;
	}

	if(iRight < heapSize && arr[iMax] < arr[iRight]){
		iMax = iRight;
	}

	if(iMax != index){
		swap(arr, iMax, index);
		maxHeapify(arr, iMax, heapSize);
	}
};

tmpArr = heapSort(tmpArr);
console.log("Heap Sort", testCorrect(tmpArr), tmpArr, count);





























