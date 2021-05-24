import React from "react";
import axios from "axios";

import de111 from "../../../../Main/Image-Icons/de111.PNG";

export default class TeamNotesCreateNewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteName: "",
      TeamNoteDescription: "",
      TeamNoteEndDate: "",
      TeamNoteExcerciseID: "",
      checkValidate: "",
      checkWithExcercise: false,
      checkTrueExcerciseWithNote: false,
      TeamNoteExcerciseName: "",
      TeamNoteExcerciseLogo: null,
      TeamNoteExcerciseNumberQuestion: ""
    };
  }

  handleValueCreateNewTeamNote = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "TeamNoteExcerciseID") {
      this.props.socket.emit("sent-to-check-with-excercise", {
        MemberID: this.props.MemberID,
        TeamID: this.props.TeamID,
        TeamNoteExcerciseID: event.target.value
      });
    }
  };

  componentDidMount = () => {
    this.props.socket.on("receive-excercise-infor", data => {
      if (
        data.TeamID === this.props.TeamID &&
        data.MemberID === this.props.MemberID
      ) {
        this.setState({
          checkTrueExcerciseWithNote: true,
          TeamNoteExcerciseName: data.TeamNoteExcerciseName,
          TeamNoteExcerciseLogo: data.TeamNoteExcerciseLogo,
          TeamNoteExcerciseNumberQuestion: data.TeamNoteExcerciseNumberQuestion
        });
      }
    });
  };

  handleValueCheckWithExcercise = event => {
    if (!this.state.checkWithExcercise) {
      this.setState({
        [event.target.name]: event.target.value,
        checkWithExcercise: true
      });
    } else {
      this.setState({
        [event.target.name]: "none-with-excercise",
        checkWithExcercise: false
      });
    }
  };

  sentToCreateNewTeamNote = () => {
    axios
      .post("/createnewteamnote", {
        ReminderName: this.state.ReminderName,
        ReminderDescription: this.state.ReminderDescription,
        ReminderEndDate: this.state.ReminderEndDate,
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-create-note") {
          setTimeout(() => {
            this.props.updateRenderReminderControl("reminderall");
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCreateNewTeamNote = event => {
    this.sentToCreateNewTeamNote();

    event.preventDefault();
  };

  checkValidateCreateNewTeamNote = type => {
    switch (type) {
      case "success-create-note":
        return <span>Ghi chú của bạn đã được tạo thành công !!!</span>;
      case "non-pass-end-date":
        return <small>Ngày hết hạn của bạn không hợp lệ </small>;
      case "noteenddate":
        return <small>Ngày hết hạn không được để trống </small>;
      case "teamnotename":
        return <small>Tên ghi chú không được để trống </small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateCreateNewTeamNote(type)}</div>;
    }
  };

  createNewTeamNoteForm = () => {
    return (
      <div className="user-team_team-menu-and-content__content___notes____create-new">
        <form onSubmit={event => this.handleCreateNewTeamNote(event)}>
          <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form">
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______form">
              <div>
                <p>Tên ghi chú - công việc</p>
                <input
                  type="text"
                  name="TeamNoteName"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  placeholder="Nhập tên ghi chú..."
                />
                <p>Mô tả nội dung </p>
                <input
                  type="text"
                  name="TeamNoteDescription"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  placeholder="Nhập mô tả..."
                />
                <p>Ngày hết hạn </p>
                <input
                  type="date"
                  name="TeamNoteEndDate"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  value={this.state.ReminderEndDate}
                />
              </div>

              <div>
                <input
                  type="checkbox"
                  name="TeamNoteType"
                  value="with-excercise"
                  onChange={event => this.handleValueCheckWithExcercise(event)}
                />
                <span style={{ fontWeight: "bold" }}>Kèm Bộ đề - Bài tập</span>
              </div>
              <div
                style={
                  this.state.TeamNoteType === "with-excercise"
                    ? { display: "inline" }
                    : { display: "none" }
                }
                className="user-team_team-menu-and-content__content___notes____create-new_____create-form______input-ID"
              >
                <input
                  type="text"
                  name="TeamNoteExcerciseID"
                  placeholder="Nhập ID của Bộ đề - Bài tập"
                  value={this.state.TeamNoteExcerciseID}
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                />
              </div>
              <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______excercise-content">
                {/* <p>{this.state.TeamNoteExcerciseLogo}</p>
                <p>{this.state.TeamNoteExcerciseName}</p>
                <p>{this.state.TeamNoteExcerciseNumberQuestion}</p> */}
                <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______excercise-content_______content">
                  <div>
                    <img src={de111} alt="excercise-logo" />
                  </div>
                  <div>
                    <span>Công nghệ Web</span>
                  </div>
                  <div>
                    <span>5 Câu</span>
                  </div>
                </div>
                <div>
                  <i className="material-icons">{"add"}</i>
                </div>
              </div>
            </div>
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note">
              <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note_______validate">
                {this.renderValidateNotify("teamnotename")}
                {this.renderValidateNotify("noteenddate")}
                {this.renderValidateNotify("non-pass-end-date")}
              </div>
              {this.renderValidateNotify("success-create-note")}
            </div>
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______submit-create-note">
              <input type="submit" value="Tạo Ghi chú" />
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.createNewTeamNoteForm()}</div>;
  }
}
