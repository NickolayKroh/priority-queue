class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null) {
			this.left = node;
			node.parent = this;
		}
		else if(this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node) {
			this.left.parent = null
			this.left = null;
		}
		else if(this.right === node) {
			this.right.parent = null
			this.right = null;
		}
		else
			throw new new SyntaxError("Not a child");;
	}

	remove() {
		if(this.parent)
			this.parent.removeChild(this);
	}

	swapWithParent() {
		if( !this.parent )
			return;
		
		if(this.parent.parent) {
			if(this.parent.parent.right === this.parent)
				this.parent.parent.right = this;
			else
				this.parent.parent.left = this;
		}

		if(this.left)
			this.left.parent = this.parent;
		if(this.right)
			this.right.parent = this.parent;

		if(this.parent.left) {
			if(this.parent.left === this) {
				this.parent.left = this.left;
				this.left = this.parent;
			} else {
				this.parent.left.parent = this;

				let temp = this.parent.left;
				this.parent.left = this.left;
				this.left = temp;
			}
		}
		if(this.parent.right) {
			if(this.parent.right === this) {
				this.parent.right = this.right;
				this.right = this.parent;
			} else {
				this.parent.right.parent = this;

				let temp = this.parent.right;
				this.parent.right = this.right;
				this.right = temp;
			}
		}

		let temp = this.parent.parent;
		this.parent.parent = this;
		this.parent = temp;
	}
}

module.exports = Node;
