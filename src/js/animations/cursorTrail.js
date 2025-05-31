import gsap from "gsap";

export function initCursorTrail({
    selector = "svg.cursor-trail",
    total = 100,
    ease = 0.75,
} = {}) {
    // Exit early if device is touch-only
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    gsap.defaults({ ease: "none" });

    const svgns = "http://www.w3.org/2000/svg";
    const root = document.querySelector(selector);
    if (!root) {
        console.warn(`Cursor trail SVG not found for selector: ${selector}`);
        return;
    }

    const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };

    window.addEventListener("mousemove", (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    });

    let leader = pointer;

    for (let i = 0; i < total; i++) {
        leader = createLine(leader, i);
    }

    function createLine(leader, i) {
        const line = document.createElementNS(svgns, "line");
        root.appendChild(line);

        gsap.set(line, { x: -15, y: -15, alpha: (total - i) / total });

        gsap.to(line, {
            duration: 1000,
            x: "+=1",
            y: "+=1",
            repeat: -1,
            modifiers: {
                x() {
                    const posX = gsap.getProperty(line, "x");
                    const leaderX = gsap.getProperty(leader, "x");
                    const x = posX + (leaderX - posX) * ease;
                    line.setAttribute("x2", leaderX - x);
                    return x;
                },
                y() {
                    const posY = gsap.getProperty(line, "y");
                    const leaderY = gsap.getProperty(leader, "y");
                    const y = posY + (leaderY - posY) * ease;
                    line.setAttribute("y2", leaderY - y);
                    return y;
                },
            },
        });

        return line;
    }
}
