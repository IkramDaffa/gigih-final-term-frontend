import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { connect } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { actionSetIsRenderForm } from "../../../common/redux/actions/getVideoDetail";

function ProductsSection(props) {
  const navigate = useNavigate();
  const formatToIDR = (idr) => {
    const parsed = idr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${"Rp. "}${parsed}`;
  };
  return (
    <div className="products-section">
      <div className="add-product-button-wrapper">
        <Button
          className="btn btn-info"
          onClick={() => {
            navigate("/addProduct");
            props.setRender(true);
          }}
        >
          Add Product
        </Button>
      </div>
      {props.getVideoDetail.products &&
        props.getVideoDetail.products.map((product, index) => {
          return (
            <Fragment key={index}>
              <Card className="card-product">
                <CardBody>
                  <CardTitle tag="h5">{product.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {formatToIDR(product.price)}
                  </CardSubtitle>
                  <a href={product.linkProduct} className="btn btn-success">
                    Go to product
                  </a>
                </CardBody>
              </Card>
            </Fragment>
          );
        })}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setRender: (data) => dispatch(actionSetIsRenderForm(data)),
  };
};

const mapStateToProps = (state) => ({
  getVideoDetail: state.getVideoDetail,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductsSection);
