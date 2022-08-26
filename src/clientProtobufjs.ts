import * as grpc from "@grpc/grpc-js";
import { MessageService, SimpleMessage } from "./proto";

const grpcServerUrl = "127.0.0.1:8080";

const client = new grpc.Client(
  grpcServerUrl,
  grpc.credentials.createInsecure()
);

const buildRpcImpl = (service: string) => {
  return (method, requestData, callback) => {
    console.log('sending request: ', requestData)
    client.makeUnaryRequest(
      `/${service}/${method.name}`,
    (arg) => arg,
    (arg) => arg,
    requestData,
    callback
    )
  }
}

const messager = MessageService.create(buildRpcImpl('MessageService'), false, false);

messager
  .sendMessage({
    id: "1",
    value: 1,
  })
  .then((response) => {
    console.log("message sucessfull");
    console.log(response);
    process.exit(0);
  })
  .catch((error) => {
    console.log("message error");
    console.error(error);
    process.exit(1);
  });
