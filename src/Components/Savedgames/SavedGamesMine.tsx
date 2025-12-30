import React, { Component } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardActions,
} from "@material-ui/core";
import CreateSavedGame from "./CreateSavedGame";
import EditSavedGame from "./EditSavedGame";
import DeleteSavedGame from "./DeleteSavedGame";
import APIURL from "../../helpers/environment";
import "./Saved.css";

// Define types for state and props
type SavedMineVars = {
  myPosts: any[];
  loading: boolean;
};

type SavedMineProps = {
  token: string;
};

// SavedGamesMine Component
class SavedGamesMine extends Component<SavedMineProps, SavedMineVars> {
  constructor(props: SavedMineProps) {
    super(props);
    this.state = {
      myPosts: [],
      loading: false,
    };
  }

  // Fetch saved games on component mount
  componentDidMount() {
    this.fetchSavedGames();
  }

  // Fetch saved games from the backend
  fetchSavedGames = async () => {
    this.setState({ loading: true });

    await fetch(`${APIURL}/savedgame/savedmine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          myPosts: data || [],
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ loading: false });
      });
  };

  // Reload saved games after creating, editing, or deleting
  reloadSavedGames = () => {
    this.fetchSavedGames();
  };

  render() {
    const { myPosts, loading } = this.state;

    // Render method
    return (
      <div className="createsaveddiv">
        <h1 className="createsavedhead">My Saved Games</h1>
        <CreateSavedGame
          token={this.props.token}
          reloadSavedGames={this.reloadSavedGames}
        />

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
        ) : myPosts.length > 0 ? (
          <Grid
            container
            justify="center"
            className="createsavedgrid"
            style={{
              textAlign: "center",
              marginRight: "auto",
              marginLeft: "auto",
              height: "70%",
              width: "70%",
            }}
          >
            {myPosts.map((myPost) => (
              <Grid
                container
                xs={12}
                sm={5}
                justify="center"
                spacing={0}
                style={{ marginBottom: "25px" }}
                key={myPost.id}
              >
                <div className="myPosts">
                  <Card
                    className="card"
                    variant="outlined"
                    style={{
                      boxShadow: "0 8px 24px 0",
                      backgroundColor: "#9fafca",
                      maxWidth: "300px",
                      borderRadius: "25px",
                      fontFamily: "Nova Square",
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography style={{ fontFamily: "Nova Square" }}>
                          {myPost.gametitle}
                        </Typography>
                      }
                      subheader="Game Title"
                    />
                    <Typography color="textSecondary">Genre</Typography>
                    <Typography style={{ fontFamily: "Nova Square" }}>
                      {myPost.genre}
                    </Typography>
                    <Typography color="textSecondary">Description</Typography>
                    <Typography style={{ fontFamily: "Nova Square" }}>
                      {myPost.description}
                    </Typography>
                    <Typography color="textSecondary">Platform</Typography>
                    <Typography style={{ fontFamily: "Nova Square" }}>
                      {myPost.platform}
                    </Typography>

                    <CardActions className="savedminecardaction">
                      <EditSavedGame
                        token={this.props.token}
                        myPosts={myPost}
                        fetchMySavedGames={this.fetchSavedGames}
                      />
                      <DeleteSavedGame
                        token={this.props.token}
                        myPosts={myPost}
                        fetchMySavedGames={this.fetchSavedGames}
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
            You don't have any saved games yet. Start by creating one!
          </Typography>
        )}
      </div>
    );
  }
}

export default SavedGamesMine;
