import { ChangeEvent, FC } from "react";
import useTopics from "../hooks/useTopics";
import formatStrToTitle from "../utils/formatStrToTitle";
import { ArticlesSortProps } from "../types";

const ArticlesSort: FC<ArticlesSortProps> = ({topic, sortBy, order, searchParams, setSearchParams}) => {
    const {topicsData} = useTopics();

    const setQuery = (event: ChangeEvent<HTMLSelectElement>, query: string) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const newParams = new URLSearchParams(searchParams);
        const newQuery = event.target.value;
        newParams.set(query, newQuery);
        setSearchParams(newParams);
    }

    return <section className="articles-sort" >
        <label htmlFor="order-select">Order</label>
        <select id="order-select" className="articles-select" defaultValue={order || 'desc'} onChange={ev => setQuery(ev, 'order')}>
            <option value={'desc'}>Desc</option>
            <option value={'asc'}>Asc</option>
        </select>
        <label htmlFor="sort-select">Sort By</label>
        <select id="sort-select" className="articles-select" defaultValue={sortBy || 'created_at'} onChange={ev => setQuery(ev, 'sort_by')}>
            <option value={'author'}>Author</option>
            <option value={'created_at'}>Date</option>
            <option value={'comment_count'}>Comments</option>
            <option value={'votes'}>Votes</option>
            <option value={'title'}>Title</option>
            <option value={'topic'}>Topic</option>
        </select>
        <label htmlFor="topic-select">Topic</label>
        <select id="topic-select" className="articles-select" value={topic || ''} onChange={ev => setQuery(ev, 'topic')}>
            {topicsData.map(({slug}) => <option value={slug} key={slug}>{formatStrToTitle(slug)}</option>)}
            <option value={''}>All</option>
        </select>
        <button onClick={() => setSearchParams('')}>Reset All</button>
    </section>
}

export default ArticlesSort;