'use strict';

const async = require('async');

const app = require('../../server/server');

const dateAndTime = require('../utils/dateAndTime.js');

module.exports = function(Bank) {

	//REMOTE METHOD: favourite
	Bank.favourite = function(bankId, next){

		app.models.Bank.findById(bankId, (err, bank) => {
			if(err || !bank){
				console.error('An error occured. Cannot find bank.', err);
				next({status: false, error: err});
			} else {
				let favourites = parseInt(bank.favourites) + 1;
				
				bank.updateAttributes({favourites: favourites}, (err, res) => {
					if(err){
						console.error('An error occured. Cannot update atribute selected bank. ', err);
						next({status: false, error: err});
					} else {
						next(null, {status: true, data: res});
					}
				});
			}

		});
	}

	Bank.remoteMethod('favourite', {
		http: {
			verb: 'PATCH',
			path: '/favourite'
		},
		accepts: {
			arg: 'bankId',
			type: 'number',
			required: true
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});

	//REMOTE METHOD: list
	Bank.list = function(next){

		const params = {
			include: [
				{
					relation: 'ratings',
					scope: {
						fields: ['id']
					}
				}
			]
		}

		app.models.Bank.find(params, (err, banks) => {
			if(err){
				console.error('An error occured. Cannot get list of Bank. ', err);
				next(err);
			} else {
				banks.forEach((bank) => {
					bank.officeDaysFormatted = dateAndTime.formatOfficeDays(bank.officeDays);
					bank.officeHoursFormatted = bank.officeHours.join(' - ');
					bank.status = dateAndTime.isOpen(bank.officeDays, bank.officeHours)
				});

				next(null, {status: true, data: banks});
			}
		});
	}

	Bank.remoteMethod('list', {
		http: {
			verb: 'GET',
			path: '/list'
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});
};