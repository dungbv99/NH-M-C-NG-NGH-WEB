import React from "react";

export default class ExcercisesQAndAMainInfor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteExercise = () =>{
    fetch("/deleteExerciseByName/",{
      method: "POST",
      body: JSON.stringify({
        name: this.props.ExcerciseName,
      }),
    }).then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then(
        data =>{
          console.log("data", data)
        }
    ).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="user-excercises_create-new__QandA">
        <div
          className="user-excercises_create-new__QandA___backtoexcerciseall"
          onClick={() =>{
            this.props.updateRenderExcerciseControl("excerciseall");
            this.deleteExercise();
          }}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Hủy tạo </span>
          </div>
        </div>
        <div className="user-excercises_create-new__QandA___infor">
          <div>
            <img src={this.props.ExcerciseLogo} alt="excercise-logo" />
          </div>
          <div>
            <p>Tên Bộ đề - Bài tập: {this.props.ExcerciseName}</p>
          </div>
          <div>
            <p>Số lượng câu hỏi: {this.props.ExcerciseNumberQuestion}</p>
          </div>
          <div>
            <p>
              Loại Bộ đề - Bài tập: &nbsp;
              {this.props.ExcerciseType === "public" ? "Công khai" : "Riêng tư"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
