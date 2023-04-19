import { useNavigate } from "react-router-dom";
import { topicCardHover, topicCardHoverEnd } from "../scripts/topicCardHover";
import formatStrToTitle from "../utils/formatStrToTitle";

const TopicsCard = ({topic}) => {
    const navigate = useNavigate();

    const goToTopicHandler = () => {
        navigate(`/articles?topic=${topic.slug}`);
    }

    return <li className="topics-item" id={`topics-item${topic.slug}`} tabIndex="0" onClick={ () => goToTopicHandler(topic.slug)} onKeyDown={(event) => {
        if (event.key === 'Enter') goToTopicHandler(topic.slug);
    }} onMouseEnter={ () => topicCardHover(topic.slug)} onMouseLeave={() => topicCardHoverEnd(topic.slug)} >
        <h3>{formatStrToTitle(topic.slug)}</h3>
        <p>{topic.description}</p>
    </li>
}

export default TopicsCard;