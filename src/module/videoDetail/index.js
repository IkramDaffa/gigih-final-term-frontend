import Layout from "../../components/layout";
import ProductsSection from "./sections/productsSection";
import VideoSection from "./sections/videoSection";
import CommentsSection from "./sections/commnetsSection";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function VideoDetail(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.getVideoDetail.isRender) {
      navigate("/");
    }
  }, []);
  return (
    <Layout>
      <div className="container-video-detail-page pt-2">
        <ProductsSection />
        <VideoSection />
        <CommentsSection />
      </div>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => ({
  getVideoDetail: state.getVideoDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
