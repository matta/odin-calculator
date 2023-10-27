let operands = [0];
let pendingOperator = null;

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

class Operator {
    constructor(operatorFn, selector, displayText) {
        this.operationFn = operatorFn;
        this.selector = selector;
        this.displayText = displayText;
    }
}

const ADD_OPERATOR = new Operator(add, '#add.operator-button', '+');
const SUBTRACT_OPERATOR = new Operator(subtract, '#subtract.operator-button', '-');
const MULTIPLY_OPERATOR = new Operator(multiply, '#multiply.operator-button', '×');
const DIVIDE_OPERATOR = new Operator(divide, '#divide.operator-button', '÷');

const formatNumber = (num) => {
    if (!isFinite(num) || isNaN(num)) {
        return "Impossible!";
    }
    const MAX_LENGTH = 10;
    let text = String(num);
    let precision = 10;

    while (text.length > MAX_LENGTH && precision >= 0) {
        text = num.toExponential(precision);
        precision -= 1;
    }

    return text;
}

const updateDisplay = () => {
    let text = formatNumber(operands[operands.length - 1]);
    const display = document.querySelector('#display');
    display.textContent = text;
}

const applyPendingOperator = () => {
    const a = operands[0];
    const b = operands[1];
    const result = pendingOperator.operationFn(a, b);
    operands[0] = result;
    operands.pop();
    pendingOperator = null;
}

const onDigitClick = (digit) => {
    if (operands.length == 1 && operands[0] == 0) {
        operands[0] = +digit;
    } else if (operands.length == 1 && pendingOperator != null) {
        operands.push(+digit);
    } else {
        const lastOperand = operands[operands.length - 1];
        operands[operands.length - 1] *= 10;
        operands[operands.length - 1] += +digit;
    }
    updateDisplay();
}

const maybeApplyPendingOperator = () => {
    if (operands.length == 2 && pendingOperator != null) {
        applyPendingOperator();
    }
}

const onOperatorClick = (operator) => {
    maybeApplyPendingOperator();
    pendingOperator = operator;
    updateDisplay();
}

const onEqualsClick = () => {
    maybeApplyPendingOperator();
    updateDisplay();
}

const onAllClearClick = () => {
    operands = [0];
    pendingOperator = null;
    updateDisplay();
}

{
    document.querySelectorAll('.digit-button').forEach(button => {
        button.addEventListener('click', () => {
            onDigitClick(button.textContent);
            updateDisplay();
        })
    })

    const registerOperator = (operator) => {
        const button = document.querySelector(operator.selector)
        button.addEventListener('click', () => onOperatorClick(operator));
    }

    registerOperator(ADD_OPERATOR);
    registerOperator(SUBTRACT_OPERATOR);
    registerOperator(MULTIPLY_OPERATOR);
    registerOperator(DIVIDE_OPERATOR);

    document.querySelector('#equals-button').addEventListener('click', onEqualsClick);
    document.querySelector('#all-clear-button').addEventListener('click', onAllClearClick);

    updateDisplay();
}