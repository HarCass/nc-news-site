import anime from "animejs";

export const articleCardHover = (id) => {
    anime({
        targets: `#articles-item${id}`,
        scale: 1.01,
        duration: 500,
    }, []);
}

export const articleCardHoverEnd = (id) => {
    anime({
        targets: `#articles-item${id}`,
        scale: 1,
        duration: 500,
    }, []);
}
