const DEFAULT_SLIDER_IMAGES = [
    { src: "src/img/laundry-room.jpg", alt: "laundry room" },
    { src: "src/img/parking.jpg", alt: "parking" },
    { src: "src/img/living-room.jpg", alt: "living room" },
    { src: "src/img/coworking.jpg", alt: "coworking space" },
    { src: "src/img/gym.jpg", alt: "gym" },
];

function getDetailIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function findCardById(data, id) {
    if (!id) return null;

    for (const region of Object.values(data)) {
        for (const card of region.cards ?? []) {
            if (card.id === id) return card;
        }
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

        if (id && !card) {
            console.warn(`No card found for id="${id}", falling back to defaultDetail`);
        }

        if (!id) {
            console.warn("No id provided in URL (detail.html?id=...), using defaultDetail");
        }

        // Merge: card overrides defaults
        const model = {
            title: card?.title ?? defaults.title ?? "Vriendenwijk",
            description: card?.description ?? defaults.description ?? "",
            mapEmbedUrl: card?.mapEmbedUrl ?? defaults.mapEmbedUrl ?? "",
            detailsInfoValues: card?.detailsInfoValues ?? defaults.detailsInfoValues ?? ["4", "... - ... m²", "... m²", "... m²", "6", "... m²"],
        };

        // 1) Page <title> + H1 title
        document.title = model.title;

        const titleEl = document.querySelector(".detail__content__title");
        if (titleEl) titleEl.textContent = model.title;

        // 2) Description section (dynamic)
        const descriptionEl = document.querySelector("#description");
        if (descriptionEl) {
            const description =
                model.description ||
                "Een woonvorm waarbij privacy en gemeenschap in balans worden gebracht. Iedere inwoner heeft een eigen volledig uitgeruste privé woonplek en deelt daarnaast heel wat faciliteiten met elkaar. Op deze manier wordt een gemeenschap gecreëerd. Bij Vriendenwijk ligt vriendschap aan het ontstaan.";

            descriptionEl.innerHTML = `<p>${description}</p>`;
        }

        // 3) Slider images (same 5 for all, for now)
        const slider = document.querySelector(".detail__slider .slider");
        if (slider) {
            slider.innerHTML = ""; // remove the hardcoded ones

            DEFAULT_SLIDER_IMAGES.forEach((img, index) => {
                const el = document.createElement("img");
                el.className = `slider__item item-${index + 1}`;
                el.src = img.src;
                el.alt = img.alt;
                slider.appendChild(el);
            });

            // wait until slider images are loaded (or errored) before continuing
            const sliderImgs = Array.from(slider.querySelectorAll("img"));
            await Promise.all(
                sliderImgs.map(img =>
                    img.complete
                        ? Promise.resolve()
                        : new Promise(resolve => {
                            img.addEventListener("load", resolve, { once: true });
                            img.addEventListener("error", resolve, { once: true });
                        })
                )
            );
        }

        // 4) Details info cards
        const detailInfoPs = document.querySelectorAll(".card--details__info p");
        if (detailInfoPs.length) {
            detailInfoPs.forEach((p, i) => {
                p.innerHTML = model.detailsInfoValues[i] ?? p.innerHTML;
            });
        }

        // 5) Location iframe (fallback: keep whatever is in HTML if model has no URL)
        const iframe = document.querySelector("#location iframe");
        if (iframe && model.mapEmbedUrl) {
            iframe.src = model.mapEmbedUrl;
        }
    } finally {
        // Always end loading state (even if id/card is missing or fetch fails)
        document.body.classList.remove("is-loading-detail");
    }
}