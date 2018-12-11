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
	git fetch --all
	git reset --hard origin/master
	git pull origin master
	npm install
	make aws
