export function setProgrammaticScroll(value) {
    // Store the programmatic scroll state in a global variable
    window.programmaticScroll = value;
}

export function isProgrammaticScroll() {
    // Check if the programmatic scroll state is set
    return window.programmaticScroll || false;
}