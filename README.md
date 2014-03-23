# QPG

[Q](https://github.com/kriskowal/q)-style [PG](https://github.com/brianc/node-postgres)

## Installation

```
npm install qpg --save
```

## Usage

```js
var qpg = require('qpg');
qpg.url = 'postgres://user:password@server/db';
qpg.query('select * from information_schema.tables').then(function(rows) {
	// do something with rows
}).catch(function(error) {
	// do something with error
});
```

## License

MIT
