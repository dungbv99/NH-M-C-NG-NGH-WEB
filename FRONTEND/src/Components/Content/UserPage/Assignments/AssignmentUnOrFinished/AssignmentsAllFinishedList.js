import React from "react";
import AssignmentsUnfinishedItem from "./AssignmentsUnfinishedItem";

export default class AssignmentsAllUnfinishedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReminderChoiceID: ""
    };
  }

  setChooseAssignmentToChangeIcon = assigmentChoiceID => {
    this.setState({
      AssigmentChoiceID: assigmentChoiceID
    });
  };

  render() {
    return (
      <div className="user-assignments_all__list___finished">
        <p style={{ fontWeight: "bold" }}>Đã hoàn thành hoặc hết hạn</p>
        {/* {this.props.AllAssignmentFinishedList.map(
          (assignmentitem, assignmentindex) => (
            <AssignmentsUnfinishedItem
              key={assignmentindex}
              AssignmentID={assignmentitem.AssignmentID}
              AssignmentChoiceID={this.state.AssignmentChoiceID}
              AssignmentName={assignmentitem.AssignmentName}
              AssignmentDescription={assignmentitem.AssignmentDescription}
              AssignmentEndDate={assignmentitem.AssignmentEndDate}
              AssignmentCreateDate={assignmentitem.AssignmentCreateDate}
              setChooseAssignmentToCompelete={
                this.props.setChooseAssignmentToCompelete
              }
              setChooseAssignmentToChangeIcon={
                this.setChooseAssignmentToChangeIcon
              }
              setCheckToChangeUnOrFinished={
                this.props.setCheckToChangeUnOrFinished
              }
              checkToChangeUnOrFinished={this.props.checkToChangeUnOrFinished}
            />
          )
        )} */}
      </div>
    );
  }
}
