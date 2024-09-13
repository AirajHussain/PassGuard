const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/addCard", (req, res) => {
  const card_vendor = req.body.card_vendor;
  const card_type = req.body.card_type;
  const name = req.body.name;
  const card_number = req.body.card_number;
  const securityCode = req.body.securityCode;
  const expiryDate = req.body.expiryDate;
  const default_img = req.body.default_img;
  const user_id = req.body.user_id;

  db.query(
    "INSERT INTO account_cards (card_vendor,card_type,name_on_card, card_number, security_code, expiry_date, default_img, user_id) VALUES (?,?,?,?,?,?,?,?)",
    [
      card_vendor,
      card_type,
      name,
      card_number,
      securityCode,
      expiryDate,
      default_img,
      user_id,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.get("/getCards", (req, res) => {
  const user_id = req.query.user_id;

  db.query(
    "SELECT * FROM account_cards WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

router.delete("/deleteCard/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM account_cards WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

router.put("/updateCard", (req, res) => {
  const card_vendor = req.body.card_vendor;
  const name = req.body.name;
  const card_number = req.body.card_number;
  const securityCode = req.body.securityCode;
  const expiryDate = req.body.expiryDate;
  const id = req.body.id;
  db.query(
    "UPDATE account_cards SET card_vendor = ?, name_on_card = ?, card_number = ?, security_code = ?, expiry_date = ? WHERE id = ?;",
    [card_vendor, name, card_number, securityCode, expiryDate, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

module.exports = router;
