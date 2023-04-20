
const PageButtons = ({page, totalPages, searchParams, setSearchParams}) => {
    const nextPageHandler = (direction) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const newParams = new URLSearchParams(searchParams);
        const newPage = page ? Number(page) + direction : 2;
        newParams.set('p', newPage);
        setSearchParams(newParams);
    }

    return <div className="page-buttons">
        <button onClick={() => nextPageHandler(-1)} disabled={page <= 1}>Prev Page</button>
        <p className="page-count">{page || 1}/{totalPages}</p>
        <button onClick={() => nextPageHandler(1)} disabled={page == totalPages}>Next Page</button>
    </div>
}

export default PageButtons;