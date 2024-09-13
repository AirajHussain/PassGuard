import React, { useState, useEffect } from "react";
import Axios from "axios";

function CardModal({
  data,
  storedCards,
  setStoredCards,
  modalIndex,
  modalRequest,
  setModalRequest,
}) {
  const [disableInfo, setDisableInfo] = useState(true);
  const [showPass, setShowPass] = useState(true);
  const [showPass1, setShowPass1] = useState(true);
  const [showPass2, setShowPass2] = useState(true);

  const [cardVendor, setCardVendor] = useState("");
  const [name, setName] = useState("");
  const [card_number, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (data[modalIndex]) {
      setCardVendor(data[modalIndex].card_vendor);
      setName(data[modalIndex].name_on_card);
      setCardNumber(data[modalIndex].card_number);
      setSecurityCode(data[modalIndex].security_code);
      setExpiryDate(data[modalIndex].expiry_date);
    }

    setModalRequest(false);
  }, [modalRequest]);

  const handleCloseClick = () => {
    console.log(modalIndex);
    setShowPass(true);
    setDisableInfo(true);
  };

  const handleEditClick = () => {
    if (
      data[modalIndex].card_vendor !== cardVendor ||
      data[modalIndex].name_on_card !== name ||
      data[modalIndex].card_number !== card_number ||
      data[modalIndex].secuirty_code !== securityCode ||
      data[modalIndex].expiry_date !== expiryDate
    ) {
      let array = [...storedCards];
      array[modalIndex].card_vendor = cardVendor;
      array[modalIndex].name_on_card = name;
      array[modalIndex].card_number = card_number;
      array[modalIndex].secuirty_code = securityCode;
      array[modalIndex].expiry_date = expiryDate;

      Axios.put("http://localhost:3001/cards/updateCard", {
        card_vendor: cardVendor,
        name: name,
        card_number: card_number,
        securityCode: securityCode,
        expiryDate: expiryDate,
        id: data[modalIndex].id,
      }).then((response) => {
        setStoredCards(array);
      });
    }
    setShowPass(true);
    setDisableInfo(true);
  };

  const deleteInfo = () => {
    const infoID = data[modalIndex].id;

    Axios.delete(`http://localhost:3001/cards/deleteCard/${infoID}`).then(
      (response) => {
        setStoredCards(
          storedCards.filter((element) => {
            return element.id !== infoID;
          })
        );
      }
    );
  };

  return (
    <div class="modal fade" id="CardInfoModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            {data[modalIndex] && (
              <div>
                <h5 class="modal-title">
                  <strong>{data[modalIndex].card_type}</strong>
                </h5>
              </div>
            )}

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseClick}
            ></button>
          </div>
          <div class="modal-body">
            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Card Vendor URL: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={cardVendor}
                    disabled={disableInfo}
                    onChange={(e) => setCardVendor(e.target.value)}
                  ></input>

                  <a
                    className="redirectLink"
                    href={`https://www.${cardVendor}`}
                    target="_blank"
                  >
                    <i class="bi bi-arrow-up-right-square eye"></i>
                  </a>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Name On Card: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={name}
                    disabled={disableInfo}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(name)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Card Number: </strong>
                </h5>
                <div className="flex-row">
                  {showPass ? (
                    <span>
                      <i
                        class="bi bi-eye-fill eye"
                        onClick={() => setShowPass(!showPass)}
                      ></i>
                    </span>
                  ) : (
                    <span>
                      <i
                        class="bi bi-eye-slash-fill eye"
                        onClick={() => setShowPass(!showPass)}
                      ></i>
                    </span>
                  )}

                  <input
                    type={showPass ? "password" : "text"}
                    class="form-control modal-info"
                    value={card_number}
                    onChange={(e) => setCardNumber(e.target.value)}
                    disabled={disableInfo}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(card_number)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Security Code: </strong>
                </h5>
                <div className="flex-row">
                  {showPass1 ? (
                    <span>
                      <i
                        class="bi bi-eye-fill eye"
                        onClick={() => setShowPass1(!showPass1)}
                      ></i>
                    </span>
                  ) : (
                    <span>
                      <i
                        class="bi bi-eye-slash-fill eye"
                        onClick={() => setShowPass1(!showPass1)}
                      ></i>
                    </span>
                  )}

                  <input
                    type={showPass1 ? "password" : "text"}
                    class="form-control modal-info"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    disabled={disableInfo}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(securityCode)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Expiry Code: </strong>
                </h5>
                <div className="flex-row">
                  {showPass2 ? (
                    <span>
                      <i
                        class="bi bi-eye-fill eye"
                        onClick={() => setShowPass2(!showPass2)}
                      ></i>
                    </span>
                  ) : (
                    <span>
                      <i
                        class="bi bi-eye-slash-fill eye"
                        onClick={() => setShowPass2(!showPass2)}
                      ></i>
                    </span>
                  )}

                  <input
                    type={showPass2 ? "password" : "text"}
                    class="form-control modal-info"
                    id="modal-info"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    disabled={disableInfo}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(expiryDate)}
                  ></i>
                </div>
              </div>
            )}
          </div>
          <div class="modal-footer">
            <div className="flex-row">
              <i
                class="bi bi-trash-fill eye"
                onClick={() => deleteInfo()}
                data-bs-dismiss="modal"
              ></i>
              <i
                class="bi bi-pencil-fill eye"
                onClick={() => setDisableInfo(false)}
              ></i>
            </div>
            <div className="flex-row">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseClick}
              >
                Close
              </button>
              <button
                onClick={handleEditClick}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardModal;
