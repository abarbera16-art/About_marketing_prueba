const container = document.getElementById('speakers-container');

async function initApp() {
    try {
        // 🚨 CAMBIO CRÍTICO: Hemos quitado los dos puntos (../) 
        // Prueba con './ponentes.json' o directamente '/ponentes.json' si esto falla
        // Salimos de la carpeta actual, entramos en Datos, y pedimos el archivo speakers.json
        const response = await fetch('../Datos/speakers.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        container.innerHTML = ''; // Limpiamos el texto de "Cargando..."

        // Pintamos cada ponente del JSON
        data.forEach(ponente => {
            const card = createSpeakerCard(ponente);
            container.insertAdjacentHTML('beforeend', card);
        });

    } catch (error) {
        console.error("Error al cargar los ponentes:", error);
        // Ahora si falla, lo veremos escrito en grande en la pantalla
        container.innerHTML = `<h2 style="color: red; text-align: center; background: white; padding: 20px;">Error: No se encuentra el archivo JSON. Revisa la ruta en el fetch().</h2>`;
    }
}

function createSpeakerCard(p) {
    const tagsHTML = p.etiquetas.map(t => `<li class="tag">${t}</li>`).join('');

    return `
        <article class="speaker-card">
            <div class="speaker-visual">
                <img src="${p.imagenFondo}" alt="${p.nombre}" class="aesthetic-img" loading="lazy">
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
                <div class="speaker-socials">
                    <a href="${p.redes.linkedin}" target="_blank" class="social-link">LinkedIn</a>
                    <a href="${p.redes.instagram}" target="_blank" class="social-link">Instagram</a>
                </div>
            </div>
        </article>
    `;
}

initApp();