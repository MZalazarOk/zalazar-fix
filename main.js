// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

window.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.tile');
  const inputImagen = document.getElementById('imageInput');
  const previewContainer = document.getElementById('previewContainer');
  const previewImage = document.getElementById('previewImage');

  botones.forEach(boton => {
    const texto = boton.innerText.split('\n')[1]?.toLowerCase();

    boton.addEventListener('click', () => {
      if (texto === "quitar filtro") {
        inputImagen.click();
      } else {
        alert(`Función "${texto}" aún no está activa`);
      }
    });
  });

  inputImagen.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = function(event) {
        previewImage.src = event.target.result;
        previewContainer.style.display = 'block';
      };
      reader.readAsDataURL(archivo);
    }
  });
});