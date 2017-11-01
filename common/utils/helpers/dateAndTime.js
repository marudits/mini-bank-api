const moment = require('moment-timezone'),
	app = require('../../../server/server'),
	configRegion = app.get('region');

module.exports = {
	
	formatOfficeDays: function(officeDays = []){
		let officeDaysFormatted = [];

		officeDays.forEach((day) => {
			officeDaysFormatted.push(moment().day(day).format('ddd'));
		});

		return officeDaysFormatted.join(', ');
	},

	isOpen: function(officeDays = [], officeHours = []){
		let day = moment().tz(configRegion.timezone).format('d'),
			format = 'HH:mm',
			time = moment(new Date(), format).tz(configRegion.timezone),
			beforeTime = moment(officeHours[0], format).tz(configRegion.timezone),
			afterTime = moment(officeHours[1], format).tz(configRegion.timezone);

		return time.isBetween(beforeTime, afterTime) && officeDays.indexOf(parseInt(day)) !== -1;
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
	},

	formatOfficeDaysAndStatus: function(days){
		let officeDaysAndStatus = [];

		for(let i = 0; i < 7; i++){
			officeDaysAndStatus.push(
				{
					id: i, 
					name: moment().day(i).format('ddd'), 
					isOpen: days.indexOf(i) !== -1,
					isToday: moment().format('d') == i
				}
			);
		}

		return officeDaysAndStatus;
	},

	getListDateInMonth: function(date = moment()){
		let startMonth = moment(date).startOf('month'),
			endMonth = moment(date).endOf('month'),
			currentDay = startMonth,
			dates = [];

		while(moment(currentDay).diff(endMonth, 'day') <= 0){
			dates.push(currentDay);
			currentDay = currentDay.add(1, 'day');
		}

		return dates;
	}
}