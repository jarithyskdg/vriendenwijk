export async function renderCards() {
    const template = document.querySelector("#overview-card-template");
    if (!template) return;

    // start loading state (safe even if already in HTML)
    document.body.classList.add("is-loading-overview");

    try {
        const response = await fetch("/src/data/vriendenwijken.json");
        if (!response.ok) throw new Error("Failed to load card data");

        const data = await response.json();

        // collect created <img> so we can wait for them
        const createdImgs = [];

        Object.entries(data).forEach(([regionKey, regionData]) => {
            // If you later add e.g. defaultDetail at top-level, it won't have a cards container.
            const container = document.getElementById(`cards-${regionKey}`);
            if (!container || !regionData?.cards) return;

            // remove skeleton content
            container.innerHTML = "";

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

                container.appendChild(clone);
            });
        });

        // OPTIONAL: wait for all card images to load before showing the real cards
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
    } catch (err) {
        console.error(err);
    } finally {
        document.body.classList.remove("is-loading-overview");
    }
}