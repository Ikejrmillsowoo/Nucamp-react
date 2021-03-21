import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  Label
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



function RenderCampsite({campsite}) {
       return (
           <div className="col-md-5 m-1" key={campsite.id}>
               <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
           </div>
       )
    }

function RenderComments({comments}) {
        if (comments) {
            return (
              <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      {comment.text}
                      <p>
                        {comment.author}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date(Date.parse(comment.date)))}
                      </p>
                    </div>
                  );
                })}
                <CommentForm />
              </div>
            );
        } 
        return <div></div>

    }

class CommentForm extends React.Component {
    constructor(props){
        super(props);

        this.state= {
        isModalOpen: false,
        touched: {
            author: false
        }
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    }

   

toggleModal() {
         this.setState({
             isModalOpen: !this.state.isModalOpen
         })
     }

    formSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
        
    }

     render() {
        return (
          <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                Submit Comment
              </ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.formSubmit(values)}>
                  <div className="form-group">
                    <Label htmlFor="rating">Rating:</Label>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </div>
                  <div className="form-group">
                    <Label htmlFor="author">Author:</Label>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      component="div"
                      messages={{
                        required: "Required",
                        minLength: "Must be at least 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="text">Comment:</Label>
                    <Control.textarea
                      model=".text"
                      id="text"
                      rows={6}
                      name="text"
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    value="submit"
                    className="btn btn-primary"
                    toggle={this.toggleModal}
                  >
                    Submit
                  </button>
                </LocalForm>
              </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}>
              <i className="fa fa-pencil fa-lg">Submit Comment</i>
            </Button>
          </div>
        );
 }
}

    function CampsiteInfo(props) {
        if (props.campsite){
            return (
                <div className="container">
                 <div className="row">
                    <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to="/directory" href="">
                            Directory
                        </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.names}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                    </div>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            )
        } else {
           return(
            <div></div>
           ) 
        }

    }
    // return (

    // )


export default CampsiteInfo;

