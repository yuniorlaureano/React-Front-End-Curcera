import React, { Component } from 'react';

import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        dishes: state.Dishes,
        comments: state.Comments,
        promotions: state.Promotions,
        leaders: state.Leaders
    };
};


class Main extends Component {

    constructor(props){
        super(props);
    }

    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
                            comments={this.props.comments.filter(comment => comment.id === parseInt(match.params.dishId, 10))}/>
            );
        }

        const HomePage = () => (
            <Home dish={this.props.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}/>
        );

        return (
            <div>
                <Header/>
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                        <Route path="/menu/:dishId" component={DishWithId}/>
                        <Route path="/contactus" component={() => <Contact/>}/>
                        <Redirect to="/home"/>
                    </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));