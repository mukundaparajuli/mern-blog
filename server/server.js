const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const databaseConnection = require("./config/databaseConnection");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const path = require('path')
const bodyParser = require("body-parser")

databaseConnection();
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:5173',
    'https://techtonic-frontend.onrender.com',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/blog/", require("./routes/blog.route"));
app.use("/api/auth/", require("./routes/auth.route"));
app.use("/api/admin/", require("./routes/admin.route"));
app.use("/api/comment/", require("./routes/comment.route"));
app.use("/api/user/", require("./routes/user.route"));
app.use("/api/saved/", require("./routes/saved.route"));
app.use("/", require("./routes/verify-email.route"));

app.listen(port, () => {
    console.log("Listening to the port " + port);
})
