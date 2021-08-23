class PriorityStack {
    constructor() {
        if (PriorityStack.instance) {
            return PriorityStack.instance;
        }
        PriorityStack.instance = this;
        this.stackArray = [];
        this.displayBox = document.getElementById('message-display-box');
    }

    push(messageObj) {
        this.stackArray.push(messageObj);
        this.renderMessage();
    }

    pop() {
        this.stackArray.pop();
        if (this.stackArray.length > 0) {
            this.renderMessage();
        } else {
            this.displayBox.innerText = 'No messages to show';
        }
    }

    renderMessage() {
        let topOfStack = this.stackArray[this.stackArray.length - 1];
        this.displayBox.innerText = topOfStack.messageText;
    }
}

let priorityStack = new PriorityStack();