import { FC, useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { delCommentById } from "../api";
import { ApiError, ApiErrorResponse, DeleteCommentProps } from "../types";
import { Nullable } from "vitest";
import { useQueryClient } from "@tanstack/react-query";

const DeleteComment: FC<DeleteCommentProps> = ({ author, commentId, setIsDeleted }) => {
    const client = useQueryClient();
    const { activeUser } = useContext(ActiveUserContext)!;
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);
    const [hasClicked, setHasClicked] = useState(false);

    const delhandler = () => {
        if (!hasClicked) {
            setHasClicked(true);
            delCommentById(commentId)
                .then(() => {
                    setIsDeleted(true);
                    setIsError(null);
                    client.invalidateQueries({
                        queryKey: ['comments'],
                        refetchType: 'inactive'
                    })
                })
                .catch((err: ApiErrorResponse) => {
                    setIsError(err.response);
                    setHasClicked(false);
                });
        }
    }

    return <div className="delete-comment">
        {activeUser === author ? <button disabled={hasClicked} onClick={delhandler}>Delete</button> : null}
        {isError ? <h4>Something Went Wrong With Deletion</h4> : null}
    </div>
}

export default DeleteComment;