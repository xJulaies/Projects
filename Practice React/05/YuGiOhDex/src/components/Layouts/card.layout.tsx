import { PublicHero } from "../hero/public.hero";
import { CardSearchBar } from "../cardSearch/cardSearchBar";
import { getCard } from "../../lib/api/getCard";
import { YuGiOhCard } from "../YuGiOhCards/yugiohCard";
import { ShowMoreBtn } from "../cardSearch/showMore";
import type { TCardName } from "../../types/search.types";
import type { TCard } from "../../types/card.types";
import { useState } from "react";

export function CardLayout() {
  const [cards, setCards] = useState<TCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [currentCardName, setCurrentCardName] = useState("");

  async function handleSearch({ cardName }: TCardName) {
    const firstPage = 1;
    const result = await getCard({ cardName, page: firstPage });
    setCards(result.data[0].cards);
    setPage(firstPage);
    setHasMore(result.data[0].hasMore);
    setCurrentCardName(cardName);
  }

  async function handleShowMore() {
    if (!currentCardName) return;

    const nextPage = page + 1;
    const result = await getCard({ cardName: currentCardName, page: nextPage });
    setCards([...cards, ...result.data[0].cards]);
    setPage(nextPage);
    setHasMore(result.data[0].hasMore);
  }
  return (
    <>
      <PublicHero />
      <CardSearchBar onSearch={handleSearch} />
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {cards.map((card) => (
          <YuGiOhCard
            key={card.ygoId}
            ygoId={card.ygoId}
            name={card.name}
            type={card.type}
            description={card.description}
            imagePath={card.imagePath}
            atk={card.atk}
            def={card.def}
            level={card.level}
            attribute={card.attribute}
            race={card.race}
          />
        ))}
      </div>
      <ShowMoreBtn
        hasMore={hasMore}
        onShowMore={handleShowMore}
        text="show more"
      />
    </>
  );
}
