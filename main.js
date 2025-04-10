const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const resultCanvas = document.getElementById("resultCanvas");
const downloadBtn = document.getElementById("downloadBtn");

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function processImage(mode) {
  if (!previewImage.src || previewImage.src === "#") {
    alert("Primero seleccioná una imagen.");
    return;
  }

  const canvas = resultCanvas;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (mode === "quitar") {
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const avg = (r + g + b) / 3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
      downloadBtn.href = canvas.toDataURL("image/png", 1.0);
    }
  };
  img.src = previewImage.src;
}

function showAlert(name) {
  alert(`Función "${name}" aún no está activa`);
}