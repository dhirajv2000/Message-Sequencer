class CheckButton {
    constructor(properties) {
        this.textBox = document.getElementById(properties.textBoxID);
        this.checkBox = document.getElementById(properties.buttonID);
        this.intialiseEventListeners();
    }

    intialiseEventListeners() {
        this.checkBox.addEventListener('click', () => {
            if (this.checkBox.checked) {
                this.textBox.style.visibility = "visible";
                this.textBox.requried = true;
                // this.textBox.disabled = false;
            } else {
                this.textBox.style.visibility = "hidden";
                this.textBox.requried = false;
                // this.textBox.disabled = true;
                this.textBox.value = "";
            }
        });
    }
}

class SubmitButton {
    constructor(properties) {
        this.submitButton = document.getElementById(properties.buttonID);
        this.form = document.getElementById('message-form');
        this.messageInputBox = document.getElementById('message-input-box')
        this.displayCheckBox = document.getElementById('display-check');
        this.displayTimeBox = document.getElementById('display-time-box');
        this.deleteCheckBox = document.getElementById('delete-check');
        this.deleteTimeBox = document.getElementById('delete-time-box');
        this.exitCheckBox = document.getElementById('exit-check');
        this.radioButtons = document.getElementById('theme-radio-buttons').getElementsByTagName('input');
        this.intialiseEventListeners();
    }

    intialiseEventListeners() {
        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.form.checkValidity();
            this.form.reportValidity();
            if (!this.form.checkValidity()) {
                return;
            }
            let messageProperties = {};
            let displayTime = this.displayTimeBox.value;
            let deleteTime = this.deleteTimeBox.value;
            messageProperties.messageText = this.messageInputBox.value;
            if(this.exitCheckBox.checked){
                messageProperties.hasExitButton = true
            } else if(!this.exitCheckBox.checked && !this.deleteTimeBox.checked) {
                alert('Set a delete duration if you dont want a exit box');
                return;
            }
            if (this.displayCheckBox) {
                messageProperties.displayTime = displayTime;
            } else {
                messageProperties.displayTime = 'now';
            }
            if (this.deleteCheckBox && this.deleteTimeBox.value) {
                messageProperties.deleteTime = deleteTime;
            } else {
                messageProperties.deleteTime = 'onClick';
            }

            for (let i = 0; i < this.radioButtons.length; i++) {
                if(this.radioButtons[i].type === 'radio' && this.radioButtons[i].checked) {
                    messageProperties.theme = this.radioButtons[i].value;
                }
            }
            this.form.reset();
            this.displayTimeBox.style.visibility = "hidden";
            this.displayTimeBox.requried = false;
            this.deleteTimeBox.style.visibility = "hidden";
            this.deleteTimeBox.required = false;
            let messageObj = new Message(messageProperties);
        });
    }
}

class DeleteButton {
    constructor(properties) {
        this.deleteButton = document.getElementById('delete-btn');
        this.intialiseEventListeners()
    }
    intialiseEventListeners() {
        this.deleteButton.addEventListener('click', () => {
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


function createButtons() {
    let buttonObjects = [];
    let buttonFactory = new ButtonFactory();
    for (let i = 0; i < buttons.length; i++) {
        buttonObjects.push(buttonFactory.createButtonClass(buttons[i]));
    }
}