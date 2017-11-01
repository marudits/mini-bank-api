var SAMPLE_DATA = require('../migrations/sample-data');

module.exports = function(app) {
	//const models = ['Bank', 'Rating', 'Department', 'Position', 'Employee', 'CallHistory'];
	//const models = ['Reference'];
	const mode = 'automigrate';
	const dbConnector = 'dbpostgresqlheroku';

	if(typeof models !== 'undefined' && models.length > 0){
		app.dataSources[dbConnector][mode](models, (err) => {
			if(err){
				throw err;
			}

			for(let model of models){
				console.log(`Model ${model} has been ${mode}`)
			}

			if(mode === 'automigrate'){

				for(let model of models) {
					if(SAMPLE_DATA[model] && SAMPLE_DATA[model].length > 0){
						app.models[model].create(SAMPLE_DATA[model], (err, res) => {
							if(err){
								throw err;
							}

							console.log(`Models ${model} has been migrated!`);
						});
					}
				}
			}
		});
	}
	
}