const moment = require('moment-timezone');
require('dotenv').config();

module.exports = function generateDate() {
	return moment().tz(process.env.TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
};
