if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

window.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.tile');
  const inputImagen = document.getElementById('imageInput');
  const previewContainer = document.getElementById('previewContainer');
  const previewImage = document.getElementById('previewImage');
  const resultContainer = document.getElementById('resultContainer');
  const resultCanvas = document.getElementById('resultCanvas');
  const downloadBtn = document.getElementById('downloadBtn');

  botones.forEach(boton => {
    const textoCrudo = boton.innerText.split('\n');
    const texto = textoCrudo[1] ? textoCrudo[1].trim().toLowerCase() : '';

    boton.addEventListener('click', () => {
      if (texto === "quitar filtro") {
        inputImagen.click();
      } else if (texto) {
        alert(`Función "${texto}" aún no está activa`);
      } else {
        alert(`Este botón aún no está configurado`);
      }
    });
  });

  inputImagen.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function () {
          previewImage.src = img.src;
          previewContainer.style.display = 'block';

          // Procesamiento: simular quitar filtro
          resultCanvas.width = img.width;
          resultCanvas.height = img.height;
          const ctx = resultCanvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const avg = (r + g + b) / 3;
            data[i]     = r * 0.7 + avg * 0.3;
            data[i + 1] = g * 0.7 + avg * 0.3;
            data[i + 2] = b * 0.7 + avg * 0.3;
          }

          ctx.putImageData(imageData, 0, 0);
          resultContainer.style.display = 'block';
          downloadBtn.href = resultCanvas.toDataURL('image/png');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(archivo);
    }
  });
});