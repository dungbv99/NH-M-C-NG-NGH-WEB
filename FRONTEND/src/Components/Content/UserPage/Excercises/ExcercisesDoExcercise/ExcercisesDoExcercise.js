import React from "react";
import axios from "axios";

import de111 from "../../../../Main/Image-Icons/de111.PNG";

import "./ExcercisesDoExcercise.css";

import ExcercisesDoExcerciseContent from "./ExcercisesDoExcercise/ExcercisesDoExcerciseContent";
import ExcercisesResultExcerciseContent from "./ExcercisesResultExcercise/ExcercisesResultExcerciseContent";
import ExcercisesResultDidExcerciseContent from "./ExcercisesResultExcercise/ExcercisesResultDidExcerciseContent";

export default class ExcercisesDoExcercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoad : false,
      chooseExcerciseDoOrFinished: "doexcercise",
      ExcerciseAllQAContent: [
        {
          ExcerciseNthQuestion: "1",
          ExcerciseQuestionContent: "Thuộc tính CSS nào sau đây viết sai?",
          ExcerciseAnswerContentA:
            "A.	border: 1px solid rgba(0.1, 0.1, 0.1, 1);",
          ExcerciseAnswerContentB: "B.	width: calc(100px + 100%);",
          ExcerciseAnswerContentC: "C.	z-index: -999;",
          ExcerciseAnswerContentD:
            "D.	background-image: src(‘/images/title.png’);",
          ExcerciseCorrectAnswer: "D"
        },
        {
          ExcerciseNthQuestion: "2",
          ExcerciseQuestionContent:
            ": Điều nào sau đây là đúng khi nói về REST?",
          ExcerciseAnswerContentA:
            "A.	Chỉ hỗ trợ duy nhất giao thức truyền tải HTTP",
          ExcerciseAnswerContentB: "B.	Là viết tắt của REquest State Transfer",
          ExcerciseAnswerContentC:
            "C.	Chỉ hỗ trợ gói tin định dạng XML hoặc JSON",
          ExcerciseAnswerContentD: "D.	Làs giao thức có trạng thái ",
          ExcerciseCorrectAnswer: "A"
        },
        {
          ExcerciseNthQuestion: "3",
          ExcerciseQuestionContent:
            "HTTP response status code là 401 có nghĩa là gì",
          ExcerciseAnswerContentA: "a.	Ok",
          ExcerciseAnswerContentB: "b.	Not found",
          ExcerciseAnswerContentC: "c.	Bad request",
          ExcerciseAnswerContentD: "d.	Unauthorized",
          ExcerciseCorrectAnswer: "D"
        },
        {
          ExcerciseNthQuestion: "4",
          ExcerciseQuestionContent:
            ". Với SOAP, chúng ta có thể dùng Message Format nào?",
          ExcerciseAnswerContentA: "a.	XML",
          ExcerciseAnswerContentB: "b.	Json",
          ExcerciseAnswerContentC: "c.	Plain Text",
          ExcerciseAnswerContentD: "d.	Tất cả",
          ExcerciseCorrectAnswer: "A"
        },
        {
          ExcerciseNthQuestion: "5",
          ExcerciseQuestionContent: "Thuộc tính CSS nào sau đây viết sai?",
          ExcerciseAnswerContentA:
            "A.	border: 1px solid rgba(0.1, 0.1, 0.1, 1);",
          ExcerciseAnswerContentB: "B.	width: calc(100px + 100%);",
          ExcerciseAnswerContentC: "C.	z-index: -999;",
          ExcerciseAnswerContentD:
            "D.	background-image: src(‘/images/title.png’);",
          ExcerciseCorrectAnswer: "D"
        }
      ],
      ExcerciseName: "công nghệ web",
      ExcerciseNumberQuestion: "5",
      ExcerciseType: "public",
      ExcerciseLogo: de111,
      e : "",
    };
  }
  componentDidMount = () =>{
    // axios.post("/getExerciseById/", {
    //   id: this.props.ExcerciseID
    // }).then(res => {
    //   console.log("res.data.exercise   ", res.data.exercise)
    //   this.setState({
    //
    //     e: res.data.exercise,
    //     dataLoad: true
    //   })
    // }).catch(
    //     error => {
    //       console.log(error)
    //     }
    // )

    fetch("/getExerciseById/", {
      method: "POST",
      body: JSON.stringify({
        id: this.props.ExcerciseID
      }),
    }).then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      }).then(
          data => {
            this.setState({

              e: data.exercise,
              dataLoad: true
            })
          }
      ).catch(
          error => {
            console.log(error)
          }
      );


  }



  updateRenderExcerciseDoExcerciseControl = state => {
    this.setState({
      chooseExcerciseDoOrFinished: state
    });
  };

  getExcerciseDidIDMemberDone = excerciseDidID => {
    this.setState({
      ExcerciseDidID: excerciseDidID
    });
  };

  renderExcerciseDoExcersiceDoOrFinished = () => {
    console.log("1   ", this.state.e);
    console.log("2   ", this.state.e.ExcerciseName);
    console.log("3   ", this.state.e.ExcerciseNumberQuestion);
    console.log("4   ", this.state.e.ExcerciseType);
    console.log("5   ", this.state.e.ExcerciseLogo);
    console.log("6   ", this.state.e.ExcerciseQAContent);
    switch (this.state.chooseExcerciseDoOrFinished) {
      case "doexcercise":
        return (
          <ExcercisesDoExcerciseContent
            MemberID={this.props.MemberID}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getExcerciseDidIDMemberDone={this.getExcerciseDidIDMemberDone}
            ExcerciseAllQAContent={this.state.e.ExcerciseQAContent}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseName={this.state.e.ExcerciseName}
            ExcerciseNumberQuestion={this.state.e.ExcerciseNumberQuestion}
            ExcerciseType={this.state.e.ExcerciseType}
            ExcerciseLogo={this.state.e.ExcerciseLogo}
            ExcerciseID={this.props.ExcerciseID}
          />
        );

      case "finishexcercise":
        return (
          <ExcercisesResultExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            ExcerciseDidID={this.state.ExcerciseDidID}
            ExcerciseID={this.props.ExcerciseID}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
          />
        );

      case "excerciseresultdidexcercise":
        return (
          <ExcercisesResultDidExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getExcerciseDidIDMemberDone={this.getExcerciseDidIDMemberDone}
            ExcerciseDidID={this.state.ExcerciseDidID}
            ExcerciseID={this.props.ExcerciseID}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
          />
        );
      default:
        return (
            <ExcercisesDoExcerciseContent
                MemberID={this.props.MemberID}
                updateRenderExcerciseDoExcerciseControl={
                  this.updateRenderExcerciseDoExcerciseControl
                }
                updateRenderExcerciseControl={
                  this.props.updateRenderExcerciseControl
                }
                getExcerciseDidIDMemberDone={this.getExcerciseDidIDMemberDone}
                ExcerciseAllQAContent={this.state.e.ExcerciseQAContent}
                TimeToDoExcercise={this.props.TimeToDoExcercise}
                ExcerciseName={this.state.e.ExcerciseName}
                ExcerciseNumberQuestion={this.state.e.ExcerciseNumberQuestion}
                ExcerciseType={this.state.e.ExcerciseType}
                ExcerciseLogo={this.state.e.ExcerciseLogo}
                ExcerciseID={this.props.ExcerciseID}
            />
        );
    }
  };

  render() {
    if(this.state.dataLoad){
      return (
          <div className="user-excercises_do-excercise">
            {this.renderExcerciseDoExcersiceDoOrFinished()}
          </div>
      );
    }else{
      return (
          <div></div>
      )
    }

  }
}
