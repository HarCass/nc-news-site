import anime from "animejs";

const loadingAnimation = () => {
    anime({
        targets: ".loading-box",
        translateX: 100,
        rotateZ: 360,
        scale: 2,
        duration: 1000,
        loop: true
    });
}

export default loadingAnimation;