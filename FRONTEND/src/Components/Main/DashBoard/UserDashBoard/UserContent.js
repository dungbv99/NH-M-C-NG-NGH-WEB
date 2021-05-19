import React from "react";
import Excercises from "../../../Content/UserPage/Excercises/Excercises";


export default class UserContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderUserContent = () => {
    switch (this.props.contentState) {
      case "excercises":
        return (
          <Excercises
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        );
      default:
        return (
            <Excercises
                MemberID={this.props.MemberID}
                socket={this.props.socket}
            />
        );
    }
  };

  render() {
    return (
      <div className="user-dashboard_container__content">
        {this.renderUserContent()}
      </div>
    );
  }
}
