export default function formateFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) return `${sizeInBytes}B`;

  const units = ['KB', 'MB', 'GB', 'TB'];
  let unitIndex = -1;
  let size = sizeInBytes;

  do {
    size /= 1024; // Divide the size
    unitIndex++; // Move to the next unit
  } while (size >= 1024 && unitIndex < units.length - 1);

  return `${Math.round(size)}${units[unitIndex]}`;
}
