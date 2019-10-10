import React from "react";
import {Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button} from "reactstrap";
import {Link} from "react-router-dom";

const Comments = ({comments}) => {
    return (<ul>
        {comments.map(item => <li key={item.id}>
            <p>{item.comment}</p>
            <p>--{item.author}, {new Intl.DateTimeFormat("en-US", {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
        </li>)}
    </ul>);
};

const Dish = ({dish}) => (
    <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
);

const Dishdetail = ({dish, comments,toggleModal }) => {
    let disDetail = <div></div>;
    if(dish != null){
        disDetail = (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 col-md-5 m-1">
                    <Dish dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <Comments comments={comments}/>
                    <Button onClick={() => toggleModal(dish.id)} ><span className="fa fa-sign-in fa-lg"></span> Add Comment</Button>
                </div>            
            </div>
            </div>
        );
    }

    return disDetail;
};

export default Dishdetail;