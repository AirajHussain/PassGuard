import React from "react";
import PasswordCard from "./PasswordCard";

function PasswordGrid({
  storedCards,
  filterQuery,
  modalIndex,
  setModalRequest,
  firstIndex,
  lastIndex,
}) {
  return (
    <div class="row">
      {storedCards &&
        storedCards.map((cardData, i) => {
          if (i >= firstIndex && i < lastIndex) {
            if (
              cardData.site_name.toLowerCase().includes(filterQuery) ||
              cardData.site_name.includes(filterQuery)
            ) {
              return (
                <PasswordCard
                  cardData = {cardData}
                  title={cardData.site_name}
                  modalIndex={modalIndex}
                  setModalRequest={setModalRequest}
                  index={i}
                  defaultImg={cardData.default_img}
                />
                
              );
            }
          }
        })}

      {storedCards.length === 0 && (
        <div>
          <h1>You Have No Passwords Stored</h1>
        </div>
      )}
    </div>
  );
}

export default PasswordGrid;
