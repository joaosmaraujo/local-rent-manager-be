const mongoose = require("mongoose")
const config = require("../config.js")

mongoose.connect(config.CONNECTION_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.Promise = global.Promise

module.exports = mongoose;