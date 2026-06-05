export type TCardSearch = {
  cardName: string;
  page: number;
};

export type TOnSearch = {
  onSearch: (cardName: string) => void;
};

export type TSearchInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TSearchSubmitEvent = React.SubmitEvent<HTMLFormElement>;
