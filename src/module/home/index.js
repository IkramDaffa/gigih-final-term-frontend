import { getDataVideos } from "../../common/redux/actions/getVideos";
import Layout from "../../components/layout";
import {
  Container,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";
import { fetchVideoDetail } from "../../common/redux/actions/getVideoDetail";
import { useNavigate } from "react-router-dom";
import { actionSetIsRender } from "../../common/redux/actions/getVideoDetail";

function Home(props) {
  const navigate = useNavigate();
  const handleClickVideo = (id) => {
    props.fetchVideoDetail(id);
    props.setIsrender(true);
    navigate("videoDetail");
  };
  useEffect(() => {
    props.getDataVideos();
  }, [props.getDataVideos.video]);
  return (
    <Layout>
      <Container className="d-flex gap-2 flex-wrap">
        {props.getVideos.videos &&
          props.getVideos.videos.map((video, index) => {
            return (
              <Fragment key={index}>
                <Card
                  inverse
                  className="card-list-video"
                  onClick={(e) => handleClickVideo(video._id)}
                >
                  <CardImg
                    className="card-image-video"
                    alt="Card image cap"
                    src={video.thumbnail}
                    width="100%"
                  />
                  <CardImgOverlay>
                    <CardTitle tag="h5" className="judul-card">
                      {video.title}
                    </CardTitle>
                  </CardImgOverlay>
                </Card>
              </Fragment>
            );
          })}
        <Button
          style={{ width: 300, height: 400 }}
          className="btn"
          onClick={() => navigate("/addVideo")}
        >
          Add Video +
        </Button>
      </Container>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getDataVideos: () => dispatch(getDataVideos()),
    fetchVideoDetail: (id) => dispatch(fetchVideoDetail(id)),
    setIsrender: (data) => dispatch(actionSetIsRender(data)),
  };
};

const mapStateToProps = (state) => ({
  getVideos: state.getVideos,
  getVideoDetail: state.getVideoDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
