package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"strconv"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func FinishedExerciseChoice(c *routefw.Context){
	//fmt.Println("FinishedExerciseChoice ")
	exerciseAnswerUser := &newModel.ExerciseAnswerUser{}
	err := c.DecodeJson(exerciseAnswerUser)
	if err != nil{
		fmt.Println("err ", err)
		//c.JSON(http.StatusBadRequest, err)
		//return
	}
	filter := bson.D{
		{
			"_id",exerciseAnswerUser.ExcerciseID,
		},
	}
	result := db.FindOne("Excercise", filter)
	if result.Err() != nil{
		fmt.Println("result.Err() ", result.Err())
		//c.JSON(http.StatusBadRequest, result.Err())
		//return
	}
	exercise := newModel.Excercise{}
	result.Decode(&exercise)
	score := caculateScore(exercise.ExcerciseQAContent, exerciseAnswerUser.ExcerciseAllAnswerContent)
	exerciseAnswerUser.Score = strconv.Itoa(score)+"/"+exercise.ExcerciseNumberQuestion
	exerciseAnswerUser.ExcerciseName = exercise.ExcerciseName
	exerciseAnswerUser.ExcerciseNumberQuestion = exercise.ExcerciseNumberQuestion
	exerciseAnswerUser.ExcerciseDescription = exercise.ExcerciseDescription
	//fmt.Println("exerciseAnswerUser     " , exerciseAnswerUser)
	err, r := db.InsertOneGetResult("ExerciseAnswerUser", exerciseAnswerUser)
	//fmt.Println("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn r", r.InsertedID)
	//a := r.InsertedID.(primitive.ObjectID)
	//fmt.Println("a ", a)
	if err != nil{
		fmt.Println("err ", err)
	}
	c.JSON(http.StatusOK, newModel.ExcerciseMemberDoResult{
		CheckValidate: "success-finished-excercise-choice",
		ExcerciseDidID: r.InsertedID.(primitive.ObjectID),
	})
}

func caculateScore(qaContents []newModel.ExcerciseQAContent, ansContents []newModel.ExerciseAnswerContent) int{
	m := make(map[string]string)
	for _, qaContent := range qaContents{
		m[qaContent.ExcerciseNthQuestion] = qaContent.ExcerciseCorrectAnswer
	}
	score := 0
	for _, ansContent := range ansContents{
		if ansContent.ExcerciseChoiceAnswer == m[ansContent.ExcerciseNthQuestion]{
			score++
		}
	}
	return score
}