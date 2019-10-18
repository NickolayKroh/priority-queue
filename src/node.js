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
			this.left.parent = null
			this.right = null;
		}
		else throw new new SyntaxError("Node has no child");;
	}

	remove() {
		if(this.parent !== null)
			this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent !== null) {
			if(this.parent.parent !== null) {
				if(this.parent.parent.right === this.parent)
					this.parent.parent.right = this;
				else
					this.parent.parent.left = this;
			}

			if(this.left !== null)
				this.left.parent = this.parent;
			if(this.right !== null)
				this.right.parent = this.parent;

			if(this.parent.left !== null) {
				if(this.parent.left !== this) {
					this.parent.left.parent = this;

					let temp = this.parent.left;
					this.parent.left = this.left;
					this.left = temp;
				} else {
					this.parent.left = this.left;
					this.left = this.parent;
				}
			}
			if(this.parent.right !== null) {
				if(this.parent.right !== this) {
					this.parent.right.parent = this;

					let temp = this.parent.right;
					this.parent.right = this.right;
					this.right = temp;
				} else {
					this.parent.right = this.right;
					this.right = this.parent;
				}
			}

			let temp = this.parent.parent;
			this.parent.parent = this;
			this.parent = temp;
		}
	}
}

module.exports = Node;
