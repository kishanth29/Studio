import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';

const Article = ({ article }) => {
  return (
    <Col sm={6} md={6} lg={3} className="my-3">
      <Card className="p-3 rounded">
        {article.images && (
          <Card.Img
            variant="top"
            src={article.images}
            alt={article.title}
            className="mx-auto"
          />
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <Link to={`/article/${article._id}`} className='text-decoration-none'>{article.title}</Link>
          </Card.Title>
          <Card.Text>{article.excerpt}</Card.Text>
          <Button
            variant="primary"
            as={Link}
            to={`/article/${article._id}`}
          >
            Read More 
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Article;
