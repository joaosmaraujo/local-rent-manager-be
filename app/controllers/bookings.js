const House = require("../models/houses");
const Booking = require("../models/bookings");
const AppController = require('./app');

class BookingController extends AppController {
	constructor() {
		super(Booking);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async add(req, res) {
        try {
			const booking = await this._model.create(req.body);
			const house = await House.findOne({ _id: booking.house });
			house.bookings.push(booking._id);
			await House.findByIdAndUpdate(house._id, house);
            return res.send({
                name: "Added booking.",
                content: { booking },
                status: 200,
                success: true
            });
        } catch (err) {
            return res.status(400).send({ error: "Could not add booking." });
        }
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async update (req, res) {
		const _id = req.params.id;
		const error = "Could not edit booking.";
		try {
			const booking = await this._model.findOne({ _id });
			if (booking) {
				if (booking.house != req.body.house._id) {
					/* if house of the booking was changed,
					removes the booking from the previous one and adds it to new one */
					const previousHouse = await House.findOne({ _id: booking.house });
					const newHouse = await House.findOne({ _id: req.body.house._id });
					previousHouse.bookings.splice(previousHouse.bookings.findIndex(item => item._id === booking._id), 1)
					newHouse.bookings.push(req.body._id);
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

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async getAll(req, res) {
		const error = "Failed to retrieve bookings.";
		try {
			this._model.find()
						.populate('house')
						.exec(function(err, bookings) {					;
							if (err) {
								return res.status(404).send({ error });
								
							} else {
								return res.send(bookings);
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
		const error = "Could not get booking.";
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
