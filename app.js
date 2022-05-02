let numArray = [];
let num1 = [];
let num2 = [];
let operator = "";
let index = 0;

let onScreen = [];

let btnText  = "";

const displayText = document.querySelector("h2");
displayText.textContent = "0";

const numButtons = document.querySelectorAll(".number");
numButtons.forEach((numButton) => {
    numButton.addEventListener('click', e => {
        btnText = e.target.innerText;
        numArray.push(Number(btnText));
        onScreen.push(Number(btnText));
        displayText.textContent = joinNum(onScreen);
    });
});

const opButtons = document.querySelectorAll(".operator");
opButtons.forEach((opButton) => {    
    opButton.addEventListener('click', e => {
        btnText = e.target.innerText;
        displayText.textContent = btnText;
        onScreen = [];
        operator = btnText;

        numArray.push(btnText);

        if (btnText == "AC") {
            displayText.textContent = "0";
            numArray = [];
            num1 = [];
            num2=[]
            operator=""
        } else if (btnText == "=") {
            //console.log("= pressed")
            numArray.pop();
            //console.log("numArray: "+ numArray)
            //Saving variable num1, num2, and operator
            for (let i = 0; i < numArray.length; i++) {
                if (typeof numArray[i] == "string") {
                    index = i;
                    operator = numArray[i]
                    //i = 0; NO!, infinite loop
                    //&& 2 < 2, infinite loop
                    for (let i = 0; i < numArray.length; i++){
                        if (typeof numArray[i] == "number" && i < index){
                            num1.push(Number(numArray[i]));  
                        } else if (typeof numArray[i] == "number" && i > index){
                            num2.push(Number(numArray[i]));  
                        }
                    }
                }
            }
            num1 = Number(joinNum(num1));
            num2 = Number(joinNum(num2));

            let numObj = {
                num1: num1,
                num2: num2,
                operator: operator
            }
            
            displayText.textContent = operate(numObj);

        };
    });
});



function joinNum(aValue) {
    return aValue.join("")
}

function operate(obj){
    if (obj.operator == "+"){
        return add(obj.num1, obj.num2); 
    } else if (operator == "-") {
        return substract(obj.num1, obj.num2);
    } else if (operator == "x") {
        return multiply(obj.num1, obj.num2);
    } else if (operator == "÷") {
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
    return num1/num2;
}


