  let currentNumber = '0'
let previousNumber = ''
let operator = ''
let shouldResetScreen = false

const resultDisplay = document.getElementById('result')
const expressionDisplay = document.getElementById('expression')

function updateDisplay() {
  resultDisplay.textContent = currentNumber
}
function inputNumber(value) {
  if (currentNumber.length >= 12 && !shouldResetScreen) return
  if (shouldResetScreen) {
    currentNumber = value
    shouldResetScreen = false
  } else {
    currentNumber = currentNumber === '0' ? value : currentNumber + value
  }
  updateDisplay()
}
function inputDecimal() {
  if (shouldResetScreen) {
    currentNumber = '0.'
    shouldResetScreen = false
    updateDisplay()
    return
  }
  if (currentNumber.includes('.')) return

  currentNumber += '.'
  updateDisplay()
}

function selectOperator(value) {
  if (operator && !shouldResetScreen) {
    calculate()
  }
  previousNumber = currentNumber
  operator = value
  shouldResetScreen = true

  expressionDisplay.textContent = `${previousNumber} ${operator}`
}
function calculate() {
  if (!operator || !previousNumber) return
  const prev = parseFloat(previousNumber)
  const curr = parseFloat(currentNumber)
  let result

  switch (operator) {
    case '+':
      result = prev + curr
      break
    case '-':
      result = prev - curr
      break
    case 'x':
      result = prev * curr
      break
    case '/':
      if (curr === 0) {
        currentNumber = 'Error'
        expressionDisplay.textContent = ''
        operator = ''
        previousNumber = ''
        updateDisplay()
        return
      }
      result = prev / curr
      break
    default:
      return
  }
  
  // 수식을 위에 표시
  expressionDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;

  // 결과를 소수점 10자리까지만 표시
  currentNumber = parseFloat(result.toFixed(10)).toString();

  operator = '';
  previousNumber = '';
  shouldResetScreen = true;

  updateDisplay();
}

// AC (전체 초기화)
function clearAll() {
  currentNumber = '0';
  previousNumber = '';
  operator = '';
  shouldResetScreen = false;
  expressionDisplay.textContent = '';
  updateDisplay();
}

// +/- (부호 전환)
function toggleSign() {
  if (currentNumber === '0' || currentNumber === 'Error') return;
  currentNumber = (parseFloat(currentNumber) * -1).toString();
  updateDisplay();
}

// % (퍼센트)
function inputPercent() {
  if (currentNumber === 'Error') return;
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  updateDisplay();
}

// 버튼 클릭 이벤트 처리
document.querySelector('.buttons').addEventListener('click', (event) => {
  // 클릭된 요소가 버튼인지 확인
  const button = event.target.closest('.btn');
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  switch (action) {
    case 'number':   inputNumber(value);    break;
    case 'decimal':  inputDecimal();        break;
    case 'operator': selectOperator(value); break;
    case 'calculate': calculate();          break;
    case 'clear':    clearAll();            break;
    case 'sign':     toggleSign();          break;
    case 'percent':  inputPercent();        break;
  }
});


