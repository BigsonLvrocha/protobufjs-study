clean:
	rm -rf dist

build-proto:
	npx pbjs -p . -t static-module -w commonjs -o src/proto/__generated__/proto.js src/proto/MessageService.proto
	npx pbts -o src/proto/__generated__/proto.d.ts src/proto/__generated__/proto.js
	npx proto-loader-gen-types -I=src/proto --longs=String --enums=String --defaults --onofs --grpcLib=@grpc/grpc-js --outDir=src/proto/__generated__/ MessageService.proto


build: clean
	npx tsc

copy-proto:
	cd src && rsync -armR --include="*/" --include="*.proto" --exclude="*" ./* ../dist/ && cd ..

build-and-copy: build copy-proto

start-grpc-server:
	TS_NODE_TRANSPILE_ONLY=true npx ts-node src/server.ts

start-grpc-client:
	TS_NODE_TRANSPILE_ONLY=true npx ts-node src/client.ts

run-protobuf-example:
	TS_NODE_TRANSPILE_ONLY=true npx ts-node src/printMessages.ts
