import { useEffect } from "react";
import loadingAnimation from "../scripts/loading.js"

const Loading = ()=> {
    useEffect(() => {
        loadingAnimation();
    })

    return <div className="loading">
        <h3>Loading</h3>
        <div className="loading-box"></div>
    </div>
}

export default Loading;