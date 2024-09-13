const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

const usersRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const addressRoutes = require("./routes/addressRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cardRoutes = require("./routes/cardRoutes");

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/passwords", passwordRoutes);
app.use("/cards", cardRoutes);
app.use("/notes", noteRoutes);
app.use("/addresses", addressRoutes);

app.listen(PORT, () => {
  console.log("server is running");
});
