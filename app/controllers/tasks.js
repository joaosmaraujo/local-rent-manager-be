const House = require("../models/houses");
const User = require("../models/users");
const Task = require("../models/tasks");
const AppController = require('./app');

async function updateTaskHouse(task, requestBody) {
	const previousHouse = await House.findOne({ _id: task.house });
	const newHouse = await House.findOne({ _id: requestBody.house._id });
	previousHouse.tasks.splice(previousHouse.tasks.findIndex(item => item._id === task._id), 1)
	newHouse.tasks.push(requestBody._id);
	await House.findByIdAndUpdate(previousHouse._id, previousHouse);
	await House.findByIdAndUpdate(newHouse._id, newHouse);
}

async function increaseUserTasksCounter(userId) {
	const user = await User.findOne({ _id: userId });
	user.tasks++;
	await User.findByIdAndUpdate(user._id, user);
}

async function decreaseUserTasksCounter(userId) {
	const user = await User.findOne({ _id: userId });
	user.tasks--;
	await User.findByIdAndUpdate(user._id, user);
}

class TaskController extends AppController {
	constructor() {
		super(Task);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async add(req, res) {
        try {
			const task = await this._model.create(req.body);
			const house = await House.findOne({ _id: task.house });
			house.tasks.push(task._id);
			await House.findByIdAndUpdate(house._id, house);
			if (task.completed && task.completedBy) {
				increaseUserTasksCounter(task.completedBy);
			}
            return res.send({
                message: "Added task",
                content: { task },
                status: 200,
                success: true
            });
        } catch (err) {
            return res.status(400).send({ error: "Could not add task." });
        }
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async update (req, res) {
		const _id = req.params.id;
		const error = "Could not edit task.";
		try {
			const task = await this._model.findOne({ _id });
			if (task) {
				if (task.house != req.body.house._id) {
					updateTaskHouse(task, req.body);
				}
				if (task.completed !== req.body.completed) {
					// if task was completed and now it's not
					if (!req.body.completed) {
						decreaseUserTasksCounter(task.completedBy);
					}
					// if task was not completed and now it is
					else {
						increaseUserTasksCounter(req.body.completedBy);
					}
				}
				// if task was and it is still completed but completedBy was changed
				else if (task.completed && task.completedBy !== req.body.completedBy) {
					increaseUserTasksCounter(req.body.completedBy);
					decreaseUserTasksCounter(task.completedBy);
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
		const error = 'Could not get object.';
		try {
			this._model.find()
						.populate('house')
						.populate('work')
						.exec(function(err, tasks) {					;
							if (err) {
								return res.status(404).send({ error: error + 'Cannot retrieve any tasks'});
								
							} else {
								return res.send(tasks);
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
		const error = "Could not get task.";
		try {
			this._model.findOne({ _id })
						.populate('house')
						.populate('work')
						.exec(function(err, task) {
							if (err) {
								return res.status(404).send({ error: error + `Cannot find id '${_id}'`});
							} else {
								return res.send(task);
							}
			});
		} catch (err) {
			return res.status(400).send({ error: error + err });
		}
	}
}

module.exports = TaskController;
