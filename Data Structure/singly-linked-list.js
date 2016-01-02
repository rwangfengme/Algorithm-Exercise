function Node(data){
	this.data = data;
	this.next = null;
};

function SinglyList(){
	this.length = 0;
	this.head = null;
};

SinglyList.prototype.add = function(data){
	if(this.head == null){
		this.head = new Node(data);
		this.length ++;
		return;
	}

	var currentNode = this.head;
	while(currentNode.next){
		currentNode = currentNode.next;
	}

	currentNode.next = new Node(data);

	this.length ++;
};

SinglyList.prototype.searchNodeAt = function(position){
	if(position > this.length || position < 0){
		throw "wrong position";
	}

	var currentIndex = 1;
	var currentNode = this.head;
	while(position > currentIndex){
		currentNode = currentNode.next;
		currentIndex ++;
	}

	return currentNode;
};

SinglyList.prototype.remove = function(position){
	if(position > this.length || position < 0){
		throw "wrong position";
	}

	if(position == 1){
		var toDelNode = this.head;
		this.head = this.head.next;
		this.length --;
		return toDelNode;
	}

	var currentIndex = 1;
	var currentNode = this.head;
	while(position > currentIndex + 1){
		currentNode = currentNode.next;
		currentIndex ++;
	}
	var toDelNode = currentNode.next;
	currentNode.next = toDelNode.next;
	this.length --;

	return toDelNode;
};

//add
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var list = new SinglyList();

for(var i = 0; i < arr.length; i++){
	list.add(arr[i]);
}

console.log(list);

var curNode = list.head;
do{
	console.log(curNode.data);
	curNode = curNode.next;
}while(curNode.next)
console.log(curNode.data);


//searchNodeAt
console.log(list.searchNodeAt(1));
console.log(list.searchNodeAt(8));


//remove
console.log(list.remove(3), list);
console.log(list.remove(1), list);
console.log(list.remove(7), list);