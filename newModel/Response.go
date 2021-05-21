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