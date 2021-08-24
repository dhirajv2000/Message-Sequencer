class Message {
    constructor(messageProperties) {
        console.log(messageProperties)
        this.messageText = messageProperties.messageText;
        this.displayTime = messageProperties.displayTime;
        this.deleteTime = messageProperties.deleteTime;
        this.hasExitButton = messageProperties.hasExitButton;
        this.theme = messageProperties.theme;
        this.deleteTimer = null;
        this.displayTimer = this.setDisplayTimer(this.displayTime);
    }

    setDisplayTimer(displayTime) {
        if (parseInt(this.displayTime)) {
            return setTimeout(() => {
                priorityStack.push(this)
            }, displayTime * 1000)
        } else {
            priorityStack.push(this)
        }
    }

    setDeleteTimer() {
        if (parseInt(this.deleteTime)) {
            this.deleteTimer = setTimeout(function()  {
                priorityStack.pop(this)
            }, this.deleteTime * 1000)
        }
    }

    clearDeleteTimer() {
        clearTimeout(this.deleteTimer);
    }

}