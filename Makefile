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
	rm package-lock.json
	git pull
	npm install
	make start
