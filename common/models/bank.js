'use strict';

const async = require('async');

const app = require('../../server/server');

module.exports = function(Bank) {

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
};