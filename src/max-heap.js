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
		if( !this.isEmpty() ) {

			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);

			return detached.data;
		}
	}

	detachRoot() {
		let root = this.root;
		this.root = null;
		--this.length;

		if(this.parentNodes.includes(root))
			this.parentNodes.shift();

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if( !this.isEmpty() ) {
			let last = this.parentNodes.pop();
			this.root = last;

			if( last.parent &&
				last.parent !== detached &&
				last.parent.right === last
				)
				this.parentNodes.unshift(last.parent);

			last.remove();

			if(detached.left && detached.left !== last) {
				last.appendChild(detached.left);

				if(detached.right && detached.right !== last)
					last.appendChild(detached.right);
			}
			
			if(last.right === null)
				this.parentNodes.unshift(last);
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.root && !this.parentNodes.length;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if( this.isEmpty() )
			this.root = node;
		else {
			this.parentNodes[0].appendChild(node);

			if(this.parentNodes[0].right)
				this.parentNodes.shift();
		}
	
		this.parentNodes.push(node);
		++this.length;
	}

	shiftNodeUp(node) {
		if( !node.parent || node.priority <= node.parent.priority ) {
			if( !node.parent )
				this.root = node;
			return;
		}

		let nodeIndex = this.parentNodes.indexOf(node);
		if(nodeIndex !== -1) {
			let parentIndex = this.parentNodes.indexOf(node.parent);
			if(parentIndex !== -1)
				this.parentNodes[parentIndex] = node;
			
			this.parentNodes[nodeIndex] = node.parent;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if( !this.isEmpty() && node.left ) {
			let next;
			if(
				node.right && node.left && 
				node.right.priority >= node.left.priority
			)
				next = node.right;
			else
				next = node.left;
			
			if (next && node.priority < next.priority) {
				if(node === this.root)
					this.root = next;

				let nextIndex = this.parentNodes.indexOf(next);
				if(nextIndex != -1) {
					let nodeIndex = this.parentNodes.indexOf(node);
					if(nodeIndex != -1)
						this.parentNodes[nodeIndex] = next;
					
					this.parentNodes[nextIndex] = node;
				}
				
				next.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
