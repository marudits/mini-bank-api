'use strict';

const async = require('async');

const app = require('../../server/server');

const dateAndTime = require('../utils/helpers/dateAndTime.js');
const googleApi = require('../utils/helpers/googleApi.js');

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


	//REMOTE METHOD: dashboard
	
	//widget: most rated bank
	Bank.mostRated = function(next){

		async.waterfall([
			//get data bank
			function(cb){
				const params = {
					include: [
						{
							relation: 'ratings',
							scope: {
								fields: ['id']
							}
						}
					],
					order: 'rating DESC'
				}

				app.models.Bank.findOne(params, (err, bank) => {
					if(err){
						cb(err, null);
					} else {
						let data = bank;
						
						data.formattedOfficeDaysAndStatus = dateAndTime.formatOfficeDaysAndStatus(Array.from(bank.officeDays));
						data.totalRatings = bank.ratings().length;
						
						cb(null, data);
					}
				});
			},

			//get full address
			function(data, cb){
				if(data.location.lat && data.location.lng){
					googleApi.parseLatLng({lat: data.location.lat, lon: data.location.lng})
						.then(res => {
							data.fullAddress = {
								city: res.city, 
								country: res.country, 
								countryCode: res.countryCode, 
								admLv1: res.administrativeLevels.level1short
							};
							
							cb(null, data);
						})
						.catch(err => {
							cb(err, data)
						});
				} else {
					cb(null, data)
				}
			},

			//get image street view
			function(data, cb){
				if(data.location.lat && data.location.lng){
					data.imgStreetView = googleApi.getImgStreetView(data.location);
					cb(null, data);
				} else {
					cb(null, data);
				}
			}


		], (err, res) => {
			next(err, {status: true, data: res});
		});
		
	}
	
	Bank.remoteMethod('mostRated', {
		http: {
			verb: 'GET',
			path: '/mostRated'
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});

	Bank.totalSummary = function(next){

		const params = {
			include: [
				{
					relation: 'ratings',
					scope: {
						fields: ['id']
					}
				}
			],
			fields: {id: true, rating: true, favourites: true}
		}

		app.models.Bank.find(params, (err, banks) => {
			if(err){
				next(err, {status: false, err: false})
			} else {
				let totalRating = 0,
					totalFavourites = 0,
					totalLowRated = 0,
					totalMidRated = 0,
					totalHighRated = 0;

				banks.forEach((bank, i) => {
					
					if(parseFloat(bank.rating) < 2.5){
						totalLowRated++;
					} else if(parseFloat(bank.rating) <= 3.5){
						totalMidRated++;
					} else if(parseFloat(bank.rating) <= 5){
						totalHighRated++;
					}

					totalRating += bank.ratings ? Array.from(bank.ratings).length : 0;
					totalFavourites += bank.favourites;
				});

				let data = Object.assign({}, 
					{ totalBank: banks.length },
					{ totalLowRated: totalLowRated },
					{ totalMidRated: totalMidRated },
					{ totalHighRated: totalHighRated },
					{ totalRating: totalRating },
					{ totalFavourites: totalFavourites },
					{ avgRating: (totalRating/banks.length) },
					{ avgFavourites: (totalFavourites/banks.length) }
					);

				next(null, {status: true, data: data})
			}
		});
			
	}

	Bank.remoteMethod('totalSummary', {
		http: {
			verb: 'GET',
			path: '/totalSummary'
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	})
};