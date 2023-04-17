import { useEffect, useState } from "react";

const Articles = () => {
    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {

    }, []);

    return <section className="articles-page">
        <h2>Articles</h2>
        <ul className="articles-list">

        </ul>
    </section>
}

export default Articles;
