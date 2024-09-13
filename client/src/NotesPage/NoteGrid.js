import React from "react";
import NoteCard from "./NoteCard";

function NoteGrid({
  storedNotes,
  filterQuery,
  modalIndex,
  setModalRequest,
  firstIndex,
  lastIndex,
  pageType,
}) {
  return (
    <div class="row">
      {storedNotes &&
        storedNotes.map((cardData, i) => {
          if (i >= firstIndex && i < lastIndex) {
            if (
              cardData.title.toLowerCase().includes(filterQuery) ||
              cardData.title.includes(filterQuery)
            ) {
              return (
                <NoteCard
                  title={cardData.title}
                  modalIndex={modalIndex}
                  setModalRequest={setModalRequest}
                  index={i}
                  pageType={pageType}
                  defaultImg={cardData.default_img}
                />
                
              );
            }
          }
        })}

      {storedNotes.length === 0 && (
        <div>
          <h1>You Have No Notes Stored</h1>
        </div>
      )}
    </div>
  );
}

export default NoteGrid;
