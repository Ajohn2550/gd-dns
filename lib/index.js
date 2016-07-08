const Requset = require('request');

function Client (options) {
	if(typeof options !== 'object' || !options.hasOwnProperty('apiKey') || !options.hasOwnProperty('apiSecret')) {
		throw Error('Options must be an object with properties apiKey and apiSecret');
	}
	const baseHost = options.host ? options.host : 'https://api.ote-godaddy.com/';

	var request = Requset.defaults({
		headers: {
			Accept: 'application/json',
			Authorization: 'sso-key '+ options.apiKey + ':' + options.apiSecret
		}
	});

	return {
		getDomain: getDomain,
		getDomains: getDomains,
		getRecord: getRecord,
		getRecords: getRecords,
		getRecordsByType: getRecordsByType
	};

	function getDomains(callback) {
		request.get(baseHost + 'v1/domains', function (err, response, body) {
			/* istanbul ignore if */
			if (err || response.statusCode !== 200) {
				return callback(err || 'Received status code: ' + response.statusCode, null);
			}
			return callback(null, JSON.parse(body));
		});
	}

	function getDomain(domain, callback) {
		request.get(baseHost + 'v1/domains' + domain, function (err, response, body) {
			/* istanbul ignore if */
			if (err || response.statusCode !== 200) {
				return callback(err || 'Received status code: ' + response.statusCode, null);
			}
			return callback(null, JSON.parse(body));
		});
	}

	function getRecords(domain, callback) {
		var uri = baseHost + 'v1/domains/' + domain + '/records';
		request.get(uri, function (err, response, body) {
			/* istanbul ignore if */
			if (err || response.statusCode !== 200) {
				return callback(err || 'Received status code: ' + response.statusCode, null);
			}
			return callback(null, JSON.parse(body));
		});
	}

	function getRecordsByType(domain, type, callback) {
		var uri = baseHost + 'v1/domains/' + domain + '/records/' + type;
		request.get(uri, function (err, response, body) {
			/* istanbul ignore if */
			if (err || response.statusCode !== 200) {
				return callback(err || 'Received status code: ' + response.statusCode, null);
			}
			return callback(null, JSON.parse(body));
		});
	}

	function getRecord(domain, type, name, callback) {
		var uri = baseHost + 'v1/domains/' + domain + '/records/' + type + '/' + name;
		request.get(uri, function (err, response, body) {
			/* istanbul ignore if */
			if (err || response.statusCode !== 200) {
				return callback(err || 'Received status code: ' + response.statusCode, null);
			}
			return callback(null, JSON.parse(body));
		});
	}
}

module.exports = Client;