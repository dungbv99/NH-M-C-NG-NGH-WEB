import React from "react";
import AssignmentsUnfinishedItem from "./AssignmentsUnfinishedItem";

export default class AssignmentsAllUnfinishedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AssignmentChoiceID: ""
    };
  }

  setChooseAssignmentToChangeIcon = assignmentChoiceID => {
    this.setState({
      AssignmentChoiceID: assignmentChoiceID
    });
  };

  render() {
    return (
      <div className="user-assignments_all__list___finished">
        <p style={{ fontWeight: "bold" }}>Chưa hoàn thành</p>
        {/* {this.props.AllAssignmentUnfinishedList.map(
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
