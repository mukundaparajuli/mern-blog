const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const databaseConnection = require("./config/databaseConnection");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

databaseConnection();
app.use(cors());
app.use(express.json());

app.use("/api/blog/", require("./routes/blog.route"));
app.use("/api/auth/", require("./routes/auth.route"));


app.use(cookieParser);
app.listen(port, () => {
    console.log("Listening to the port " + port);
})