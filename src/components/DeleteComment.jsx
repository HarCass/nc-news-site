import { useContext } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";

const DeleteComment = ({author}) => {
    const {activeUser} = useContext(ActiveUserContext)
    
    return activeUser === author ? <button>Delete Comment</button> : null;
}

export default DeleteComment;