import { useState } from "react";
import { DisplayNumber } from "./display.counter";
import { QuantityButton } from "./button.quantity";
import type { TQuantityCounter } from "../../types/button.types";

export function Counter({ start }: TQuantityCounter) {
  const [counter, setCounter] = useState(start);

  function handleIncreaseCounter() {
    setCounter((prevCounter) => {
      return prevCounter + 1;
    });
  }

  function handleDecreaseCounter() {
    setCounter((prevCounter) => {
      if (prevCounter === 0) {
        return prevCounter;
      }
      return prevCounter - 1;
    });
  }
  return (
    <>
      <DisplayNumber number={counter} />
      <QuantityButton onClick={handleIncreaseCounter} text="+" />
      <QuantityButton onClick={handleDecreaseCounter} text="-" />
    </>
  );
}
