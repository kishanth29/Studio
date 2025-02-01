import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Recipe from '../recipes/Recipe'; 
import { RecipeSource } from '../../../assets/article/recipes/Recipes';
import { recipeContents } from './Contents';

export const recipes = [
  {
    _id: "1",
    title: "Stuffed Pepper Soup", 
    images: RecipeSource["1"], 
    excerpt: "Turkey and Bell Peppers",
    content: recipeContents["1"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "2",
    title: "Grain Porridge",
    images: RecipeSource["2"], 
    excerpt: "Made with Quinoa and Dates",
    content: recipeContents["2"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "3",
    title: "Garlicky Kale Sauté", 
    images: RecipeSource["3"], 
    excerpt: "With  Oil ,Lemon Pepper",
    content: recipeContents["3"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "4",
    title: "Parmesan Garlic Bread",
    images: RecipeSource["4"], 
    excerpt: "Whole Wheat Bread and Olive Oil",
    content: recipeContents["4"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "5",
    title: "Baked Sweet Potato Fries",
    images: RecipeSource["5"], 
    excerpt: "Crisp and Satisfying Side Dish",
    content: recipeContents["5"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "6",
    title: "Overnight Oats with Peaches", 
    images: RecipeSource["6"], 
    excerpt: "Nutritious Prep-Ahead Breakfast",
    content: recipeContents["6"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "7",
    title: "Tropical Cheesecake Smoothie", 
    images: RecipeSource["7"], 
    excerpt: " Vitamin C and Lean Protein",
    content: recipeContents["7"],
    reviews: [],
    reviewCount: 0
  },
  {
    _id: "8",
    title: "Tomato and Chickpea Soup", 
    images: RecipeSource["8"], 
    excerpt: "high amount of vitamin  C, E, BProtein",
    content: recipeContents["8"],
    reviews: [],
    reviewCount: 0
  },
];

const RecipeList = () => {
  return (
    <Container>
      <h1 className="mt-5">Recipes</h1>
      <Row>
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
