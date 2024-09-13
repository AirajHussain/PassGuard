import React, { useState, useReducer, useEffect } from "react";
import Axios from "axios";

function PasswordModal({
  data,
  storedPasswords,
  setStoredPasswords,
  modalIndex,
  modalRequest,
  setModalRequest,
}) {
  const [disableInfo, setDisableInfo] = useState(true);
  const [showPass, setShowPass] = useState(true);

  const [siteURL, setSiteURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (data[modalIndex]) {
      setSiteURL(data[modalIndex].site_url);
      setEmail(data[modalIndex].email);
      setPassword(data[modalIndex].pass);
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
      data[modalIndex].site_url !== siteURL ||
      data[modalIndex].email !== email ||
      data[modalIndex].pass !== password
    ) {
      let array = [...storedPasswords];
      array[modalIndex].site_url = siteURL;
      array[modalIndex].email = email;
      array[modalIndex].pass = password;

      Axios.put("http://localhost:3001/passwords/updatePassword", {
        site_url: siteURL,
        email: email,
        password: password,
        id: data[modalIndex].id,
      }).then((response) => {
        setStoredPasswords(array);
      });
    }
    setShowPass(true);
    setDisableInfo(true);
  };

  const deleteInfo = () => {
    const infoID = data[modalIndex].id;

    Axios.delete(
      `http://localhost:3001/passwords/deletePassword/${infoID}`
    ).then((response) => {
      setStoredPasswords(
        storedPasswords.filter((element) => {
          return element.id !== infoID;
        })
      );
    });
  };

  return (
    <div class="modal fade" id="PassInfoModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            {data[modalIndex] && (
              <div>
                <h5 class="modal-title">
                  <strong>{data[modalIndex].site_name}</strong>
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
                  <strong>Site URL: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={siteURL}
                    disabled={disableInfo}
                    onChange={(e) => setSiteURL(e.target.value)}
                  ></input>

                  <a
                    className="redirectLink"
                    href={`https://www.${siteURL}`}
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
                  <strong>Email: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={email}
                    disabled={disableInfo}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(siteURL)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Password: </strong>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={disableInfo}
                  ></input>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(password)}
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
export default PasswordModal;
