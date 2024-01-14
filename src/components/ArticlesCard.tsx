import { useNavigate } from "react-router-dom";
import { cardHover, cardHoverEnd } from "../scripts/cardHover";
import formatDate from "../utils/formatDate";
import formatStrToTitle from "../utils/formatStrToTitle";
import { FC } from "react";
import { ArticlesCardProps } from "../types";

const ArticlesCard: FC<ArticlesCardProps> = ({ article }) => {
    const navigate = useNavigate();

    const goToArticleHandler = (id: number) => {
        navigate(`/articles/${id}`);
    }

    return <li className="articles-item" id={`articles-item${article.article_id}`} tabIndex={0} onClick={ () => goToArticleHandler(article.article_id)} onKeyDown={(event) => {
        if (event.key === 'Enter') goToArticleHandler(article.article_id);
    }} onMouseEnter={ () => cardHover(`#articles-item${article.article_id}`)} onMouseLeave={() => cardHoverEnd(`#articles-item${article.article_id}`)}>
        <img src={article.article_img_url} alt={`${article.title} image`}></img>
        <h3>{article.title}</h3>
        <p>By {article.author}</p>
        <p>{formatStrToTitle(article.topic)}</p>
        <div className="articles-stats">
            <p>{article.comment_count} <i className="fa fa-comments-o" aria-hidden="true"></i></p>
            <p style={{color: article.votes > -1 ? 'green' : 'red'}}>{article.votes} {article.votes > -1 ? <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>}</p>
        </div>
        <p className="date">Posted: {formatDate(article.created_at)}</p>
    </li>
}

export default ArticlesCard;