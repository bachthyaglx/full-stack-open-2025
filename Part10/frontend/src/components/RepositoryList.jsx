// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: sortBy === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: sortBy === 'lowest' ? 'ASC' : 'DESC',
    searchKeyword: debouncedSearchQuery,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onRepositoryPress={onRepositoryPress}
    />
  );
};

export default RepositoryList;
