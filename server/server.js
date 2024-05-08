const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const databaseConnection = require("./config/databaseConnection")
const port = process.env.PORT;

databaseConnection();
app.use(cors());
app.use(express.json());
app.use("/api/", require("./routes/blog.route"));

app.listen(port, () => {
    console.log("Listening to the port " + port);
})