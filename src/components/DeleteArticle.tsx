import { FC, useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delArticleById } from "../api";
import { ApiError, ApiErrorResponse, DelteArticleProps } from "../types";
import { Nullable } from "vitest";
import { useQueryClient } from "@tanstack/react-query";

const DeleteArticle: FC<DelteArticleProps> = ({ author, articleId, setIsDeleted }) => {
    const client = useQueryClient();
    const { activeUser } = useContext(ActiveUserContext)!;
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);
    const [hasClicked, setHasClicked] = useState(false);
    const [delConfirm, setDelConfirm] = useState<'none' | 'flex'>('none');

    const onClickHandler = () => {
        setDelConfirm('flex');
        setHasClicked(true);
    }

    const delhandler = (confirm: boolean) => {
        setDelConfirm('none');
        if (confirm) {
            delArticleById(articleId)
                .then(() => {
                    setIsDeleted(true);
                    client.invalidateQueries({
                        queryKey: ['articles']
                    });
                })
                .catch((err: ApiErrorResponse) => {
                    setIsError(err.response);
                    setHasClicked(false);
                });
        } else {
            setHasClicked(false);
        }
    }

    return <div className="delete-article">
        {activeUser === author ? <button onClick={onClickHandler} disabled={hasClicked}>Delete</button> : null}
        {isError ? <h4>Something Went Wrong With Deletion!</h4> : null}
        <div id="articleDelConfirm" className="modal" style={{ display: delConfirm }}>
            <div className="modal-content">
                <h4>Are You Sure You Wish To Delete?</h4>
                <h4>This Action Cannot Be Undone!</h4>
                <button onClick={() => delhandler(true)}>Confirm</button>
                <button onClick={() => delhandler(false)}>Cancel</button>
            </div>
        </div>
    </div>
}

export default DeleteArticle;