import { names } from "../randomNameGenerator/names";

export function DisplayAllNames() {
  return (
    <>
      <div className="all-names-container bg-base-300 border border-base-300 rounded-xl shadow-sm min-w-[34rem] min-h-[34rem]">
        <div className="flex justify-center">
          <h1 className="text-4xl col-span-full p-4 m-4">All names</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 p-8 m-8 text-xl ">
          {names.map((name) => (
            <p
              key={name}
              className="bg-base-100 border border-blue-300 rounded-lg px-4 py-2 text-center"
            >
              {name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
