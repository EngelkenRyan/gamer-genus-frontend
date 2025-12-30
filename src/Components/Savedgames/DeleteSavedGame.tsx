import React, { Component } from "react";
import { Button } from "reactstrap";
import APIURL from "../../helpers/environment";

type DeleteGameVars = {};

type DeleteGameProps = {
  token: string;
  myPosts: any;
  fetchMySavedGames: Function;
};

class DeleteSavedGame extends Component<DeleteGameProps, DeleteGameVars> {
  constructor(props: DeleteGameProps) {
    super(props);
    this.state = {};
  }

  deleteGame = async () => {
    const ok = window.confirm(
      "Are you sure you want to delete this saved game?"
    );
    if (!ok) return;

    await fetch(`${APIURL}/savedgame/saveddelete/${this.props.myPosts.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        this.props.fetchMySavedGames();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div>
        <Button
          className="deletesavedbtn"
          type="button"
          onClick={this.deleteGame}
        >
          Delete Saved Game
        </Button>
      </div>
    );
  }
}

export default DeleteSavedGame;
