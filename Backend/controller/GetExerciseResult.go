package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetExerciseResult(c *routefw.Context){
	ueID := &newModel.UserExerciseId{}
	err := c.DecodeJson(ueID)
	if err != nil{
		fmt.Println("err ", err)
	}
	//fmt.Println("ueID ", ueID)
	//fmt.Println("mongoId ", mongoId)
	filter := bson.D{
		{
			"ExcerciseID", ueID.ExcerciseID,
		},
		{
			"UserId", ueID.UserID,
		},
	}
	result := db.FindOne("ExerciseAnswerUser", filter)
	if result.Err() != nil{
		fmt.Println("err ", result.Err())
	}
	exerciseAnswerUser := &newModel.ExerciseAnswerUser{}
	result.Decode(exerciseAnswerUser)
	//fmt.Println("exerciseAnswerUser ", exerciseAnswerUser)
	c.JSON(http.StatusOK, newModel.ResponseExerciseAnswerUser{ExerciseAnswerUser: *exerciseAnswerUser})
}