import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PER_PAGE_COUNT, API_URL } from 'constants/api';
import { debounce } from './utils/debounce';

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

interface AppContextValue {
    repos: Repo[];
    loading: boolean;
    error: string | null;
    fetchMore: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }: ReactProps.WithChildren) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}${query}&per_page=${PER_PAGE_COUNT}&page=${page}`);
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
        if (loading) return
        setPage((prevPage) => prevPage + 1);
    }, [loading]);

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
        <AppContext.Provider value={{ repos, loading, error, fetchMore, handleInputChange }}>
            {children}
        </AppContext.Provider>
    );
};