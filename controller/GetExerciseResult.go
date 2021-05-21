package controller

import (
	"fmt"
	"net/http"
	"web/newModel"
	"web/routefw"
)

func GetExerciseResult(c *routefw.Context){
	mongoId := &newModel.RequestDataIdMongo{}
	err := c.DecodeJson(mongoId)
	if err != nil{
		fmt.Println("err ", err)
	}
	fmt.Println("mongoId ", mongoId)

	c.JSON(http.StatusOK,"ok")
}