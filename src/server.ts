import * as grpc from '@grpc/grpc-js';
import { definitions, MessageServiceHandlers } from './proto'

const handlers: MessageServiceHandlers = {
  SendMessage(call, cb) {
    cb(null, {
      message: 'ok'
    });
  }
}


const server = new grpc.Server();
server.addService(definitions.MessageService as grpc.ServiceDefinition, handlers);
server.bindAsync('localhost:8080', grpc.ServerCredentials.createInsecure(),  (error, port) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`server running in port ${port}`);
})
