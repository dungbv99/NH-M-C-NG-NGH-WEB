package newModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type ExerciseAnswerUser struct {
	UserId								primitive.ObjectID			`json:"UserId"`
	ExcerciseID							primitive.ObjectID			`json:"ExcerciseID"`
	ExcerciseAllAnswerContent			[]ExerciseAnswerContent		`json:"ExcerciseAllAnswerContent"`
	Score 								string						`json:"Score"`
	ExcerciseDidID						primitive.ObjectID			`json:"ExcerciseDidId" bson:"_id,omitempty"`
	ExcerciseNumberQuestion				string						`json:"ExcerciseNumberQuestion"`
	ExcerciseName						string						`json:"ExcerciseName"`
	ExcerciseDescription				string						`json:"ExcerciseDescription"`
}

type ExerciseAnswerContent struct {
	ExcerciseNthQuestion		string			`json:"ExcerciseNthQuestion"`
	ExcerciseChoiceAnswer		string			`json:"ExcerciseChoiceAnswer"`
}