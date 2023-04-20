import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delCommentById } from "../api";

const DeleteComment = ({author, commentId}) => {
    const {activeUser} = useContext(ActiveUserContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isError, setIsError] = useState(false);

    const delhandler = () => {
        delCommentById(commentId)
        .then(() => {
            setIsDeleted(true);
            setIsError(false);
        })
        .catch(err => {
            setIsError(err);
        });
    }
    
    if (isDeleted) return <h3>Comment Deleted</h3>
    return <div className="delete-comment">
        {activeUser === author ? <button onClick={delhandler}>Delete Comment</button> : null}
        {isError ? <h4>Something Went Wrong With Deletion</h4> : null}
    </div>
}

export default DeleteComment;