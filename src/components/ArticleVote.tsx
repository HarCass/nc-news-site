import { FC, useState } from "react";
import { patchArticleById } from "../api";
import { ApiError, ApiErrorResponse, ArticleVoteProps } from "../types";
import { Nullable } from "vitest";

const ArticleVote: FC<ArticleVoteProps> = ({articleData}) => {
    const article_id = articleData.article_id;
    const upvoteStorage = `upvoted${article_id}`;
    const downvoteStorage = `downvoted${article_id}`;
    const [hasUpvoted, setHasUpvoted] = useState(Boolean(localStorage.getItem(upvoteStorage)));
    const [hasDownvoted, setHasDownvoted] = useState(Boolean(localStorage.getItem(downvoteStorage)));
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    const voteHandler = (vote: number) => {
        if (hasUpvoted || hasDownvoted) vote *= 2;
        const voteObj = {inc_votes: vote};
        articleData.votes += vote;
        if (vote < 0) {
            localStorage.setItem(downvoteStorage, 'true');
            localStorage.removeItem(upvoteStorage);
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            patchArticleById(article_id, voteObj)
            .then(() => setIsError(null))
            .catch((err: ApiErrorResponse) => {
                setIsError(err.response);
                localStorage.removeItem(downvoteStorage);
                setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
                articleData.votes -= vote;
            });
        } else {
            localStorage.setItem(upvoteStorage, 'true');
            localStorage.removeItem(downvoteStorage);
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            patchArticleById(article_id, voteObj)
            .then(() => setIsError(null))
            .catch((err: ApiErrorResponse) => {
                setIsError(err.response);
                localStorage.removeItem(upvoteStorage);
                setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
                articleData.votes -= vote;
            });
        }
    }

    return <div className="article-votes">
        <p style={{color: articleData.votes > -1 ? 'green' : 'red'}}>{articleData.votes} {articleData.votes > -1 ? <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>}</p>
        <button className="upvote" onClick={() => voteHandler(1)} disabled={hasUpvoted}>Upvote</button>
        <button className="downvote" onClick={() => voteHandler(-1)} disabled={hasDownvoted}>Downvote</button>
        {isError ? <h4 style={{color: 'black'}}>Something Went Wrong With Your Vote!</h4> : null}
    </div>
}

export default ArticleVote;