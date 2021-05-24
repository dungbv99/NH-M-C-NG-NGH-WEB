import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesDoExcerciseContentItem from "./ExcercisesDoExcerciseContentItem";
import ExcercisesDoExcerciseMainInfor from "./ExcercisesDoExcerciseMainInfor";
import ExcerciseCountDownTimeToFinishedExcercise from "./ExcercisesCountDownTimeToFinishedExcercise";

export default class ExcercisesDoExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    console.log("1111111   sss", props);
    this.state = {
      ExcerciseAllAnswerContent: [],
      ExcerciseNthQuestion: "1",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false,
      checkCompleteExcerciseIsOpen: false,
      checkCountDownToTimeUp: false,
      checkDidAnswerQuestIsOpen: false,
      checkDidAnswerQuest: false,

    };
  }

  componentDidMount = () => {
    if (this.props.ExcerciseNumberQuestion === "1") {
      this.setState({
        checkValidateNextRight: true
      });
    }
  };

  openCheckDidAnswerQuestModal = () => {
    this.setState({
      checkDidAnswerQuestIsOpen: true
    });
  };

  closeCheckDidAnswerQuestModal = () => {
    this.setState({
      checkDidAnswerQuestIsOpen: false
    });
  };

  openCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: true
    });
  };

  closeCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: false
    });
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

  setCheckDidAnswerQuest = () => {
    this.setState({
      checkDidAnswerQuest: true
    });
  };

  nextToNthQuestionOnRight = () => {
    if (this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidateNextRight) {
        if (
          Number(this.state.ExcerciseNthQuestion) + 1 + "" ===
          this.props.ExcerciseNumberQuestion
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

  getAllAnswerExcerciseOfMemberContent = (
    excerciseNthQuestion,
    excerciseChoiceAnswer
  ) => {
    let AnswerContent = {
      ExcerciseNthQuestion: excerciseNthQuestion,
      ExcerciseChoiceAnswer: excerciseChoiceAnswer
    };
    let nthindex = this.state.ExcerciseAllAnswerContent.findIndex(
      answeritem => {
        return answeritem.ExcerciseNthQuestion === excerciseNthQuestion;
      }
    );
    if (nthindex >= 0) {
      this.state.ExcerciseAllAnswerContent.splice(nthindex, 1, AnswerContent);
      this.setState({
        ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent,
        checkDidAnswerQuest: false
      });
    } else {
      this.setState({
        ExcerciseAllAnswerContent: [
          ...this.state.ExcerciseAllAnswerContent,
          AnswerContent
        ],
        checkDidAnswerQuest: false
      });
    }
  };

  sendToFinishedExcerciseChoice = () => {
    // axios
    //   .post("/finishedExerciseChoice/", {
    //     ExcerciseID: this.props.ExcerciseID,
    //     ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent,
    //     UserId : this.props.MemberID
    //   })
    //   .then(res => {
    //     this.setState({
    //       checkValidate: res.data.checkValidate
    //     });
    //     if (res.data.checkValidate === "success-finished-excercise-choice") {
    //       this.props.getExcerciseDidIDMemberDone(res.data.ExcerciseDidID);
    //       this.props.updateRenderExcerciseDoExcerciseControl(
    //           "finishexcercise"
    //       );
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    fetch("/finishedExerciseChoice/", {
      method: "POST",
      body: JSON.stringify({
        ExcerciseID: this.props.ExcerciseID,
        ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent,
        UserId : this.props.MemberID
      }),
    }).then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then(
        data =>{
          this.setState({
            checkValidate: data.checkValidate
          });
          if (data.checkValidate === "success-finished-excercise-choice") {
            this.props.getExcerciseDidIDMemberDone(data.ExcerciseDidID);
            this.props.updateRenderExcerciseDoExcerciseControl(
                "finishexcercise"
            );
          }
        }
    )
  };

  sendToCompleteDoExcerciseChoice = () => {
    console.log("this.state.ExcerciseAllAnswerContent.length ", this.state.ExcerciseAllAnswerContent.length );
    console.log("this.props.ExcerciseNumberQuestion ", this.props.ExcerciseNumberQuestion);
    if (
      this.state.ExcerciseAllAnswerContent.length !=
      this.props.ExcerciseNumberQuestion
    ) {
      console.log("33333333333333333333333333333333333333333");
      this.openCheckCompleteExcerciseModal();
    } else {
      console.log("222222222222222222222222222222222222222222");
      this.sendToFinishedExcerciseChoice();
      // this.props.updateRenderExcerciseDoExcerciseControl("finishexcercise");
    }
  };

  excerciseDoExcerciseControl = () => {
    return (
      <div className="user-excercises_do-excercise__QandA___control">
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
        <div>
          <input
            type="button"
            value="Hoàn tất"
            onClick={() => this.sendToCompleteDoExcerciseChoice()}
          />
        </div>
      </div>
    );
  };

  renderExcercisesDoExcerciseContentItem = () => {
    console.log("xxxxxxxxxxxx this.props.ExcerciseAllQAContent ", this.props.ExcerciseAllQAContent)
    // console.log("")
    let nthindex = this.props.ExcerciseAllQAContent.findIndex(questansitem => {
      // console.log("questansitem.ExcerciseNthQuestion  ", questansitem.ExcerciseNthQuestion);
      // console.log("this.state.ExcerciseNthQuestion", this.state.ExcerciseNthQuestion);
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
        <ExcercisesDoExcerciseContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllAnswerExcerciseOfMemberContent={
            this.getAllAnswerExcerciseOfMemberContent
          }
          ExcerciseCorrectAnswer={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
          }
          ExcerciseQuestionContent={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseChoiceAnswer={
            this.state.ExcerciseAllAnswerContent[nthanswerindex]
              .ExcerciseChoiceAnswer
          }
          setCheckDidAnswerQuest={this.setCheckDidAnswerQuest}
        />
      );
    } else {
      console.log("11111  this.props.ExcerciseAllQAContent   ", this.props.ExcerciseAllQAContent);
      console.log("2222 ", nthindex)
      return (

        <ExcercisesDoExcerciseContentItem

          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllAnswerExcerciseOfMemberContent={
            this.getAllAnswerExcerciseOfMemberContent
          }
          ExcerciseCorrectAnswer={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
          }
          ExcerciseQuestionContent={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseChoiceAnswer=""
          setCheckDidAnswerQuest={this.setCheckDidAnswerQuest}
        />
      );
    }
  };

  excerciseDoExcerciseContent = () => {
    return (
      <div className="user-excercises_do-excercise__QandA">
        <ExcerciseCountDownTimeToFinishedExcercise
          TimeToDoExcercise={this.props.TimeToDoExcercise}
          updateRenderExcerciseDoExcerciseControl={
            this.props.updateRenderExcerciseDoExcerciseControl
          }
        />
        <ExcercisesDoExcerciseMainInfor
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderExcerciseControl={this.props.updateRenderExcerciseControl}
          ExcerciseName={this.props.ExcerciseName}
          ExcerciseNumberQuestion={this.props.ExcerciseNumberQuestion}
          ExcerciseType={this.props.ExcerciseType}
          ExcerciseLogo={this.props.ExcerciseLogo}
        />

        {this.renderExcercisesDoExcerciseContentItem()}
        {this.excerciseDoExcerciseControl()}
      </div>
    );
  };

  render() {
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
          isOpen={this.state.checkCompleteExcerciseIsOpen}
          onRequestClose={this.closeCheckCompleteExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa hoàn thành nội dung cho tất cả các câu hỏi có trong Bộ đề
              - Bài tập. Bạn có chính xác muốn nộp bài không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() =>{
              this.props.updateRenderExcerciseDoExcerciseControl(
                  "finishexcercise"
              )
              console.log("aaaassadasdasdasdasdadassaasdasas");
            }

            }
          >
            Nộp bài
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCompleteExcerciseModal()}
          >
            Ấn nhầm!!!
          </button>
        </Modal>
        {/*================================================================================= */}
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
          isOpen={this.state.checkDidAnswerQuestIsOpen}
          onRequestClose={this.closeCheckDidAnswerQuestModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa xác nhận trả lời câu hỏi số &nbsp;
              {this.state.ExcerciseNthQuestion} này !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckDidAnswerQuestModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
