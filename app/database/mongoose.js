const mongoose = require("mongoose");
const config = require("../config.js");

// MongoDB Connection
mongoose.connect(config.CONNECTION_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;