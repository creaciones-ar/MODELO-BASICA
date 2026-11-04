/* Ventana del alias: abrir, copiar y cerrar */
document.addEventListener("DOMContentLoaded", function () {
    const aliasModal = document.getElementById("alias-modal");
    const aliasOpen = document.getElementById("alias-open");
    const aliasCopy = document.getElementById("alias-copy");
    if (!aliasModal || !aliasOpen || !aliasCopy) return;

    aliasOpen.addEventListener("click", function () { aliasModal.showModal(); });
    document.getElementById("alias-close").addEventListener("click", function () { aliasModal.close(); });
    aliasModal.addEventListener("click", function (e) {
        const r = aliasModal.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) aliasModal.close();
    });

    aliasCopy.addEventListener("click", async function () {
        const alias = document.getElementById("alias-text").textContent.trim();
        let ok = false;
        try { await navigator.clipboard.writeText(alias); ok = true; }
        catch (err) {
            const t = document.createElement("textarea");
            t.value = alias; t.style.position = "fixed"; t.style.opacity = "0";
            aliasModal.appendChild(t); t.select();
            try { ok = document.execCommand("copy"); } catch (_) {}
            t.remove();
        }
        aliasCopy.textContent = ok ? "¡Copiado!" : "Copialo a mano";
        aliasCopy.classList.toggle("copiado", ok);
        setTimeout(function () { aliasCopy.textContent = "Copiar alias"; aliasCopy.classList.remove("copiado"); }, 2000);
    });
});
