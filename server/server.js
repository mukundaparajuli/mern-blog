const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const databaseConnection = require("./config/databaseConnection");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

databaseConnection();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use("/api/blog/", require("./routes/blog.route"));
app.use("/api/auth/", require("./routes/auth.route"));
app.use("/api/admin/", require("./routes/admin.route"));

app.listen(port, () => {
    console.log("Listening to the port " + port);
})