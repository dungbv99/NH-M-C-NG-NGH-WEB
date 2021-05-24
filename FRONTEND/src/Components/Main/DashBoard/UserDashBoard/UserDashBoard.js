import React from "react";
import axios from "axios";

import "./UserDashBoard.css";
import UserFooter from "./UserFooter";
import UserContent from "./UserContent";
import UserHeader from "./UserHeader";
import UserMenu from "./UserMenu";

export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx  ", props)
    this.state = {
      contentState: "excercises",
      FirstnameMember: "",
      LastnameMember: "",
      checkJoinCall: "false",
      TeamCallID: ""
    };
  }

  updateContentState = state => {
    this.setState({ contentState: state });
    if (state !== "teams" && this.state.checkJoinCall === "true") {
      console.log("chuyển rồi nha");

      this.props.socket.emit("disconnected-call-team", {
        MemberID: this.props.MemberID,
        MemberSocketID: this.props.socket.id,
        TeamCallID: this.state.TeamCallID
      });
    }
  };

  componentDidMount = () => {
    // console.log("this.props.MemberID  ", this.props.MemberID);
    // axios
    //   .post("/getfullname/", {
    //     MemberID: this.props.MemberID
    //   })
    //   .then(res => {
    //     console.log("...................... ",res.data);
    //     this.setState({
    //       FirstnameMember: res.data.Firstname,
    //       LastnameMember: res.data.Lastname
    //     });
    //   })
    //   .catch(error => {
    //     console.log("111111111");
    //     console.log(error);
    //   });

      fetch("/getfullname/",{
        method: "POST",
        body: JSON.stringify({
          MemberID: this.props.MemberID
        }),
      }).then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      }).then(
          data =>{
            this.setState({
              FirstnameMember: data.Firstname,
              LastnameMember: data.Lastname
            });
          }
      ).catch(error => {
        console.log(error);
      });



  };

  renderUserDashBoard = () => {
    return (
      <div className="user-dashboard">
        <UserHeader
          MemberID={this.props.MemberID}
          setMemberIDForMemberLogin={this.props.setMemberIDForMemberLogin}
          updateRenderLogPage={this.props.updateRenderLogPage}
          FirstnameMember={this.state.FirstnameMember}
          LastnameMember={this.state.LastnameMember}
          TeamCallID={this.state.TeamCallID}
          socket={this.props.socket}
        />
        <div className="user-dashboard_container">
          <UserMenu
            updateContentState={this.updateContentState}
            socket={this.props.socket}
          />
          <UserContent
            contentState={this.state.contentState}
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        </div>
        <UserFooter />
      </div>
    );
  };

  render() {
    return <div>{this.renderUserDashBoard()}</div>;
  }
}
