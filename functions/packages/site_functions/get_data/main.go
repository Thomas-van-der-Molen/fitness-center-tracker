/*
File: send_to_client
*/

package main

import (
	"context"
	_ "fmt"
	_ "reflect"
	_ "strconv"
)

//important global variable that keeps track of the current users at the gym
var count = 0;

type ResponseHeaders struct {
	CORS string `json:"Access-Control-Allow-Origin"`
}

type data struct {
	//boolean to give the user to indicate whether they are at the fitness center
	//User_at_fitness_center bool        `json:"User_at_fitness_center"`
	//User_latitude          interface{} `json:"User_latitude"`
	//User_longitude         interface{} `json:"User_longitude"`
	Count int `json:"count"`
}

type Response struct {
	Body    data            `json:"body"`
	Headers ResponseHeaders `json:"headers"`
}

func Main(ctx context.Context, event map[string]interface{}) Response {

	//var user_latitude float32 = event["lat"];

	//user_longitude := event["lon"];

	//wowie, data encoding and datatypes can be hard to manage
	//latString := event["lat"].(string)
	//var latFloat, _ = strconv.ParseFloat(latString, 64)
	//fmt.Println("the type is ", reflect.TypeOf(latFloat))
	//fmt.Println("the value is ", latFloat)

	function := event["function"];
	var returnedCount int;
	if function == "get_count"{
		returnedCount = get_count();
	}else if function == "inc_count"{
		returnedCount = inc_count();
	}else if function == "dec_count"{
		returnedCount = dec_count();
	}

	return Response{
		Body: data{
			Count: returnedCount,
		},
		Headers: ResponseHeaders{
			CORS: "https://fitness.thomasvandermolen.com",
		},
	}
}

func get_count() int{
	return count;
}

func inc_count() int{
	count++;
	return count;
}

func dec_count() int{
	if count > 0{
		count--;
	}
	return count;
}

func rst_count() int{
	count = 0;
	return count;
}
