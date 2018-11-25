start:
	npm run start
run:
	make start
stop:
	npm run stop
restart:
	make stop
	make run
update:
	make stop
	rm package-lock.json
	git pull
	npm install
	make start
