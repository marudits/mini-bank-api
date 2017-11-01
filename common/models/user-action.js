'use strict';

const app = require('../../server/server');
const moment = require('moment-timezone'),
	async = require('async');

const dateAndTime = require('../utils/helpers/dateAndTime.js');

module.exports = function(UserAction) {

	UserAction.monthlyTotalSummary = function(filterReference = null, month = moment(), next){

		const startMonth = moment(month).startOf('month'),
			endMonth = moment(month).endOf('month');

		async.waterfall([
			//get actionList
			function(cb){
				let params = {
					fields: {id: true, categoryId: true, key: true, value: true}
				};

				if(filterReference){
					params = Object.assign({}, params, {where: filterReference});
				} else {
					params = Object.assign({}, params, {where: {categoryId: {inq: [2, 3, 4]}}});
				}

				app.models.Reference.find(params, (err, res) => {

					if(err){
						cb(err, [])
					} else {
						cb(null, {actionList: res})
					}
				})
			},

			//get monthly UserActions
			function(data, cb){
				const params = {
						where: {
							and: [
								{
									createdAt: {
										between: [new Date(startMonth), new Date(endMonth)]
									}
								}
							]
						},
						fields: {actionId: true, createdAt: true}
					}

				app.models.UserAction.find(params, (err, res) => {
					if(err){
						cb(err, data)
					} else {
						cb(null, Object.assign({}, data, {monthlyUserActions: res}))
					}
				})
			},

			//set total UserActions for each actionId
			function(data, cb){

				let totalUserActions = [];

				data.actionList.forEach((action) => {
					
					let userActionList = data.monthlyUserActions.filter((x) => action.id === x.actionId),
						total = userActionList ? userActionList.length : 0;

					totalUserActions.push({
						actionId: action.id, 
						categoryId: action.categoryId, 
						key: action.key, 
						name: action.value,
						total: total
					});

				});

				cb(null, Object.assign({}, data, {totalUserActions: totalUserActions}))
			}
		], (err, res) => {
			if(err){
				next(err, {status: false, err: err});
			} else {
				next(null, {status: true, data: res.totalUserActions});
			}
		});

		
	}

	UserAction.remoteMethod('monthlyTotalSummary', {
		http: {
			verb: 'GET',
			path: '/monthlyTotalSummary'
		},
		accepts: [
			{
				arg: 'filterReference',
				type: 'object',
				http: {
					source: 'query'
				}
			},
			{
				arg: 'month',
				type: 'date',
				http: {
					source: 'query'
				}
			}
		],
		returns: {
			arg: 'result',
			type: 'object'
		}
	});
};
