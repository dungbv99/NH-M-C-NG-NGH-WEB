import React from "react";

import Modal from "react-modal";

import de110 from "../../../../Main/Image-Icons/de110.PNG";
export default class AssignmentsExcerciseDetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOwnedExcerciseItem: false,
      checkConfirmDoExcercisesChoiceIsOpen: false,
      checkTimeToDoExcercise: false,
      TimeToDoExcercise: "0"
    };
  }

  openConfirmDoExcercisesChoiceModal = () => {
    this.setState({
      checkConfirmDoExcercisesChoiceIsOpen: true
    });
  };

  closeConfirmDoExcercisesChoiceModal = () => {
    this.setState({
      checkConfirmDoExcercisesChoiceIsOpen: false
    });
  };

  changeCheckOwnedExcerciseItem = () => {
    if (this.state.checkOwnedExcerciseItem) {
      this.setState({
        checkOwnedExcerciseItem: false
      });
    } else {
      this.setState({
        checkOwnedExcerciseItem: true
      });
    }
  };

  hanldeValueTimeToDoExcercise = event => {
    this.setState({
      TimeToDoExcercise: event.target.value
    });
  };

  sentToBeginStartDoExcercise = () => {
    if (this.state.TimeToDoExcercise === "0") {
      this.setState({
        checkTimeToDoExcercise: true
      });
    } else {
      console.log("Vào đây rồi");
      this.props.updateRenderExcerciseControl("excercisedoexcercise");
      this.props.getExcerciseIDAndTimeMemberChoice(
        this.props.ExcerciseID,
        this.state.TimeToDoExcercise
      );
    }
  };

  validateTimeToConfirmDoExcercise = () => {
    if (this.state.checkTimeToDoExcercise) {
      return (
        <small style={{ color: "red" }}>
          Bạn cần chọn thời gian làm Bộ đề - Bài tập trong bao lâu đã !!!
        </small>
      );
    }
  };

  renderExcerciseOWnedDetailItemContent = () => {
    return (
      <div>
        <div
          className="user-excercises_all-list__owned-list___owned-item_____backtoownedlist"
          onClick={() =>
            this.props.updateRenderExcerciseOwnedControl("ownedlist")
          }
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo-and-content">
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo">
            <img src={de110} />
            <p>Mô tả: fkasjfakakakakakakakak</p>
          </div>
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-content">
            <div>
              <p>Tên Bộ đề - Bài tập &nbsp;&nbsp; : Kiến quốc vĩ nghiệp</p>
              <p>Số lượng câu hỏi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 20</p>
              <p>Loại Bộ đề - Bài tập &nbsp; : Công khai</p>
            </div>
            <div>
              <button
                style={
                  this.state.checkOwnedExcerciseItem
                    ? { backgroundColor: "chocolate" }
                    : { backgroundColor: "white" }
                }
                onClick={() => this.changeCheckOwnedExcerciseItem()}
              >
                {(this.state.checkOwnedExcerciseItem && (
                  <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                    <div>
                      <i className="material-icons">{"done"}</i>
                    </div>
                    <div>
                      <span> Đã sở hữu</span>
                    </div>
                  </div>
                )) || (
                  <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                    <div>
                      <i className="material-icons">{"add"}</i>
                    </div>
                    <div>
                      <span> Thêm Bộ đề - Bài tập</span>
                    </div>
                  </div>
                )}
              </button>
              <button
                style={
                  this.state.checkOwnedExcerciseItem
                    ? {
                        backgroundColor: "white",
                        margin: "0 0 0 60px"
                      }
                    : { display: "none" }
                }
                onClick={() => this.openConfirmDoExcercisesChoiceModal()}
              >
                <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                  <div>
                    <i className="material-icons">{"border_color"}</i>
                  </div>
                  <div>
                    <span>&nbsp;Làm Bài tập - Bộ đề</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="user-excercises_all-list__owned-list___owned-item">
        {this.renderExcerciseOWnedDetailItemContent()}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkConfirmDoExcercisesChoiceIsOpen}
          onRequestClose={this.closeConfirmDoExcercisesChoiceModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Khi nhấn bắt đầu làm bài bạn sẽ chuyển sang giao diện làm bài và
              bắt đầu làm các câu hỏi có trong Bộ đề - Bài tập. Bạn đã sắn sàng
              ???
            </p>
            <select
              style={{ cursor: "pointer", outline: "none" }}
              value={this.state.TimeToDoExcercise}
              onChange={event => this.hanldeValueTimeToDoExcercise(event)}
            >
              <option value="0">Chọn thời gian làm bài</option>
              <option value="1">1 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="45">45 phút</option>
              <option value="60">60 phút</option>
            </select>
          </div>
          <div>{this.validateTimeToConfirmDoExcercise()}</div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeConfirmDoExcercisesChoiceModal()}
          >
            Suy nghĩ lại!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sentToBeginStartDoExcercise()}
          >
            Bắt đầu làm bài!!!
          </button>
        </Modal>
      </div>
    );
  }
}
