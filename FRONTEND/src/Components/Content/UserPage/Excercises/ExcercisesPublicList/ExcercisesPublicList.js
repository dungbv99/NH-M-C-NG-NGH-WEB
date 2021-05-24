import React from "react";
import axios from "axios";
import ExcercisesPublicListContent from "./ExcercisesPublicListContent";
import ExcercisesPublicDetailItem from "./ExcercisesPublicDetailItem";
import ExcercisesOwnedDetailItem from "../ExcercisesOwnedList/ExcercisesOwnedDetailItem";
import ExcercisesOwnedItemScoreBoard from "../ExcercisesOwnedList/ExcercisesOwnedItemScoreBoard";

export default class ExcercisesPublicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcercisePublicRender: "publiclist",
      ExcerciseID: "",
      exercises: [],
    };
  }


  updateRenderExcercisePublicControl = excercisepublic => {
    this.setState({
      setExcercisePublicRender: excercisepublic
    });
  };

  getExcercisePublicIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  updateRenderExcerciseOwnedControl = excerciseOwned => {
    this.setState({
        setExcercisePublicRender: excerciseOwned
    });
  };

  getExcerciseOwnedIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  renderAllExcercisePublicOptionList = () => {
    // return (
    //     <ExcercisesPublicListContent
    //         Exercises={this.state.exercises}
    //         MemberID={this.props.MemberID}
    //         socket={this.props.socket}
    //         updateRenderExcerciseOwnedControl={
    //           this.updateRenderExcerciseOwnedControl
    //         }
    //         getExcerciseOwnedIDMemberChoice={
    //           this.getExcerciseOwnedIDMemberChoice
    //         }
    //     />
    // );

    // return (
    //     <ExcercisesPublicListContent
    //         Exercises={this.state.exercises}
    //         MemberID={this.props.MemberID}
    //         socket={this.props.socket}
    //         updateRenderExcercisePublicControl={
    //           this.updateRenderExcercisePublicControl
    //         }
    //     />
    // );


    switch (this.state.setExcercisePublicRender) {
      case "publiclist":
        return (
            <ExcercisesPublicListContent
                Exercises={this.state.exercises}
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                updateRenderExcerciseOwnedControl={
                  this.updateRenderExcerciseOwnedControl
                }
                getExcerciseOwnedIDMemberChoice={
                  this.getExcerciseOwnedIDMemberChoice
                }
            />
        );
      case "publicitem":
        return (
            <ExcercisesOwnedDetailItem
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                updateRenderExcerciseOwnedControl={
                  this.updateRenderExcerciseOwnedControl
                }
                ExcerciseID={this.state.ExcerciseID}
                getExcerciseIDAndTimeMemberChoice={
                  this.props.getExcerciseIDAndTimeMemberChoice
                }
                updateRenderExcerciseControl={
                  this.props.updateRenderExcerciseControl
}
                    getExcerciseOwnedIDMemberChoice={
                    this.getExcerciseOwnedIDMemberChoice
                }
            />
        );
        case "owneditemscoreboard":
            return (
                <ExcercisesOwnedItemScoreBoard
                    MemberID={this.props.MemberID}
                    socket={this.props.socket}
                    updateRenderExcerciseOwnedControl={
                        this.updateRenderExcerciseOwnedControl
                    }
                    ExcerciseID={this.state.ExcerciseID}
                    getExcerciseIDAndTimeMemberChoice={
                        this.props.getExcerciseIDAndTimeMemberChoice
                    }
                    updateRenderExcerciseControl={
                        this.props.updateRenderExcerciseControls
                    }
                    getExcerciseOwnedIDMemberChoice={
                        this.getExcerciseOwnedIDMemberChoice
                    }
                />
            );
      default:
        return (
            <ExcercisesPublicListContent
                Exercises={this.state.exercises}
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                updateRenderExcerciseOwnedControl={
                  this.updateRenderExcerciseOwnedControl
                }
                getExcerciseOwnedIDMemberChoice={
                  this.getExcerciseOwnedIDMemberChoice
                }
            />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list__public-list">
        {this.renderAllExcercisePublicOptionList()}
      </div>
    );
  }
}
