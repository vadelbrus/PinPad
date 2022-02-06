 class PinPad {
    constructor({pinPadRoot, pinPadInputValue, numeric}, maxNumbers = 4, correctPin = '1234') {

        // Select DOM elements
    
        this.elementsDOM = {
            root: pinPadRoot,
            displayedValue: pinPadInputValue,
            numericPad: numeric,
        };
        
        this.maxNumbers = maxNumbers,
        this.correctPin = correctPin,
        
        this._checkInitialValues();

        this.pinValue = '';
        this._renderPinPad(); 
    }

    _checkInitialValues(){
        if(this.maxNumbers != this.correctPin.length) {
            alert('Number of digits in PIN doesn"t match maxNumbers')
        }
    }

    //Display PIN-PAD board

    _renderPinPad(){
        
        const html = `
        <button class="pin-pad__digit">1</button>
        <button class="pin-pad__digit">2</button>
        <button class="pin-pad__digit">3</button>
        <button class="pin-pad__digit">4</button>
        <button class="pin-pad__digit">5</button>
        <button class="pin-pad__digit">6</button>
        <button class="pin-pad__digit">7</button>
        <button class="pin-pad__digit">8</button>
        <button class="pin-pad__digit">9</button>
        <button class="pin-pad__digit pin-pad__digit-backspace material-icons-outlined">keyboard_backspace</button>
        <button class="pin-pad__digit">0</button>
        <button class="pin-pad__digit pin-pad__digit-done material-icons-outlined">done</button>`
        
        this.elementsDOM.numericPad.innerHTML = html;

        // Add listener on numpad
        document.querySelector('.pin-pad__numpad').addEventListener('click', (e)=> {
        this._handleUserAction(e)
    })
    }
    
    //Check User action

    _handleUserAction(e){
        const targetElement = e.target.className; // Get the class of clicked element
        const val = e.target.textContent // Get the value of typed digit
        
        switch (targetElement) {

            //Check if user clicked digit 
            case 'pin-pad__digit':

                // Check if user already typed a correct pin, if so then reset value and remove 'pin-pad__text--correct' class                
                if(this.elementsDOM.displayedValue.classList.contains('pin-pad__text--correct')) {
                    this.elementsDOM.displayedValue.classList.remove('pin-pad__text--correct');
                    this.elementsDOM.displayedValue.value = '';
                    this.pinValue = '';
                    
                }
                
                // Check if user already typed 4 digits but didn't click 'pin-pad__digit-done'
                if(this.pinValue.length >= this.maxNumbers) { return }

                // If none of above then just add typed value and store it in pinValue variable                
                this.pinValue += val;
                
            break

            //Check if user clicked backspace                 
            case 'pin-pad__digit pin-pad__digit-backspace material-icons-outlined':
                
                //If there are no digits typed yet, then do nothing (return)
                if(this.pinValue.length == 0) { return }

                //If user typed correct PIN and wants to type againt then remove 'pin-pad__text--correct' class
                if(this.elementsDOM.displayedValue.classList.contains('pin-pad__text--correct')) {
                    this.elementsDOM.displayedValue.classList.remove('pin-pad__text--correct');
                }

                //Remove last digit
                this.pinValue = this.pinValue.substring(0, this.pinValue.length -1);
                            
            break

            //When user click done button then fire _startLogin() function
            case 'pin-pad__digit pin-pad__digit-done material-icons-outlined':            
                this._startLogin()
            break                                      
        }

        //Display digit typed by the user
        this._displayUserDigits();
    }

    //Function that checks if pin typed by the user is correct or no
    _startLogin() {
        if(this.pinValue.length < this.maxNumbers) {
                        this.elementsDOM.displayedValue.classList.add('pin-pad__text--error');
            alert(`PIN must contain ${this.maxNumbers} digits`)
        }
            
        
        if(this.pinValue.length == this.maxNumbers && this.pinValue !== this.correctPin ) { 
            this.elementsDOM.displayedValue.classList.add('pin-pad__text--error');                
            alert('wrong pin')
            
        }
        
        if(this.pinValue == this.correctPin && this.pinValue.length == this.maxNumbers) { 
             this.elementsDOM.displayedValue.classList.add('pin-pad__text--correct');
            alert('Congratulations! You have entered correct PIN')
            }
   
    }

    //Function displays digits
    _displayUserDigits(){        
        this.elementsDOM.displayedValue.value = this.pinValue;
        if(this.elementsDOM.displayedValue.classList.contains('pin-pad__text--error')) {
            this.elementsDOM.displayedValue.classList.remove('pin-pad__text--error')
        }   
        
    }

}

//Create new instance of PinPad

new PinPad({
    pinPadRoot: document.querySelector('.pin-pad'),
    pinPadInputValue: document.querySelector('.pin-pad__text'),
    numeric: document.querySelector('.pin-pad__numpad')
}, 6 , '123456');
