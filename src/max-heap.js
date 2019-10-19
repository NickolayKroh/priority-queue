const Node = require('./node');

class MaxHeap {
	constructor() {
		this.clear();
	}

	push(data, priority) {
		let n = new Node(data, priority);

		this.insertNode(n);
		this.shiftNodeUp(n);
	}

	pop() {
		if(this.root !== null) {

			return this.detachRoot().data;
		}
	}

	detachRoot() {
		let root = this.root;

		if(this.length === 1) {
			this.clear();
		}	
		else if(this.length > 1) {
			this.shiftNodeDown(root);

			root.parent.left = root.parent.right;
			root.parent.right = null;

			let rootIndex = this.parentNodes.indexOf(root);
			if(rootIndex === this.parentNodes.length - 1)
				this.parentNodes.pop();
			else {
				this.parentNodes.splice(-2, 1);
				this.parentNodes.unshift(root.parent);
			}

			--this.length;
		}

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		this.insertNode(detached);
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
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
		++this.length;
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
		if(node.left === null) {
			let current = node;

			while(current.parent !== null)
				current = current.parent;
			
			this.root = current;

			return;
		}

		let next;
		if(node.right !== null && node.right.left !== null)
			next = node.right;
		else
			next = node.left;
		
		let nextIndex = this.parentNodes.indexOf(next);
		if(nextIndex >= 0) {
			let nodeIndex = this.parentNodes.indexOf(node);
			if(nodeIndex >= 0)
				this.parentNodes[nodeIndex] = next;
			
			this.parentNodes[nextIndex] = node;
		}
		
		next.swapWithParent();
		
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;


// h = new MaxHeap();

// h.root = new Node(0, 3);
// h.root.appendChild(new Node(1, 20));
// h.root.appendChild(new Node(2, 7));
// h.root.left.appendChild(new Node(3, 5));


// const newRoot = h.root.left;
// const newDeepest = h.root;

// h.shiftNodeDown(h.root);