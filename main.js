const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const resultCanvas = document.getElementById("resultCanvas");
const downloadBtn = document.getElementById("downloadBtn");

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    previewImage.src = event.target.result;
    const img = new Image();
    img.onload = function () {
      resultCanvas.width = img.width;
      resultCanvas.height = img.height;
      const ctx = resultCanvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      downloadBtn.href = resultCanvas.toDataURL("image/png");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
