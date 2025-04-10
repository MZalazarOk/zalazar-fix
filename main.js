import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>Fixora</h1>
  <p class="subtitle">Edición inteligente para tus fotos</p>
`;

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

// Lógica de botones
const botones = document.querySelectorAll('.tile');
botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const texto = boton.innerText.trim();
    if (texto.includes('Quitar filtro')) {
      aplicarFiltro();
    } else {
      alert(`Función "${texto}" aún no está activa`);
    }
  });
});

const inputImagen = document.getElementById('imageInput');
const previewImg = document.getElementById('previewImage');
const resultCanvas = document.getElementById('resultCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const ctx = resultCanvas.getContext('2d');

inputImagen.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImg.src = event.target.result;
    previewImg.onload = () => {
      resultCanvas.width = previewImg.width;
      resultCanvas.height = previewImg.height;
      ctx.drawImage(previewImg, 0, 0);
    };
  };
  reader.readAsDataURL(file);
});

function aplicarFiltro() {
  if (!previewImg.src) {
    alert('Primero subí una imagen.');
    return;
  }

  resultCanvas.width = previewImg.width;
  resultCanvas.height = previewImg.height;
  ctx.drawImage(previewImg, 0, 0);

  let imageData = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
  let data = imageData.data;

  // Simulación de quitar filtros: ajuste de color
  for (let i = 0; i < data.length; i += 4) {
    // Promedio para desaturar colores
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i]     = avg + 10; // rojo
    data[i + 1] = avg + 10; // verde
    data[i + 2] = avg + 10; // azul
  }

  ctx.putImageData(imageData, 0, 0);

  // Actualizar enlace de descarga
  downloadBtn.href = resultCanvas.toDataURL('image/png');
}