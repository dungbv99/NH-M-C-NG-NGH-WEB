package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func DeleteExercise(c *routefw.Context){
	name := newModel.RequestDataString{}
	err := c.DecodeJson(&name)
	if err != nil{
		fmt.Println("err ", err)
	}
	filter := bson.D{
		{
			"ExcerciseName", name.Name,
		},
	}
	err = db.DeleteOne("Excercise", filter)
	if err != nil{
		fmt.Println("err ", err)
	}
	c.JSON(http.StatusOK, "ok")
}
