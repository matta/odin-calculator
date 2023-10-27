let operands = new Array;

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;
const operate = (operator, a, b) => operator(a, b);

const updateDisplay = () => {
    let content = "\u2400";
    if (operands.length > 0) {
        content = operands[operands.length - 1];
    }
    const display = document.querySelector('#display');
    display.textContent = content;
}

const onDigitPress = (digit) => {
    if (operands.length == 0) {
        operands.push(digit);
    } else if (operands[operands.length - 1].length < 10) {
        operands[operands.length - 1] += digit;
    }
}

{
    document.querySelectorAll('.digit-button').forEach(button => {
        button.addEventListener('click', () => {
            onDigitPress(button.textContent);
            updateDisplay();
        })
    })

    updateDisplay();
}