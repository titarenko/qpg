test:
	node ./node_modules/istanbul/lib/cli cover ./node_modules/mocha/bin/_mocha -- tests.js -R spec

.PHONY: test
