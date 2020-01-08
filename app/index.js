const config = require('./config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
require('./passport')(passport);

app.listen(config.PORT, () => {
    console.log('listening on port ' + config.PORT);
});

require('./routes/index')(app);
