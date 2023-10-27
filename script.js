let operandA = '';
let operandB = '';
let result = '';

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;
const operate = (operator, a, b) => operator(a, b);