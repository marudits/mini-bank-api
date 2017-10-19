'use strict';

const async = require('async');

const app = require('../../server/server');

module.exports = function(Employee) {

	Employee.search  = function(query, cb) {
		let params = {
			where: {
				name: {
					ilike: `%${query}%`
				}
			},
			fields: {createdAt: false, updatedAt: false},
			include: [
				{
					relation: 'position',
					scope: {
						fields: ['name', 'departmentId']
					}
				},
				{
					relation: 'department',
					scope: {
						fields: ['name']
					}
				}
			]
		}

		Employee.find(params, (err, res) => {
			if(err){
				cb(err, {status: false})
			}

			cb(null, {status: true, data: res})
		});
	}

	Employee.remoteMethod('search', {
		http: {
			verb: 'GET',
			path: '/search'
		},
		accepts: {
			arg: 'name',
			type: 'string'
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});

	Employee.lastContacted = function(callerId, next){
		const NUM_SHOWN_HISTORY = 5;

		async.waterfall([
			//get CallHistory data of `callerId`
			function(cb){
				let params = {
					where: {
						callerId: callerId
					},
					fields: ['calleeId']
				}
				
				app.models.CallHistory.find(params, (err, res) => {
					if(err){
						cb(err, []);
					} else {
						cb(null, res);	
					}
					
				});
			},

			//distinct only return `NUM_SHOWN_HISTORY` item
			function(calleeIds, cb){
				if(calleeIds.length > 0){
					let shownItem = [];

					async.forEach(calleeIds, (item, innerCb) => {
						if(shownItem.length < NUM_SHOWN_HISTORY){
							if(shownItem.indexOf(parseInt(item.calleeId)) === -1){
								shownItem.push(parseInt(item.calleeId));
							}		
						}
						innerCb();
					}, (err) => {
						if(err){
							cb(err, shownItem);
						}
						cb(null, shownItem);
					});
				} else {
					cb(null, [])
				}
			},

			//get shownItem data
			function(data, cb){
				let result = [];
				if(data.length > 0){
					let params = {
						where: {
							id: {
								inq: data
							}
						},
						fields: {updatedAt: false},
						include: [
							{
								relation: 'employee',
								scope: {
									fields: ['name', 'email', 'phone', 'ext', 'departmentId', 'positionId'],
									include: [
										{
											relation: 'department',
											scope: {
												fields: 'name'
											}
										},
										{
											relation: 'position',
											scope: {
												fields: 'name'
											}
										}
									]
								}
							}
						]
					}

					app.models.CallHistory.find(params, (err, res) => {
						if(err){
							cb(err, result);
						} else {
							cb(null, res)
						};
					});
				} else {
					cb(null, result)	
				}
			}
		], (err, res) => {
			if(err){
				next(err, {status: false});
			}

			next(null, {status: true, data: res});
		});
	}

	Employee.remoteMethod('lastContacted', {
		http: {
			verb: 'POST',
			path: '/lastContacted'
		},
		accepts: {
			arg: 'callerId',
			type: 'string',
			required: true
		},
		returns: {
			arg: 'result',
			type: 'object'
		}
	});

};
