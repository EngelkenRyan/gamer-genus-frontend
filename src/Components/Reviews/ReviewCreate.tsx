import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./Display.css";

type CreateReviewVars = {
  date: string;
  feedback: string;
  rating: number;
  modal: boolean;
};

type CreateReviewProps = {
  token: string;
  game: any;
};

class CreateReview extends Component<CreateReviewProps, CreateReviewVars> {
  constructor(props: CreateReviewProps) {
    super(props);
    this.state = {
      date: "",
      feedback: "",
      rating: 5,
      modal: true,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCreate = async (e: any) => {
    e.preventDefault();

    await fetch(`${APIURL}/review/create`, {
      method: "POST",
      body: JSON.stringify({
        gametitle: this.props.game.name,
        gameimage: this.props.game.background_image,
        date: this.state.date,
        feedback: this.state.feedback,
        rating: this.state.rating,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then(() => {
        this.toggle();
        this.setState({ date: "", feedback: "", rating: 5 });
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    return (
      <div>
        <Button className="submitreviewbtn" onClick={this.toggle}>
          Create Review
        </Button>
        <Modal isOpen={!this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="reviewcreateheader">
            Create Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreate}>
              <textarea readOnly className="textareacreate">
                {this.props.game.name}
              </textarea>

              <Input
                type="date"
                onChange={(e) => this.setState({ date: e.target.value })}
                className="reviewcreateinputs"
                value={this.state.date}
                required
              />

              <textarea
                onChange={(e) => this.setState({ feedback: e.target.value })}
                className="reviewcreateinputsfeedback"
                placeholder="Enter your review"
                value={this.state.feedback}
                required
              />

              <Typography
                color="textSecondary"
                style={{ fontFamily: "Nova Square" }}
              >
                Rating
              </Typography>

              <Input
                type="select"
                className="reviewcreateinputs"
                value={this.state.rating}
                onChange={(e) =>
                  this.setState({ rating: Number(e.target.value) })
                }
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Input>

              <Button className="submitreviewbtn">Create Review</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateReview;
