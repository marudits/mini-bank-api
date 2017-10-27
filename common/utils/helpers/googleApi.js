const app = require('../../../server/server'),
	configKey = app.get('key'),
	NodeGeocoder = require('node-geocoder'),
	request = require('superagent');

const options = {
	geocoder: {
		provider: 'google',
		httpAdapter: 'https',
		apiKey: configKey.googleApi,
		formatter: null	
	},
	imgStreetView: {
		url: 'https://maps.googleapis.com/maps/api/streetview',
		heading: 151.78,
		pitch: 0.76,
		key: configKey.googleApi
	}
	
}

const geocoder = NodeGeocoder(options.geocoder);

module.exports = {

	
	/*
	 * desc		: geocode reverse
	 * params	: {lat: xxx, lon: xxx}
	 */
	parseLatLng: function(coords){
		return new Promise((resolve) => {
			geocoder.reverse(coords, (err, res) => {
				resolve(err || res[0]);
			})
		});
		
	},

	/*
	 * desc		: get images
	 * params	: `${lat}, ${lng}` 
	 */
	getImgStreetView: function(coords, size = '400x200'){
		return `${options.imgStreetView.url}?size=${size}&location=${coords.lat},${coords.lng}&heading=${options.imgStreetView.heading}&pitch=${options.imgStreetView.pitch}&&key=${options.imgStreetView.key}`
	}
}