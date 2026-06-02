import { ChangeColorButton } from "./change.color.button";
import { DisplayBox } from "./display.box";
import { useState } from "react";
import { useEffect } from "react";
import type { TColor } from "../../types/color.types";

export function ChangeColor() {
  const [boxColor, setBoxColor] = useState("bg-gray-300");
  const [selectedColor, setSelectedColor] = useState("gray");
  useEffect(() => {
    switch (selectedColor) {
      case "gray":
        setBoxColor("bg-gray-300");
        break;
      case "blue":
        setBoxColor("bg-blue-300");
        break;
      case "red":
        setBoxColor("bg-red-300");
        break;
      case "green":
        setBoxColor("bg-green-300");
        break;
      case "yellow":
        setBoxColor("bg-yellow-300");
        break;
    }
  });

  function handleChangeColorButton(color: TColor) {
    console.log(`button to change color to ${color} clicked!`);
    setSelectedColor(color);
  }

  return (
    <>
      <DisplayBox boxColor={boxColor} />
      <div className="flex gap-4 justify-center">
        <ChangeColorButton
          onClick={handleChangeColorButton}
          text={"change color to blue!"}
          color="blue"
        />
        <ChangeColorButton
          onClick={handleChangeColorButton}
          text={"change color to red!"}
          color="red"
        />
        <ChangeColorButton
          onClick={handleChangeColorButton}
          text={"change color to green!"}
          color="green"
        />
        <ChangeColorButton
          onClick={handleChangeColorButton}
          text={"change color to yellow!"}
          color="yellow"
        />
        <ChangeColorButton
          onClick={handleChangeColorButton}
          text={"change color to gray!"}
          color="gray"
        />
      </div>
    </>
  );
}
