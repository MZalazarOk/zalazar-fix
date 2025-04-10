
import './style.css';

const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const resultCanvas = document.getElementById('resultCanvas');
const downloadBtn = document.getElementById('downloadBtn');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    processImage(e.target.result);
  };
  reader.readAsDataURL(file);
});

function processImage(imageSrc) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const canvas = resultCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibujar imagen
    ctx.drawImage(img, 0, 0);

    // Sacar filtro: ajustar brillo, contraste, saturación, etc.
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Algoritmo simple de desaturación y corrección de contraste
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

      // Promedio con peso y normalización para quitar tintes
      data[i]     = avg + (data[i] - avg) * 0.3; // R
      data[i + 1] = avg + (data[i + 1] - avg) * 0.3; // G
      data[i + 2] = avg + (data[i + 2] - avg) * 0.3; // B
    }

    ctx.putImageData(imageData, 0, 0);

    // Preparar botón de descarga
    const dataURL = canvas.toDataURL('image/png');
    downloadBtn.href = dataURL;
    downloadBtn.download = 'fixora-result.png';
  };
  img.src = imageSrc;
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
