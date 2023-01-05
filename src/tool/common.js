const compose = (...fncs) => (...args) => {
  const [action, ...fncList] = fncs
  return fncList.reduce((arg, fnc) => fnc(arg), action(...args))
}

const asyncCompose = (...fncs) => async (...args) => {
  const [action, ...fncList] = fncs
  let result = await action(...args)

  for (const fnc of fncList) {
    result = await fnc(result)
  }

  return result
}

const curry = (fnc, len = fnc.length) => {
  const curryFnc = (...args) => {
    if (args.length >= len) return fnc(...args)

    return (...arg) => curryFnc(...args.concat(arg))
  }

  return curryFnc
}

const curryRight = (fnc, len = fnc.length) => {
  const curryFnc = (...args) => {
    if (args.length >= len) return fnc(...args)

    return (...arg) => curryFnc(...arg.concat(args))
  }

  return curryFnc
}

// 分块渲染
const useSliceRender = (count = 5) => {
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
const downloadCommon = (url, name) => {
  let a = document.createElement('a')
  const event = new MouseEvent('click')
  a.download = name
  a.href = url
  a.target = '_blank'
  a.dispatchEvent(event)
  a = null
}


export {
  compose,
  asyncCompose,
  curry,
  curryRight,
  useSliceRender,
  downloadCommon
}
