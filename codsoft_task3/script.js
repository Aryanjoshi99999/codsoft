const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");
let currentInput = "0";
let operator = "";
let operand1 = "";
let operand2 = "";
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    // Add the purple light effect
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 200);

    if (value === "C") {
      currentInput = "0";
      operator = "";
      operand1 = "";
      operand2 = "";
      resultDisplayed = false;
      display.textContent = currentInput;
    } else if (value === "=") {
      if (operator && operand1 !== "") {
        operand2 = currentInput;
        const result = calculate(operand1, operator, operand2);
        display.textContent = result;
        currentInput = result;
        operand1 = "";
        operator = "";
        resultDisplayed = true;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (!operator && !operand1) {
        operator = value;
        operand1 = currentInput;
        currentInput = "0";
        resultDisplayed = false;
        display.textContent = `${operand1} ${operator}`;
      } else if (operand1 && operator) {
        operand2 = currentInput;
        const result = calculate(operand1, operator, operand2);
        currentInput = result;
        operand1 = result;
        operator = value;
        resultDisplayed = false;
        display.textContent = `${operand1} ${operator}`;
      }
    } else {
      if (resultDisplayed) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput = currentInput === "0" ? value : currentInput + value;
      }
      display.textContent = operator
        ? `${operand1} ${operator} ${currentInput}`
        : currentInput;
    }
  });
});

function calculate(operand1, operator, operand2) {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);
  if (operator === "+") return (operand1 + operand2).toString();
  if (operator === "-") return (operand1 - operand2).toString();
  if (operator === "*") return (operand1 * operand2).toString();
  if (operator === "/") return (operand1 / operand2).toString();
  return "0";
}
