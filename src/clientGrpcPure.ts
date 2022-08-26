import * as grpc from "@grpc/grpc-js";
import { Readable } from "stream";
import {
  definitions,
  MessageServiceDefinition,
  MessageServiceClient,
} from "./proto";
import { SimpleMessage } from "./proto/__generated__/SimpleMessage";

const grpcServerUrl = "127.0.0.1:8080";

const messageServiceDef =
  definitions.MessageService as unknown as MessageServiceDefinition;

const messageProto = grpc.loadPackageDefinition(definitions)
  .MessageService as grpc.ServiceClientConstructor;

async function sendUnaryMessage(client: MessageServiceClient) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log(
    "----------------- sending unary message ------------------------"
  );
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("");

  const result = await new Promise((resolve, reject) => {
    client.SendMessage(
      {
        id: "0",
        value: 1,
      },
      (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      }
    );
  });

  console.log("result: ", result);
  console.log("");
}

async function sendClientStreamMessages(client: MessageServiceClient) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log(
    "-------------- sending client stream message -------------------"
  );
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("");

  const result = await new Promise((resolve, reject) => {
    const clientStream = client.SendMultipleMessages({}, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
    const sendMessages = async () => {
      const messagesToSend: SimpleMessage[] = [
        {
          id: "0",
          value: 0,
        },
        {
          id: "1",
          value: 10,
        },
        {
          id: "2",
          value: 200,
        },
      ];

      for (const message of messagesToSend) {
        await delay(1000);
        console.log("sending a message");
        clientStream.write(message);
      }
      clientStream.end();
    };
    sendMessages();
  });

  console.log("result: ", result);
  console.log("");
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const client = new messageProto(
    grpcServerUrl,
    grpc.credentials.createInsecure()
  ) as unknown as MessageServiceClient;
  try {
    await sendUnaryMessage(client);
    await sendClientStreamMessages(client);
  } finally {
    client.close();
  }
}

main()
  .then(() => {
    console.log(`done`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
