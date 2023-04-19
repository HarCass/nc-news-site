const ArticlesSort = (article) => {
    return <section className="articles-sort" >
        <select>
            <option value={''}>Order</option>
            <option value={'ASC'}>Ascending</option>
            <option value={'DESC'}>Descending</option>
        </select>
        <select>
            <option value={''}>Sort By</option>
        </select>
    </section>
}