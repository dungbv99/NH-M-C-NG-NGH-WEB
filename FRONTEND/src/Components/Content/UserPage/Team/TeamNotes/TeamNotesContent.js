import React from "react";
import TeamNotesContentItem from "./TeamNotesContentItem";

export default class TeamNotesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteChoiceID: ""
    };
  }

  setChooseTeamNoteToChangeIcon = teamNoteChoiceID => {
    this.setState({
      TeamNoteChoiceID: teamNoteChoiceID
    });
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes____content">
        {/* <p style={{ fontWeight: "bold" }}>Đã hoàn thành hoặc hết hạn</p>
        {this.props.AllReminder12FinishedList.map(
          (reminderitem, reminderindex) => ( */}
        <TeamNotesContentItem
        // key={reminderindex}
        // TeamNoteID={reminderitem.TeamNoteID}
        // TeamNoteChoiceID={this.state.TeamNoteChoiceID}
        // ReminderType={reminderitem.ReminderType}
        // ReminderName={reminderitem.ReminderName}
        // ReminderDescription={reminderitem.ReminderDescription}
        // ReminderEndDate={reminderitem.ReminderEndDate}
        // ReminderCreateDate={reminderitem.ReminderCreateDate}

        // setChooseReminderToChange={this.props.setChooseReminderToChange}
        // setChooseReminderToChangeIcon={this.setChooseReminderToChangeIcon}
        // setCheckToChangeUnOrFinished={this.props.setCheckToChangeUnOrFinished}
        // checkToChangeUnOrFinished={this.props.checkToChangeUnOrFinished}
        />
        {/* ) */}
        {/* )} */}
      </div>
    );
  }
}
