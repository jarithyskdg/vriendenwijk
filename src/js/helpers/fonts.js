export const waitForFonts = async () => {
    if (document.fonts && document.fonts.ready) {
        try {
            await document.fonts.ready;
            console.log("All fonts are loaded.");
        } catch (e) {
            console.warn("Font loading failed:", e);
        }
    }
}