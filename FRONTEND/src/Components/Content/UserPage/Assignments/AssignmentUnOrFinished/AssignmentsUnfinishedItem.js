import React from "react";
import AssignmentsItemDetailContent from "./AssignmentsItemDetailContent";

export default class AssignmentsUnfinishedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRenderDetail: false
    };
  }

  setChooseAssignmentItem = (assignmentID, assignmentType) => {
    this.props.setChooseAssignmentToChangeIcon(assignmentID);
    this.props.setChooseAssignmentToChange(assignmentID, assignmentType);
    this.props.setCheckToChangeUnOrFinished("unfinished");
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

  renderAssignmentItemDetailContent = () => {
    if (this.state.checkRenderDetail === true) {
      return (
        <AssignmentsItemDetailContent
          AssignmentCreateDate={this.props.AssignmentCreateDate}
          AssignmentDescription={this.props.AssignmentDescription}
          AssignmentEndDate={this.props.AssignmentEndDate}
        />
      );
    }
  };

  render() {
    return (
      <div
        className="user-assignments_all__list___un-finished____assignment-item"
        onClick={() =>
          this.setChooseAssignmentItem(
            this.props.AssignmentID,
            this.props.AssignmentType
          )
        }
      >
        <div className="user-assignments_all__list___un-finished____assignment-item_____content">
          <div>
            <i className="material-icons">
              {this.props.AssignmentChoiceID === this.props.AssignmentID &&
              this.props.checkToChangeUnOrFinished === "unfinished"
                ? "radio_button_checked"
                : "radio_button_unchecked"}
            </i>
          </div>
          <div>
            <img alt="assignment-warning" src={this.props.AssignmentWarning} />
          </div>
          <div>
            <p>{this.props.AssignmentName}</p>
          </div>
          <div onClick={() => this.setChangeRenderDetail()}>
            <i className="material-icons" style={{ fontWeight: "bold" }}>
              {this.state.checkRenderDetail === true
                ? "expand_more"
                : "chevron_right"}
            </i>
          </div>
        </div>
        {this.renderAssignmentItemDetailContent(this.props.AssignmentID)}
      </div>
    );
  }
}
