const display = document.getElementById("display");
const numpad = document.querySelector(".numpad");
const history = document.getElementById("history");

let resultState = false;

numpad.addEventListener("click", function (event) {
  const value = event.target.textContent;

  const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ","];
  const operators = ["+", "-", "*", "/"];
  const resetAll = ["C"];
  const resetEntry = ["CE"];
  const deleteLastEntry = ["Del"];
  const percentage = ["%"];
  const power = ["x²"];
  const squareRoot = ["√x"];
  const reciprocal = ["1/x"];
  const negate = ["+/-"];

  function calculate() {
    let operatorIndex = -1;
    for (let i = 1; i < history.textContent.length; i++) {
      if (operators.includes(history.textContent[i])) {
        operatorIndex = i;
        break;
      }
    }

    const numbers = history.textContent.split(
      history.textContent[operatorIndex],
    );

    let result;

    switch (history.textContent[operatorIndex]) {
      case "+":
        result =
          Number(numbers[0].replace(",", ".")) +
          Number(numbers[1].replace(",", "."));
        break;
      case "-":
        result =
          Number(numbers[0].replace(",", ".")) -
          Number(numbers[1].replace(",", "."));
        break;
      case "*":
        result =
          Number(numbers[0].replace(",", ".")) *
          Number(numbers[1].replace(",", "."));
        break;
      case "/":
        result =
          Number(numbers[0].replace(",", ".")) /
          Number(numbers[1].replace(",", "."));
        break;
      default:
        result = NaN;
    }
    console.log(result);
    return result;
  }

  if (resetAll.includes(value)) {
    display.textContent = "";
    history.textContent = "";
    resultState = false;
    return;
  }
  if (resetEntry.includes(value)) {
    history.textContent = display.textContent;
    display.textContent = "";
    resultState = false;
    return;
  }
  if (deleteLastEntry.includes(value)) {
    if (resultState === true) {
      return;
    } else {
      display.textContent = display.textContent.slice(0, -1);
    }
    return;
  }

  if (percentage.includes(value)) {
    let operatorIndex;
    operators.map((operator, index) => {
      index = display.textContent.indexOf(operator);
      if (index !== -1) {
        operatorIndex = index;
      }
    });

    const numbers = display.textContent.split(
      display.textContent[operatorIndex],
    );

    const percentage = (Number(numbers[0]) / 100) * numbers[1];
    history.textContent = history.textContent + percentage;
    const calculation = `${numbers[0]} + ${percentage}`;

    const result = calculate(calculation);
    display.textContent = result;

    return;
  }

  if (power.includes(value)) {
    const num = Number(display.textContent);
    const result = num * num;
    display.textContent = result;
    history.textContent = num + "²";
    resultState = true;
  }

  if (squareRoot.includes(value)) {
    const num = Number(display.textContent);
    const result = Math.sqrt(num);
    display.textContent = result;
    history.textContent = "√" + num;
    resultState = true;
    return;
  }

  if (reciprocal.includes(value)) {
    const num = Number(display.textContent);
    const result = 1 / num;
    display.textContent = result;
    history.textContent = "1/" + num;
    resultState = true;
    return;
  }

  if (resultState === true) {
    if (num.includes(value)) {
      display.textContent = "";
      display.textContent += value;
      resultState = false;
    } else if (operators.includes(value)) {
      display.textContent = display.textContent + value;
      resultState = false;
    }
    return;
  }

  if (negate.includes(value)) {
    const negatedNum = Number(display.textContent) * -1;
    display.textContent = negatedNum;
    return;
  }

  if (num.includes(value)) {
    display.textContent += value;
  }

  if (operators.includes(value)) {
    display.textContent += value;
    history.textContent = display.textContent;
  }

  if (value === "=") {
    console.log("calc!");
    history.textContent = display.textContent;
    const result = calculate(display.textContent);
    console.log(display.textContent);

    display.textContent = result;
    resultState = true;
  }
});
