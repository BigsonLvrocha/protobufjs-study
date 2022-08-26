import * as grpc from '@grpc/grpc-js';
import { definitions, MessageServiceHandlers,  } from './proto'
import { MessageServiceDefinition } from './proto/__generated__/MessageService'

const handlers: MessageServiceHandlers = {
  SendMessage(call, cb) {
    console.log('called');
    cb(null, {
      message: `received data: ${JSON.stringify(call.request)}`
    });
  }
}

const server = new grpc.Server();
server.addService(definitions.MessageService as any, handlers);
server.bindAsync('127.0.0.1:8080', grpc.ServerCredentials.createInsecure(),  (error, port) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`server running in port ${port}`);
  server.start();
})
