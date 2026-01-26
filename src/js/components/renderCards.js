import { startLoadingTimer, finishLoading } from "@/js/helpers/loadingTransition.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

            container.querySelectorAll(".card--overview").forEach(el => el.remove());

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

        // Wait until loading class is actually removed (so layout reflects final visibility)
        await finishLoading("is-loading-overview", 350);

        // Wait for the fade to complete, then remove skeleton nodes
        await new Promise(resolve => {
            window.setTimeout(() => {
                document
                    .querySelectorAll(".overview-skeleton__header, .overview-skeleton__card, .divider-skeleton")
                    .forEach(el => el.remove());
                resolve();
            }, skeletonFadeMs + 50);
        });

        // Now that DOM/layout is final, refresh ScrollTrigger measurements
        ScrollTrigger.refresh();

    } catch (err) {
        console.error(err);
        await finishLoading("is-loading-overview", 350);
        ScrollTrigger.refresh();
    }
}