import http from '../http-common';

const getAll = (page) => {
	return http.get('/veiculos', { params: { page } });
};

const get = (id) => {
	return http.get(`veiculos/${id}`);
};

const create = (data) => {
	return http.post('/veiculos', data);
};

const update = (id, data) => {
	return http.put(`/veiculos/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/veiculos/${id}`);
};

const findByName = (veiculo, page) => {
	return http.get('/veiculos', {
		params: {
			veiculo,
			page
		}
	});
};

export default {
	getAll,
	get,
	create,
	update,
	remove,
	findByName
};