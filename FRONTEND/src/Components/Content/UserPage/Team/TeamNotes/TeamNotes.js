import React from "react";
import axios from "axios";
import Modal from "react-modal";

import "./TeamNotes.css";
import TeamNotesContent from "./TeamNotesContent";
import TeamNotesCreateNewNote from "./TeamNotesCreateNewNote";

export default class TeamNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteContent: [],
      MemberChoiceChatID: "",
      checkCreateNewNoteIsOpen: false
    };
  }

  componentDidMount = () => {
    axios
      .post("/getteamlist/getteamnotes", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        this.setState({
          TeamDiscussContent: res.data.TeamDiscussContent
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  openCheckCreateNewNoteModal = () => {
    this.setState({ checkCreateNewNoteIsOpen: true });
  };

  closeCheckCreateNewNoteModal = () => {
    this.setState({ checkCreateNewNoteIsOpen: false });
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes">
        <TeamNotesContent
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          TeamNoteContent={this.state.TeamNoteContent}
        />
        <div
          className="user-team_team-menu-and-content__content___notes____create-new-button"
          onClick={() => this.openCheckCreateNewNoteModal()}
        >
          <i className="material-icons">{"create"}</i>
        </div>
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "440px",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "dark-white",
              zIndex: "2000"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkCreateNewNoteIsOpen}
          onRequestClose={this.closeCheckCreateNewNoteModal}
        >
          <div>
            <TeamNotesCreateNewNote
              MemberID={this.props.MemberID}
              TeamID={this.props.TeamID}
              socket={this.props.socket}
            />
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCreateNewNoteModal()}
          >
            Đóng
          </button>
        </Modal>
      </div>
    );
  }
}
