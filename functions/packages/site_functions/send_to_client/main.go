/*
File: send_to_client
*/

package main

import "context"

type ResponseHeaders struct {
	//this is a big security weakness
}

type data struct {
	//boolean to give the user to indicate whether they are at the fitness center
	User_at_fitness_center bool `json:"User_at_fitness_center"`
}

type Response struct {
	Body data `json:"body"`
}

func Main(ctx context.Context, event interface{}) Response {
	return Response{
		Body: data{
			User_at_fitness_center: false,
		},
	}
}
