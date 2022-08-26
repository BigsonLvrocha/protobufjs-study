export * from "./__generated__/MessageService";
export * from './__generated__/AcknowledgeMessage'
export * from './__generated__/MultipleAcknowledgeMessage'
export * from './__generated__/MultipleMessages'
export * from './__generated__/SimpleMessage'

import * as protoLoader from "@grpc/proto-loader";
import { join } from "path";

export const definitions = protoLoader.loadSync(
  join(__dirname, "MessageService.proto"),
  {
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
