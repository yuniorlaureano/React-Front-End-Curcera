import React from "react";
import {Card,CardImg, CardImgOverlay, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

const MenuItem = ({dish, onClick}) => (
    <Card>
        <Link to={`/menu/${dish.id}`}>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardImgOverlay>
        </Link>        
    </Card>
);

const Menu = props => {

    const menu = props.dishes.map(dish => (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <MenuItem dish={dish} onClick={props.onClick}/>
        </div>)
    );

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/menu" active>Menu</Link>
                    </BreadcrumbItem>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </Breadcrumb>
            </div>
            <div className="row">                   
                {menu}                    
            </div>
        </div>
    );
}

export default Menu;