import React from "react";

import TeamNotesContentItemDetail from "./TeamNotesContentItemDetail";

export default class TeamNotesContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setChooseReminderItem = (reminderID, reminderType) => {
    this.props.setChooseReminderToChangeIcon(reminderID);
    this.props.setChooseReminderToChange(reminderID, reminderType);
    this.props.setCheckToChangeUnOrFinished("finished");
  };

  setChangeRenderDetail = () => {
    if (this.state.checkRenderDetail === false) {
      this.setState({
        checkRenderDetail: true
      });
    } else if (this.state.checkRenderDetail === true) {
      this.setState({
        checkRenderDetail: false
      });
    }
  };

  renderReminderItemDetailContent = () => {
    if (this.state.checkRenderDetail === true) {
      return (
        <TeamNotesContentItemDetail
        // ReminderCreateDate={this.props.ReminderCreateDate}
        // ReminderDescription={this.props.ReminderDescription}
        // ReminderEndDate={this.props.ReminderEndDate}
        />
      );
    }
  };

  render() {
    return (
      <div
        // className="user-reminders_all__list___un-finished____reminder-item"
        className="user-team_team-menu-and-content__content___notes____content_____team-note-item"

        // onClick={() =>
        // this.setChooseReminderItem(
        //   this.props.ReminderID,
        //   this.props.ReminderType
        // )
        // }
      >
        {/* <div className="user-reminders_all__list___un-finished____reminder-item_____content"> */}
        <div className="user-team_team-menu-and-content__content___notes____content_____team-note-item______content">
          <div>
            <i className="material-icons">
              {/* {this.props.ReminderChoiceID === this.props.ReminderID &&
              this.props.checkToChangeUnOrFinished === "finished"
                ? "radio_button_checked"
                : "radio_button_unchecked"} */}
            </i>
          </div>

          <div>
            {/* <p>{this.props.ReminderName}</p> */}
            <p>Làm bộ đề ôn cuối kì</p>
          </div>
          <div
          // onClick={() => this.setChangeRenderDetail()}
          >
            <i className="material-icons" style={{ fontWeight: "bold" }}>
              {this.state.checkRenderDetail === true
                ? "expand_more"
                : "chevron_right"}
            </i>
          </div>
        </div>
        {this.renderReminderItemDetailContent(this.props.ReminderID)}
      </div>
    );
  }
}
