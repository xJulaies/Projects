import { useState } from "react";
import { names } from "./names";
import { getRandomName } from "./randomize";
import { RandomizeButton } from "./randomize.button";
import { DisplayName } from "./display.name";

export function RandomizeName() {
  const [name, setName] = useState("random generated name");
  function handleRandomize() {
    const randomName = getRandomName(names);
    setName(randomName);
  }
  return (
    <>
      <div className="randomize-container flex flex-col justify-center bg-base-300 border border-base-300 rounded-xl shadow-sm min-w-[34rem] min-h-[34rem]">
        <DisplayName name={name} />
        <RandomizeButton text={"randomize"} onClick={handleRandomize} />
      </div>
    </>
  );
}
