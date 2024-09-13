const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/addAddress", (req, res) => {
  const title = req.body.title;
  const name = req.body.name;
  const address = req.body.address;
  const number = req.body.phoneNumber;
  const user_id = req.body.user_id;

  db.query(
    "INSERT INTO account_addresses (title, person_name, address, phone_number, user_id) VALUES (?,?,?,?,?)",
    [title, name, address, number, user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.get("/getAddresses", (req, res) => {
  const user_id = req.query.user_id;

  console.log(user_id);
  db.query(
    "SELECT * FROM account_addresses WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.delete("/deleteAddress/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM account_addresses WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

router.put("/updateAddress", (req, res) => {
  const title = req.body.title;
  const name = req.body.name;
  const address = req.body.address;
  const number = req.body.phoneNumber;
  const id = req.body.id;
  db.query(
    "UPDATE account_addresses SET title = ?, person_name = ?, address = ?, phone_number = ? WHERE id = ?;",
    [title, name, address, number, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

module.exports = router;
