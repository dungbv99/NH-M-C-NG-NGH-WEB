package newModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RequestDataGetFullName struct {
	MemberID		primitive.ObjectID `json:"MemberID"`
}

type RequestDataIdExercise struct {
	ID 			primitive.ObjectID			`json:"id"`
}