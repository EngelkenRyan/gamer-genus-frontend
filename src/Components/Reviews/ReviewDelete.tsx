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
    const ok = window.confirm("Are you sure you want to delete this review?");
    if (!ok) return;

    await fetch(`${APIURL}/review/delete/${this.props.myReviews.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
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
          type="button"
          onClick={this.deleteReview}
        >
          Delete Review
        </Button>
      </div>
    );
  }
}

export default ReviewDelete;
