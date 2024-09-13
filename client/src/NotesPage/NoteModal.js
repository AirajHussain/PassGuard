import React, { useState, useEffect } from "react";
import Axios from "axios";

function NoteModal({
  data,
  storedNotes,
  setStoredNotes,
  modalIndex,
  modalRequest,
  setModalRequest,
}) {
  const [disableInfo, setDisableInfo] = useState(true);
  const [showPass, setShowPass] = useState(true);

  const [noteTitle, setNoteTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (data[modalIndex]) {
      setNoteTitle(data[modalIndex].title);
      setNote(data[modalIndex].note);
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
      data[modalIndex].title !== noteTitle ||
      data[modalIndex].note !== note
    ) {
      let array = [...storedNotes];
      array[modalIndex].title = noteTitle;
      array[modalIndex].note = note;

      Axios.put("http://localhost:3001/notes/updateNote", {
        title: noteTitle,
        note: note,
        id: data[modalIndex].id,
      }).then((response) => {
        setStoredNotes(array);
      });
    }
    setShowPass(true);
    setDisableInfo(true);
  };

  const deleteInfo = () => {
    const infoID = data[modalIndex].id;

    Axios.delete(`http://localhost:3001/notes/deleteNote/${infoID}`).then(
      (response) => {
        setStoredNotes(
          storedNotes.filter((element) => {
            return element.id !== infoID;
          })
        );
      }
    );
  };

  return (
    <div class="modal fade" id="NoteInfoModal" tabindex="-1">
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
                  <strong>Title: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <input
                    type="siteName"
                    class="form-control modal-info"
                    value={noteTitle}
                    disabled={disableInfo}
                    onChange={(e) => setNoteTitle(e.target.value)}
                  ></input>

                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(noteTitle)}
                  ></i>
                </div>
              </div>
            )}

            {data[modalIndex] && (
              <div className="container-row">
                <h5 class="modal-title">
                  <strong>Note: </strong>{" "}
                </h5>
                <div className="flex-row">
                  <textarea
                    class="form-control modal-info"
                    id="noteTextArea1"
                    rows="3"
                    value={note}
                    disabled={disableInfo}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                  <i
                    class="bi bi-clipboard eye"
                    onClick={() => navigator.clipboard.writeText(note)}
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
export default NoteModal;
