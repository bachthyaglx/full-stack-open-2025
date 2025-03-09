import React from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGitHubLink={true} />;
};

export default RepositoryInfo;