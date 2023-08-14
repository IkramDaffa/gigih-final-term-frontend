import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Alert,
} from "reactstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { API } from "../../common/API";
import { fetchVideoDetail } from "../../common/redux/actions/getVideoDetail";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";

function AddProduct(props) {
  useEffect(() => {
    if (!props.getVideoDetail.isRenderForm) {
      navigate("/");
    }
  });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function isValidHttpUrl(str) {
    const httpsValidator = str.includes("https://") || str.includes("http://");
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    if (httpsValidator) {
      return pattern.test(str);
    } else {
      setError("You entered the wrong link format");
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const linkVallidator = isValidHttpUrl(link);
    if (linkVallidator) {
      const params = {
        title,
        price,
        linkProduct: link,
        videoId: props.getVideoDetail.video._id,
      };
      API.post("product/add", params)
        .then(() => {
          props.fetchVideoDetail(props.getVideoDetail.video._id);
          setTitle("");
          setPrice(0);
          setLink("");
          navigate("/videoDetail");
        })
        .catch((e) => console.log(e));
    } else {
      console.log("link salah");
    }
  };
  return (
    <Layout>
      <Container className="container-form-add-product">
        <div className="form-add-product">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <h5 className="mt-3 add-product-form-title">Add Product</h5>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="insert product name"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Product Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="insert price (ex: 150000)"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="link">Product Link</Label>
              <Input
                id="link"
                name="link"
                placeholder="ex: https://www.google.com/"
                type="text"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </FormGroup>
            <Button className="btn btn-success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
