import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopBar from "../Dashboard/TopBar";
import InfoPageHeading from "../InfoPages/InfoPageHeading";
import InfoPageGridNav from "../InfoPages/InfoPageGridNav";
import PasswordGrid from "./PasswordGrid";
import AddPasswordModal from "./AddPasswordModal";
import PasswordModal from "./PasswordModal";

function PasswordsPage() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();

  //Use State variables
  const [storedPasswords, setStoredPasswords] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [infoModaIndex, setInfoModalIndex] = useState(0);
  const [modalRequest, setModalRequest] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [defaultImg, setDefaultImg] = useState(false);

  useEffect(() => {
    setFirstIndex(0);
    setLastIndex(10);
    Axios.get(
      `http://localhost:3001/passwords/getPasswords?user_id=${loginInfo.id}`
    ).then((response) => {
      setStoredPasswords(response.data);
      setSendRequest(false);
    });
  }, [sendRequest]);

  return (
    <div>
      <TopBar />
      <div data-aos="fade-down">
        <div class="container page-container">
          <InfoPageHeading
            setFilterQuery={setFilterQuery}
            pageType={"Password"}
          />

          <InfoPageGridNav
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            setFirstIndex={setFirstIndex}
            setLastIndex={setLastIndex}
            arrayLength={storedPasswords.length}
          />
          {loginInfo.isLoggedIn ? (
            <PasswordGrid
              storedCards={storedPasswords}
              filterQuery={filterQuery}
              modalIndex={setInfoModalIndex}
              setModalRequest={setModalRequest}
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              defaultImg={defaultImg}
              setDefaultImg={setDefaultImg}
            />
          ) : (
            <div>
              <h1 id="black">Not Signed In</h1>
              <button
                type="button"
                className="btn btn-dark dashboard-button"
                onClick={() => history.push("/login")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      <AddPasswordModal
        setSendRequest={setSendRequest}
        setDefaultImg={setDefaultImg}
      />

      <PasswordModal
        data={storedPasswords}
        storedPasswords={storedPasswords}
        setStoredPasswords={setStoredPasswords}
        modalIndex={infoModaIndex}
        modalRequest={modalRequest}
        setModalRequest={setModalRequest}
      />
    </div>
  );
}

export default PasswordsPage;
