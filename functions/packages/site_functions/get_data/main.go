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

//may need to be negative
const max_lat float64 = 81.0499630643;
const min_lat float64 = 81.049240209;

const max_lon float64 = 29.1899521529;
const min_lon float64 = 29.1893445087;



type data struct {
	//boolean to give the user to indicate whether they are at the fitness center
	User_at_fitness_center bool `json:"User_at_fitness_center"`
	User_latitude interface{} `json:"User_latitude"`
	User_longitude interface{} `json:"User_longitude"`
}

type Response struct {
	Body data `json:"body"`
}

func Main(ctx context.Context, event map[string]interface{}) Response {
	
	//var user_latitude float32 = event["lat"];
	
	//user_longitude := event["lon"];
	
	//wowie, data encoding and datatypes can be hard to manage
 	latString := event["lat"].(string);
	lonString := event["lon"].(string);
	var latFloat, _ = strconv.ParseFloat(latString, 64);
	var lonFloat, _ = strconv.ParseFloat(lonString, 64);
	fmt.Println("the type is ", reflect.TypeOf(latFloat));
	fmt.Println("the value is ", latFloat);
	
	var user_at_fitness_center bool;
	
	if(latFloat > min_lat && lonFloat > min_lon && latFloat < max_lat && lonFloat < max_lon){
		user_at_fitness_center = true;
	}

	return Response{
		Body: data{
			User_at_fitness_center: user_at_fitness_center,
			User_latitude: event["lat"],
			User_longitude: event["lon"],
		},
	}
}
