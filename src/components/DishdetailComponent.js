import React, { Component } from 'react';
import {Card , CardBody, CardTitle , CardText , CardImg , Breadcrumb , BreadcrumbItem, Button , Modal , ModalHeader , ModalBody , Col , Row , Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control , LocalForm , Errors} from 'react-redux-form'



    function RenderComments({comments}) {
        if(comments == null)
            return(
                <div></div>
            );
        const coments = comments.map(comment => {
            return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US',{
                            year: 'numeric',
                            month: 'long',
                            date:'2-digit',
                        }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </li>
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

    function RenderDish({dish}){
        if(dish!=null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    const Dishdetail = (props) => {
        const dish =props.dish;
        if(dish == null){
            return(
                <div></div>
            )
        }
        const dishItem = <RenderDish dish={props.dish} />;
        const commentItem = <RenderComments comments={props.comments} /> ;
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {dishItem}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {commentItem}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <CommentForm
                    dishId={props.dish.id} 
                    postComment={props.postComment}/>
                </div>
            </div>
            </div>
        )
    }

    const maxLength = (len) => (val) => !val || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len)

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit(values){
            console.log("Current state is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil"></span>
                        Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select className="form-control" defaultValue="1" id="rating" model=".rating" name="rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={2}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text className="form-control" id="author" model=".author" name="author" placeholder="Your name"
                                        validators={{
                                            minLength: minLength(3), maxLength:maxLength(15)
                                        }} />
                                    </Col>
                                    <Errors 
                                    className="text-danger" model=".author" show="touched"
                                    messages={{
                                        minLength: 'Must not be less than 2 characters',
                                        maxLength: "Must be 15 characters or less"
                                    }}/>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea className="form-control" id="comment" model=".comment" name="comment" rows="6" />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={
                                        {size:12}
                                    }>
                                        <Button color="primary" value="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
        
    




export default Dishdetail;