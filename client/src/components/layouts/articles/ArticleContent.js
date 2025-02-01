// src/components/articles/ArticleContent.js

import React from 'react';
import { articleContents } from './Content'; // Adjust the path as necessary

const ArticleContent = ({ id }) => {
  const content = articleContents[id] || "Content not available";
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default ArticleContent;
