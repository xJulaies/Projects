export type TCard = {
  ygoId: number;
  name: string;
  type: string;
  description: string;
  imagePath: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  race?: string;
};

export type TCardValue = string | number | undefined;

export type TDisplayRandomCardProps = { card: TCard };
