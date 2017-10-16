module.exports = function(app) {
	//const models = ['Bank', 'Rating', 'Department', 'Position', 'Employee', 'CallHistory'];
	const models = ['Employee'];
	const mode = 'autoupdate';
	const dbConnector = 'dbpostgresqlheroku';

	app.dataSources[dbConnector][mode](models, (err) => {
		if(err){
			throw err;
		}

		for(let model of models){
			console.log(`Model ${model} has been ${mode}`)
		}

		if(mode === 'automigrate'){
			const sampleData = {
				'Department': [
					{
						name: 'DEP-001'
					},
					{
						name: 'DEP-002'
					}
				],
				'Position': [
					{
						name: 'POS-001-DEP-001',
						departmentId: 1
					},
					{
						name: 'POS-002-DEP-001',
						departmentId: 1
					},
					{
						name: 'POS-003-DEP-002',
						departmentId: 2
					}
				],
				'Employee': [
					{
						name: 'EMP-001-POS-001',
						positionId: 1,
						departmentId: 1,
						email: 'emp-001@mail.com',
						phone: '0310000001',
						ext: '001'
					},
					{
						name: 'EMP-002-POS-001',
						positionId: 1,
						departmentId: 1,
						email: 'emp-002@mail.com',
						phone: '0310000002',
						ext: '002'
					},
					{
						name: 'EMP-003-POS-002',
						positionId: 2,
						departmentId: 1,
						email: 'emp-003@mail.com',
						phone: '0310000003',
						ext: '003'
					}
				],
				'Bank': [
					{
						name: 'Hong Leong Bank',
						address: 'Jl. Tun Perak, Kuala Lumpur, Malaysia',
						location: {
							lat: '',
							lng: ''
						},
						favourites: 0,
						officeHours: ['08:45', '17:45'],
						officeDays: [1,2,3,4,5],
						rating: 0
					},
					{
						name: 'Maybank Bank',
						address: 'Masjid Jamek, Kuala Lumpur, Malaysia',
						location: {
							lat: '',
							lng: ''
						},
						favourites: 0,
						officeHours: ['09:05', '18:00'],
						officeDays: [1,2,3,4,5],
						rating: 0
					},
					{
						name: 'CIMB Niaga Syariah',
						address: 'Sentul, Malaysia',
						location: {
							lat: '',
							lng: ''
						},
						favourites: 0,
						officeHours: ['08:45', '17:45'],
						officeDays: [0,1,2,3,4,5,6],
						rating: 0
					}
				],
				'Rating': [
					{
						bankId: 1,
						name: 'Marudi Tri Subakti',
						email: 'marudits@gmail.com',
						text: 'Lorem ipsum dolor sit amet',
						value: 4
					}
				],
				'CallHistory': [
					{
						callerId: 'IMEI-EMP-001',
						calleeId: 2
					},
					{
						callerId: 'IMEI-EMP-001',
						calleeId: 3
					},
					{
						callerId: 'IMEI-EMP-001',
						calleeId: 2
					}
				]
			}

			for(let model of models) {
				app.models[model].create(sampleData[model], (err, res) => {
					if(err){
						throw err;
					}

					console.log(`Models ${model} has been migrated!`);
				});
			}
		}
	});
}