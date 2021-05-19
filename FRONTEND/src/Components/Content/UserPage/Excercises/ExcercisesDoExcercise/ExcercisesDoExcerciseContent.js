import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesDoExcerciseContentItem from "./ExcercisesDoExcerciseContentItem";
import ExcercisesDoExcerciseMainInfor from "./ExcercisesDoExcerciseMainInfor";
import ExcerciseCountDownTimeToFinishedExcercise from "./ExcercisesCountDownTimeToFinishedExcercise";

export default class ExcercisesDoExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseAllAnswerContent: [],
      ExcerciseNthQuestion: "1",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false,
      checkCompleteExcerciseIsOpen: false,
      checkCountDownToTimeUp: false,
      checkDidAnswerQuestIsOpen: false,
      checkDidAnswerQuest: false
    };
  }

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

  nextToNthQuestionOnRight = () => {
    if (!this.state.checkDidAnswerQuest) {
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

        let nthindex = this.state.ExcerciseAllAnswerContent.findIndex(
          nthitem => {
            return (
              nthitem.ExcerciseNthQuestion ===
              Number(this.state.ExcerciseNthQuestion) + 1 + ""
            );
          }
        );

        if (nthindex >= 0) {
          this.setState({
            ExcerciseNthQuestion:
              Number(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false
          });
        } else {
          this.setState({
            ExcerciseNthQuestion:
              Number(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false
          });
        }
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  prevToNthQuestionOnLeft = () => {
    if (!this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidatePrevLeft) {
        if (Number(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
          this.setState({
            checkValidatePrevLeft: true
          });
        } else {
          this.setState({
            ExcerciseNthQuestion:
              Number(this.state.ExcerciseNthQuestion) - 1 + "",
            checkValidateNextRight: false
          });
        }
      } else {
        this.openOverNumberQuestionModal();
      }
    }
    if (!this.state.checkValidatePrevLeft) {
      if (Number(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
        this.setState({
          checkValidatePrevLeft: true
        });
      } else {
        this.setState({
          ExcerciseNthQuestion:
            Number(this.state.ExcerciseNthQuestion) - 1 + "",
          checkValidateNextRight: false
        });
      }
    } else {
      this.openOverNumberQuestionModal();
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
        checkDidAnswerQuest: true
      });
    } else {
      this.setState({
        ExcerciseAllAnswerContent: [
          ...this.state.ExcerciseAllAnswerContent,
          AnswerContent
        ],
        checkDidAnswerQuest: true
      });
    }
  };

  sendToFinishedExcerciseChoice = () => {
    axios
      .post("/finishedexcercisechoice", {
        ExcerciseID: this.props.ExcerciseID,
        ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-finished-excercise-choice") {
          setTimeout(() => {
            this.props.updateRenderExcerciseDoExcerciseControl(
              "finishexcercise"
            );
          }, 1500);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendToCompleteDoExcerciseChoice = () => {
    if (
      this.state.ExcerciseQAContent.length() !==
      this.props.ExcerciseNumberQuestion
    ) {
      this.openCheckCompleteExcerciseModal();
    } else {
      this.sendToFinishedExcerciseChoice();
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
            onClick={() => this.sendToCompleteExcercises()}
          />
        </div>
      </div>
    );
  };

  renderExcercisesDoExcerciseContentItem = () => {
    let nthindex = this.props.ExcerciseAllQAContent.findIndex(questansitem => {
      return (
        questansitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion
      );
    });

    if (this.state.ExcerciseAllAnswerContent[nthindex]) {
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
            this.state.ExcerciseAllAnswerContent[nthindex].ExcerciseChoiceAnswer
          }
        />
      );
    } else {
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
              - Bài tập !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCompleteExcerciseModal()}
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
          isOpen={this.state.checkDidAnswerQuestIsOpen}
          onRequestClose={this.closeCheckDidAnswerQuestModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa làm hoặc chưa xác nhận trả lời câu số
              {Number(this.state.ExcerciseNthQuestion) - 1 + ""} này !!!
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
