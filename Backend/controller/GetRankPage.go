package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetNumRankPage(c *routefw.Context){
	MongoId := newModel.RequestDataIdMongo{}
	err := c.DecodeJson(&MongoId)
	//fmt.Println("mongoid ", MongoId)
	if err != nil{
		fmt.Println(err)
	}
	filter := bson.D{
		{
			"ExcerciseID", MongoId.ID,
		},
	}
	cnt,err := db.Count("ExerciseAnswerUser",filter)
	if err != nil{
		fmt.Println("err ", err)
	}
	filter = bson.D{
		{
			"_id", MongoId.ID,
		},
	}
	//fmt.Println("cnt ", cnt)
	name, err := db.GetFieldValue("Excercise", filter, "ExcerciseName")
	c.JSON(http.StatusOK, newModel.ResponseNumberPageRank{Num: cnt, Name: name.(string)})
}