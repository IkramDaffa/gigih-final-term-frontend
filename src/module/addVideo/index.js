import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Alert,
} from "reactstrap";
import { useState } from "react";
import { API } from "../../common/API";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";

function AddVideo() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [chosen, setChosen] = useState(true);
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
  const validateYouTubeUrl = (link) => {
    let url = link;
    if (url != undefined || url != "") {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        url = "https://www.youtube.com/embed/" + match[2] + "?autoplay=0";
        return url;
      } else {
        setError("You entered the wrong youtube link format");
        return false;
      }
    } else {
      setError("You entered the wrong youtube link format");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const linkVallidator = validateYouTubeUrl(link);
    let thumbnailVallidator = false;
    if (chosen) {
      thumbnailVallidator = isValidHttpUrl(thumbnail);
    } else {
      thumbnailVallidator = true;
    }
    if (linkVallidator && thumbnailVallidator) {
      let params = {
        title,
        thumbnail,
        link: linkVallidator,
      };

      API.post("video/add", params)
        .then(() => {
          setTitle("");
          setThumbnail("");
          setLink("");
          navigate("/");
        })
        .catch((e) => console.log(e));
    } else {
      console.log("link salah");
    }
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleThumbnailUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setThumbnail(base64);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      <Container className="container-form-add-product">
        <div className="form-add-product">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <h5 className="mt-3 add-product-form-title">Add Video</h5>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="name">Video Title</Label>
              <Input
                id="name"
                name="name"
                placeholder="insert video Title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <hr class="m-3" />
            <FormGroup>
              <Label for="thumbnail">Video Thumbnail (max 25 mb)</Label>
              <div className="thumbnail-method d-flex gap-3">
                <p
                  className={chosen && "active"}
                  onClick={() => setChosen(true)}
                >
                  With Link
                </p>
                <p
                  className={!chosen && "active"}
                  onClick={() => setChosen(false)}
                >
                  With File Upload
                </p>
              </div>
              {!chosen ? (
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  required
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleThumbnailUpload(e)}
                  disabled
                />
              ) : (
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="text"
                  placeholder="input image link"
                  required
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              )}
            </FormGroup>
            <hr class="m-3" />
            <FormGroup>
              <Label for="link">Youtube Video Link</Label>

              <Input
                id="link"
                name="link"
                placeholder="ex: https://www.youtube.com/watch?v=ZRtdQ81jPUQ"
                type="text"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </FormGroup>
            <hr class="m-3" />
            <Button className="btn btn-success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
}

export default AddVideo;
