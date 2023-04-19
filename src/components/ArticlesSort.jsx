import useTopics from "../hooks/useTopics";
import formatStrToTitle from "../utils/formatStrToTitle";

const ArticlesSort = ({topic, sortBy, order, searchParams, setSearchParams}) => {
    const {topicsData} = useTopics();

    const setQuery = (event, query) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const newParams = new URLSearchParams(searchParams);
        const newQuery = event.target.value;
        newParams.set(query, newQuery);
        setSearchParams(newParams);
    }

    return <section className="articles-sort" >
        <label htmlFor="order-select">Order</label>
        <select id="order-select" className="articles-select" onChange={ev => setQuery(ev, 'order')}>
            <option>{order ? formatStrToTitle(order) : 'Order'}</option>
            <option value={'desc'}>Desc</option>
            <option value={'asc'}>Asc</option>
        </select>
        <label htmlFor="sort-select">Sort By</label>
        <select id="sort-select" className="articles-select" onChange={ev => setQuery(ev, 'sort_by')}>
            <option>{sortBy ? formatStrToTitle(sortBy) : 'Sort By'}</option>
            <option value={'author'}>Author</option>
            <option value={'created_at'}>Date</option>
            <option value={'comment_count'}>Comments</option>
            <option value={'votes'}>Votes</option>
            <option value={'title'}>Title</option>
            <option value={'topic'}>Topic</option>
        </select>
        <label htmlFor="topic-select">Topic</label>
        <select id="topic-select" className="articles-select" onChange={ev => setQuery(ev, 'topic')}>
            <option>{topic ? formatStrToTitle(topic) : 'Topic'}</option>
            {topicsData.map(({slug}) => <option value={slug} key={slug}>{slug[0].toUpperCase() + slug.slice(1)}</option>)}
            <option value={''}>All</option>
        </select>
        <button onClick={() => setSearchParams('')}>Reset All</button>
    </section>
}

export default ArticlesSort;