const container = document.getElementById('speakers-container');

async function initApp() {
    try {
        const cacheBuster = "?t=" + new Date().getTime();
        const response = await fetch('../Datos/speakers.json' + cacheBuster);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        container.innerHTML = ''; 

        data.forEach(ponente => {
            const card = createSpeakerCard(ponente);
            container.insertAdjacentHTML('beforeend', card);
        });

    } catch (error) {
        console.error("Error al cargar los ponentes:", error);
        container.innerHTML = `<h2 style="color: red; text-align: center;">Error: No se encuentra el JSON.</h2>`;
    }
}

function createSpeakerCard(p) {
    // 1. Escudo para las etiquetas (si no hay, creamos un array vacío)
    const etiquetas = p.etiquetas || [];
    const tagsHTML = etiquetas.map(t => `<li class="tag">${t}</li>`).join('');

    // 2. ESCUDO MÁXIMO PARA REDES (Optional Chaining ?.)
    // El símbolo "?." le dice a JS: "Si existe redes, busca linkedin. Si no existe, no des error, pon un #"
    const linkedin = p.redes?.linkedin || '#';
    const instagram = p.redes?.instagram || '#';
    const mostrarRedes = p.redes ? 'block' : 'none';

    return `
        <article class="speaker-card">
            <div class="speaker-visual">
                <img src="${p.imagenFondo}" alt="${p.nombre}" class="aesthetic-img" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Error+de+Imagen'">
            </div>

            <div class="speaker-video">
                <div class="phone-mockup-container">
                    <video autoplay loop muted playsinline controls class="vertical-video mockup-video video-ponente">
                        <source src="${p.video}" type="video/mp4">
                    </video>
                    <img src="../Imagenes/depositphotos_166282680-stock-photo-new-modern-frameless-smartphone-mockup-removebg-preview.png" class="phone-frame" alt="Móvil">
                </div>
            </div>

            <div class="speaker-info">
                <h3 class="speaker-name">${p.nombre}</h3>
                <p class="speaker-role">${p.rol}</p>
                <ul class="speaker-tags">${tagsHTML}</ul>
                <p class="speaker-bio">${p.bio}</p>
                <div class="speaker-socials" style="display: ${mostrarRedes};">
                    <a href="${linkedin}" target="_blank" class="social-link">LinkedIn</a>
                    <a href="${instagram}" target="_blank" class="social-link">Instagram</a>
                </div>
            </div>
        </article>
    `;
}

initApp();
