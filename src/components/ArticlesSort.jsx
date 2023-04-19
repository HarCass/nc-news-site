import formatProperties from "../utils/formatProperties";

const ArticlesSort = () => {
    return <section className="articles-sort" >
        <select>
            <option value={''}>Order</option>
            <option value={'ASC'}>Ascending</option>
            <option value={'DESC'}>Descending</option>
        </select>
        <select>
            <option value={''}>Sort By</option>
            <option value={'title'}>Title</option>
            <option value={'topic'}>Topic</option>
        </select>
        <select>
            <option>topic</option>
        </select>
    </section>
}

export default ArticlesSort;