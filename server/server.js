const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT;

app.use("/api/", require("./routes/blog.route"));

app.listen(port, () => {
    console.log("Listening to the port " + port);
})