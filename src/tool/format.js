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
// 获取 壹到壹佰
const getCnLabels = ()=> {
    const labels = {
        1: '壹', 
        2: '贰', 
        3: '叁', 
        4: '肆', 
        5: '伍', 
        6: '陆', 
        7: '柒', 
        8: '捌', 
        9: '玖', 
        10: '拾', 
        100: '壹佰'
    }

    const arr = []

    for(let i = 0; i< 100; i++) {
        let val = String(i + 1)

        if (!labels[i + 1] && /^(\d)(\d)$/.test(val)) {
            val = val.replace(/^(\d)(\d)$/, (...r)=> {
                return r[1] > 1 ? `${labels[r[1]]}拾${labels[r[2]] || ''}` : `拾${labels[r[2]] || ''}`
            })
  
            arr.push(val)
        }else {
            arr.push(labels[i + 1])
        }
    }
    
    return arr
  }

export {
  formatFileSize,
  getCnLabels
}
