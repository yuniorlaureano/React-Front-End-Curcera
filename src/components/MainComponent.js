import React, { Component } from 'react';

import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from "reactstrap";
import {addComment} from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.Dishes,
        comments: state.Comments,
        promotions: state.Promotions,
        leaders: state.Leaders
    };
};

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            dishId: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.rating = React.createRef;
        this.name = React.createRef;
        this.comment = React.createRef;
    }


    toggleModal(dishId){
        this.setState(prev => {
            return { isModalOpen: !prev.isModalOpen, dishId: dishId };
        });
    }

    handleLogin(event){
        this.toggleModal();
        event.preventDefault();
        this.props.addComment(this.state.dishId, this.rating.value, this.name.value, this.comment.value);
    }
    
    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
                            comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                            addComment={this.props.addComment} toggleModal={this.toggleModal}/>
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
                    <Modal isOpen={this.state.isModalOpen}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">rating</Label>
                                    <Input type="text" id="rating" name="rating"
                                        innerRef={(input) => this.rating = input} />
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="name" name="name"
                                        innerRef={(input) => this.name = input} />
                                    <Label htmlFor="username">comment</Label> 
                                    <Input type="text" id="comment" name="comment"
                                        innerRef={(input) => this.comment = input} />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                <Header/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));