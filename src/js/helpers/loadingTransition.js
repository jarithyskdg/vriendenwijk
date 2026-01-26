export function startLoadingTimer() {
    document.body.dataset.loadingStart = String(Date.now());
}

export function finishLoading(className, minMs = 350) {
    const startedAt = Number(document.body.dataset.loadingStart || Date.now());
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, minMs - elapsed);

    return new Promise(resolve => {
        window.setTimeout(() => {
            document.body.classList.remove(className);
            resolve();
        }, remaining);
    });
}