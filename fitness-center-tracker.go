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

type userData struct{
	Coords map[string]interface{}
	Timestamp int
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
			
		
			var clientData userData;
			json.NewDecoder(r.Body).Decode(&clientData);
			//fmt.Println(clientData.Coords);
			fmt.Println(clientData.Coords["latitude"]);
			fmt.Println(clientData.Coords["longitude"]);
			fmt.Println(clientData.Timestamp);
			//bounding box
			//[-81.0496033886,29.1893211524],[-81.0503594703,29.189856592],[-81.0499238968,29.1903253587],[-81.0491678151,29.1897899216],[-81.0496033886,29.1893211524]
		}
	});

	log.Fatal(http.ListenAndServe(":8000", nil));
}
