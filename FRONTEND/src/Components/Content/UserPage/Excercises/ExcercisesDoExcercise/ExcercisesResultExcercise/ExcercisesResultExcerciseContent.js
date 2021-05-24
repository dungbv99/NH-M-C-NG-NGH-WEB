import React from "react";
import axios from "axios";

export default class ExcercisesResultExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseMemberDidResult: "",
      ExcerciseMemberDidName: "",
      ExcerciseMemberDidType: "",
      ExcerciseMemberDidTime: "",
      ExcerciseMemberDidNumberQuestion: "",
      e : "",
    };
  }

  componentDidMount = () => {
    // axios
    //   .post("/getExerciseResult/", {
    //     ExcerciseID: this.props.ExcerciseID,
    //     UserID: this.props.MemberID,
    //   })
    //   .then(res => {
    //     this.setState({
    //       e : res.data.ExerciseAnswerUser
    //     });
    //   });

    fetch("/getExerciseResult/", {
      method: "POST",
      body: JSON.stringify({
        ExcerciseID: this.props.ExcerciseID,
        UserID: this.props.MemberID,
      }),
    }).then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then(data =>{
      this.setState({
        e : data.ExerciseAnswerUser
      });
    }).catch(error => console.log(error));
  };

  reviewExcerciseResultDidExcercise = () => {
    this.props.updateRenderExcerciseControl("excerciseresultdidexcercise");
    this.props.getExcerciseDidIDMemberDone(this.props.ExcerciseDidID);
  };

  render() {
    return (
      <div className="user-excercises_do-excercise__result-excercise">
        <div className="user-excercises_do-excercise__result-excercise___title">
          <p>Kết quả làm Bộ đề - Bài tập</p>
        </div>
        <div className="user-excercises_do-excercise__result-excercise___content">
          <p>
            Tên Bộ đề - Bài tập
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.state.e.ExcerciseName}
          </p>
          {/*<p>*/}
          {/*  Loại Bộ đề - Bài tập*/}
          {/*  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;*/}
          {/*  {this.state.ExcerciseMemberDidType === "public"*/}
          {/*    ? "Công khai"*/}
          {/*    : "Riêng tư"}*/}
          {/*</p>*/}
          <p>
            Số lượng câu hỏi của Bộ đề - Bài tập :&nbsp;
            {this.state.e.ExcerciseNumberQuestion}
          </p>
          <p>
            Điểm số
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.state.e.Score}

          </p>
          {/*<p>*/}
          {/*  Thời gian làm bài*/}
          {/*  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;*/}
          {/*  {this.state.ExcerciseMemberDidTime} phút*/}
          {/*</p>*/}
        </div>
        <div className="user-excercises_do-excercise__result-excercise___button-choose">
          <input
            type="button"
            value="Quay trở lại danh sách Bài tập - Bộ đề"
            onClick={() =>
              this.props.updateRenderExcerciseControl("excerciseall")
            }
          />
          <input
            type="button"
            value="Xem lại phần làm Bài tập - Bộ đề này"
            onClick={() =>
              this.props.updateRenderExcerciseDoExcerciseControl(
                "excerciseresultdidexcercise"
              )
            }
          />
        </div>
      </div>
    );
  }
}
