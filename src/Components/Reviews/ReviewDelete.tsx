import React, { Component } from "react";
import { Button } from "reactstrap";
import APIURL from "../../helpers/environment";

type ReviewDeleteVars = {};

type ReviewDeleteProps = {
  token: string;
  myReviews: any;
  fetchMyReviews: Function;
};

class ReviewDelete extends Component<ReviewDeleteProps, ReviewDeleteVars> {
  constructor(props: ReviewDeleteProps) {
    super(props);
    this.state = {};
  }

  deleteReview = async () => {
    await fetch(`${APIURL}/review/delete/${this.props.myReviews.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.fetchMyReviews();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div>
        <Button
          className="deletereviewbtn"
          type="submit"
          onClick={this.deleteReview}
        >
          Delete Review
        </Button>
      </div>
    );
  }
}

export default ReviewDelete;
