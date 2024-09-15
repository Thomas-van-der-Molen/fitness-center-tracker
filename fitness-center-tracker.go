package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	//"os"
)

type info struct{
	Users int
	Name string
}


func main(){
	
	data := info{Users:10,Name:"thomas"};
	

	tmpl := template.Must(template.ParseFiles("index.html"));
	http.Handle("/gps.js", http.FileServer(http.Dir("./")));
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		
		tmpl.Execute(w, data);
		//http.ServeFile(w, r, "./index.html");
		//http.ServeFile(w, r, "./index.tmpl");
	});

	http.HandleFunc("/getLocation", func(w http.ResponseWriter, r *http.Request){
		if r.Method != "POST"{
			fmt.Fprintf(w, "invalid method");
		}else{
			
			//got damn this took way too long to implement
			var received interface{};
			json.NewDecoder(r.Body).Decode(&received);
			fmt.Println(received);
			
		}
	});

	log.Fatal(http.ListenAndServe(":8000", nil));
}
