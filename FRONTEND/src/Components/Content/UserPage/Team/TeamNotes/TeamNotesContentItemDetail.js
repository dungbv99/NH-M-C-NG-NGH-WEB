import React from "react";

export default class TeamNotesContentItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <div className="user-reminders_all__list___un-finished____reminder-item_____detail">
      // <div className="user-reminders_all__list___un-finished____reminder-item_____detail______create-end-date">
      <div className="user-team_team-menu-and-content__content___notes____content_____team-note-item______content_______detail">
        <div className="user-team_team-menu-and-content__content___notes____content_____team-note-item______content_______detail_______create-end-date">
          <div>
            <p>
              {/* <span>Tạo:</span> {this.props.ReminderCreateDate} */}
              <span>Tạo: </span> 12:30 21-05-2020
            </p>
          </div>
          <div>
            <p>
              {/* <span>Hết hạn: </span> {this.props.ReminderEndDate} */}
              <span>Hết hạn: </span> 21-05-2021
            </p>
          </div>
        </div>
        {/* <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete"> */}
        <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete">
          <div>
            <p>
              {/* <span>Chi tiết:</span> {this.props.ReminderDescription} */}
              <span>Chi tiết:</span> Giao làm còn ôn cuối kì
            </p>
          </div>
          {/* <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete_______delete"> */}
          <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete_______delete">
            <span>Xóa</span>
          </div>
        </div>
      </div>
    );
  }
}
