const AppController = require('./app');
const User = require("../models/users");
class UserController extends AppController {
	constructor() {
		super(User);
	}
}

module.exports = UserController;