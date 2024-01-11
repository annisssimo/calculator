let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷', '*', '/'];

const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.res');
const buttons = document.querySelector('.buttons');
const warning = document.querySelector('.warning');
const originalWarningText = document.querySelector('.warning').innerHTML;


function add(a, b) {
    return (+a) + (+b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        warning.innerHTML = `<p>You can't divide by zero!
                              <br>
                              Click the <b style = "color: white">AC</b> button and try again...
                              </p>`;
        firstNumber = 0;
        return 'Error';
    }

    let res = a / b;
    return res;
}

function operate(number1, sign, number2) {
    number1 = Number(number1);
    number2 = Number(number2);

    switch (sign) {
        case '÷':
        case '/':
            return divide(number1, number2);
        case '×':
        case '*':
            return multiply(number1, number2);
        case '-':
            return subtract(number1, number2);
        case '+':
            return add(number1, number2);
        default:
            return 'Invalid sign';
    }
}

function clearCalculator() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    result = '';
    finish = false;
    calculationDisplay.textContent = '';
    resultDisplay.textContent = '0';
    warning.innerHTML = originalWarningText;
}

function updateExpressionDisplay() {
    let expression = '';

    if (firstNumber !== '') {
        expression += firstNumber;
    }

    if (operator !== '') {
        expression += ` ${operator} `;
    }

    if (secondNumber !== '') {
        expression += `${secondNumber}`;
    }

    calculationDisplay.textContent = expression;
}


function updateResultDisplay(res) {
    const maxLength = 9;

    if (res.toString().length > maxLength) {
        warning.innerHTML = `Scroll through the calculator screen <br>to see the full result`;
    }
    resultDisplay.innerText = res;
}

function calculateСontinuously(key) {
    operator = key;
    calculationDisplay.textContent = `${result} ${operator}`;
    finish = false;
    firstNumber = result;
    secondNumber = '';
}

function handleDigitKey(key) {
    if (key === '.' && firstNumber !== '' && secondNumber === '') {
        if (firstNumber.includes('.')) {
            return;
        }
    }

    if (key === '.' && firstNumber !== '' && secondNumber !== '') {
        if (secondNumber.includes('.')) {
            return;
        }
    }

    if (secondNumber === '' && operator === '') {
        firstNumber += key;
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
        firstNumber = result;
        secondNumber = key;
        finish = false;
    } else {
        secondNumber += key;
    }
}

function handleActionKey(key) {
    if ((firstNumber !== '' && operator === '') || (firstNumber !== '' && operator !== '' && secondNumber === '' && !finish)) {
        operator = key;
    }
    else if (firstNumber === '' && operator === '') {
        calculationDisplay.textContent = '';
        warning.innerHTML = `<p>Start with a number.<br>
                              If you need negative one, click <br>
                              the <b style = "color: white">+/-</b> button
                              </p>`;
        return;
    }
    else if (operator !== ''){
        handleEqualsKey();
        operator = key;
    }
}

function handleEqualsKey() {
    if (firstNumber !== '' && operator === '' && secondNumber === '') {
        result = firstNumber;
        updateResultDisplay(result);
    }
    else if (firstNumber === '' && operator === '') {
        calculationDisplay.textContent = '';
        warning.textContent = 'Start with a number!';
        return;
    } else {
        result = operate(firstNumber, operator, secondNumber);
        updateResultDisplay(result);
        finish = true;
    }
}

function handlePlusMinusKey() {
    if (firstNumber !== '' && secondNumber === '') {
        firstNumber = firstNumber * -1;
    }

    else if (firstNumber !== '' && secondNumber !== '' && finish) {
        result = result * -1;
        firstNumber = result;
        operator = '';
        secondNumber = '';
        result = '';
        updateResultDisplay(0);
        finish = false;
    }
    else if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
        secondNumber = secondNumber * -1;
    }
    else if (firstNumber === '' && operator === '') {
        calculationDisplay.textContent = '';
        warning.innerHTML = `<p>Start with a number.<br>
                              If you need negative one, click <br>
                              the number, then <b style = "color: white">+/-</b> button
                              </p>`;
    }
}

function handleCKey() {
    if (firstNumber !== '' && operator === '' && secondNumber === '' && !finish) {
        firstNumber = Number(firstNumber.toString().slice(0, -1));
        updateExpressionDisplay();
    }
    else if ((firstNumber !== '' && operator !== '' && secondNumber === '' && !finish)) {
        operator = '';
        updateExpressionDisplay();
    }
    else if (firstNumber !== '' && operator !== '' && secondNumber !== '' && !finish) {
        secondNumber = Number(secondNumber.toString().slice(0, -1));
        updateExpressionDisplay();
    }
    else if (finish) {
        result = Number(result.toString().slice(0, -1));
        updateResultDisplay(result);
    }
}

    function handleEvent(key) {
    if (resultDisplay.textContent === 'Error') return clearCalculator();
    
    if (finish && action.includes(key)) {
        calculateСontinuously(key);
    }

    if (digit.includes(key)) {
        handleDigitKey(key);
        updateExpressionDisplay();
        console.log(firstNumber, operator, secondNumber, finish);
    }

    if (action.includes(key)) {
        handleActionKey(key);
        updateExpressionDisplay();
        console.log(firstNumber, operator, secondNumber, finish);
    }

    if (key === '=' || key === 'Enter') {
        handleEqualsKey();
        console.log(firstNumber, operator, secondNumber, finish);
    }

    if (key === '+/-' || key === 'ArrowUp' || key === 'ArrowDown') {
        handlePlusMinusKey();
        updateExpressionDisplay();
        console.log(firstNumber, operator, secondNumber, finish);
    }

    if(key === 'C' || key === 'Backspace') {
        handleCKey();
    }

    if(key === 'AC' || key === 'Escape') {
        clearCalculator();
        console.log(firstNumber, operator, secondNumber, finish);
    }
}

buttons.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn')) {
        handleEvent(event.target.innerText);
    }
});

document.addEventListener('keydown', function (event) {
    const key = event.key;
    handleEvent(key);
});