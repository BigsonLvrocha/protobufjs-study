# protobufjs-study

A repository to study implementation and use of protocol buffers with NodeJS

## How to use

- clone repository `git clone https://github.com/BigsonLvrocha/protobufjs-study.git`
- install dependencies `npm ci`
- start server `make start-grpc-server`
- run client `make start-grpc-client`
- run protobuf example `make run-protobuf-example`

## Details

There are 3 main scripts to be run and are in the folder `src`

- `src/server.ts`: starts a grpc server with `MessageService` in port 8080
- `src/client.ts`: Runs a client that executes each endpoint of `MessageService` to show what GRPC is capable of
- `src/printMessages.ts`: Uses `protobufjs` directly to compare messages in jsonformat vs messages in binary format serialized by protocol buffers

All protocol buffer files are in `src/proto` folder
