let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷'];

const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.res');
const buttons = document.querySelector('.buttons');

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
        return 'балуешься?';
    }

    let res = a / b;

    return res.toFixed(5).replace(/\.?0+$/, '');
}

function operate(number1, sign, number2) {
    number1 = Number(number1);
    number2 = Number(number2);

    switch (sign) {
        case '÷':
            return divide(number1, number2);
        case '×':
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
}

function updateExprDisplay(value) {
    switch (value) {
        case 'C':
            calculationDisplay.textContent = calculationDisplay.textContent.slice(0, -1);
            break;
        case 'AC':
            clearCalculator();
            break;
        case '=':
            calculationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
            break;
        case '+/-':
            calculationDisplay.textContent = firstNumber + ' ' + operator + ' ' + secondNumber;
            break;
        default:
            handleDefaultCase(value);
    }
}

function handleDefaultCase(value) {
    const lastChar = calculationDisplay.textContent.slice(-1);
    if (value === '.' && lastChar === '.') {
        return;
    }
    calculationDisplay.textContent += value;
}

function updateResultDisplay(res) {
    const maxLength = 9;
    let formattedResult;

    if (res.toString().includes('.')) {
        const integerPart = res.toString().split('.')[0];
        const decimalPart = res.toString().split('.')[1].slice(0, maxLength - integerPart.length);

        formattedResult = parseFloat(`${integerPart}.${decimalPart}`);
    } else {
        formattedResult = res;
    }

    resultDisplay.innerText = formattedResult;
}

function calculateСontinuously(key) {
    operator = key;
    calculationDisplay.textContent = result + operator;
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
    if (operator === '') {
        operator = key;
    }
    else {
        operator = key;
        handleEqualsKey();
    }
}

function handleEqualsKey() {
    if (firstNumber !== '' && operator === '' && secondNumber === '') {
        result = firstNumber;
        updateResultDisplay(result);
    } else {
        result = operate(firstNumber, operator, secondNumber);
        updateResultDisplay(result);
        finish = true;
    }
}

function handlePlusMinusKey() {
    if (firstNumber !== '') {
        firstNumber = firstNumber * -1;
        updateResultDisplay(firstNumber);
        updateExprDisplay('+/-');
    }

    if (firstNumber !== '' && secondNumber !== '' && finish) {
        result = result * -1;
        firstNumber = result;
        operator = '';
        secondNumber = '';
        calculationDisplay.textContent = '';
        updateResultDisplay(result);
        updateExprDisplay(result);
        result = '';
        finish = false;
    }
}

buttons.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;
    const key = event.target.innerText;

    updateExprDisplay(key);

    if (finish && action.includes(key)) {
        calculateСontinuously(key);
        return;
    }

    if (digit.includes(key)) {
        handleDigitKey(key);
        return;
    }

    if (action.includes(key)) {
        handleActionKey(key);
        return;
    }

    if (key === '=') {
        handleEqualsKey();
        return;
    }

    if (key === '+/-') {
        handlePlusMinusKey();
        return;
    }

    if(key === 'C') {

    }

});