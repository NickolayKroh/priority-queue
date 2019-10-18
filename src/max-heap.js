const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let n = new Node(data, priority);

		this.insertNode(n);
		this.shiftNodeUp(n);
	}

	pop() {
		if(this.root !== null) {
			let root = this.root;

			this.detachRoot();

			return root.data;
		}
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.root === null)
			this.root = node;
		else {
			this.parentNodes[0].appendChild(node);

			if(this.parentNodes[0].right !== null)
				this.parentNodes.shift();
		}
	
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(node.parent === null) {
			this.root = node;
			return;
		}

		let nodeIndex = this.parentNodes.indexOf(node);
		if(nodeIndex >= 0) {
			let parentIndex = this.parentNodes.indexOf(node.parent);
			if(parentIndex >= 0)
				this.parentNodes[parentIndex] = node;
			
			this.parentNodes[nodeIndex] = node.parent;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
