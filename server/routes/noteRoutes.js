const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/addNote", (req, res) => {
  const title = req.body.noteTitle;
  const note = req.body.note;
  const user_id = req.body.user_id;

  db.query(
    "INSERT INTO account_notes (title, note, user_id) VALUES (?,?,?)",
    [title, note, user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.get("/getNotes", (req, res) => {
  const user_id = req.query.user_id;

  db.query(
    "SELECT * FROM account_notes WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.delete("/deleteNote/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM account_notes WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

router.put("/updateNote", (req, res) => {
  const title = req.body.title;
  const note = req.body.note;
  const id = req.body.id;
  db.query(
    "UPDATE account_notes SET title = ?, note = ? WHERE id = ?;",
    [title, note, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

module.exports = router;
