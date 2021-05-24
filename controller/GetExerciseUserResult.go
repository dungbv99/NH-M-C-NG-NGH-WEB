package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetExerciseUserResult(c *routefw.Context){
	ueID := &newModel.UserExerciseId{}
	err := c.DecodeJson(ueID)
	if err != nil{
		fmt.Println("err ", err)
	}
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
		fmt.Println("err 1", result.Err())
	}
	exerciseAnswerUser := &newModel.ExerciseAnswerUser{}
	result.Decode(exerciseAnswerUser)
	filter = bson.D{
		{
			"_id", ueID.ExcerciseID,
		},
	}
	result = db.FindOne("Excercise", filter)
	if result.Err() != nil{
		fmt.Println("err 2", result.Err())
	}
	exercise := newModel.Excercise{}
	result.Decode(&exercise)
	res := newModel.ResponseUserExerciseResult{
		ExcerciseName:             exercise.ExcerciseName,
		ExcerciseDescription:      exercise.ExcerciseDescription,
		ExcerciseLogo:             exercise.ExcerciseLogo,
		ExcerciseNumberQuestion:   exercise.ExcerciseNumberQuestion,
		ExcerciseQAContent:        exercise.ExcerciseQAContent,
		ExcerciseAllAnswerContent: exerciseAnswerUser.ExcerciseAllAnswerContent,
		//DoTime: 				   exerciseAnswerUser.DoTime,
	}
	//fmt.Println("res ", res)
	c.JSON(http.StatusOK, res)
}
