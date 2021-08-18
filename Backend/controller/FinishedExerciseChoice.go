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
	//fmt.Println("exerciseAnswerUser ",exerciseAnswerUser)
	filter := bson.D{
		{
			"ExcerciseID", exerciseAnswerUser.ExcerciseID,
		},
		{
			"UserId", exerciseAnswerUser.UserId,
		},
	}

	eauResult := db.FindOne("ExerciseAnswerUser", filter)
	//fmt.Println("eauResult ", eauResult.Err())
	if eauResult.Err() != nil{
		//fmt.Println("222222222222222222222222")
		filter = bson.D{
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
		exerciseAnswerUser.DoTime = 1
		exerciseAnswerUser.S = score
		name, _ := db.GetFieldValue("user", bson.D{{"_id",exerciseAnswerUser.UserId}}, "UserName")
		exerciseAnswerUser.Name = name.(string)
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
		return
	}else{
		//fmt.Println("11111111111111111111111")
		eau := newModel.ExerciseAnswerUser{}
		eauResult.Decode(&eau)
		filter = bson.D{
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
		update := bson.M{
			"$set": bson.M{
				"Score": strconv.Itoa(score)+"/"+exercise.ExcerciseNumberQuestion,
				"ExcerciseAllAnswerContent": exerciseAnswerUser.ExcerciseAllAnswerContent,
				"DoTime": eau.DoTime+1,
				"S": score,
			},
		}
		filter = bson.D{
			{
				"_id",eau.ExcerciseDidID,
			},
		}
		err = db.FindOneAndUpdate("ExerciseAnswerUser", filter, update)
		if err != nil{
			fmt.Println("err ", err)
		}
		c.JSON(http.StatusOK, newModel.ExcerciseMemberDoResult{
			CheckValidate: "success-finished-excercise-choice",
			ExcerciseDidID: eau.ExcerciseDidID,
		})

	}

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