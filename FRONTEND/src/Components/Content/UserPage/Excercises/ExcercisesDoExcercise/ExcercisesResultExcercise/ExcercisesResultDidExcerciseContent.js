import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesResultDidExcerciseContentItem from "./ExcercisesResultDidExcerciseContentItem";
import ExcercisesResultDidExcerciseMainInfor from "./ExcercisesResultDidExcerciseMainInfor";

export default class ExcercisesResultDidExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkReceive: false,
      ExcerciseAllAnswerContent: [
        // {
        //   ExcerciseNthQuestion: "4",
        //   ExcerciseChoiceAnswer: "A"
        // },
        // {
        //   ExcerciseNthQuestion: "2",
        //   ExcerciseChoiceAnswer: "A"
        // },
        // {
        //   ExcerciseNthQuestion: "5",
        //   ExcerciseChoiceAnswer: "C"
        // },
        // {
        //   ExcerciseNthQuestion: "3",
        //   ExcerciseChoiceAnswer: "D"
        // },
        // {
        //   ExcerciseNthQuestion: "1",
        //   ExcerciseChoiceAnswer: "B"
        // }
      ],
      ExcerciseAllQAContent: [
        // {
        //   ExcerciseNthQuestion: "1",
        //   ExcerciseQuestionContent: "Thuộc tính CSS nào sau đây viết sai?",
        //   ExcerciseAnswerContentA:
        //     "A.	border: 1px solid rgba(0.1, 0.1, 0.1, 1);",
        //   ExcerciseAnswerContentB: "B.	width: calc(100px + 100%);",
        //   ExcerciseAnswerContentC: "C.	z-index: -999;",
        //   ExcerciseAnswerContentD:
        //     "D.	background-image: src(‘/images/title.png’);",
        //   ExcerciseCorrectAnswer: "D"
        // },
        // {
        //   ExcerciseNthQuestion: "2",
        //   ExcerciseQuestionContent:
        //     ": Điều nào sau đây là đúng khi nói về REST?",
        //   ExcerciseAnswerContentA:
        //     "A.	Chỉ hỗ trợ duy nhất giao thức truyền tải HTTP",
        //   ExcerciseAnswerContentB: "B.	Là viết tắt của REquest State Transfer",
        //   ExcerciseAnswerContentC:
        //     "C.	Chỉ hỗ trợ gói tin định dạng XML hoặc JSON",
        //   ExcerciseAnswerContentD: "D.	Làs giao thức có trạng thái ",
        //   ExcerciseCorrectAnswer: "A"
        // },
        // {
        //   ExcerciseNthQuestion: "3",
        //   ExcerciseQuestionContent:
        //     "HTTP response status code là 401 có nghĩa là gì",
        //   ExcerciseAnswerContentA: "a.	Ok",
        //   ExcerciseAnswerContentB: "b.	Not found",
        //   ExcerciseAnswerContentC: "c.	Bad request",
        //   ExcerciseAnswerContentD: "d.	Unauthorized",
        //   ExcerciseCorrectAnswer: "D"
        // },
        // {
        //   ExcerciseNthQuestion: "4",
        //   ExcerciseQuestionContent:
        //     ". Với SOAP, chúng ta có thể dùng Message Format nào?",
        //   ExcerciseAnswerContentA: "a.	XML",
        //   ExcerciseAnswerContentB: "b.	Json",
        //   ExcerciseAnswerContentC: "c.	Plain Text",
        //   ExcerciseAnswerContentD: "d.	Tất cả",
        //   ExcerciseCorrectAnswer: "A"
        // },
        // {
        //   ExcerciseNthQuestion: "5",
        //   ExcerciseQuestionContent: "Thuộc tính CSS nào sau đây viết sai?",
        //   ExcerciseAnswerContentA:
        //     "A.	border: 1px solid rgba(0.1, 0.1, 0.1, 1);",
        //   ExcerciseAnswerContentB: "B.	width: calc(100px + 100%);",
        //   ExcerciseAnswerContentC: "C.	z-index: -999;",
        //   ExcerciseAnswerContentD:
        //     "D.	background-image: src(‘/images/title.png’);",
        //   ExcerciseCorrectAnswer: "D"
        // }
      ],
      ExcerciseNthQuestion: "1",
      ExcerciseName: "",
      ExcerciseNumberQuestion: "",
      ExcerciseType: "",
      ExcerciseLogo: "",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false
    };
  }

  componentDidMount = () => {
    axios
      .post("/getExerciseUserResult/", {
        ExcerciseID: this.props.ExcerciseID,
        UserId:     this.props.MemberID
        // ExcerciseDidID: this.props.ExcerciseDidID
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          ExcerciseAllAnswerContent: res.data.ExcerciseAllAnswerContent,
          ExcerciseAllQAContent: res.data.ExcerciseQAContent,
          ExcerciseName: res.data.ExcerciseName,
          ExcerciseNumberQuestion: res.data.ExcerciseNumberQuestion,
          ExcerciseType: res.data.ExcerciseType,
          ExcerciseLogo: res.data.ExcerciseAllQAContent,
          checkReceive: true
        });
        if (res.data.ExcerciseNumberQuestion === "1") {
          this.setState({
            checkValidateNextRight: true
          });
        }
      });


    fetch("/getExerciseUserResult/",{
      method:"POST",
      body:JSON.stringify({
        ExcerciseID: this.props.ExcerciseID,
        UserId:     this.props.MemberID
      }),
    }).then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then(
        data =>{
          this.setState({
            ExcerciseAllAnswerContent: data.ExcerciseAllAnswerContent,
            ExcerciseAllQAContent: data.ExcerciseQAContent,
            ExcerciseName: data.ExcerciseName,
            ExcerciseNumberQuestion: data.ExcerciseNumberQuestion,
            ExcerciseType: data.ExcerciseType,
            ExcerciseLogo: data.ExcerciseAllQAContent,
            checkReceive: true
          });
          if (data.ExcerciseNumberQuestion === "1") {
            this.setState({
              checkValidateNextRight: true
            });
          }
        }
    ).catch(error => console.log(error));
  };

  openOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: true
    });
  };

  closeOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: false
    });
  };

  nextToNthQuestionOnRight = () => {
    if (this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidateNextRight) {
        if (
          Number(this.state.ExcerciseNthQuestion) + 1 + "" ===
          this.state.ExcerciseNumberQuestion
        ) {
          this.setState({
            checkValidateNextRight: true
          });
        }

        this.setState({
          ExcerciseNthQuestion:
            Number(this.state.ExcerciseNthQuestion) + 1 + "",
          checkValidatePrevLeft: false
        });
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  prevToNthQuestionOnLeft = () => {
    if (this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidatePrevLeft) {
        if (Number(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
          this.setState({
            checkValidatePrevLeft: true
          });
        }

        this.setState({
          ExcerciseNthQuestion:
            Number(this.state.ExcerciseNthQuestion) - 1 + "",
          checkValidateNextRight: false
        });
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  excerciseDoExcerciseControl = () => {
    return (
      <div className="user-excercises_do-excercise__QandA-result___control">
        <div>
          <i
            style={
              this.state.checkValidatePrevLeft
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.prevToNthQuestionOnLeft()}
            className="material-icons"
          >
            &#xe5c4;
          </i>
        </div>
        <div>
          <i
            style={
              this.state.checkValidateNextRight
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.nextToNthQuestionOnRight()}
            className="material-icons"
          >
            &#xe5c8;
          </i>
        </div>
      </div>
    );
  };

  renderExcercisesResultDidExcerciseContentItem = () => {
    let nthindex = this.state.ExcerciseAllQAContent.findIndex(questansitem => {
      return (
        questansitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion
      );
    });

    let nthanswerindex = this.state.ExcerciseAllAnswerContent.findIndex(
      questansitem => {
        return (
          questansitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion
        );
      }
    );

    if (this.state.ExcerciseAllAnswerContent[nthanswerindex]) {
      return (
        <ExcercisesResultDidExcerciseContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          ExcerciseCorrectAnswer={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
          }
          ExcerciseQuestionContent={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseChoiceAnswer={
            this.state.ExcerciseAllAnswerContent[nthanswerindex]
              .ExcerciseChoiceAnswer
          }
        />
      );
    } else {
      return (
        <ExcercisesResultDidExcerciseContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          ExcerciseCorrectAnswer={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
          }
          ExcerciseQuestionContent={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseChoiceAnswer=""
        />
      );
    }
  };

  excerciseDoExcerciseContent = () => {
    return (
      <div className="user-excercises_do-excercise__QandA-result">
        <ExcercisesResultDidExcerciseMainInfor
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderExcerciseControl={this.props.updateRenderExcerciseControl}
          updateRenderExcerciseDoExcerciseControl={
            this.props.updateRenderExcerciseDoExcerciseControl
          }
          getExcerciseDidIDMemberDone={this.props.getExcerciseDidIDMemberDone}
          ExcerciseName={this.state.ExcerciseName}
          ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
          ExcerciseType={this.state.ExcerciseType}
          ExcerciseLogo={this.state.ExcerciseLogo}
        />

        {this.renderExcercisesResultDidExcerciseContentItem()}
        {this.excerciseDoExcerciseControl()}
      </div>
    );
  };

  render() {
    if(this.state.checkReceive){
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
      return (
          <div>
            {this.excerciseDoExcerciseContent()}
            <Modal
                style={{
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#ecf0f1"
                  }
                }}
                ariaHideApp={false}
                isOpen={this.state.overNumberQuestionIsOpen}
                onRequestClose={this.closeOverNumberQuestionModal}
            >
              <div>
                <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
                <p style={{ fontWeight: "bold" }}>
                  Không thể vượt quá số lượng câu hỏi của Bộ đề - Bài tập !!!!
                </p>
              </div>
              <button
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => this.closeOverNumberQuestionModal()}
              >
                Đã hiểu!!!
              </button>
            </Modal>
            {/*================================================================================= */}
          </div>
      );
    }else{
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
      return (
          <div></div>
      );
    }
  }
}
