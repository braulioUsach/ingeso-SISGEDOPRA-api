start:
	npm install 
	npm run start
aws:
	npm run aws
stop:
	npm run stop
restart:
	make stop
	make aws
update:
	make stop
	rm package-lock.json
	git pull
	npm install
	make aws
