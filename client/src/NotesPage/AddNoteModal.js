import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import NoteModalInput from "./NoteModalInput";

function AddNoteModal({ setSendRequest }) {
  const loginInfo = useSelector((state) => state.loginReducer);

  const [noteTitle, setNoteTitle] = useState("");
  const [note, setNote] = useState("");
  const resetData = () => {
    setNoteTitle("");
    setNote("");
  };

  const addNote = () => {
    console.log(loginInfo.id);
    Axios.post(`http://localhost:3001/notes/addNote`, {
      noteTitle: noteTitle,
      note: note,
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
            <h5 class="modal-title">Add New Note</h5>
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
              <NoteModalInput
                title={"Note Title"}
                type={"text"}
                placeholder={"Ex. Secret Note"}
                changeInput={setNoteTitle}
              />
              <div className="textArea">
                <label for="site-name" class="form-label">
                  <strong>Note:</strong>
                </label>
                <textarea
                  class="form-control"
                  id="noteTextArea"
                  rows="3"
                  placeholder={"Maximum 500 Characters"}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
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
              onClick={addNote}
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

export default AddNoteModal;
