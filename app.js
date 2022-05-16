let otherNum = []
let onScreen = [];
let btnText  = "";
let aResult;

let number = 0;

let number2 = 0; 
let operator = "";
let oneOperator = "" 

let anotherAnswer = 0

let callAgain;


const displayText = document.querySelector("h2");
displayText.textContent = "0";

const numButtons = document.querySelectorAll(".number");
numButtons.forEach((numButton) => {
    numButton.addEventListener('click', e => {
        btnText = e.target.innerText;

        if (onScreen.length < 17 ) {
            onScreen.push(Number(btnText));
            displayText.textContent = joinNum(onScreen);
        }

        
    });
});

const decimalPoint = document.querySelectorAll(".period");
decimalPoint.forEach((decimal) => {
    decimal.addEventListener('click', e => {

        for (i = 0; i < 1; i++) {
            btnText = e.target.innerText;

            onScreen.push(btnText);
            displayText.textContent = joinNum(onScreen);
    
            manageDecimalBtn(joinNum(onScreen))
        } 
    })
})

const opButtons = document.querySelectorAll(".operator");
opButtons.forEach((opButton) => {    
    opButton.addEventListener('click', e => {
        manageDecimalBtn()
        btnText = e.target.innerText;
        displayText.textContent = btnText;

        
        if (typeof callAgain !== "undefined") {
            
            otherNum = []
            otherNum.push(callAgain);

            otherNum.push(btnText)

            number = Number(joinNum(onScreen));
            otherNum.push(number)

            
            console.log(otherNum)

            if (btnText == "=") {
                anotherAnswer  = operate(createObj(otherNum))
                
                displayText.textContent = anotherAnswer;
            }


 
        } 

        if (typeof aResult == "undefined") {
            number = joinNum(onScreen);
            otherNum.push(number)
            otherNum.push(btnText);
            
            //Need to refactor the block of code below, it is repetitive
            if (otherNum.length == 4) {
                anotherAnswer  = operate(createObj(otherNum));

                otherNum = []
                otherNum.push(anotherAnswer) //19
                otherNum.push(btnText)

                displayText.textContent = anotherAnswer;

            } 

        } else if (aResult == "replace") {
            number = joinNum(onScreen);

            otherNum.push(number)
            otherNum.push(btnText);

            //Need to refactor the block of code below, it is repetitive
            if (otherNum.length == 4) {
                anotherAnswer  = operate(createObj(otherNum));

                otherNum = []
                otherNum.push(anotherAnswer)
                otherNum.push(btnText)

                displayText.textContent = anotherAnswer;

            } 

        } else {
            otherNum = [];
            otherNum.push(aResult); 
            if (btnText === "+" || btnText === "-" || btnText === "x" || btnText === "÷") {
                oneOperator = btnText
            } 
            otherNum.push(oneOperator)
        } 

        if (btnText == "=") {
            if (typeof anotherAnswer == "number"){
                aResult = anotherAnswer
                manageDisplayLength(aResult)
                callAgain = aResult;
                //console.log(callAgain) //3
            } else 
            if (typeof aResult == "undefined") {
                //first calculation
                aResult = operate(createObj(otherNum))

                manageDisplayLength(aResult)
            } else if (typeof aResult !== "undefined") {
                //second calculation, need to remember aResult for continues calculations
                number = Number(joinNum(onScreen));
                otherNum.push(number)

                aResult = operate(createObj(otherNum))
                displayText.textContent = aResult 
                console.log("display 8")
                manageDisplayLength(aResult)
            }
           
        } else if (btnText == "AC") {
            clearAll();
         }
        //to clear numbers from previous screen
        onScreen = []; 
    })
});

function manageDisplayLength(showText){
    if (showText.length < 18) {
        displayText.textContent = showText;
    } else if (showText.length > 17)
        displayText.textContent = showText.toExponential();
}

function manageDecimalBtn() {
    const decimalPoint = document.querySelector(".period");
    decimalPoint.classList.toggle("disableButton")
}

function createObj(anArray) {
    let i = 0;
    let objNumber = {
        num1: Number(anArray[i]),
        operator: anArray[i+1], 
        num2: Number(anArray[i+2])
    }
    return objNumber
}

function clearAll(){
    displayText.textContent = 0
    anotherAnswer = "";
    otherNum = [];
    aResult = "replace"
    number = 0;
}

function joinNum(aValue) {
    return aValue.join("")
}

function operate(obj){
    if (obj.operator == "+"){
        return add(obj.num1, obj.num2); 
    } else if (obj.operator == "-") {
        return substract(obj.num1, obj.num2);
    } else if (obj.operator == "x") {
        return multiply(obj.num1, obj.num2);
    } else if (obj.operator == "÷") {
        return divide(obj.num1, obj.num2);
    } 
}

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1-num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 == 0 ) {
        return "ERROR"
    } else {
        return num1/num2;
    }    
}


