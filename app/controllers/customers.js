const Customer = require("../models/customers");
const AppController = require('./app');

class CustomerController extends AppController {
	constructor() {
		super(Customer);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async get (req, res) {
		const _id = req.params.id;
		const error = "Could not get customer.";
		try {
			this._model.findOne({ _id })
						.populate({
							path: 'houses',
							populate: { path: 'tasks', select: 'cost' }
						})
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
