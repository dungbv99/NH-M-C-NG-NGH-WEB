package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"web/routefw"
	"web/util"
)

func Hello(c *routefw.Context){
	util.ExtractTokenMetadata(c.Request)
	c.JSON(http.StatusOK, "abc")
}

func test(c *gin.Context){
	//c.Header()
}