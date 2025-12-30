import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import CreateReview from "./ReviewCreate";
import "./Display.css";

type DisplayGamesVars = {
  gamesList: any[];
  apiKey: string;
  searchTerm: string;
  create: boolean;
  loading: boolean;
};

type DisplayGamesProps = {
  token: string;
};

class DisplayGames extends React.Component<
  DisplayGamesProps,
  DisplayGamesVars
> {
  constructor(props: DisplayGamesProps) {
    super(props);
    this.state = {
      gamesList: [],
      apiKey: "75bf2e9cf0cf42a2ae29640a3379c0f1",
      searchTerm: "",
      create: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchRandomGames();
  }

  fetchRandomGames = async () => {
    this.setState({ loading: true });
    await fetch(
      `https://api.rawg.io/api/games?key=${this.state.apiKey}&page_size=5`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          gamesList: json.results || [],
          create: true,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ loading: false });
      });
  };

  searchGames = async () => {
    if (!this.state.searchTerm.trim()) return;

    this.setState({ loading: true });
    await fetch(
      `https://api.rawg.io/api/games?key=${
        this.state.apiKey
      }&search=${encodeURIComponent(this.state.searchTerm)}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          gamesList: json.results || [],
          create: true,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ loading: false });
      });
  };

  updateSearchTerm = (e: any) => {
    this.setState({ searchTerm: e.target.value });
  };

  // Press Enter to search
  onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.searchGames();
    }
  };

  // Clear search and go back to featured list
  resetSearchState = () => {
    this.setState(
      {
        gamesList: [],
        create: false,
        searchTerm: "",
      },
      () => this.fetchRandomGames()
    );
  };

  render() {
    return (
      <div className="displaygamesdiv">
        <div className="searchbar">
          <label>
            Search for a video game to review:
            <input
              type="text"
              placeholder="Game Title"
              className="searchbarinput"
              value={this.state.searchTerm}
              onChange={this.updateSearchTerm}
              onKeyDown={this.onSearchKeyDown}
            />
            <button className="searchButton" onClick={this.searchGames}>
              Search
            </button>
            <button className="clearButton" onClick={this.resetSearchState}>
              Clear
            </button>
          </label>
        </div>

        <div className="featured-games-section">
          <h1>Featured Games</h1>

          {this.state.loading ? (
            <Typography
              align="center"
              style={{ marginTop: 50, color: "#e0e0e0" }}
            >
              Loading...
            </Typography>
          ) : (
            <Grid
              container
              justify="center"
              className="displaygrid"
              style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto",
                height: "70%",
                width: "70%",
              }}
            >
              {this.state.gamesList.map((games) => {
                return (
                  <Grid
                    container
                    xs={12}
                    sm={4}
                    justify="center"
                    spacing={0}
                    key={games.id}
                    style={{ marginBottom: "25px" }}
                  >
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
                      <CardMedia
                        component="img"
                        image={games.background_image}
                        style={{
                          height: 150,
                          marginRight: "auto",
                          marginLeft: "auto",
                        }}
                      />
                      <CardContent>
                        {games.name}
                        <br />
                        {games.released}
                      </CardContent>
                      <CreateReview token={this.props.token} game={games} />
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

export default DisplayGames;
