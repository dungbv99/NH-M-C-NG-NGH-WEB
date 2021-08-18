package newModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type ResponseValidate struct {
	CheckValidate		string `json:"checkValidate"`
}

type ResponseLogin struct {
	CheckValidate		string 					`json:"checkValidate"`
	MemberID			primitive.ObjectID		`json:"MemberID"`
	AccessToken    		string					`json:"AccessToken"`
	RefreshToken 		string					`json:"RefreshToken"`
}

type ResponseExercise struct {
	Exercise 			Excercise				`json:"exercise"`
}


type ExcerciseMemberDoResult struct {
	CheckValidate		string 					`json:"checkValidate"`
	ExcerciseDidID		primitive.ObjectID		`json:"ExcerciseDidID"`
}

type ResponseExerciseAnswerUser struct {
	ExerciseAnswerUser			ExerciseAnswerUser			`json:"ExerciseAnswerUser"`
}

type ResponseUserExerciseResult struct {
	ExcerciseName						string					`json:"ExcerciseName" `
	ExcerciseDescription				string					`json:"ExcerciseDescription" `
	ExcerciseLogo						string					`json:"ExcerciseLogo" `
	ExcerciseNumberQuestion				string					`json:"ExcerciseNumberQuestion" `
	ExcerciseQAContent					[]ExcerciseQAContent	`json:"ExcerciseQAContent" `
	ExcerciseAllAnswerContent			[]ExerciseAnswerContent	`json:"ExcerciseAllAnswerContent" "`
	//DoTime								int						`json:"DoTime"`
}

type ResponseNumberPageRank struct {
	Num								int64 						`json:"Num"`
	Name 							string						`json:"Name"`
}

type ResponseRank struct {
	DoTime							int							`json:"DoTime"`
	Name 							string						`json:"Name"`
	Score 							string						`json:"Score"`
}

type ResRankPage struct {
	ResponseNumberPageRank			ResponseNumberPageRank		`json:"r1"`
	List 							[]ResponseRank				`json:"r2"`
}