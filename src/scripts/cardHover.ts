import anime from "animejs";

export const cardHover = (target: string) => {
    anime({
        targets: target,
        scale: 1.01,
        duration: 500,
    });
}

export const cardHoverEnd = (target: string) => {
    anime({
        targets: target,
        scale: 1,
        duration: 500,
    });
}
