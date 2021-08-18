package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"strconv"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetRank(c *routefw.Context){
	rgr := newModel.RequestGetRank{}
	c.DecodeJson(&rgr)
	//fmt.Println("rgr", rgr)
	option := options.Find()
	limit, err := strconv.ParseInt(rgr.Limit,10, 64)
	if err != nil{
		fmt.Println("err ", err)
	}
	option.SetLimit(limit)
	option.SetSort(bson.D{{"S",-1}})
	cur, err := strconv.ParseInt(rgr.CurrentPage,10,64)
	option.SetSkip((cur-1)*limit)
	filter := bson.D{
		{
			"ExcerciseID", rgr.ExerciseID,
		},
	}

	arr, err := db.FindExerciseAnswerUser(filter,option)
	//fmt.Println("arr ", arr)
	if err != nil{
		fmt.Println("err")
		c.JSON(http.StatusNotFound, "ok")
		return
	}

	res := make([]newModel.ResponseRank,len(arr))
	for idx, a := range arr{
		x := newModel.ResponseRank{

			DoTime: a.DoTime,
			Name:   a.Name,
			Score:  a.Score,
		}
		res[idx] = x
	}

	cnt,err := db.Count("ExerciseAnswerUser",filter)
	if err != nil{
		fmt.Println("err ", err)
	}
	filter = bson.D{
		{
			"_id", rgr.ExerciseID,
		},
	}
	name, err := db.GetFieldValue("Excercise", filter, "ExcerciseName")
	r := newModel.ResRankPage{
		ResponseNumberPageRank: newModel.ResponseNumberPageRank{
			Num:  cnt,
			Name: name.(string),
		},
		List:                   res,
	}
	//fmt.Println("res ", res)
	c.JSON(http.StatusOK, r)

}