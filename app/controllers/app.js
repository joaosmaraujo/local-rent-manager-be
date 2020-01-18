/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		if (new.target === AppController) {
			throw new TypeError('Cannot construct Abstract instances directly');
		}
		this._model = model;
		this.add = this.add.bind(this);
		this.get = this.get.bind(this);
		this.getAll = this.getAll.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async add(req, res) {
        try {
            const obj = await this._model.create(req.body);
            return res.send({
                name: "added object",
                content: { obj },
                status: 200,
                success: true
            });
        } catch (err) {
            return res.status(400).send({ error: "Could not add house. " + err });
        }
	}

	async getAll(req, res) {
		const error = "Could not get object.";
		try {
			const response = await this._model.find();
			if (response) {
				return res.send(response);
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
	async get (req, res) {
		const _id = req.params.id;
		const error = "Could not get object.";
		try {
			const response = await this._model.findOne({ _id });
			if (response) {
				return res.send(response);
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
	async update (req, res) {
		const _id = req.params.id;
		const error = "Could not edit object.";
		try {
			if (await this._model.findOne({ _id })) {
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
	async remove (req, res) {
		const _id = req.params.id;
		const error = "Could not remove object.";
		try {
			if (await this._model.findOne({ _id })) {
				await this._model.findByIdAndDelete(_id);
				return res.send();
			} else {
				return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
			}
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}
}

module.exports = AppController;