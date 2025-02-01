import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { recipes } from './RecipeList';
import { RecipeSource } from '../../../assets/article/recipes/Recipes';
import RecipeContent from './RecipeContent'; // Import the RecipeContent component
import Appbar from '../../Appbar';
import Footer from '../../Footer';
import ReviewSection from './ReviewSection'; // Import the ReviewSection component
import MetaData from '../MetaData';

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.authState);
  const [recipe, setRecipe] = useState(() => {
    // Fetch the recipe from local storage if available
    const storedRecipe = JSON.parse(localStorage.getItem(`recipe_${id}`));
    return storedRecipe || recipes.find(recipe => recipe._id === id);
  });

  useEffect(() => {
    // Save the recipe to local storage whenever it changes
    if (recipe) {
      localStorage.setItem(`recipe_${id}`, JSON.stringify(recipe));
    }
  }, [recipe, id]);

  const handleAddReview = (reviewText) => {
    if (recipe) {
      const newReview = {
        id: (recipe.reviews.length + 1).toString(),
        text: reviewText,
        author: user.name
      };

      const updatedRecipe = {
        ...recipe,
        reviews: [...recipe.reviews, newReview],
        reviewCount: recipe.reviewCount + 1
      };

      setRecipe(updatedRecipe);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (recipe) {
      const updatedReviews = recipe.reviews.filter(review => review.id !== reviewId);

      const updatedRecipe = {
        ...recipe,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length
      };

      setRecipe(updatedRecipe);
    }
  };

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  // Match recipe ID to image ID
  const recipeImage = RecipeSource[recipe._id];

  return (
    <>
      <MetaData  title ={"Recipe"}/>
      <Appbar />
      <Container className='mb-2'>
        <Row>
          <Col md={12} className="mx-auto">
            <Card className="my-5">
              <Card.Img
                variant="top"
                src={recipeImage}
                alt={recipe.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <Card.Body>
                {/* <h2>{recipe.title}</h2>
                <p>{recipe.excerpt}</p> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <RecipeContent id={recipe._id} />
        <ReviewSection 
          reviews={recipe.reviews} 
          reviewCount={recipe.reviewCount} 
          onAddReview={handleAddReview} 
          onDeleteReview={handleDeleteReview} 
        />
      </Container>
      <Footer />
    </>
  );
};

export default RecipeDetails;
