class Message {
    constructor(messageProperties) {
        this.messageText = messageProperties.messageText;
        this.displayTime = messageProperties.displayTime;
        this.deleteTime = messageProperties.deleteTime;
        this.setDisplayTimer(this.displayTime);
        this.setDeleteTimer(this.deleteTime);
    }

    setDisplayTimer(displayTime) {
        
        if(parseInt(this.displayTime)) {
            setTimeout(() => {
                priorityStack.push(this)
            }, displayTime * 1000)
        } else {
            priorityStack.push(this)
        }
    }

    setDeleteTimer(deleteTime){
        if (parseInt(this.deleteTime)) {
            setTimeout(() => {
                priorityStack.pop(this)
            }, deleteTime * 1000)
        } 
    }

}