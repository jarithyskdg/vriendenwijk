export function getMenuWidth() {
    const width = window.innerWidth;

    if (width >= 1200) {
        // desktop breakpoint matches your SCSS desktop min-width 1024px
        return "40%";
    }
    if (width >= 768) {
        // tablet breakpoint matches your SCSS tablet min-width 768px
        return "60%";
    }
    // mobile default
    return "90%";
}

// If you want, you can add more generic breakpoint helpers, for example:

export function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width >= 1200) return "desktop";
    if (width >= 768) return "tablet";
    return "mobile";
}
