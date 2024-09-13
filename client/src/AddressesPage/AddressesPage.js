import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopBar from "../Dashboard/TopBar";
import InfoPageHeading from "../InfoPages/InfoPageHeading";
import InfoPageGridNav from "../InfoPages/InfoPageGridNav";
import AddressGrid from "./AddressGrid";
import AddAddressModal from "./AddAddressModal";
import AddressModal from "./AddressModal";

function AddressesPage() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();

  //Use State variables
  const [storedAddresses, setStoredAddresses] = useState([]);
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
      `http://localhost:3001/addresses/getAddresses?user_id=${loginInfo.id}`
    ).then((response) => {
      setStoredAddresses(response.data);
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
            pageType={"Addresse"}
          />

          <InfoPageGridNav
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            setFirstIndex={setFirstIndex}
            setLastIndex={setLastIndex}
            arrayLength={storedAddresses.length}
          />
          {loginInfo.isLoggedIn ? (
            <AddressGrid
              storedAddresses={storedAddresses}
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

      <AddAddressModal
        setSendRequest={setSendRequest}
        setDefaultImg={setDefaultImg}
      />

      <AddressModal
        data={storedAddresses}
        storedAddresses={storedAddresses}
        setStoredAddresses={setStoredAddresses}
        modalIndex={infoModaIndex}
        modalRequest={modalRequest}
        setModalRequest={setModalRequest}
      />
    </div>
  );
}

export default AddressesPage;
