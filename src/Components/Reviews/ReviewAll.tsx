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

<link href="https://fonts.googleapis.com/css2?family=Nova+Square&display=swap" rel="stylesheet"></link>


type ReviewAllVars = {
  gametitle: string;
  gameimage: any;
  date: string;
  feedback: string;
  rating: number | string;
  myReviews: any[];
};

type ReviewAllProps = {
  token: string | null;
};

class ReviewAll extends Component<ReviewAllProps, ReviewAllVars> {
  constructor(props: ReviewAllProps) {
    super(props);
    this.state = {
      gametitle: "",
      gameimage: "",
      date: "",
      feedback: "",
      rating: "",
      myReviews: [],
    };
  }

  componentDidMount() {
    this.fetchReviewAll();
  }

  fetchReviewAll = async () => {
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
          myReviews: data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  

  render() {
    const { myReviews } = this.state;
    return (
      <div className="reviewAll">
        <h1 className="reviewallhead">All Reviews</h1>
        {myReviews.length > 0 && (
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
            {myReviews.map((myReviews) => (
              <Grid
                container
                xs={12}
                sm={4}
                justify="center"
                spacing={0}
                style={{ marginBottom: "25px" }}
              >
                <div className="allReviews" key={myReviews.id}>
                  <Card
                    className="card"
                    style={{
                      boxShadow: "0 8px 24px 0",
                      backgroundColor: "#9fafca",
                      maxWidth: "300px",
                      borderRadius: " 25px 25px 25px 25px",
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography style={{ fontFamily: 'Nova Square' }}>
                          {myReviews.gametitle} 
                        </Typography>}
                      subheader={myReviews.date} />
                    <CardMedia
                      component="img"
                      image={myReviews.gameimage}
                      style={{
                        height: 150,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <CardContent style={{ fontFamily: 'Nova Square' }}>
                      <Typography color="textSecondary">Review:</Typography>
                      <Typography style={{ fontFamily: 'Nova Square' }} >{myReviews.feedback}</Typography>
                      <br />
                      <Typography color="textSecondary">Rating:</Typography>
                      <Typography style={{ fontFamily: 'Nova Square' }}>{myReviews.rating}</Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

export default ReviewAll;
