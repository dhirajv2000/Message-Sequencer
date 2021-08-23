class CheckButton{
    constructor(properties) {
        this.textBox = document.getElementById(properties.textBoxID);
        this.checkBox = document.getElementById(properties.buttonID);
        this.intialiseEventListeners();
    }

    intialiseEventListeners(){
        this.checkBox.addEventListener('click', ()=>{
            if(this.checkBox.checked){
                this.textBox.disabled = false;
            } else {
                this.textBox.disabled = true;
                this.textBox.value = "";
            }
        });
    }
}

class SubmitButton{
    constructor(properties){
        this.submitButton = document.getElementById(properties.buttonID);
        this.form = document.getElementById('message-form');
        this.messageInputBox = document.getElementById('message-input-box')
        this.displayCheckBox = document.getElementById('display-check');
        this.displayTimeBox = document.getElementById('display-time-box');
        this.deleteCheckBox = document.getElementById('delete-check');
        this.deleteTimeBox = document.getElementById('delete-time-box');
        this.intialiseEventListeners();
    }

    intialiseEventListeners(){
        this.submitButton.addEventListener('click', (e)=>{
            e.preventDefault();
            this.form.checkValidity();
            this.form.reportValidity();
            let messageProperties = {};
            let displayTime = this.displayTimeBox.value;
            let deleteTime = this.deleteTimeBox.value;
            messageProperties.messageText = this.messageInputBox.value;
            if(this.displayCheckBox){
                messageProperties.displayTime = displayTime;
            } else {
                messageProperties.displayTime = 'now';
            }
            if(this.deleteCheckBox && this.deleteTimeBox.value){
                messageProperties.deleteTime = deleteTime;
            } else{
                messageProperties.deleteTime = 'onClick';
            }
            if(parseInt(deleteTime) <= parseInt(displayTime)){
                alert('Invalid delete time');
                return;
            }
            this.form.reset();
            this.displayTimeBox.disabled = true;
            this.deleteTimeBox.disabled = true;
            let messageObj = new Message(messageProperties);
        });
    }
}

class DeleteButton{
    constructor(properties){
        this.deleteButton = document.getElementById('delete-btn');
        this.intialiseEventListeners()
    }
    intialiseEventListeners(){
        this.deleteButton.addEventListener('click',()=>{
            priorityStack.pop();
        })
    }
}

class ButtonFactory {
    createButtonClass(properties) {
        switch (properties.type) {
            case 'check-box':
                return new CheckButton(properties);
            case 'submit-button':
                return new SubmitButton(properties)
            case 'delete-button':
                return new DeleteButton(properties)
            
        }
    }
}

const buttons = [{
        type: 'check-box',
        textBoxID: 'display-time-box',
        buttonID: 'display-check'
    },
    {
        type: 'check-box',
        textBoxID: 'delete-time-box',
        buttonID: 'delete-check'
    },
    {
        type: 'submit-button',
        buttonID: 'submit-button'
    },
    {
        type: 'delete-button',
        buttonID: 'delete-btn'
    }
];


function createButtons(){
    let buttonObjects = [];
    let buttonFactory = new ButtonFactory();
    for (let i = 0; i < buttons.length; i++) {
        buttonObjects.push(buttonFactory.createButtonClass(buttons[i]));
    }    
}