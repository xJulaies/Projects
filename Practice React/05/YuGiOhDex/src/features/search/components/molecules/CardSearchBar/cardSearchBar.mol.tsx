import { useState } from "react";
import { Header } from "../../../../../shared/components/molecules/Header/header.mol";
import type { TOnSearch } from "../../../types/search.types";
import type {
  TSearchInputChangeEvent,
  TSearchSubmitEvent,
} from "../../../types/search.types";

export function CardSearchBar({ onSearch }: TOnSearch) {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event: TSearchInputChangeEvent) {
    setSearchInput(event.target.value);
  }

  function handleSubmitSearch(event: TSearchSubmitEvent) {
    event.preventDefault();
    onSearch({ cardName: searchInput });
  }

  return (
    <>
      <Header text="look up any card you want!" title="Yu-Gi-Oh card finder" />
      <form
        onSubmit={handleSubmitSearch}
        className="flex flex-col items-center p-4 m-4"
      >
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={handleSearchInput}
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </form>
    </>
  );
}
