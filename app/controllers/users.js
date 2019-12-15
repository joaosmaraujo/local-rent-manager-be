const AppController = require('./app');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class UserController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		super(model);
	}
}

module.exports = UserController;