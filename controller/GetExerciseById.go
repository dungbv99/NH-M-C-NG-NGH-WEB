package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetExerciseById(c * routefw.Context){
	fmt.Println("GetExerciseById")
	idEx := &newModel.RequestDataIdExercise{}
	err := c.DecodeJson(idEx)
	if err != nil{
		fmt.Println("err ", err)
	}
	filter := bson.D{
		{
			"_id", idEx.ID,
		},
	}

	result := db.FindOne("Excercise", filter)
	if result.Err() != nil{
		fmt.Println("err ", result.Err())
	}
	ex := newModel.Excercise{}
	result.Decode(&ex)
	resEx := newModel.ResponseExercise{Exercise: ex}
	c.JSON(http.StatusOK, resEx)
}
