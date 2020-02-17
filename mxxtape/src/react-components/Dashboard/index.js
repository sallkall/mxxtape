import React from "react";
import {Link} from "react-router-dom";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    render() {
        return (
            <div className="home__bg-image center">
                <Link className="home__button-link center" to={"/community"}>
                    <button className="home__button">Go to the  {this.props.state.community}</button>
                </Link>
                <Link className="home__button-link center" to={"/profile"}>
                    <button className="home__button">Go to the  {this.props.state.profile}</button>
                </Link>

            </div>
        );
    }
}

export default Home;
