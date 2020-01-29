const Customer = require("../models/customers");
const House = require("../models/houses");
const AppController = require('./app');

class HouseController extends AppController {
	constructor() {
		super(House);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async add(req, res) {
        try {
			const house = await this._model.create(req.body);
			const customer = await Customer.findOne({ _id: house.owner });
			customer.houses.push(house._id);
			await Customer.findByIdAndUpdate(customer._id, customer);
            return res.send({
                name: "Added house",
                content: { house },
                status: 200,
                success: true
            });
        } catch (err) {
            return res.status(400).send({ error: "Could not add house. " + err });
        }
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async update (req, res) {
		const _id = req.params.id;
		const error = "Could not edit house.";
		try {
			const house = await this._model.findOne({ _id });
			if (house) {
				if (house.owner != req.body.owner._id) {
					const previousCustomer = await Customer.findOne({ _id: house.owner });
					const newCustomer = await Customer.findOne({ _id: req.body.owner._id });
					previousCustomer.houses.splice(previousCustomer.houses.findIndex(item => item._id === house._id), 1);
					newCustomer.houses.push(req.body._id);
					await Customer.findByIdAndUpdate(previousCustomer._id, previousCustomer);
					await Customer.findByIdAndUpdate(newCustomer._id, newCustomer);
				}
				await this._model.findByIdAndUpdate(_id, req.body);
				return res.send();
			} else {
				return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
			}
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
		
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async getAll(req, res) {
		const error = "Failed to retrieve houses.";
		try {
			this._model.find()
						.populate('owner')
						.exec(function(err, house) {					;
							if (err) {
								return res.status(404).send({ error });
								
							} else {
								return res.send(house);
							}
						});
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async get (req, res) {
		const _id = req.params.id;
		const error = "Could not get house.";
		try {
			this._model.findOne({ _id })
						.populate('owner')
						.populate('bookings')
						.populate({
							path: 'tasks',
							populate: { path: 'work '} })
						.exec(function(err, house) {
							if (err) {
								return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
							} else {
								return res.send(house);
							}
			});
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}
}

module.exports = HouseController;