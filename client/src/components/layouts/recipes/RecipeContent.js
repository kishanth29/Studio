import React from 'react';
import { recipeContents } from './Contents'; // Adjust the path as necessary

const RecipeContent = ({ id }) => {
  const content = recipeContents[id] || "Content not available";
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default RecipeContent;
