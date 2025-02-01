// src/components/recipes/Recipe.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';

const Recipe = ({ recipe }) => {
  return (
    <Col sm={6} md={6} lg={3} className="my-3">
      <Card className="p-3 rounded">
        {recipe.images && (
          <Card.Img
            variant="top"
            src={recipe.images}
            alt={recipe.title}
            className="mx-auto"
          />
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <Link to={`/recipe/${recipe._id}`} className='text-decoration-none'>{recipe.title}</Link>
          </Card.Title>
          <Card.Text>{recipe.excerpt}</Card.Text>
          <Button
            variant="primary"
            as={Link}
            to={`/recipe/${recipe._id}`}
          >
            Read More 
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Recipe;
