var Chai = require('chai');
var Path = require('path');
var Client = require(Path.resolve('lib/'));
var client;

describe('DNS Client', function () {
	it('Should return a Client constructor', function () {
		Chai.expect(Client, 'Client').to.be.a('function');
	});

	it('Should require options', function () {
		Chai.expect(() => Client(), 'Client()').to.throw('Options must be an object with properties apiKey and apiSecret');
	});

	it('Should create a client when opetions are provided', function () {
		var options = {
			apiKey: 'apiKey',
			apiSecret: 'apiSecret'
		};
		Chai.expect(client = Client(options), 'Client(options)').to.be.an('object');
	});

	describe('getDomains', function () {
		it('Should return an array of domains', function () {
			var domains = client.getDomains();
			Chai.expect(domains, 'domains').to.be.an('Array');
			Chai.expect(domains, 'domains').to.not.be.empty;
		});
	});

	describe('getDomain', function () {
		it('Should return a domain', function () {
			var domain = client.getDomain('example.com');
			Chai.expect(domain, 'an object').to.be.an('object');
			Chai.expect(domain, 'with properties').to.have.all.keys('domainId', 'domain', 'status', 'expires')
		});
	});

	describe("getRecords", function () {
		it("Should be able to return an array of records", function () {
			var hosts = client.getRecords();
			Chai.expect(hosts, "Hosts").to.be.an('Array');
			Chai.expect(hosts, 'Hosts to not be empty').to.not.be.empty;
		});
	});
});