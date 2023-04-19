import useTopics from "../hooks/useTopics";

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
        <select className="order-select" onChange={ev => setQuery(ev, 'order')}>
            <option>Order</option>
            <option value={'desc'}>Descending</option>
            <option value={'asc'}>Ascending</option>
        </select>
        <select className="sort-select" onChange={ev => setQuery(ev, 'sort_by')}>
            <option>Sort By</option>
            <option value={'author'}>Author</option>
            <option value={'created_at'}>Date</option>
            <option value={'comment_count'}>Comments</option>
            <option value={'votes'}>Votes</option>
            <option value={'title'}>Title</option>
            <option value={'topic'}>Topic</option>
        </select>
        <select className="topic-select" onChange={ev => setQuery(ev, 'topic')}>
            <option>Topic</option>
            <option value={''}>All</option>
            {topicsData.map(({slug}) => <option value={slug} key={slug}>{slug[0].toUpperCase() + slug.slice(1)}</option>)}
        </select>
        <button onClick={() => setSearchParams('')}>Reset All</button>
    </section>
}

export default ArticlesSort;