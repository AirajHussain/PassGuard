const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../EncryptionHandler");
const db = require("../config/database");

router.post("/addPassword", (req, res) => {
  const siteName = req.body.siteName;
  const siteURL = req.body.siteURL;
  const email = req.body.email;
  const password = req.body.password;
  const default_img = req.body.default_img;
  const user_id = req.body.user_id;
  const encryptedPass = encrypt(password);

  db.query(
    "INSERT INTO account_passwords (site_name, site_url, email, pass, iv, default_img, user_id) VALUES (?,?,?,?,?,?,?)",
    [
      siteName,
      siteURL,
      email,
      encryptedPass.password,
      encryptedPass.iv,
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

router.get("/getPasswords", (req, res) => {
  const user_id = req.query.user_id;
  db.query(
    "SELECT * FROM account_passwords WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      for (let i = 0; i < result.length; i++) {
        result[i].pass = decrypt(result[i].pass, result[i].iv);
      }
      res.send(result);
    }
  );
});

router.delete("/deletePassword/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM account_passwords WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

router.put("/updatePassword", (req, res) => {
  const site_url = req.body.site_url;
  const email = req.body.email;
  const pass = req.body.password;
  const id = req.body.id;

  const encryptedPass = encrypt(pass);

  db.query(
    "UPDATE account_passwords SET site_url = ?,email = ?, pass = ?, iv = ? WHERE id = ?;",
    [site_url, email, encryptedPass.password, encryptedPass.iv, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

module.exports = router;
