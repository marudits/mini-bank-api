var SAMPLE_DATA = require('../migrations/sample-data');

module.exports = function(app) {
	//const models = ['Bank', 'Rating', 'Department', 'Position', 'Employee', 'CallHistory'];
	const models = ['Category', 'Reference'];
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

			for(let model of models) {
				app.models[model].create(SAMPLE_DATA[model], (err, res) => {
					if(err){
						throw err;
					}

					console.log(`Models ${model} has been migrated!`);
				});
			}
		}
	});
}