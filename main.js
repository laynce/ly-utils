export const compose = (...fncs) => (...args) => {
  const [action, ...fncList] = fncs
  return fncList.reduce((arg, fnc) => fnc(arg), action(...args))
}

export const asyncCompose = (...fncs) => async (...args) => {
  const [action, ...fncList] = fncs
  let result = await action(...args)

  for (const fnc of fncList) {
    result = await fnc(result)
  }

  return result
}

export const curry = (fnc, len = fnc.length) => {
  const curryFnc = (...args) => {
    if (args.length >= len) return fnc(...args)

    return (...arg) => curryFnc(...args.concat(arg))
  }

  return curryFnc
}

export const curryRight = (fnc, len = fnc.length) => {
  const curryFnc = (...args) => {
    if (args.length >= len) return fnc(...args)

    return (...arg) => curryFnc(...arg.concat(args))
  }

  return curryFnc
}

export const formatFileSize = (fileSize, unit) => {
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

// 分块渲染
export const useSliceRender = (count = 5) => {
  const index = ref(0)

  const defer = order => order <= index.value

  const excute = () => requestAnimationFrame(() => {
    if (index.value === count) return

    index.value++
    excute()
  })

  onMounted(() => excute())

  return {
    defer
  }
}

// 下载
export const downloadCommon = (url, name) => {
  let a = document.createElement('a')
  const event = new MouseEvent('click')
  a.download = name
  a.href = url
  a.target = '_blank'
  a.dispatchEvent(event)
  a = null
}

