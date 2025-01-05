const renderFolderForm = () => {
  const dialog = document.getElementById('new-folder-dialog');
  dialog.showModal();
};

const submitForm = async (event) => {
  event.preventDefault();

  const folderName = event.target.querySelector('#folder-name').value;
  const currentUrl = window.location.pathname;
  let folderId = currentUrl.split('/').pop();
  folderId = folderId === 'dashboard' ? 1 : Number(folderId);

  if (folderName) {
    const formData = new FormData();
    formData.append('folderId', folderId);
    formData.append('folderName', folderName);

    try {
      const url =
        folderId === 1 ? '/dashboard' : `/dashboard/folders/${folderId}`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success', result);
        window.location.reload();
      } else {
        console.error('Error occurred:', await response.text());
      }
    } catch (error) {
      console.error('Network error occurred:', error); // Added error handling
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const newFolderBtn = document.getElementById('new-folder-btn');
  newFolderBtn.addEventListener('click', renderFolderForm);

  const form = document.getElementById('new-folder-form');
  form.addEventListener('submit', submitForm);
});
