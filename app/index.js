const config = require("./config.js");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(config.PORT, () => {
    console.log("listening on port " + config.PORT);
});

require("./routes/index")(app);
