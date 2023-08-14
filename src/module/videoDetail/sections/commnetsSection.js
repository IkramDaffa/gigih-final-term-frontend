import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { API } from "../../../common/API";
import { fetchVideoDetail } from "../../../common/redux/actions/getVideoDetail";
function CommentsSection(props) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      username,
      content,
      videoId: props.getVideoDetail.video._id,
    };
    API.post("comment/add", params)
      .then((res) => {
        console.log(res);
        props.fetchVideoDetail(props.getVideoDetail.video._id);
        setUsername("");
        setContent("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="comments-section">
      <div className="comments-list">
        <h5>Comments</h5>
        {props.getVideoDetail.comments.length !== 0 ? (
          props.getVideoDetail.comments.map((comment, index) => {
            return (
              <Fragment key={index}>
                <div class="card-body p-4">
                  <div class="d-flex flex-start">
                    <div>
                      <h6 class="fw-bold mb-1">{comment.username}</h6>
                      <div class="d-flex align-items-center mb-3">
                        <p class="mb-0" className="timestamp-comments">
                          {comment.timeStamp}
                        </p>
                      </div>
                      <p class="mb-0">{comment.content}</p>
                    </div>
                  </div>
                </div>
                <hr class="my-0" />
              </Fragment>
            );
          })
        ) : (
          <h4>No comments available</h4>
        )}
      </div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h5 className="mt-3">Submit Comment</h5>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="usename"
            name="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Comment</Label>
          <Input
            id="content"
            name="content"
            placeholder="insert comment"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>
        <Button className="btn btn-success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideoDetail: (id) => dispatch(fetchVideoDetail(id)),
  };
};

const mapStateToProps = (state) => ({
  getVideoDetail: state.getVideoDetail,
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
