import React from "react";

import ExcercisesDoExcercise from "../../Excercises/ExcercisesDoExcercise/ExcercisesDoExcercise";
import AssignmentsExcerciseDetailItem from "./AssignmentsExcerciseDetailItem";

export default class AssignmentsDoExcercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDoExcercise: false,
      renderAssignmentDoExcercise: "excercisedetail",
      ExcerciseID: "",
      TimeToDoExcercise: "0"
    };
  }

  getExcerciseIDAndTimeMemberChoice = (excerciseID, timeToDoExcercise) => {
    this.setState({
      ExcerciseID: excerciseID,
      TimeToDoExcercise: timeToDoExcercise
    });
  };

  updateRenderExcerciseControl = state => {
    if (state === "excerciseall") {
      this.props.updateRenderAssignmentsControl("assignmentall");
    } else if (state === "excercisedoexcercise") {
      this.updateRenderAssignmentDoExcercise("doexcercise");
    }
  };

  updateRenderExcerciseOwnedControl = state => {
    if (state === "ownedlist") {
      this.props.updateRenderAssignmentsControl("assignmentall");
    }
  };

  updateRenderAssignmentDoExcercise = state => {
    this.setState({
      renderAssignmentDoExcercise: state
    });
  };

  renderAssignmentDoExcercise = () => {
    switch (this.state.renderAssignmentDoExcercise) {
      case "doexcercise":
        return (
          <ExcercisesDoExcercise
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
            TimeToDoExcercise={this.state.TimeToDoExcercise}
            ExcerciseID={this.state.ExcerciseID}
          />
        );
      case "excercisedetail":
        return (
          <AssignmentsExcerciseDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            ExcerciseID={this.props.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
      default:
        return (
          <AssignmentsExcerciseDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            ExcerciseID={this.props.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
    }
  };

  render() {
    return <div>{this.renderAssignmentDoExcercise()}</div>;
  }
}
