import React, { useEffect, useState, useCallback } from 'react';
import RepoItem from 'components/ReposItem';
import SearchInput from 'components/SearchInput';
import styled from "./App.module.scss"
import { debounce } from './utils/debounce';

const API_URL = 'https://api.github.com/search/repositories?q=';

interface Repo {
  id: number;
  full_name: string;
  description: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  open_issues_count: number;
  html_url: string;
  license: {
    name: string;
  }
}
const COUNT = 30;

const App = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}${query}&per_page=${COUNT}&page=${page}`);
        const data = await res.json();
        if (data.items) {
          setRepos(prevRepos => [...prevRepos, ...data.items]);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchRepos();
    }
  }, [query, page]);

  const fetchMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, [])

  const debouncedSearch = debounce((value: string) => {
    setQuery(value);
    setPage(1);
    setRepos([]);
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  return (
    <div className={styled.container}>
      <SearchInput onChange={handleInputChange} />
      <div className={styled.inner}>
        {repos.map((repo, index) => {
          return <RepoItem
            key={repo.id + index}
            name={repo.full_name}
            desc={repo.description}
            topics={repo.topics}
            license={repo.license?.name}
            lang={repo.language}
            star={repo.stargazers_count}
            url={repo.html_url}
            issue={repo.open_issues_count}
            last={(repos.length > COUNT) && repos.length - 1 === index}
            fetchMore={fetchMore}
          />
        })}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default App;