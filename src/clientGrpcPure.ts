import * as grpc from "@grpc/grpc-js";
import {
  definitions,
  MessageServiceDefinition,
  MessageServiceClient,
} from "./proto";

const grpcServerUrl = "127.0.0.1:8080";

const messageProto = grpc.loadPackageDefinition(definitions)
  .MessageService as grpc.ServiceClientConstructor;

const client = new messageProto(
  grpcServerUrl,
  grpc.credentials.createInsecure()
) as unknown as MessageServiceClient;

client.SendMessage(
  {
    id: "0",
    value: 1,
  },
  (err, response) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(response);
    process.exit(0);
  }
);
