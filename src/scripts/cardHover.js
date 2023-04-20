import anime from "animejs";

export const cardHover = (target) => {
    anime({
        targets: target,
        scale: 1.01,
        duration: 500,
    }, []);
}

export const cardHoverEnd = (target) => {
    anime({
        targets: target,
        scale: 1,
        duration: 500,
    }, []);
}
