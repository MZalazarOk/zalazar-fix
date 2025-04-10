// Esperar a que el contenido cargue
document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const previewImage = document.getElementById('previewImage');
  const resultCanvas = document.getElementById('resultCanvas');
  const downloadBtn = document.getElementById('downloadBtn');

  const quitarFiltroBtn = document.querySelectorAll('.tile')[0]; // Primer botón
  const ctx = resultCanvas.getContext('2d');

  // Cargar imagen
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.src = event.target.result;
      previewImage.onload = () => {
        // Ajustar canvas al tamaño de la imagen
        resultCanvas.width = previewImage.naturalWidth;
        resultCanvas.height = previewImage.naturalHeight;
      };
    };
    reader.readAsDataURL(file);
  });

  // Función para quitar filtro (simulación básica)
  quitarFiltroBtn.addEventListener('click', () => {
    if (!previewImage.src) {
      alert('Primero seleccioná una imagen.');
      return;
    }

    // Dibujar imagen original en el canvas
    ctx.drawImage(previewImage, 0, 0, resultCanvas.width, resultCanvas.height);

    // Obtener los pixeles y ajustar el contraste y brillo como ejemplo
    const imageData = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Simulación: aumento de brillo y reducción de color (ejemplo de "quitar filtro")
      data[i] = data[i] + 15;     // Red
      data[i + 1] = data[i + 1] + 15; // Green
      data[i + 2] = data[i + 2] + 15; // Blue
    }

    ctx.putImageData(imageData, 0, 0);

    // Mostrar botón de descarga
    const url = resultCanvas.toDataURL('image/png');
    downloadBtn.href = url;
    downloadBtn.style.display = 'inline-block';
  });
});