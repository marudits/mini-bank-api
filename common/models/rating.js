'use strict';

const async = require('async');

const app = require('../../server/server'),
	ratingConfig = app.get('rating');

const dateAndTime = require('../utils/helpers/dateAndTime.js');
const googleApi = require('../utils/helpers/googleApi.js');

module.exports = function(Rating) {

	//REMOTE HOOK: AFTER
	const afterRemoteCreate = function(ctx, res, next){
		
		async.waterfall([
			//get data rating
			function(cb){
				app.models.Rating.find({where: {bankId: res.bankId}}, (err, ratings) => {
					if(err){
						cb(err);
					}

					let avgRating = 0;
					
					if(ratings && ratings.length !== 0){
						let totalRating = 0;

						for(let rating of ratings){
							totalRating += rating.value;
						}

						avgRating = totalRating/ratings.length;
					}

					cb(null, {
						bankId: res.bankId,
						avgRating
					});	
					
				});
			},

			//update bank
			function(data, cb){
				app.models.Bank.findById(data.bankId, (err, bank) => {
					if(err){
						cb(err);
					} 
					
					if(bank){
						bank.updateAttribute('rating', data.avgRating, (err, res) => {
							if(err){
								cb(err);
							} else {
								cb(null, Object.assign({}, data, {bank: res}));
							}
						})
					} else {
						cb(null, data);		
					}
					
				});
			}
			], (err, data) => {
				if(err){
					next(err);
				}	

				next(null, {
					status: true,
					bank: data.bank
				});	
				
			}
		);
	}


	Rating.afterRemote('create', afterRemoteCreate);

	//REMOTE HOOK: FIND
	const afterRemoteFind = function(ctx, res, next){

		res.forEach((x) => {
			x.createdAtFormatted = dateAndTime.calculateDiffTime(x.createdAt);
		});

		next(null, res);
	}

	Rating.afterRemote('find', afterRemoteFind)

	//REMOTE METHOD
	Rating.latestReview = function(next){
		const params = {
			order: 'createdAt DESC',
			include: [
				{
					relation: 'bank',
					scope: {
						fields: ['name', 'location'],
					}
				}
			],
			fields: {name: true, text: true, createdAt: true, bankId: true},
			limit: ratingConfig.showedLatestReview
		}

		app.models.Rating.find(params, (err, ratings) => {
			if(err || ratings.length < 1){
				next(err, {status: false, err: err});
			} else {

				ratings.forEach((rating) => {
					let { location } = rating.bank();
					rating.bank().imgStreetView = googleApi.getImgStreetView(location);
					rating.time = dateAndTime.calculateDiffTime(rating.createdAt);
				});

				next(null, {status: true, data: ratings});
			}
		});
	}

	Rating.remoteMethod('latestReview', {
		http: {
			verb: 'GET',
			path: '/latestReview'
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});
};
