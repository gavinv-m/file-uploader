document.addEventListener('DOMContentLoaded', () => {
  const dialogs = document.querySelectorAll('dialog');

  dialogs.forEach((dialog) => {
    // Close dialog when clicking outside of it
    dialog.addEventListener('click', (e) => {
      const dialogBounds = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogBounds.left ||
        e.clientX > dialogBounds.right ||
        e.clientY < dialogBounds.top ||
        e.clientY > dialogBounds.bottom
      ) {
        dialog.close();
      }
    });
  });
});
