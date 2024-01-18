import { useNavigate } from "react-router-dom";
import { cardHover, cardHoverEnd } from "../scripts/cardHover";
import formatStrToTitle from "../utils/formatStrToTitle";
import { FC } from "react";
import { TopicsCardProps } from "../types";

const TopicsCard: FC<TopicsCardProps> = ({ topic }) => {
    const navigate = useNavigate();

    const goToTopicHandler = () => {
        navigate(`/articles?topic=${topic.slug}`);
    }

    return <li className="topics-item" id={`topics-item${topic.slug}`} tabIndex={0} onClick={() => goToTopicHandler()} onKeyDown={(event) => {
        if (event.key === 'Enter') goToTopicHandler();
    }} onMouseEnter={() => cardHover(`#topics-item${topic.slug}`)} onMouseLeave={() => cardHoverEnd(`#topics-item${topic.slug}`)} >
        <h3>{formatStrToTitle(topic.slug)}</h3>
        <p>{topic.description}</p>
    </li>
}

export default TopicsCard;