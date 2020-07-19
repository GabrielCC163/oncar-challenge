const moment = require('moment-timezone');
const { timezone } = require('../../config');

module.exports = function generateDate() {
	return moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
};
