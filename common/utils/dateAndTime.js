const moment = require('moment');

module.exports = {
	
	formatOfficeDays: function(officeDays = []){
		let officeDaysFormatted = [];

		officeDays.forEach((day) => {
			officeDaysFormatted.push(moment().day(day).format('ddd'));
		});

		return officeDaysFormatted.join(', ');
	},

	isOpen: function(officeDays = [], officeHours = []){
		let day = moment().day(),
			format = 'HH:mm',
			time = moment(new Date(), format),
			beforeTime = moment(officeHours[0], format),
			afterTime = moment(officeHours[1], format);

		return time.isBetween(beforeTime, afterTime) && officeDays.indexOf(day) !== -1;
	}
}