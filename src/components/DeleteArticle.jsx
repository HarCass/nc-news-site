import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delArticleById } from "../api";

const DeleteArticle = ({ author, articleId, setIsDeleted }) => {
    const { activeUser } = useContext(ActiveUserContext);
    const [ isError, setIsError ] = useState(null);
    const [ hasClicked , setHasClicked ] = useState(false);
    const [delConfirm, setDelConfirm] = useState('none');

    const onClickHandler = () => {
        setDelConfirm('flex');
        setHasClicked(true);
    }

    const delhandler = (confirm) => {
        setDelConfirm('none');
        if (confirm) {
            delArticleById(articleId)
            .then(() => setIsDeleted(true))
            .catch(err => {
                setIsError(err);
                setHasClicked(false);
            });
        } else {
            setHasClicked(false);
        }
    }

    return <div className="delete-article">
        {activeUser === author ? <button onClick={onClickHandler} disabled={hasClicked}>Delete</button> : null}
        {isError ? <h4>Something Went Wrong With Deletion!</h4> : null}
        <div id="articleDelConfirm" className="modal" style={{display: delConfirm}}>
            <div className="modal-content">
                <h4>Are You Sure You Wish To Delete?</h4>
                <h4>This Action Cannot Be Undone!</h4>
                <button onClick={ () => delhandler(1)}>Confirm</button>
                <button onClick={() => delhandler(0)}>Cancel</button>
            </div>
        </div>
    </div>
}

export default DeleteArticle;