/* // script.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
        form.reset();
    });
}); */


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('https://formspree.io/f/xjkegedk', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .finally(() => {
            // Se ejecuta SIEMPRE, tanto si hay "error" como si no
            alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
            form.reset();
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            const images = JSON.parse(button.getAttribute('data-images'));
            const video = button.getAttribute('data-video');

            const modalTitle = this.querySelector('#galleryModalLabel');
            const modalDesc = this.querySelector('#galleryModalDesc');
            const carouselInner = this.querySelector('.carousel-inner');

            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            carouselInner.innerHTML = ''; // Limpiar carrusel

            // Si hay video
            if (video) {
                const videoItem = document.createElement('div');
                videoItem.classList.add('carousel-item', 'active');
                videoItem.innerHTML = `
                    <div class="ratio ratio-16x9">
                        <iframe src="${video}" title="Video" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                carouselInner.appendChild(videoItem);
            }

            // Agregar imágenes
            images.forEach((img, index) => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (index === 0 && !video) item.classList.add('active'); // Primera imagen activa si no hay video
                item.innerHTML = `<img src="${img}" class="img-fluid rounded" alt="Imagen">`;
                carouselInner.appendChild(item);
            });

            // Si no hay contenido
            if (carouselInner.children.length === 0) {
                const item = document.createElement('div');
                item.classList.add('carousel-item', 'active');
                item.textContent = 'No hay imágenes disponibles.';
                carouselInner.appendChild(item);
            }
        });
    }
});


