import * as grpc from "@grpc/grpc-js";
import { Readable } from "stream";
import {
  definitions,
  MessageServiceHandlers,
  AcknowledgeMessage__Output,
  SimpleMessage__Output,
} from "./proto";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const processMessage = (
  message: SimpleMessage__Output
): AcknowledgeMessage__Output => {
  const jsonMessage = JSON.stringify(message);
  return {
    message: `received: ${jsonMessage}`,
    jsonsize: jsonMessage.length,
  };
};

const handlers: MessageServiceHandlers = {
  SendMessage(call, cb) {
    cb(null, processMessage(call.request));
  },
  SendMultipleMessages(call, cb) {
    const handleSendMutipleMessages = async () => {
      try {
        let messages = [];

        for await (const message of call) {
          messages.push(processMessage(message));
        }

        cb(null, { messages });
      } catch (err) {
        cb(err);
      }
    };
    handleSendMutipleMessages();
  },
  ReceiveMultipleAcknowledges(call) {
    const messages = call.request.messages;

    const sendAcknowledges = async () => {
      for (const message of messages) {
        await delay(1000);
        call.write(processMessage(message));
      }

      call.end();
    };

    sendAcknowledges();
  },
  MessagePingPong(call) {
    const handlePingPong = async () => {
      try {
        call.once('end', () => {
          call.end();
        })

        for await (const message of call) {
          await delay(500);

          if (call.writableEnded) {
            break;
          }
          call.write(processMessage(message));
        }

        call.end()
      } catch (err) {
        call.destroy(err);
      }
    };
    handlePingPong();
  },
};

const server = new grpc.Server();
server.addService(definitions.MessageService as any, handlers);
server.bindAsync(
  "127.0.0.1:8080",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`server running in port ${port}`);
    server.start();
  }
);
