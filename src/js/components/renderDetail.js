import { startLoadingTimer, finishLoading } from "@/js/helpers/loadingTransition.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function isValidSliderImage(img) {
    if (!img) return false;
    if (typeof img === "string") return img.trim().length > 0;
    if (typeof img === "object") return typeof img.src === "string" && img.src.trim().length > 0;
    return false;
}

export async function renderDetail() {
    startLoadingTimer();
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
            sliderImages: card?.sliderImages ?? defaults.sliderImages ?? [],
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

        // ---- populate slider images (from JSON) ----
        const slider = container.querySelector(".slider");
        if (slider && Array.isArray(model.sliderImages) && model.sliderImages.some(isValidSliderImage)) {
            slider.innerHTML = "";

            model.sliderImages
                .filter(isValidSliderImage)
                .forEach((img, idx) => {
                    const src = typeof img === "string" ? img : img.src;
                    const alt = typeof img === "string" ? "" : (img.alt ?? "");

                    const el = document.createElement("img");
                    el.className = `slider__item item-${idx + 1}`;
                    el.src = src;
                    el.alt = alt;
                    slider.appendChild(el);
                });
        }

        // Remove loading class with fade timing
        await finishLoading("is-loading-detail", 350);

        // Now that layout is final, refresh ScrollTrigger measurements
        ScrollTrigger.refresh();

    } catch (err) {
        console.error(err);
        await finishLoading("is-loading-detail", 350);
        ScrollTrigger.refresh();
    }
}