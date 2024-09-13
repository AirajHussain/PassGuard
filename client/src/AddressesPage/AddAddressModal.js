import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import AddressModalInput from "./AddressModalInput";

function AddAddressModal({ setSendRequest }) {
  const loginInfo = useSelector((state) => state.loginReducer);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const resetData = () => {
    setTitle("");
    setName("");
    setAddress("");
    setPhoneNumber("");
  };

  const addAddress = () => {
    console.log(loginInfo.id);
    Axios.post(`http://localhost:3001/addresses/addAddress`, {
      title: title,
      name: name,
      address: address,
      phoneNumber: phoneNumber,
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
            <h5 class="modal-title">Add New Address</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetData()}
            ></button>
          </div>
          <div className="modal-body">
            <form id="add-new-pass">
              <AddressModalInput
                title={"Title"}
                type={"text"}
                placeholder={"Ex. Johns Home"}
                changeInput={setTitle}
              />
              <AddressModalInput
                title={"Name"}
                type={"text"}
                placeholder={"Ex. John Doe"}
                changeInput={setName}
              />
              <AddressModalInput
                title={"Address"}
                type={"text"}
                placeholder={"Ex. 123 Example Street"}
                changeInput={setAddress}
              />
              <AddressModalInput
                title={"Phone Number"}
                type={"text"}
                placeholder={"Ex. 123-123-1234"}
                changeInput={setPhoneNumber}
              />
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => resetData()}
            >
              Close
            </button>

            <button
              onClick={addAddress}
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddressModal;
