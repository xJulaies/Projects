export type TCardName = { cardName: string };

export type TCardSearch = {
  cardName: string;
  page: number;
};

export type TOnSearch = {
  onSearch: (search: TCardName) => void;
};

export type TSearchInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TSearchSubmitEvent = React.SubmitEvent<HTMLFormElement>;

export type TShowMoreBtnProps = {
  hasMore: boolean;
  text: string;
  onShowMore: () => void;
};
