import React, { useState } from "react";
import cardIcon from "../Assets/credit-card-2-front-fill.svg";

function CardTile({
  cardData,
  title,
  modalIndex,
  setModalRequest,
  index,
  pageType,
  defaultImg,
  img,
}) {
  const handleCardClick = (index) => {
    modalIndex(index);
    setModalRequest(true);
  };

  const [image, setImage] = useState("");

  return (
    <div className="col-sm">
      <div
        className="card dashboard-card grid-card"
        data-bs-toggle="modal"
        data-bs-target="#CardInfoModal"
        style={{ width: "15rem" }}
        key={index}
        onClick={() => handleCardClick(index)}
      >
        <div className="card-body">
          <div className="img-card">
            <img
              src={
                defaultImg === "true"
                  ? cardIcon
                  : `https://logo.clearbit.com/${cardData.card_vendor}`
              }
              className="card-img-top"
              alt="..."
            ></img>
          </div>

          <div>
            <h3 className="card-title">{cardData.card_type}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTile;
