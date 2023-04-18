import anime from "animejs";

export const topicCardHover = (id) => {
    anime({
        targets: `#topics-item${id}`,
        scale: 1.01,
        duration: 500,
    }, []);
}

export const topicCardHoverEnd = (id) => {
    anime({
        targets: `#topics-item${id}`,
        scale: 1,
        duration: 500,
    }, []);
}
