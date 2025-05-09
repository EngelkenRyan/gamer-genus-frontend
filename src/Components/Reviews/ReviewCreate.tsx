import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./Display.css";

<link href="https://fonts.googleapis.com/css2?family=Nova+Square&display=swap" rel="stylesheet"></link>


type CreateReviewVars = {
  gametitle: string;
  gameimage: any;
  date: string;
  feedback: string;
  rating: number | string;
  owner: number;
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
      gametitle: "",
      gameimage: "",
      date: "",
      feedback: "",
      rating: 0,
      owner: 0,
      modal: true,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  handleCreate = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/review/create`, {
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
    });
    this.toggle();
    const res = await response.json().catch((error) => {
      console.log(error.message);
    });
  };

  render() {
    return (
      <div>
        <Button className="submitreviewbtn" onClick={this.toggle} >
          Create Review
        </Button>
        <Modal isOpen={!this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="reviewcreateheader" >
            Create Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreate} >
              <div className="createreviewlabel">
                <textarea readOnly className="textareacreate">
                  {this.props.game.name}
                </textarea>
                <textarea readOnly className="textareacreate">
                  {this.props.game.background_image}
                </textarea>
                <Input
                  onChange={(e) => this.setState({ date: e.target.value })}
                  className="reviewcreateinputs"
                  placeholder="Date of review"
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
                <Typography color="textSecondary" style={{ fontFamily: 'Nova Square'}}>
                  Rate this game(1 being the worst and 5 being the best)
                </Typography>
                <Input
  onChange={(e) => this.setState({ rating: parseInt(e.target.value) || 0 })}
  type="number"
  min="1"
  max="5"
  className="reviewcreateinputs"
  placeholder="Rate this game (1 to 5)"
  value={this.state.rating}
  required
/>
              </div>
              <div>
                <Button
                  className="submitreviewbtn"
                >
                  Create Review
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateReview;
