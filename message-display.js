let backgroundColors = {
    'default': 'white',
    'sucess': 'green',
    'warning': 'yellow',
    'failure': 'red'
}

class PriorityStack {
    constructor() {
        if (PriorityStack.instance) {
            return PriorityStack.instance;
        }
        PriorityStack.instance = this;
        this.stackArray = [];
        this.displayBox = document.getElementById('message-display-box');
        this.messageBox = document.getElementsByClassName('message-box')[0];
        this.deleteButton = document.getElementById('delete-btn');
    }

    push(messageObj) {
        this.stackArray.push(messageObj);
        this.renderMessage();
    }

    pop() {
        let topOfStack = this.stackArray[this.stackArray.length - 1];
        if (this.stackArray.length > 1) {
            this.stackArray.pop();
            topOfStack.clearDeleteTimer();
            this.renderMessage();
        } else {
            this.stackArray.pop();
            this.displayBox.innerText = 'No messages to show';
            this.messageBox.style.backgroundColor = "transparent";
            this.deleteButton.style.visibility = 'hidden';
        }
    }

    renderMessage() {
        let topOfStack = this.stackArray[this.stackArray.length - 1];
        this.displayBox.innerText = topOfStack.messageText;
        console.log(topOfStack.hasExitButton)
        if(topOfStack.hasExitButton){
            this.deleteButton.style.visibility = 'visible';
        } else {
            this.deleteButton.style.visibility = 'hidden';
        }
        
        this.messageBox.style.backgroundColor = backgroundColors[topOfStack.theme];
        topOfStack.setDeleteTimer();
    }
}

let priorityStack = new PriorityStack();