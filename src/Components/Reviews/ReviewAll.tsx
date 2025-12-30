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
            style={{
              textAlign: "center",
              marginRight: "auto",
              marginLeft: "auto",
              height: "70%",
              width: "70%",
            }}
          >
            {myReviews.map((review) => (
              <Grid
                container
                xs={12}
                sm={4}
                justify="center"
                spacing={0}
                style={{ marginBottom: "25px" }}
                key={review.id}
              >
                <div className="allReviews">
                  <Card
                    className="card"
                    style={{
                      boxShadow: "0 8px 24px 0",
                      backgroundColor: "#9fafca",
                      maxWidth: "300px",
                      borderRadius: "25px",
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
                    <CardMedia
                      component="img"
                      image={review.gameimage}
                      style={{
                        height: 150,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <CardContent style={{ fontFamily: "Nova Square" }}>
                      <Typography color="textSecondary">Review:</Typography>
                      <Typography style={{ fontFamily: "Nova Square" }}>
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
