const Requset = require('request');

function Client (options) {
	if(typeof options !== 'object' || !options.hasOwnProperty('apiKey') || !options.hasOwnProperty('apiSecret')) {
		throw Error('Options must be an object with properties apiKey and apiSecret');
	}
	return {
		getDomain: getDomain,
		getDomains: getDomains,
		getRecords: getRecords
	};
	function getDomains() {
		return [{
			domainId: 1.1,
			domain: "example.com",
			status: "active",
			expires: Date.now()
		}];
	}

	function getDomain(domain) {
		return {
			domainId: 1.1,
			domain: 'example.com',
			status: 'ACTIVE',
			expires: Date.now()
		};
	}

	function getRecords() {
		return [{
			test: 'one'
		}];
	}
}

module.exports = Client;