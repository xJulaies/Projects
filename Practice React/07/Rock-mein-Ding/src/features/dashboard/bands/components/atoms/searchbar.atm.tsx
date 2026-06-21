import { Label, SearchField } from "@heroui/react";
import type { TSearchProps } from "../../types/filter.types";

export function SearchBar({ value, onChange }: TSearchProps) {
  return (
    <SearchField name="search" value={value} onChange={onChange}>
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
