/*
File: send_to_client
*/

package main

import (
	"context"
	"fmt"
	"reflect"
	"strconv"
)

type ResponseHeaders struct {
	CORS string `json:"Access-Control-Allow-Origin"`
}

type data struct {
	//boolean to give the user to indicate whether they are at the fitness center
	User_at_fitness_center bool        `json:"User_at_fitness_center"`
	User_latitude          interface{} `json:"User_latitude"`
	User_longitude         interface{} `json:"User_longitude"`
}

type Response struct {
	Body    data            `json:"body"`
	Headers ResponseHeaders `json:"headers"`
}

func Main(ctx context.Context, event map[string]interface{}) Response {

	//var user_latitude float32 = event["lat"];

	//user_longitude := event["lon"];

	//wowie, data encoding and datatypes can be hard to manage
	latString := event["lat"].(string)
	var latFloat, _ = strconv.ParseFloat(latString, 64)
	fmt.Println("the type is ", reflect.TypeOf(latFloat))
	fmt.Println("the value is ", latFloat)

	var user_at_fitness_center bool

	return Response{
		Body: data{
			User_at_fitness_center: user_at_fitness_center,
			User_latitude:          event["lat"],
			User_longitude:         event["lon"],
		},
	}
}
