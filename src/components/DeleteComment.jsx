import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delCommentById } from "../api";

const DeleteComment = ({author, commentId, setIsDeleted}) => {
    const {activeUser} = useContext(ActiveUserContext);
    const [isError, setIsError] = useState(null);
    const [hasClicked, setHasClicked] = useState(false);

    const delhandler = () => {
        if (!hasClicked) {
            setHasClicked(true);
            delCommentById(commentId)
            .then(() => {
                setIsDeleted(true);
                setIsError(null);
            })
            .catch(err => {
                setIsError(err);
            });
        }
    }

    return <div className="delete-comment">
        {activeUser === author ? <button disabled={hasClicked} onClick={delhandler}>Delete</button> : null}
        {isError ? <h4>Something Went Wrong With Deletion</h4> : null}
    </div>
}

export default DeleteComment;