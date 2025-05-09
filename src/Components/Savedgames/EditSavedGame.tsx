import { Component } from "react";
import { Button, Form, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./Saved.css";

type EditGameVars = {
  gametitle: string;
  genre: string;
  description: string;
  platform: string;
  modal: boolean;
};

type EditGameProps = {
  token: string;
  myPosts: any;
  fetchMySavedGames: Function;
};

class EditSavedGame extends Component<EditGameProps, EditGameVars> {
  constructor(props: EditGameProps) {
    super(props);
    this.state = {
      gametitle: this.props.myPosts.gametitle,
      genre: this.props.myPosts.genre,
      description: this.props.myPosts.description,
      platform: this.props.myPosts.platform,
      modal: true,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleUpdate = async (e: any) => {
    e.preventDefault();
    await fetch(`${APIURL}/savedgame/savedupdate/${this.props.myPosts.id}`, {
      method: "PUT",
      body: JSON.stringify({
        gametitle: this.state.gametitle,
        genre: this.state.genre,
        description: this.state.description,
        platform: this.state.platform,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gametitle: "",
          genre: "",
          description: "",
          platform: "",
        });
        this.toggle();
        this.props.fetchMySavedGames();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div className="editsavedmain">
        <div className="editsavedmaindiv">
          <Button className="editsavedbtn" onClick={this.toggle}>
            Edit Saved Game
          </Button>
          <Modal isOpen={!this.state.modal} toggle={this.toggle}>
            <div className="editsavedmain">
              <ModalHeader className="editsavedheader" toggle={this.toggle}>
                Edit Post
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleUpdate}>
                  {/* <Input
                    type="text"
                    placeholder="Game Title"
                    className="editgameinput"
                    onChange={(e) =>
                      this.setState({ gametitle: e.target.value })
                    }
                  /> */}
                  <textarea readOnly className="textareacreate">
                    {this.props.myPosts.gametitle}
                    </textarea>
                  <br />
                  <textarea readOnly className="textareacreate">
                      {this.props.myPosts.genre}
                      </textarea>
                  <br />
                  <Input
                    type="text"
                    placeholder="Description"
                    className="editgameinput"
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                  <br />
                  <Input
                    type="text"
                    placeholder="Platform"
                    className="editgameinput"
                    onChange={(e) =>
                      this.setState({ platform: e.target.value })
                    }
                  />
                  <br />
                  <Button className="editsavedbtn">Update Game</Button>
                </Form>
              </ModalBody>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default EditSavedGame;
