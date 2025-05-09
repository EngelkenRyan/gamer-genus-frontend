import React from 'react';
import {
    Route,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';
import SavedGamesMine from '../Components/Savedgames/SavedGamesMine'
import DisplayGames from '../Components/Reviews/DisplayGames'
import ReviewMine from '../Components/Reviews/ReviewMine'
import ReviewAll from '../Components/Reviews/ReviewAll';


type NavigationProps = {
    token: string,
    clearToken: () => void,
}

type NavigationVars = {
}

class Navigationbar extends React.Component<NavigationProps, NavigationVars> {
    constructor (props: NavigationProps) {
        super(props)
        this.state = {
        }
    };
    

    render() {
        return(
            <Switch>
            <Route exact path='/'><DisplayGames token={this.props.token} /></Route>
            <Route exact path='/savedgamesmine'><SavedGamesMine token={this.props.token}/></Route>
            <Route exact path='/reviewmine'><ReviewMine token={this.props.token} /></Route>
            <Route exact path='/reviewall'><ReviewAll token={this.props.token}  /></Route>
            </Switch>
        )
    }
    }



export default Navigationbar; 