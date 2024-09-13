import React from "react";
import AddressCard from "./AddressCard";

function NoteGrid({
  storedAddresses,
  filterQuery,
  modalIndex,
  setModalRequest,
  firstIndex,
  lastIndex,
  pageType,
}) {
  return (
    <div class="row">
      {storedAddresses &&
        storedAddresses.map((cardData, i) => {
          if (i >= firstIndex && i < lastIndex) {
            if (
              cardData.title.toLowerCase().includes(filterQuery) ||
              cardData.title.includes(filterQuery)
            ) {
              return (
                <AddressCard
                  title={cardData.title}
                  modalIndex={modalIndex}
                  setModalRequest={setModalRequest}
                  index={i}
                />
              );
            }
          }
        })}

      {storedAddresses.length === 0 && (
        <div>
          <h1>You Have No Addresses Stored</h1>
        </div>
      )}
    </div>
  );
}

export default NoteGrid;
