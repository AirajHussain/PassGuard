import React from "react";
import CardTile from "./CardTile";

function CardGrid({
  storedCards,
  filterQuery,
  modalIndex,
  setModalRequest,
  firstIndex,
  lastIndex,
  pageType,
}) {
  return (
    <div class="row">
      {storedCards &&
        storedCards.map((cardData, i) => {
          if (i >= firstIndex && i < lastIndex) {
            if (
              cardData.card_type.toLowerCase().includes(filterQuery) ||
              cardData.card_type.includes(filterQuery)
            ) {
              return (
                <CardTile
                  cardData = {cardData}
                  title={cardData.card_type}
                  modalIndex={modalIndex}
                  setModalRequest={setModalRequest}
                  index={i}
                  img={cardData.card_vendor}
                  defaultImg={cardData.default_img}
                />
                
              );
            }
          }
        })}

      {storedCards.length === 0 && (
        <div>
          <h1>You Have No Cards Stored</h1>
        </div>
      )}
    </div>
  );
}

export default CardGrid;
