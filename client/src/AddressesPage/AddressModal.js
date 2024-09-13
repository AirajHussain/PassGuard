import React, { useState, useReducer, useEffect } from "react";
import Axios from "axios";

function AddressModal({
  data,
  storedAddresses,
  setStoredAddresses,
  modalIndex,
  modalRequest,
  setModalRequest,
}) {
  const [disableInfo, setDisableInfo] = useState(true);
  const [showPass, setShowPass] = useState(true);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (data[modalIndex]) {
      setTitle(data[modalIndex].title);
      setName(data[modalIndex].person_name);
      setAddress(data[modalIndex].address);
      setPhoneNumber(data[modalIndex].phone_number);
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
      data[modalIndex].title !== title ||
      data[modalIndex].person_name !== name ||
      data[modalIndex].address !== address ||
      data[modalIndex].phone_number !== phoneNumber
    ) {
      let array = [...storedAddresses];
      array[modalIndex].title = title;
      array[modalIndex].person_name = name;
      array[modalIndex].address = address;
      array[modalIndex].phone_number = phoneNumber;

      Axios.put("http://localhost:3001/addresses/updateAddress", {
        title: title,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        id: data[modalIndex].id,
      }).then((response) => {
        setStoredAddresses(array);
      });
    }
    setShowPass(true);
    setDisableInfo(true);
  };

  const deleteInfo = () => {
    const infoID = data[modalIndex].id;

    Axios.delete(
      `http://localhost:3001/addresses/deleteAddress/${infoID}`
    ).then((response) => {
      setStoredAddresses(
        storedAddresses.filter((element) => {
          return element.id !== infoID;
        })
      );
    });
  };

  return (
    <div class="modal fade" id="AddressInfoModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            {data[modalIndex] && (
              <div>
                <h5 class="modal-title">
                  <strong>{data[modalIndex].title}</strong>
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
                  <strong>Title: </strong>
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={title}
                    disabled={disableInfo}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>

                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(title)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Name: </strong>
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
                  <strong>Address: </strong>
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={address}
                    disabled={disableInfo}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(address)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Phone Number: </strong>
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={phoneNumber}
                    disabled={disableInfo}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(phoneNumber)}
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
export default AddressModal;
