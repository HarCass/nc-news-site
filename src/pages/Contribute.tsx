import { FormEvent, useContext, useState } from "react";
import useTopics from "../hooks/useTopics";
import formatStrToTitle from "../utils/formatStrToTitle";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { Link } from "react-router-dom";
import { postArticle } from "../api";
import AddTopic from "../components/AddTopic";
import { Nullable } from "vitest";
import { ApiErrorResponse, ApiError } from "../types";
import { useQueryClient } from "@tanstack/react-query";

const Contribute = () => {
    const client = useQueryClient();
    const { data: topics = [] } = useTopics();
    const { activeUser, isLoggedIn } = useContext(ActiveUserContext)!;
    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [topic, setTopic] = useState('');
    const [body, setBody] = useState('');
    const [hasPosted, setHasPosted] = useState(false);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);
    const [articleId, setArticleId] = useState<Nullable<number>>(null);
    const [isHidden, setIsHidden] = useState(true);

    const postArticleHandler = (event: FormEvent) => {
        event.preventDefault();
        const articleObj = {
            author: activeUser!,
            title,
            body,
            topic,
            article_img_url: imgUrl
        }
        setHasPosted(true);
        postArticle(articleObj)
            .then(article => {
                setArticleId(article.article_id);
                client.invalidateQueries({ queryKey: ['articles'] });
            })
            .catch((err: ApiErrorResponse) => {
                setIsError(err.response);
                setHasPosted(false);
            });
    }

    if (!isLoggedIn) return <div className="contribute-logout" style={{ display: 'grid', placeItems: 'center' }}>
        <h2>Contribute An Article</h2>
        <Link to='/'>Please Login To Contribute</Link>
    </div>

    return <section className="contribute-page">
        <h2>Contribute An article</h2>
        {hasPosted ? <Link to={`/articles/${articleId}`}>Article Posted Successfully, Click Here To View!</Link> : <div className="contribute-post" style={{ display: "grid", placeItems: "center" }}>
            <button onClick={() => setIsHidden(!isHidden)}>{isHidden ? "Don't See An Appropriate Topic? Click Here!" : "Close Topic Form"}</button>
            {isHidden ? null : <AddTopic />}
            <form className="contribute-form" onSubmit={postArticleHandler}>
                <div className="contribute-form-info">
                    <label htmlFor="contribute-title">Title</label>
                    <input id="contribute-title" required value={title} onChange={ev => setTitle(ev.target.value)}></input>
                    <label htmlFor="contribute-img">Image URL</label>
                    <input id="contribute-img" value={imgUrl} onChange={ev => setImgUrl(ev.target.value)}></input>
                    <label htmlFor="contribute-topic" >Topic</label>
                    <select id="contribute-topic" value={topic} onChange={ev => setTopic(ev.target.value)} required>
                        <option value='' disabled>Choose..</option>
                        {topics.map(({ slug }) => <option value={slug} key={slug}>{formatStrToTitle(slug)}</option>)}
                    </select>
                </div>
                <textarea className="contribute-body" placeholder="Article body here..." value={body} onChange={ev => setBody(ev.target.value)} required></textarea>
                <button disabled={hasPosted}>Submit Article</button>
            </form>
            {isError ? <h3>Something Went Wrong, Could Not Post!</h3> : null}
        </div>}
    </section>
}

export default Contribute;