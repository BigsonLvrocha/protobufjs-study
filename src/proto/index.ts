export * from "./__generated__/proto";
export * from "./__generated__/MessageService";

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
