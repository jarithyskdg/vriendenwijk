import { startLoadingTimer, finishLoading } from "@/js/helpers/loadingTransition.js";

export async function renderCards() {
    const template = document.querySelector("#overview-card-template");
    if (!template) return;

    document.body.classList.add("is-loading-overview");
    startLoadingTimer();

    try {
        const response = await fetch("/src/data/vriendenwijken.json");
        if (!response.ok) throw new Error("Failed to load card data");

        const data = await response.json();

        const createdImgs = [];
        const skeletonFadeMs = 280; // keep in sync with _overview-skeleton.scss

        Object.entries(data).forEach(([regionKey, regionData]) => {
            const container = document.getElementById(`cards-${regionKey}`);
            if (!container || !regionData?.cards) return;

            // Keep existing skeletons for now (so they can fade out).
            // Just remove any previous real cards if this can run multiple times.
            container.querySelectorAll(".card--overview").forEach(el => el.remove());

            // Build cards in a fragment
            const frag = document.createDocumentFragment();

            regionData.cards.forEach(card => {
                const clone = template.content.cloneNode(true);

                const imgEl = clone.querySelector(".card__img");
                imgEl.src = card.image;
                imgEl.alt = card.alt;
                createdImgs.push(imgEl);

                clone.querySelector(".detail-link-title").textContent = card.title;
                clone.querySelector(".card__link").href = `detail.html?id=${encodeURIComponent(card.id)}`;
                clone.querySelector(".card__address").innerHTML = `<strong>Adres:</strong> ${card.address}`;

                const featuresList = clone.querySelector(".card__features");
                card.features.forEach(feature => {
                    const li = document.createElement("li");
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });

                frag.appendChild(clone);
            });

            container.appendChild(frag);
        });

        // Wait for images so layout doesn't shift during the fade
        await Promise.all(
            createdImgs.map(img =>
                img.complete
                    ? Promise.resolve()
                    : new Promise(resolve => {
                        img.addEventListener("load", resolve, { once: true });
                        img.addEventListener("error", resolve, { once: true });
                    })
            )
        );

        // Remove loading class with minimum duration (enables CSS cross-fade)
        finishLoading("is-loading-overview", 350);

        // After the fade-out completes, remove skeleton nodes from DOM (cleanup)
        window.setTimeout(() => {
            document.querySelectorAll(".overview-skeleton__card, .divider-skeleton").forEach(el => el.remove());
        }, Math.max(350, skeletonFadeMs) + 50);

    } catch (err) {
        console.error(err);
        // If it fails, at least stop loading so user isn't stuck
        finishLoading("is-loading-overview", 350);
    }
}