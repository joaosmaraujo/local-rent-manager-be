const House = require("../models/houses");
const AppController = require('./app');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class BookingController extends AppController {
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
	async add(req, res) {
        try {
			const boooking = await this._model.create(req.body);
			const house = await House.findOne({ _id: boooking.house });
			house.bookings.push(boooking._id);
			await House.findByIdAndUpdate(house._id, house);
            return res.send({
                name: "added object",
                content: { task },
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
		const error = "Could not edit object.";
		try {
			const boooking = await this._model.findOne({ _id })
			if (boooking) {
				if (boooking.house !== req.body.house._id) {
					const previousHouse = await House.findOne({ _id: boooking.house });
					const newHouse = await House.findOne({ _id: req.body.house._id });
					previousHouse.boookings.splice(previousHouse.boookings.findIndex(item => item._id === boooking._id), 1)
					newHouse.boookings.push(req.body._id);
					await House.findByIdAndUpdate(previousHouse._id, previousHouse);
					await House.findByIdAndUpdate(newHouse._id, newHouse);
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

	async getAll(req, res) {
		const error = "Could not get object.";
		try {
			this._model.find()
						.populate('house')
						.exec(function(err, booking) {					;
							if (err) {
								return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
								
							} else {
								return res.send(booking);
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
		const error = "Could not get object.";
		try {
			this._model.findOne({ _id })
						.populate('house')
						.exec(function(err, booking) {
							if (err) {
								return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
							} else {
								return res.send(booking);
							}
			});
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}
}

module.exports = BookingController;
