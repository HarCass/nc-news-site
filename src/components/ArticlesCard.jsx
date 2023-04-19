import { useNavigate } from "react-router-dom";
import { articleCardHover, articleCardHoverEnd } from "../scripts/articleCardHover";
import formatDate from "../utils/formatDate";
import formatStrToTitle from "../utils/formatStrToTitle";

const ArticlesCard = ({ article }) => {
    const navigate = useNavigate();

    const goToArticleHandler = (id) => {
        navigate(`/articles/${id}`);
    }

    return <li className="articles-item" id={`articles-item${article.article_id}`} tabIndex="0" onClick={ () => goToArticleHandler(article.article_id)} onKeyDown={(event) => {
        if (event.key === 'Enter') goToArticleHandler(article.article_id);
    }} onMouseEnter={ () => articleCardHover(article.article_id)} onMouseLeave={() => articleCardHoverEnd(article.article_id)}>
        <img src={article.article_img_url} alt={`${article.title} image`}></img>
        <h3>{article.title}</h3>
        <p>{formatStrToTitle(article.topic)}</p>
        <p className="date">Posted: {formatDate(article.created_at)}</p>
    </li>
}

export default ArticlesCard;