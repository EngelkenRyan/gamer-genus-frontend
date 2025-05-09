import { Component } from "react";
import { Button, Form, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";

type ReviewUpdateVars = {
  gametitle: string;
  date: string;
  feedback: string;
  rating: number | string;
  modal: boolean;
};

type ReviewUpdateProps = {
  token: string;
  myReviews: any;
  fetchMyReviews: Function;
};

class ReviewUpdate extends Component<ReviewUpdateProps, ReviewUpdateVars> {
  constructor(props: ReviewUpdateProps) {
    super(props);
    this.state = {
      gametitle: this.props.myReviews.gametitle,
      date: this.props.myReviews.date,
      feedback: this.props.myReviews.feedback,
      rating: this.props.myReviews.rating,
      modal: true,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleReviewUpdate = async (e: any) => {
    e.preventDefault();
    await fetch(`${APIURL}/review/update/${this.props.myReviews.id}`, {
      method: "PUT",
      body: JSON.stringify({
        gametitle: this.state.gametitle,
        date: this.state.date,
        feedback: this.state.feedback,
        rating: this.state.rating,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gametitle: "",
          date: "",
          feedback: "",
          rating: "",
        });
        this.toggle();
        this.props.fetchMyReviews();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div className="updatereview">
        <div className="updatereviewmaindiv">
          <Button
            className="updatereviewbtn"
            id="updatereviewbtn"
            onClick={this.toggle}
          >
            Edit Review
          </Button>
          <Modal isOpen={!this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} className="reviewupdateheader">
              Update Review
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleReviewUpdate}>
              <textarea readOnly className="textareacreate">
                {this.state.gametitle}
                </textarea>
                <br />
                <Input
                  type="text"
                  placeholder="Date"
                  className="editreviewinput"
                  onChange={(e) => this.setState({ date: e.target.value })}
                />
                <br />
                <textarea
                  placeholder="Feedback"
                  className="editreviewinputfeedback"
                  onChange={(e) => this.setState({ feedback: e.target.value })}
                />
                <br />
                <Input
                  placeholder="Rating(1 being the worst and 5 being the best"
                  className="editreviewinput"
                  onChange={(e) => this.setState({ rating: e.target.value })}
                  type="number"
  min="1"
  max="5"
  value={this.state.rating}
  required
                />
                <br />
                <Button className="updatereviewbtn">Update Review</Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ReviewUpdate;
