import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Comments from "./Comments";
import useArticle from "../hooks/useArticle";
import formatDate from "../utils/formatDate";
import formatStrToTitle from "../utils/formatStrToTitle";
import ArticleVote from "./ArticleVote";

const Article = () => {
    const {article_id} = useParams();
    const {articleData, isLoading, isError} = useArticle(article_id);
    
    return isError ? <h2>{`${isError.status}: ${isError.data.msg}`}</h2> : isLoading ? <Loading></Loading> : <section className="article-page">
            <img src={articleData.article_img_url} alt={`${articleData.title} image`}></img>
            <h2>{articleData.title}</h2>
            <p className="article-author">By {articleData.author}</p>
            <Link to={`/articles?topic=${articleData.topic}`}>{formatStrToTitle(articleData.topic)}</Link>
            <article>{articleData.body}</article>
            <p className="date"> Posted: {formatDate(articleData.created_at)}</p>
            <ArticleVote articleData={articleData}></ArticleVote>
            <Comments articleId={article_id} />
        </section>
}

export default Article;