import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import CardModalInput from "./CardModalInput";

function AddCardModal({ setSendRequest }) {
  const loginInfo = useSelector((state) => state.loginReducer);

  const [cardVendor, setCardVendor] = useState("");
  const [cardType, setCardType] = useState("");
  const [name, setName] = useState("");
  const [card_number, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [defaultImg, setDefaultImg] = useState("false");
  const [imageError, setImageError] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  const resetData = () => {
    setCardVendor("");
    setCardType("");
    setName("");
    setCardNumber("");
    setSecurityCode("");
    setExpiryDate("");
    setDefaultImg("false");
    setImageError(false);
    setModalPage(1);
  };

  const checkImg = (url) => {
    Axios.get();
  };

  const addCard = () => {
    console.log(loginInfo.id);
    Axios.post(`http://localhost:3001/cards/addCard`, {
      card_vendor: cardVendor,
      card_type: cardType,
      name: name,
      card_number: card_number,
      securityCode: securityCode,
      expiryDate: expiryDate,
      default_img: defaultImg,
      user_id: loginInfo.id,
    }).then((response) => {
      document.getElementById("add-new-pass").reset();
      resetData();
      setSendRequest(true);
    });
  };

  return (
    <div class="modal fade" id="addModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Payment Card</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetData()}
            ></button>
          </div>
          {modalPage === 1 && (
            <div class="modal-body">
              <form id="add-new-pass">
                <CardModalInput
                  title={"Card Vendor URL"}
                  type={"text"}
                  placeholder={"Ex. td.com"}
                  changeInput={setCardVendor}
                />
                <CardModalInput
                  title={"Card Type"}
                  type={"text"}
                  placeholder={"Ex. Debit Card"}
                  changeInput={setCardType}
                />
              </form>
            </div>
          )}

          {modalPage === 2 && (
            <div class="modal-body">
              <img
                src={modalPage === 2 && `//logo.clearbit.com/${cardVendor}`}
                onError={() => setImageError(true)}
                alt=""
              />
              {imageError ? (
                <div>
                  <h3>No Icon was found using URL entered</h3>
                  <div className="flex-row imageCheck">
                    <h3>
                      You can go back and re-enter or go next and use Default
                      Icon{" "}
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>This is the icon found</h3>
                  <div className="flex-row imageCheck">
                    <h3>Is this correct or would you like to use </h3>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={() => {
                        setDefaultImg("true");
                        setModalPage(modalPage + 1);
                      }}
                    >
                      Default
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {modalPage === 3 && (
            <div class="modal-body">
              <form id="add-new-pass">
                <CardModalInput
                  title={"Name On Card"}
                  type={"text"}
                  placeholder={"Ex. John Doe"}
                  changeInput={setName}
                />
                <CardModalInput
                  title={"Card Number"}
                  type={"password"}
                  placeholder={"XXXX-XXXX-XXXX-XXXX"}
                  changeInput={setCardNumber}
                />
                <CardModalInput
                  title={"Security Code"}
                  type={"password"}
                  placeholder={"123"}
                  changeInput={setSecurityCode}
                />
                <CardModalInput
                  title={"Expiry Date"}
                  type={"password"}
                  placeholder={"Ex. 09/2025"}
                  changeInput={setExpiryDate}
                />
              </form>
            </div>
          )}

          <div class="modal-footer">
            {modalPage > 1 ? (
              <button
                onClick={() => setModalPage(modalPage - 1)}
                type="button"
                class="btn btn-secondary"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => resetData()}
              >
                Close
              </button>
            )}

            {modalPage <= 2 ? (
              <button
                onClick={
                  imageError
                    ? () => {
                        setModalPage(modalPage + 1);
                        setDefaultImg("true");
                      }
                    : () => setModalPage(modalPage + 1)
                }
                type="button"
                class="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={addCard}
                data-bs-dismiss="modal"
                type="button"
                class="btn btn-primary"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCardModal;
