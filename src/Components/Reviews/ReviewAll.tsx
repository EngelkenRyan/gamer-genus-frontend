import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardHeader,
} from "@material-ui/core";
import APIURL from "../../helpers/environment";
import "./Display.css";

type ReviewAllVars = {
  myReviews: any[];
  loading: boolean;
};

type ReviewAllProps = {
  token: string | null;
};

class ReviewAll extends Component<ReviewAllProps, ReviewAllVars> {
  constructor(props: ReviewAllProps) {
    super(props);
    this.state = {
      myReviews: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchReviewAll();
  }

  fetchReviewAll = async () => {
    this.setState({ loading: true });

    await fetch(`${APIURL}/review/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          myReviews: data || [],
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ loading: false });
      });
  };

  render() {
    const { myReviews, loading } = this.state;

    return (
      <div className="reviewAll">
        <h1 className="reviewallhead">All Reviews</h1>

        {loading ? (
          <Typography
            align="center"
            style={{
              marginTop: 50,
              color: "#e0e0e0",
              fontFamily: "Nova Square",
            }}
          >
            Loading...
          </Typography>
        ) : myReviews.length > 0 ? (
          <Grid
            container
            justify="center"
            spacing={3}
            style={{ width: "90%", margin: "0 auto" }}
          >
            {myReviews.map((review) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ marginBottom: "25px" }}
                key={review.id}
              >
                <div className="allReviews">
                  <Card
                    className="card"
                    style={{
                      boxShadow: "0 8px 24px 0",
                      backgroundColor: "#9fafca",
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography style={{ fontFamily: "Nova Square" }}>
                          {review.gametitle}
                        </Typography>
                      }
                      subheader={review.date}
                    />
                    <CardMedia component="img" image={review.gameimage} />
                    <CardContent style={{ fontFamily: "Nova Square" }}>
                      <Typography color="textSecondary">Review:</Typography>
                      <Typography
                        className="clampText"
                        style={{ fontFamily: "Nova Square" }}
                      >
                        {review.feedback}
                      </Typography>
                      <br />
                      <Typography color="textSecondary">Rating:</Typography>
                      <Typography style={{ fontFamily: "Nova Square" }}>
                        {review.rating}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{
              marginTop: "50px",
              color: "#e0e0e0",
              fontFamily: "Nova Square",
            }}
          >
            No reviews available.
          </Typography>
        )}
      </div>
    );
  }
}

export default ReviewAll;
