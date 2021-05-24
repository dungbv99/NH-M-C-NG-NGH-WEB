package newModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type ExerciseAnswerUser struct {
	UserId								primitive.ObjectID			`json:"UserId" bson:"UserId"`
	ExcerciseID							primitive.ObjectID			`json:"ExcerciseID" bson:"ExcerciseID"`
	ExcerciseAllAnswerContent			[]ExerciseAnswerContent		`json:"ExcerciseAllAnswerContent" bson:"ExcerciseAllAnswerContent"`
	Score 								string						`json:"Score" bson:"Score"`
	ExcerciseDidID						primitive.ObjectID			`json:"ExcerciseDidId" bson:"_id,omitempty"`
	ExcerciseNumberQuestion				string						`json:"ExcerciseNumberQuestion" bson:"ExcerciseNumberQuestion"`
	ExcerciseName						string						`json:"ExcerciseName" bson:"ExcerciseName"`
	ExcerciseDescription				string						`json:"ExcerciseDescription" bson:"ExcerciseDescription"`
}

type ExerciseAnswerContent struct {
	ExcerciseNthQuestion		string			`json:"ExcerciseNthQuestion" bson:"ExcerciseNthQuestion"`
	ExcerciseChoiceAnswer		string			`json:"ExcerciseChoiceAnswer" bson:"ExcerciseChoiceAnswer"`
}