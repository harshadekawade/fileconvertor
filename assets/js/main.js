const overlay = document.getElementById('overlay');
const dropArea = document.querySelector('.drag-area');
const inputFile = document.querySelector('input[type="file"]');
const imgPreview = document.querySelector('.img-preview img');
const removeImgButtom = document.querySelector('.remove-file');
const outputFormatDiv = document.querySelector('.op-format');
const outputFormat = document.querySelector('#outputFormat');
const convertButton = document.querySelector('.convert');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
var isCloseButtonClicked = false;
let file;
let image = new Image();

convertButton.addEventListener('click', convertAndDownload);

// Browse files
dropArea.onclick = () => {
    if (!isCloseButtonClicked) {
        inputFile.click();
    } else {
        isCloseButtonClicked = false;
    }
};

inputFile.addEventListener('change', function () {
    file = this.files[0];
    dropArea.classList.add('active');
    displayFile();
});

removeImgButtom.addEventListener('click', removeImg);

function removeImg() {
    dropArea.classList.remove('active');
    inputFile.value = "";
    imgPreview.src = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
    isCloseButtonClicked = true;
    outputFormatDiv.style.display = "none";
}

function displayFile() {
    if (file) {
        let fileType = file.type;
        let validExtensions = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (validExtensions.includes(fileType)) {
            const reader = new FileReader();
            reader.onload = function (e) {
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // Draw the full image on the canvas
                    ctx.drawImage(image, 0, 0);
                };
                image.src = e.target.result;
                imgPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
            outputFormatDiv.style.display = "block";
            var count = 0;

            var options = document.querySelectorAll("select[name='imagetype'] option");
            var index;
            for (let i = 0; i < options.length; i++) {
                const opt = options[i];
                if (opt.value == fileType) {
                    index = i;
                    opt.disabled = true;
                } else {
                    opt.disabled = false;
                }
            }
            if (index > 0) {
                outputFormat.value = validExtensions[0];
            } else {
                outputFormat.value = validExtensions[1];
            }
        } else {
            alert('Only Supports PNG, JPG, JPEG, WEBP files');
            dropArea.classList.remove('active');
        }
    }
}

function convertAndDownload() {
    const selectedFormat = outputFormat.value;
    // Convert the canvas content to the chosen format
    const convertedImage = canvas.toDataURL(selectedFormat, 0.9); // Adjust quality as needed
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = `converted-image.${selectedFormat.split('/')[1]}`; // Set file extension based on format
    link.click();
    window.location.reload();
}