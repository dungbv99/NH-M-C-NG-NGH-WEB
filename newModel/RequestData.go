package newModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RequestDataGetFullName struct {
	MemberID		primitive.ObjectID `json:"MemberID"`
}

type RequestDataIdMongo struct {
	ID 			primitive.ObjectID			`json:"id"`
}

type UserExerciseId struct {
	ExcerciseID				primitive.ObjectID				`json:"ExcerciseID"`
	UserID					primitive.ObjectID				`json:"UserID"`
}

type RequestDataString struct {
	Name 					string							`json:"name"`
}

type RequestGetRank struct {
	ExerciseID 						primitive.ObjectID				`json:"ExerciseID"`
	CurrentPage						string							`json:"CurrentPage"`
	Limit 							string							`json:"Limit"`
}