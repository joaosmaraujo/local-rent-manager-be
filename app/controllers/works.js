const AppController = require('./app');
const Work = require("../models/works");

class WorkController extends AppController {
	constructor() {
		super(Work);
	}
}

module.exports = WorkController;