node_modules:
	npm install

test: node_modules
	@mocha -R spec

.PHONY: test
