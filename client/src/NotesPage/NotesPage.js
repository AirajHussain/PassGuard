import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopBar from "../Dashboard/TopBar";
import InfoPageHeading from "../InfoPages/InfoPageHeading";
import InfoPageGridNav from "../InfoPages/InfoPageGridNav";
import NoteGrid from "./NoteGrid";
import AddNoteModal from "./AddNoteModal";
import NoteModal from "./NoteModal";

function NotesPage() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();

  //Use State variables
  const [storedNotes, setStoredNotes] = useState([]);
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
      `http://localhost:3001/notes/getNotes?user_id=${loginInfo.id}`
    ).then((response) => {
      setStoredNotes(response.data);
      setSendRequest(false);
    });
  }, [sendRequest]);

  return (
    <div>
      <TopBar />
      <div data-aos="fade-down">
        <div class="container page-container">
          <InfoPageHeading setFilterQuery={setFilterQuery} pageType={"Note"} />

          <InfoPageGridNav
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            setFirstIndex={setFirstIndex}
            setLastIndex={setLastIndex}
            arrayLength={storedNotes.length}
          />
          {loginInfo.isLoggedIn ? (
            <NoteGrid
              storedNotes={storedNotes}
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

      <AddNoteModal
        setSendRequest={setSendRequest}
        setDefaultImg={setDefaultImg}
      />

      <NoteModal
        data={storedNotes}
        storedNotes={storedNotes}
        setStoredNotes={setStoredNotes}
        modalIndex={infoModaIndex}
        modalRequest={modalRequest}
        setModalRequest={setModalRequest}
      />
    </div>
  );
}

export default NotesPage;
