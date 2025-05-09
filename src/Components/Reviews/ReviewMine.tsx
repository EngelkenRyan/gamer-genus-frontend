import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardHeader,
} from "@material-ui/core";
import ReviewDelete from "./ReviewDelete";
import ReviewUpdate from "./ReviewUpdate";
import APIURL from "../../helpers/environment";

<link href="https://fonts.googleapis.com/css2?family=Nova+Square&display=swap" rel="stylesheet"></link>

type ReviewMineVars = {
  gametitle: string;
  gameimage: any;
  date: string;
  feedback: string;
  rating: number | string;
  myReviews: any[];
  randomGames: any[];  // Add state for random games
};

type ReviewMineProps = {
  token: string;
};

class ReviewMine extends Component<ReviewMineProps, ReviewMineVars> {
  constructor(props: ReviewMineProps) {
    super(props);
    this.state = {
      gametitle: "",
      gameimage: "",
      date: "",
      feedback: "",
      rating: "",
      myReviews: [],
      randomGames: [], // Initialize state for random games
    };
  }

  componentDidMount() {
    this.fetchReviewMine();
    this.fetchRandomGames();  // Fetch random games when the component mounts
  }

  fetchReviewMine = async () => {
    await fetch(`${APIURL}/review/mine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          myReviews: data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  fetchRandomGames = async () => {
    await fetch(`${APIURL}/games/featured`, {  // Use the same API endpoint for featured games
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Randomly select games from the response
        const randomGames = data.sort(() => 0.5 - Math.random()).slice(0, 5);  // Adjust the number of random games
        this.setState({
          randomGames,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { myReviews, randomGames } = this.state;

    return (
  <div className="reviewmine">
    <h1 className="reviewminehead">My Reviews</h1>
    {myReviews.length > 0 ? (
      <Grid
        container
        justify="center"
        className="reviewMineGrid"
        style={{
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
          height: "70%",
          width: "70%",
        }}
      >
        {myReviews.map((myReviews) => (
          <Grid
            container
            xs={12}
            sm={5}
            justify="center"
            spacing={0}
            style={{ marginBottom: "25px" }}
            key={myReviews.id}
          >
            <div className="myReviews">
              <Card
                className="card"
                variant="outlined"
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
                      {myReviews.gametitle}
                    </Typography>
                  }
                  subheader={myReviews.date}
                />
                <CardMedia
                  component="img"
                  image={myReviews.gameimage}
                  style={{
                    height: 150,
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />
                <CardContent>
                  <Typography color="textSecondary">Review:</Typography>
                  <Typography style={{ fontFamily: "Nova Square" }}>
                    {myReviews.feedback}
                  </Typography>
                  <br />
                  <Typography color="textSecondary">Rating:</Typography>
                  <Typography style={{ fontFamily: "Nova Square" }}>
                    {myReviews.rating}
                  </Typography>
                </CardContent>
                <CardActions className="reivewminecardactions">
                  <ReviewUpdate
                    token={this.props.token}
                    myReviews={myReviews}
                    fetchMyReviews={this.fetchReviewMine}
                  />
                  <ReviewDelete
                    token={this.props.token}
                    myReviews={myReviews}
                    fetchMyReviews={this.fetchReviewMine}
                  />
                </CardActions>
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

export default ReviewMine;
