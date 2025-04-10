import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>Fixora</h1>
  <p>Aplicación para quitar filtros de fotos.</p>
`;

const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const resultCanvas = document.getElementById('resultCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const quitarFiltroBtn = document.querySelectorAll('.tile')[0];

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    previewImage.onload = () => {
      const ctx = resultCanvas.getContext('2d');
      resultCanvas.width = previewImage.naturalWidth;
      resultCanvas.height = previewImage.naturalHeight;
      ctx.drawImage(previewImage, 0, 0);
    };
  };
  reader.readAsDataURL(file);
});

quitarFiltroBtn.addEventListener('click', () => {
  const ctx = resultCanvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
  const data = imageData.data;

  // Filtro sencillo: aumenta el brillo y reduce la saturación (simula quitar filtro)
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg + 20;     // Red
    data[i + 1] = avg + 20; // Green
    data[i + 2] = avg + 20; // Blue
  }

  ctx.putImageData(imageData, 0, 0);

  const downloadURL = resultCanvas.toDataURL('image/png', 1.0);
  downloadBtn.href = downloadURL;
  downloadBtn.download = 'fixora-result.png';
});