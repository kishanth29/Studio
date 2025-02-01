import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { articles } from './ArticleList';
import { imageSources } from '../../../assets/article/Images'; // Ensure this path is correct
import Appbar from '../../Appbar';
import ReviewSection from '../articles/ReviewSection';
import ArticleContent from '../articles/ArticleContent'; // Import the new component
import Footer from '../../Footer';
import MetaData from '../MetaData';

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.authState);
  const [article, setArticle] = useState(() => {
    // Fetch the article from local storage if available
    const storedArticle = JSON.parse(localStorage.getItem(`article_${id}`));
    return storedArticle || articles.find((article) => article._id === id);
  });

  useEffect(() => {
    // Save the article to local storage whenever it changes
    if (article) {
      localStorage.setItem(`article_${id}`, JSON.stringify(article));
    }
  }, [article, id]);

  const handleAddReview = (reviewText) => {
    if (article) {
      const newReview = {
        id: (article.reviews.length + 1).toString(),
        text: reviewText,
        author: user.name
      };

      const updatedArticle = {
        ...article,
        reviews: [...article.reviews, newReview],
        reviewCount: article.reviewCount + 1
      };

      setArticle(updatedArticle);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (article) {
      const updatedReviews = article.reviews.filter(review => review.id !== reviewId);

      const updatedArticle = {
        ...article,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length
      };

      setArticle(updatedArticle);
    }
  };

  if (!article) {
    return <p>Article not found</p>;
  }

  // Match article ID to image ID
  const articleImage = imageSources[article._id];

  return (
    <>
      <MetaData title={"Article"}/>
      <Appbar />
      
      <Container className='mb-2'>
        <Row>
          <Col md={12} className="mx-auto">
        
            <Card className="my-5">
              <Card.Img
                variant="top"
                src={articleImage}
                alt={article.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <Card.Body>
                {/* <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.excerpt}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ArticleContent id={article._id} /> 
        <ReviewSection
          reviews={article.reviews}
          reviewCount={article.reviewCount}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
          className=""
        />
      </Container>
      <Footer />
      
    </>
  );
};

export default ArticleDetails;
