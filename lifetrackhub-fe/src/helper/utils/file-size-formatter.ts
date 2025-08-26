export const formateFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
