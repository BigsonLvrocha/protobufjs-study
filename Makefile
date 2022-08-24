clean:
	rm -rf dist

build: clean
	npx tsc

copy-proto:
	cd src && rsync -armR --include="*/" --include="*.proto" --exclude="*" ./* ../dist/ && cd ..

build-and-copy: build copy-proto

