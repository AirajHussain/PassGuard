import React from "react";
import addressIcon from "../Assets/addressIcon.png";

function AddressCard({
  title,
  modalIndex,
  setModalRequest,
  index,
  pageType,
  defaultImg,
}) {
  const handleCardClick = (index) => {
    modalIndex(index);
    setModalRequest(true);
  };

  return (
    <div className="col-sm">
      <div
        className="card dashboard-card grid-card"
        data-bs-toggle="modal"
        data-bs-target="#AddressInfoModal"
        style={{ width: "15rem" }}
        key={index}
        onClick={() => handleCardClick(index)}
      >
        <div className="card-body">
          <div className="img-card">
            <img src={addressIcon} className="card-img-top" alt="..."></img>
          </div>

          <div>
            <h3 className="card-title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
