import React from 'react';
import { Form, Button, ListGroup,Row,Col } from 'react-bootstrap';
import { MdOutlineReviews , MdOutlineDeleteForever } from "react-icons/md";



const ReviewSection = ({ reviews, reviewCount, onAddReview, onDeleteReview }) => {
  const [reviewText, setReviewText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onAddReview(reviewText);
      setReviewText("");
    }
  };

  return (
    <div>
      <hr/>  
      <h4>Reviews <MdOutlineReviews/> ({reviewCount})</h4>
      <ListGroup>
        {reviews.map((review) => (
          <ListGroup.Item key={review.id} className="d-flex justify-content-between align-items-center">
            {review.text} - <strong>{review.author}</strong>
            
              <i> <MdOutlineDeleteForever onClick={() => onDeleteReview(review.id)}/> </i>
            
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="review">
          <Form.Label>Add a Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Form.Group>
        <hr />
        <Row>
        <Col md={3} xs={12} className="d-flex justify-content-center">
          <Button variant="primary" size="sm" type="submit" className="custom-small-button">
            <i>Submit Review</i>
          </Button>
        </Col>
      </Row>
      </Form>
    </div>
  );
};

export default ReviewSection;
