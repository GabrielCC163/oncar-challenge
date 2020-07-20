const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const generateDate = require('../utils/generateDate');

module.exports = {
	async index(req, res) {
		const { veiculo } = req.query;

		//let query = connection('veiculos').limit(6).offset((page - 1) * 6).select('*');
		let query = connection('veiculos').select('*');
		if (veiculo) {
			query.where('veiculo', 'like', `%${veiculo}%`);
		}

		try {
			const [ count ] = await connection('veiculos').count();

			const vehicles = await query.orderBy('created', 'desc');
			res.header('X-Total-Count', count['count(*)']);
			return res.json(vehicles);
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	},

	async show(req, res) {
		const { id } = req.params;

		try {
			const vehicle = await connection('veiculos').where('id', id).select('*');

			if (!vehicle) {
				return res.status(400).json({ message: 'Veículo não encontrado.' });
			}
			return res.status(200).json(vehicle);
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	},

	async create(req, res) {
		const { veiculo, marca, ano, descricao, vendido } = req.body;

		try {
			const id = generateUniqueId();
			await connection('veiculos').insert({
				id,
				veiculo,
				marca,
				ano,
				descricao,
				vendido,
				created: generateDate()
			});

			return res.json({ id });
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	},

	async update(req, res) {
		const { id } = req.params;
		const { veiculo, marca, ano, descricao, vendido } = req.body;

		try {
			const vehicle = await connection('veiculos').where('id', id).first();

			if (!vehicle) {
				return res.status(401).json({ message: 'Veículo não encontrado.' });
			}

			const updated = generateDate();
			await connection('veiculos').where('id', id).update({
				veiculo,
				marca,
				ano,
				descricao,
				vendido,
				updated
			});

			return res.status(200).send();
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	},

	async delete(req, res) {
		const { id } = req.params;

		try {
			const vehicle = await connection('veiculos').where('id', id).first();

			if (!vehicle) {
				return res.status(400).json({ message: 'Veículo não encontrado.' });
			}

			await connection('veiculos').where('id', id).delete();

			return res.status(204).send();
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	}
};
