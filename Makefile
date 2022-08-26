clean:
	rm -rf dist

build-proto:
	npx proto-loader-gen-types -I=src/proto --longs=String --enums=String --defaults --onofs --grpcLib=@grpc/grpc-js --outDir=src/proto/__generated__/ MessageService.proto


build: clean
	npx tsc

copy-proto:
	cd src && rsync -armR --include="*/" --include="*.proto" --exclude="*" ./* ../dist/ && cd ..

build-and-copy: build copy-proto

