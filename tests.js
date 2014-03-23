var should = require('should');
var qpg = require('./index');

describe('qpg', function() {

	describe('query', function() {

		it('should allow to run sql queries', function(done) {
			qpg.url = 'postgres://qpgtester:qpgtester@localhost/qpgtest';
			qpg.query('select * from information_schema.tables').done(function(rows) {
				rows.length.should.be.above(1);
				done();
			}, done);
		});

	});

});
