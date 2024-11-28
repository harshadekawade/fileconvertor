// $('input[type="file"]').change(function () {
//     var file = this.files[0];
//     var fileType = file["type"];
//     var validImageTypes = ["image/png"];
//     if ($.inArray(fileType, validImageTypes) < 0) {
//         $('convertto').hide();
//         $('button.convert').hide();
//         $('.error').html($('bootstrapalert').html());
//     } else {
//         $('.error').html('');
//         $('convertto').show();
//     }
// });

// $('select[name="imagetype"]').change(function () {
//     $('button.convert').show();
//     $('button.convert').text('Convert and Download');
// });

const overlay = document.getElementById('overlay');
const dropArea = document.querySelector('.drag-area');
const input = document.querySelector('input[type="file"]');
const body = document.querySelector('body');
const imgPreview = document.querySelector('.img-preview img');
const removeImg = document.querySelector('.remove-file');
const outputFormat = document.querySelector('.op-format');
const convertButton = document.querySelector('.convert');
var isCloseButtonClicked = false;

let file;

outputFormat.addEventListener('change', function () {
    convertButton.style.display = "block";
});

convertButton.addEventListener('click', function () {
});

dropArea.onclick = () => {
    if (!isCloseButtonClicked) {
        input.click();
    } else {
        isCloseButtonClicked = false;
    }
};

input.addEventListener('change', function () {
    file = this.files[0];
    dropArea.classList.add('active');
    displayFile();
});

// Show overlay when a file is dragged
window.addEventListener('dragover', (e) => {
    e.preventDefault();
    overlay.classList.add('active');
});

// Hide overlay when drag leaves the window
window.addEventListener('dragleave', (e) => {
    e.preventDefault();
    overlay.classList.remove('active');
});

// Handle file drop
window.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    file = e.dataTransfer.files[0];
    displayFile();
});

removeImg.addEventListener('click', function () {
    dropArea.classList.remove('active');
    input.value = "";
    imgPreview.src = "";
    isCloseButtonClicked = true;
    outputFormat.style.display = "none";
    convertButton.style.display = "none";
});

function displayFile() {
    let fileType = file.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            imgPreview.src = fileURL;
        };
        fileReader.readAsDataURL(file);
        outputFormat.style.display = "block";
        document.querySelectorAll("select[name='imagetype'] option").forEach(opt => {
            if (opt.value == fileType) {
                opt.disabled = true;
            } else {
                opt.disabled = false;
            }
        });
        document.querySelectorAll("select[name='imagetype']").value = "";
        convertButton.style.display = "block";
    } else {
        alert('This is not an Image File');
        dropArea.classList.remove('active');
    }
}