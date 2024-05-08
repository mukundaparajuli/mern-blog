const mongoose = require("mongoose");

const databaseConnection = async (req, res) => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to the database successfully!");
        console.log("Host: ", connection.connection.host);
        console.log("Port: ", connection.connection.port);
    }
    catch (er) {
        console.log("Connection to the database could not be made: ", er)
    }
}

module.exports = databaseConnection;