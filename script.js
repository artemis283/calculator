const calculator = document.getElementById('calculator');
const display = calculator.querySelector('#display');
const buttonContainer = calculator.querySelector('#button-container');
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;

buttonContainer.addEventListener('click', (event) => {
  const button = event.target;
  const buttonText = button.innerText;
  const buttonType = button.classList.contains('number') ? 'number' : 'operator';
  
  if (buttonType === 'number') {
    handleNumber(buttonText);
  } else {
    handleOperator(buttonText);
  }
});

function handleNumber(number) {
  if (display.innerText === '0') {
    display.innerText = number;
  } else if (display.innerText.length < 8) {
    display.innerText += number;
  }
}

function handleOperator(operatorText) {
  switch (operatorText) {
    case 'AC':
      clearAll();
      break;
    case '+/-':
      toggleSign();
      break;
    case '%':
      percentage();
      break;
    case '÷':
    case 'x':
    case '-':
    case '+':
      setOperator(operatorText);
      break;
    case '.':
      addDecimal();
      break;
    case '=':
      calculateResult();
      break;
    default:
      console.log('Unknown operator');
      break;
  }
}

function clearAll() {
  display.innerText = '0';
  firstNumber = null;
  operator = null;
  secondNumber = null;
  result = null;
}

function toggleSign() {
  display.innerText = -parseFloat(display.innerText);
}

function percentage() {
  display.innerText = parseFloat(display.innerText) / 100;
}

function setOperator(operatorText) {
  if (firstNumber === null) {
    firstNumber = parseFloat(display.innerText);
    operator = operatorText;
    display.innerText = '0';
  } else {
    secondNumber = parseFloat(display.innerText);
    calculateResult();
    firstNumber = result;
    operator = operatorText;
    secondNumber = null;
  }
}

function addDecimal() {
  if (!display.innerText.includes('.')) {
    display.innerText += '.';
  }
}

function calculateResult() {
  switch (operator) {
    case '÷':
      result = firstNumber / parseFloat(display.innerText);
      break;
    case 'x':
      result = firstNumber * parseFloat(display.innerText);
      break;
    case '-':
      result = firstNumber - parseFloat(display.innerText);
      break;
    case '+':
      result = firstNumber + parseFloat(display.innerText);
      break;
    default:
      console.log('Unknown operator');
      break;
  }
  
  if (isNaN(result) || result.toString().length > 8) {
    display.innerText = 'ERR';
  } else {
    display.innerText = result;
  }
}




