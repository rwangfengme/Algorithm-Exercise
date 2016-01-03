function Node(data){
	this.data = data;
	this.prev = null;
	this.next = null;
};

function DoublyList(){
	this.length = 0;
	this.head = null;
	this.tail = null;
};

DoublyList.prototype.add = function(data){
	var node = new Node(data);
	if(this.length == 0){
		this.head = node;
		this.tail = node;
		this.length ++;
	}else{
		node.prev = this.tail;
		this.tail.next = node;
		this.tail = node;
	}

	return node;
};

DoublyList.prototype.searchNodeAt = function(position){
	if(position > this.length || position < 0){
		throw "wrong position"
	}

	var currentNode = this.head;
	var currentIndex = 1;
	while(currentIndex < position){
		currentNode = currentNode.next;
		currentIndex ++;
	}

	return currentNode;
};

DoublyList.prototype.remove = function(position){
	if(position > this.length || position < 0){
		throw "wrong position";
	}

	var currentNode = this.head,
		currentIndex =1,
		toRemoveNode;

	if(position == 1){
		toRemoveNode = this.head;
		this.head = currentNode.next;
		if(!this.head){
			this.tail = null;
		}else{
			this.head.prev = null;
		}
	}else if(position == this.length){
		toRemoveNode = this.tail;
		this.tail = currentNode.prev;
		if(!this.tail){
			this.head = null;
		}else{
			this.tail.next = null;
		}
	}else{
		toRemoveNode = this.searchNodeAt(position);
		toRemoveNode.prev.next = toRemoveNode.next;
		toRemoveNode.next.prev = toRemoveNode.prev;
	}

	this.length --;

	return toRemoveNode;
};

