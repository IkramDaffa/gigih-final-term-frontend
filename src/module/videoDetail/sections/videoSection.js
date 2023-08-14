import { Container } from "reactstrap";
import { connect } from "react-redux";

function VideoSection(props) {
  return (
    <Container className="video-section">
      <div class="ratio ratio-16x9">
        <iframe
          src={props.getVideoDetail.video.link}
          title="YouTube video"
          allowFullScreen
          className="embed-video"
        ></iframe>
      </div>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => ({
  getVideoDetail: state.getVideoDetail,
});
export default connect(mapStateToProps, mapDispatchToProps)(VideoSection);
