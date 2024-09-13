import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import PasswordModalInput from "./PasswordModalInput";

function AddPasswordModal({ setSendRequest }) {
  const loginInfo = useSelector((state) => state.loginReducer);
  const [siteName, setSiteName] = useState("");
  const [siteURL, setSiteURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultImg, setDefaultImg] = useState("false");
  const [imageError, setImageError] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  const resetData = () => {
    setSiteName("");
    setSiteURL("");
    setEmail("");
    setPassword("");
    setDefaultImg("false");
    setImageError(false);
    setModalPage(1);
  };

  const addPassword = () => {
    console.log(loginInfo.id);
    Axios.post(`http://localhost:3001/passwords/addPassword`, {
      siteName: siteName,
      siteURL: siteURL,
      email: email,
      password: password,
      default_img: defaultImg,
      user_id: loginInfo.id,
    }).then((response) => {
      document.getElementById("add-new-pass").reset();
      resetData();
      setSendRequest(true);
    });
  };

  return (
    <div className="modal fade" id="addModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Password</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetData()}
            ></button>
          </div>
          {modalPage === 1 && (
            <div className="modal-body">
              <form id="add-new-pass">
                <PasswordModalInput
                  title={"Site Name"}
                  type={"text"}
                  placeholder={"Ex. Facebook"}
                  changeInput={setSiteName}
                />
                <PasswordModalInput
                  title={"Site URL"}
                  type={"text"}
                  placeholder={"Ex. facebook.com"}
                  changeInput={setSiteURL}
                />
              </form>
            </div>
          )}

          {modalPage === 2 && (
            <div className="modal-body">
              <img
                src={modalPage === 2 && `//logo.clearbit.com/${siteURL}`}
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
                      className="btn btn-secondary"
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
            <div className="modal-body">
              <form id="add-new-pass">
                <PasswordModalInput
                  title={"Email"}
                  type={"text"}
                  placeholder={"Ex. example@gmail.com"}
                  changeInput={setEmail}
                />
                <PasswordModalInput
                  title={"Password"}
                  type={"password"}
                  placeholder={"Set Password"}
                  changeInput={setPassword}
                />
              </form>
            </div>
          )}

          <div className="modal-footer">
            {modalPage > 1 ? (
              <button
                onClick={
                  modalPage === 2
                    ? () => {
                        setModalPage(modalPage - 1);
                        setImageError(false);
                      }
                    : () => setModalPage(modalPage - 1)
                }
                type="button"
                className="btn btn-secondary"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
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
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={addPassword}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
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

export default AddPasswordModal;
