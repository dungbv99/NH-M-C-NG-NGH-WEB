import React from "react";
import axios from "axios";

import de111 from "../../../../Main/Image-Icons/de111.PNG";

import "./ExcercisesDoExcercise.css";

import ExcercisesDoExcerciseContent from "./ExcercisesDoExcerciseContent";
import ExcercisesResultExcerciseContent from "./ExcercisesResultExcerciseContent";

export default class ExcercisesDoExcercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ExcerciseLogo: de111
    };
  }

  // componentDidMount = () => {
  //   axios
  //     .post("/getquestionanswercontent", {
  //       MemberID: this.props.MemberID,
  //       ExcerciseID: this.props.ExcerciseID
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         ExcerciseAllQAContent: res.data.ExcerciseAllQAContent,
  //         ExcerciseName: res.data.ExcerciseName,
  //         ExcerciseNumberQuestion: res.data.ExcerciseAllQAContent,
  //         ExcerciseType: res.data.ExcerciseAllQAContent,
  //         ExcerciseLogo: res.data.ExcerciseAllQAContent
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  updateRenderExcerciseDoExcerciseControl = state => {
    this.setState({
      chooseExcerciseDoOrFinished: state
    });
  };

  renderExcerciseDoExcersiceDoOrFinished = () => {
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
            ExcerciseAllQAContent={this.state.ExcerciseAllQAContent}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
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
            ExcerciseID={this.props.ExcerciseID}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
          />
        );
      default:
        return (
          <ExcercisesDoExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            ExcerciseAllQAContent={this.state.ExcerciseAllQAContent}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
            ExcerciseID={this.props.ExcerciseID}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_do-excercise">
        {this.renderExcerciseDoExcersiceDoOrFinished()}
      </div>
    );
  }
}
