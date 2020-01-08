const House = require("../models/houses");
const AppController = require('./app');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class CustomerController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		super(model);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async get (req, res) {
		const _id = req.params.id;
		const error = "Could not get object.";
		try {
			this._model.findOne({ _id })
						.populate('houses')
						.exec(function(err, customer) {
							if (err) {
								return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
							} else {
								return res.send(customer);
							}
			});
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}
}

module.exports = CustomerController;
