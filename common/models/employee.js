'use strict';

module.exports = function(Employee) {

	Employee.search  = function(query, cb) {
		let params = {
			where: {
				name: {
					like: `%${query}%`
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

};
