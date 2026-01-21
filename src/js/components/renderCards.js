export async function renderCards() {
    const template = document.querySelector("#overview-card-template");

    if (!template) return;

    try {
        const response = await fetch("/src/data/vriendenwijken.json");
        if (!response.ok) throw new Error("Failed to load card data");

        const data = await response.json();

        Object.entries(data).forEach(([regionKey, regionData]) => {
            const container = document.getElementById(`cards-${regionKey}`);
            if (!container) return;

            regionData.cards.forEach(card => {
                const clone = template.content.cloneNode(true);

                clone.querySelector(".card__img").src = card.image;
                clone.querySelector(".card__img").alt = card.alt;
                clone.querySelector(".detail-link-title").textContent = card.title;
                clone.querySelector(".card__link").href = card.link;
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

    } catch (error) {
        console.error("Error rendering cards:", error);
    }
}
