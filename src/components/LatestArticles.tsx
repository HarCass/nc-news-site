import { useEffect, useRef, useState } from "react";
import useArticles from "../hooks/useArticles";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Nullable } from "vitest";

const LatestArticles = () => {
    const { data: { articles = [] } = {}, isLoading, } = useArticles({ limit: 5 });
    const [slide, setSlide] = useState(0);
    const timeRef = useRef<Nullable<NodeJS.Timeout>>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (articles.length) {
            timeRef.current = setInterval(() => {
                setSlide(currSlide => (currSlide + 1) % articles.length);
            }, 5000)
            return () => clearInterval(timeRef.current as NodeJS.Timeout);
        }
    }, [articles.length]);

    useEffect(() => {
        anime({
            targets: `.slide:nth-child(${slide === 0 ? articles.length : slide})`,
            opacity: 0,
            duration: 1000,
            easing: 'easeInOutQuad',
        });

        anime({
            targets: `.slide:nth-child(${slide + 1})`,
            translateX: '0%',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad',
        });
    }, [slide]);

    return isLoading ? <Loading></Loading> : <div className="carousel">
        {articles.map((article, i) => {
            return <div key={article.article_id} className={`slide ${i === slide ? 'active' : ''}`} onClick={() => navigate(`/articles/${article.article_id}`)}>
                <h3>{article.title}</h3>
                <img src={article.article_img_url} alt={`${article.title} image`}></img>
            </div>
        })}
    </div>
}

export default LatestArticles;