const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/database");
const saltRounds = 10;

router.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        console.log("Username Already Exists!");
        res.send({ message: "Username Already Exists!" });
      } else {
        console.log("Username is good!");
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          db.query(
            "INSERT INTO users (person_name, username, pass) VALUES (?,?,?)",
            [name, username, hash],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              res.send(result);
            }
          );
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          if (response) {
            res.json({ result });
          } else {
            res.send({ message: "Incorrect Username/Password!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist!" });
      }
    }
  );
});

module.exports = router;
