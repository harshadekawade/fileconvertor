// Show overlay when a file is dragged
window.addEventListener('dragover', (e) => {
    e.preventDefault();
    overlay.classList.add('active');
    if (e.dataTransfer.items.length > 1) {
        e.dataTransfer.dropEffect = "none";
    }
});

// Hide overlay when drag leaves the window
window.addEventListener('dragleave', (e) => {
    e.preventDefault();
    overlay.classList.remove('active');
});

// Handle file drop
window.addEventListener('drop', (e) => {
    e.preventDefault();
    overlay.classList.remove('active');
    const files = e.dataTransfer.files;
    if (files.length == 1) {
        file = files[0];
        dropArea.classList.add('active');
        displayFile();
    }
});