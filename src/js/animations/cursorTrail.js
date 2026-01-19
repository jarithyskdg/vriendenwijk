import gsap from "gsap";
import { prefersReducedMotion } from "../helpers/reducedMotion";

export function initCursorTrail({
    selector = "svg.cursor-trail",
    total = 100,
    ease = 0.75,
} = {}) {

    // Exit early if device is touch-only or motion should be reduced
    if (
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        prefersReducedMotion()
    ) {
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

    // Hide trail until first real movement
    root.style.opacity = "0";
    let hasMoved = false;

    window.addEventListener("mousemove", (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;

        if (!hasMoved) {
            hasMoved = true;

            // Instantly snap all lines to the cursor on first movement
            const lines = root.querySelectorAll("line");
            lines.forEach((line) => {
                gsap.set(line, {
                    x: pointer.x,
                    y: pointer.y
                });
                line.setAttribute("x2", 0);
                line.setAttribute("y2", 0);
            });

            // Then fade in the SVG
            gsap.to(root, { opacity: 1, duration: 0.2, overwrite: true });
        }
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