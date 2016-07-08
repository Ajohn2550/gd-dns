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
			apiKey: 'VUqrPxQ5_MveMR2agodp2C8UfNqWRPA',
			apiSecret: 'MveRVaTCis2jEd5FC7wuVv'
		};
		Chai.expect(client = Client(options), 'Client(options)').to.be.an('object');
	});

	it('Should accept a host', function () {
		var options = {
			apiKey: 'VUqrPxQ5_MveMR2agodp2C8UfNqWRPA',
			apiSecret: 'MveRVaTCis2jEd5FC7wuVv',
			host: 'https://api.ote-godaddy.com/'
		}
		Chai.expect(Client(options), 'Client(options').to.be.an('object');
	});

	describe('getDomains', function () {
		it('Should return an array of domains', function (done) {
			client.getDomains(function (err, domains) {
				Chai.expect(domains, 'domains').to.be.an('Array');
				//Chai.expect(domains, 'domains').to.not.be.empty;
				done();
			});
		});
	});

	describe('getDomain', function () {
		it('Should return a domain', function (done) {
			client.getDomain('example.com', function (err, domain) {
				Chai.expect(err).to.not.exist;
				Chai.expect(domain, 'an object').to.be.an('object');
				Chai.expect(domain, 'with properties').to.have.all.keys('domainId', 'domain', 'status', 'expires');
				done();
			});
		});
	});

	describe("getRecords", function () {
		it("Should be able to return an array of records", function (done) {
			client.getRecords('example.com', function (err, records) {
				Chai.expect(records, "Records").to.be.an('Array');
				Chai.expect(records, 'Records to not be empty').to.not.be.empty;
				done();
			});
		});
	});

	describe("getRecordsByType", function () {
		it("Should be able to return an array of records", function (done) {
			var records = client.getRecordsByType('example.com', 'A', function (err, records) {
				Chai.expect(records, "Records").to.be.an('Array');
				Chai.expect(records, 'Records to not be empty').to.not.be.empty;
				done();
			});
		});
	});

	describe('getRecord', function () {
		it('Should be able to return a record', function (done) {
			var record = client.getRecord('example.com', 'A', '@', function (err, record) {
				Chai.expect(record, 'Record').to.be.an('object');
				Chai.expect(record, 'with properties').to.have.all.keys("type", "name", "data", "priority", "ttl", "service", "protocol", "port", "weight")
				done();
			});
		});
	});
});