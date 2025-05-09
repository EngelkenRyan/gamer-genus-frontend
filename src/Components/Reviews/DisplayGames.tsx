import React from "react";
import { Card, CardContent, CardMedia, Grid } from "@material-ui/core";
import CreateReview from "./ReviewCreate";
import "./Display.css";

type DisplayGamesVars = {
  gamesList: any[];
  apiKey: string;
  searchTerm: string;
  create: boolean;
  gametitle: string;
  gameimg: any;
  gamegenre: string;
  platform: string;
};

type DisplayGamesProps = {
  token: string;
};

class DisplayGames extends React.Component<DisplayGamesProps, DisplayGamesVars> {
  constructor(props: DisplayGamesProps) {
    super(props);
    this.state = {
      gamesList: [],
      apiKey: "75bf2e9cf0cf42a2ae29640a3379c0f1",
      searchTerm: "",
      create: false,
      gametitle: "",
      gameimg: "",
      gamegenre: "",
      platform: "",
    };
  }

  // Fetch games when the component mounts
  componentDidMount() {
    this.fetchRandomGames(); // Fetch random games on mount
  }

  // Fetch random games for featured section
  fetchRandomGames = async () => {
    await fetch(`https://api.rawg.io/api/games?key=${this.state.apiKey}&page_size=5`) // Fetch random games
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          gamesList: json.results,
          create: true,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Search games when the user enters a search term
  searchGames = async () => {
    if (this.state.searchTerm.trim()) {
      await fetch(
        `https://api.rawg.io/api/games?key=${this.state.apiKey}&search=${this.state.searchTerm}`
      )
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            gamesList: json.results,
            create: true,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // Update search term when the user types
  updateSearchTerm = (e: any) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  // Reset search state to show random games again
  resetSearchState = () => {
    this.setState({
      gamesList: [],
      create: false,
    });
    this.fetchRandomGames(); // Fetch random games after reset
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
            />
            <button
              className="searchButton"
              onClick={this.searchGames}
              style={{ fontFamily: "Nova Square" }}
            >
              Search
            </button>
          </label>
        </div>

        {/* Featured Games Section */}
        <div className="featured-games-section">
          <h1>Featured Games</h1>
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
                  max-width="400px"
                  style={{ marginBottom: "25px" }}
                  key={games.id}
                >
                  <Card
                    className="card"
                    variant="outlined"
                    style={{
                      boxShadow: "0 8px 24px 0",
                      backgroundColor: "#9fafca",
                      maxWidth: "300px",
                      borderRadius: "25px 25px 25px 25px",
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
        </div>
      </div>
    );
  }
}

export default DisplayGames;
