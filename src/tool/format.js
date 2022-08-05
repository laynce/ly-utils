const formatFileSize = (fileSize, unit) => {
  if (!fileSize) return ''

  if (unit === 'KB') fileSize *= 1024

  const size = Number(fileSize / 1024)
  if (size < 1024) {
    return `${parseInt(size) || 1} KB`
  } else if (size >= 1024 && size < (1024 * 1024)) {
    return `${(size / 1024).toFixed(2)} M`
  } else if (size >= (1024 * 1024) && size < (1024 * 1024 * 1024)) {
    return `${(size / (1024 * 1024)).toFixed(2)} G`
  }
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} TB`
}

export {
  formatFileSize
}