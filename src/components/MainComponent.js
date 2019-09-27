import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect} from "react-router-dom";

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
                            comments={this.state.comments.filter(comment => comment.id === parseInt(match.params.dishId, 10))}/>
            );
        }

        const HomePage = () => (
            <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    leader={this.state.leaders.filter(leader => leader.featured)[0]}/>
        );

        return (
            <div>
                <Header/>
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
                        <Route path="/menu/:dishId" component={DishWithId}/>
                        <Route path="/contactus" component={() => <Contact/>}/>
                        <Redirect to="/home"/>
                    </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;