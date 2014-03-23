var pg = require('pg');
var Q = require('q');
var sprintf = require('util').format;
var _ = require('lodash');

var methods = {
	query: function () {		
		var deferred = Q.defer();
		var args = Array.prototype.slice.call(arguments);
		var url = this.url;
		
		if (_.isUndefined(url)) throw new Error('Please specify url for DB connection. \
			For example, pg = require("qpg"); \
			pg.url = "postgresq://user:password@host/db";');

		pg.connect(url, function (err, client, done) {
			if (err) {
				deferred.reject({
					args: args,
					err: err
				});
			} else {
				args.push(function (err, result) {
					done();
					if (err) {
						deferred.reject({
							args: args,
							err: err
						});
					} else {
						deferred.resolve(result.rows);
					}
				});
				client.query.apply(client, args);
			}
		});

		return deferred.promise;
	},
	querySingle: function () {
		var args = Array.prototype.slice.call(arguments);
		return methods.query.apply(this, args).then(function (data) {
			return data.length >= 1 ? data[0] : null;
		});
	},
	insert: function (table, row) {
		var sql = 'insert into %s %s values %s returning id';
		var prepare = function (row) {
			var tokens = [];
			var count  = _.keys(row).length;
			for (var i = 1; i <= count; ++i) {
				tokens.push('$' + i);
			}
			return '(' + tokens.join() + ')';
		};
		var fields = '(' + _.keys(row).join() + ')';
		var placeholders = prepare(row);
		return methods.querySingle(sprintf(sql, table, fields, placeholders), _.values(row));
	},
	update: function (table, row) {
		var params = [row.id];
		var sql = 'update ' + table + ' set %s where id = $1 returning id';
		var s = _.keys(row).filter(function (key) {
			return key !== 'id';
		}).map(function (key, index) {
			params.push(row[key]);
			return key + ' = $' + (index + 2);
		}).join(', ');
		sql = sprintf(sql, s);
		return methods.querySingle(sql, params);
	},
	remove: function (table, id) {
		return methods.querySingle('delete from ' + table + ' where id = $1', [id]);
	},
	removeAll: function (table) {
		return methods.querySingle('delete from ' + table);
	},
	end: function () {
		pg.end();
	}
};

module.exports = methods;
