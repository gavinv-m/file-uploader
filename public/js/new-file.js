const displayFile = (event) => {
  const fileDetails = document.getElementById('file-details');
  const file = event.target.files[0]; // Get the first selected file
  if (file) {
    fileDetails.textContent = `Selected File: ${file.name} (${(
      file.size / 1024
    ).toFixed(2)} KB)`;
  } else {
    fileDetails.textContent = 'No file selected';
  }
};

const renderDialog = () => {
  const dialog = document.getElementById('new-file-dialog');
  dialog.showModal();
};

const submitForm = (event) => {
  event.preventDefault();

  const fileInput = document.getElementById('upload-file');
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const newFileBtn = document.getElementById('new-file-btn');
  newFileBtn.addEventListener('click', renderDialog);

  const fileInput = document.getElementById('upload-file');
  fileInput.addEventListener('change', displayFile);

  const form = document.getElementById('upload-file-form');
  form.addEventListener('submit', submitForm);
});
