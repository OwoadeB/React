import React , {Component} from 'react';
import {Card , CardBody, CardTitle , CardText , CardImg} from 'reactstrap';

class Dishdetail extends Component {

    renderComments(comments) {
        if(comments == null)
            return(
                <div></div>
            );
        const coments = comments.map(comment => {
            return(
                <ul className="list-unstyled">
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US',{
                            year: 'numeric',
                            month: 'long',
                            date:'2-digit',
                        }).format(new Date(comment.date))}
                        </p>
                    </li>
                </ul>
            );
        })
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {coments}
                </ul>
            </div>
        );
    }

    renderDish(dish){
        if(dish!=null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    render(){
        const dish = this.props.dish;
        if(dish == null){
            return(
                <div></div>
            )
        }
        const dishItem = this.renderDish(dish);
        const commentItem = this.renderComments(dish.comments)
        return(
            <div className="row">
                {dishItem}
                {commentItem}
            </div>
        )
    }
}



export default Dishdetail;