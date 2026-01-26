import { startLoadingTimer, finishLoading } from "@/js/helpers/loadingTransition.js";

/* If these helpers already exist in your file, keep using yours */
function getDetailIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? decodeURIComponent(id) : "";
}

function findCardById(data, id) {
    if (!id) return null;

    // data structure seems like: { antwerpen: { cards: [] }, mechelen: { cards: [] }, ... }
    for (const region of Object.values(data)) {
        const cards = region?.cards;
        if (!Array.isArray(cards)) continue;

        const match = cards.find(c => String(c.id) === String(id));
        if (match) return match;
    }
    return null;
}

export async function renderDetail() {
    // Ensure we start in loading state (safe even if it's already set in HTML)
    document.body.classList.add("is-loading-detail");

    try {
        const id = getDetailIdFromUrl();

        const res = await fetch("/src/data/vriendenwijken.json");
        if (!res.ok) throw new Error("Failed to load vriendenwijken.json");
        const data = await res.json();

        const defaults = data.defaultDetail ?? {};
        const card = findCardById(data, id);

        const model = {
            title: card?.title ?? defaults.title ?? "Vriendenwijk",
            description: card?.description ?? defaults.description ?? "",
            mapEmbedUrl: card?.mapEmbedUrl ?? defaults.mapEmbedUrl ?? "",
            // add other fields you use in the DOM here if needed
        };

        // ---- populate DOM ----
        const container = document.querySelector(".detail__container");
        if (!container) throw new Error("Missing .detail__container");

        const titleEl = container.querySelector(".detail__title");
        if (titleEl) titleEl.textContent = model.title;

        const descEl = container.querySelector("#description p");
        if (descEl) descEl.textContent = model.description;

        const iframe = container.querySelector("#location iframe");
        if (iframe && model.mapEmbedUrl) iframe.src = model.mapEmbedUrl;

    } catch (err) {
        console.error(err);
    } finally {
        // original behavior: remove loading immediately (no fade)
        document.body.classList.remove("is-loading-detail");
    }
}