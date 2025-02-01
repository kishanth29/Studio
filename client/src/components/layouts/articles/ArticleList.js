import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Article from '../articles/Articles';
import { imageSources } from '../../../assets/article/Images'; 

export const articles = [
  {
    _id: "1",
    title: "Improve Your Push-Up",
    images: imageSources["1"], 
    excerpt: "How to Increase Strength ",
    content: "This is a detailed paragraph for Article 1.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "2",
    title: " Boosting Your  Body",
    images: imageSources["2"], 
    excerpt: "Improve Your body Mindset.",
    content: "This is a detailed paragraph for Article 2.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "3",
    title: "Exercise Behaviors",
    images: imageSources["3"], 
    excerpt: "Fitness and Health Habits",
    content: "This is a detailed paragraph for Article 3.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "4",
    title: "What is Dysmorphia?",
    images: imageSources["4"], 
    excerpt: "Learn About Concerns Treatment",
    content: "This is a detailed paragraph for Article 4.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "5",
    title: "Time Management Tips",
    images: imageSources["5"], 
    excerpt: "Practical Strategies From  Trainers",
    content: "",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "6",
    title: "How To Do Meditate?",
    images: imageSources["6"], 
    excerpt: "How Frequently Do Meditate",
    content: "This is a detailed paragraph for Article 4.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "7",
    title: "Panic Disorder Exercise",
    images: imageSources["7"], 
    excerpt: "Why Anxiety Happens",
    content: "This is a detailed paragraph for Article 4.",
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "8",
    title: " Pregnancy Challenges",
    images: imageSources["8"], 
    excerpt: "Tips for Infertility Anxiety",
    content: "This is a detailed paragraph for Article 4.",
    reviews: [],
    reviewCount: 0
  },
];

const ArticleList = () => {
  return (
    <Container>
      <h1 className="mt-5">Articles</h1>
      <Row>
        {articles.map((article) => (
          <Article key={article._id} article={article} />
        ))}
      </Row>
    </Container>
  );
};

export default ArticleList;
