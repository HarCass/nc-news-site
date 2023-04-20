import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delCommentById } from "../api";

const DeleteComment = ({author, commentId}) => {
    const {activeUser} = useContext(ActiveUserContext)
    const [isDeleted, setIsDeleted] = useState(false);

    const delhandler = () => {
        delCommentById(commentId)
        .then(() => setIsDeleted(true))
    }
    
    if (isDeleted) return <h3>Comment Deleted</h3>
    return activeUser === author ? <button onClick={delhandler}>Delete Comment</button> : null;
}

export default DeleteComment;