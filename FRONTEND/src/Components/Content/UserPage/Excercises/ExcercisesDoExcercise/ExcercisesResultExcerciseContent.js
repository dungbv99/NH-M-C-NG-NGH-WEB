import React from "react";

export default class ExcercisesResultExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  render() {
    return (
      <div>
        <p>Kết quả làm Bộ đề - Bài tập</p>
        <p>Tên Bộ đề - Bài tập: ABCXYZ</p>
        <p>Loại Bộ đề - Bài tập: Công khai</p>
        <p>Số câu trả lời đúng: 15/20</p>
        <p>Thời gian làm bài: 30 phút</p>
      </div>
    );
  }
}
