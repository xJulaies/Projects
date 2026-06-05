export type TCardName = { cardName: string };

export type TCardProps = {
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
