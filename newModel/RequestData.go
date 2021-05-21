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

