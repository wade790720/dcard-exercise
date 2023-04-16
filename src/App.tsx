import { lazy, Suspense } from 'react';
import Input from 'components/Input';
import { PER_PAGE_COUNT } from 'constants/api';
import { useAppContext } from './AppContext';
import styled from "./App.module.scss"

const RepoItem = lazy(() => import('./components/ReposItem'));

const App = () => {
  const { repos, loading, error, fetchMore, handleInputChange } = useAppContext();

  return (
    <div className={styled.container}>
      <Input onChange={handleInputChange} />
      <div className={styled.inner}>
        <Suspense fallback={<div>Loading...</div>}>
          {repos.map((repo, index) => {
            return (
              <RepoItem
                key={repo.id + index}
                name={repo.full_name}
                desc={repo.description}
                topics={repo.topics}
                license={repo.license?.name}
                lang={repo.language}
                star={repo.stargazers_count}
                url={repo.html_url}
                issue={repo.open_issues_count}
                last={(repos.length >= PER_PAGE_COUNT) && repos.length - 1 === index}
                fetchMore={fetchMore}
              />
            )
          })}
        </Suspense>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default App;