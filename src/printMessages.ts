import { dirname, join } from "path";
import { statSync } from "fs";
import { SimpleMessage, MultipleMessages } from "./proto/__generated__/proto";
import * as multipleMessageJson from "../examples/MultipleMessage/json.json";
import * as simpleMessageJson from "../examples/SimpleMessage/json.json";

const simpleMessage = new SimpleMessage(simpleMessageJson);
const multipleMessage = new MultipleMessages(multipleMessageJson);
const simpleMessageEncoded = SimpleMessage.encode(simpleMessage).finish()
const multipleMessageEncoded = MultipleMessages.encode(multipleMessage).finish()

const examplePath = join(dirname(__dirname), "examples");

const simpleJsonFileSize = statSync(
  join(examplePath, "SimpleMessage", "json.json")
);
const multipleJsonFileSize = statSync(
  join(examplePath, "MultipleMessage", "json.json")
);

console.log("---------------- simple message -----------------------");
console.log('json: ', JSON.stringify(simpleMessage))
console.log('encoded: ', simpleMessageEncoded);
console.log("json file size: ", simpleJsonFileSize.size);
console.log("protobuf size: ", simpleMessageEncoded.length)

console.log("---------------- multiple message -----------------------");
console.log('json: ', JSON.stringify(multipleMessage))
console.log('encoded: ', multipleMessageEncoded);
console.log("json file size: ", multipleJsonFileSize.size);
console.log("protobuf size: ", multipleMessageEncoded.length)