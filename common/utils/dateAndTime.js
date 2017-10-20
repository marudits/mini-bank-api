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
	},

	calculateDiffTime: function(time){
		let diffTime = moment().diff(moment(time)),
			sentTime = new Date(time);

		let countDays =  moment.utc(diffTime).dayOfYear() - 1,
			countHours = moment.utc(diffTime).hour(),
			countMinutes = moment.utc(diffTime).minute();

		if(countDays > 1){
			return moment(sentTime).format('D MMM YYYY').toString();
		} else if(countDays === 1){
			return 'Yesterday';
		} else {
			if(countHours >= 1){
				return `${countHours}h ago`;
			} else {
				return `${countMinutes}m ago`;
			}
		}
	}
}