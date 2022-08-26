package main

import (
	"context"
	"fmt"
	"log"

	"github.com/BigsonLvrocha/protobufjs-study/src/proto/__generated__/pb"
	"google.golang.org/grpc"
)

func main() {
	connection, err := grpc.Dial("localhost:8080", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect to grpc server: %v", err)
	}
	defer connection.Close()
	client := pb.NewMessageServiceClient(connection)
	sendMessage(client)
}

func sendMessage(client pb.MessageServiceClient) {
	req := &pb.SimpleMessage{
		Id:    "0",
		Value: 0,
	}

	res, err := client.SendMessage(context.Background(), req)
	if err != nil {
		log.Fatalf("Could not make sendMessage request: %v", err)
	}

	fmt.Println(res)
}
