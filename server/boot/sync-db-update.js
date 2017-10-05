module.exports = function(app) {
	const models = ['Bank', 'Rating'];
	const mode = 'autoupdate';

	app.dataSources.dbpostgresql[mode](models, (err) => {
		if(err){
			throw err;
		}

		for(let model of models){
			console.log(`Model ${model} has been ${mode}`)
		}

		let sampleData = 
		{
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
			]
		};

		if(mode === 'automigrate'){
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