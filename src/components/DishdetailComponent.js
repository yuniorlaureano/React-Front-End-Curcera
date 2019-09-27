import React from "react";
import {Card, CardImg, CardTitle, CardText, CardBody} from "reactstrap";


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

const Dishdetail = ({dish}) => {
    let disDetail = <div></div>;
    if(dish != null){
        disDetail = (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Dish dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <Comments comments={dish.comments}/>
                </div>            
            </div>
            </div>
        );
    }

    return disDetail;
};

export default Dishdetail;