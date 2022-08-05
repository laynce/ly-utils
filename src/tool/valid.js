const valid = [
  // 数值型校验
  {
    required: true,
    validator: (rule, value, callback) => {
      if (!form.value.checkType) { // 数值型
        const reg1 = /^[1-9][.\d]*$/g
        const reg2 = /^0\.\d+$/g
        const reg3 = /\d$/g
        const tip = '请输入数值'

        if (value) {
          if (value.match(/\./g)?.length > 1) {
            callback(new Error('最多只能有一位小数点'))
          } else if (value.charAt(0) !== '0') { // 非 0
            if (!reg1.test(value) || !reg3.test(value)) {
              callback(new Error(tip))
            }
          } else {
            value.length > 1 && !reg2.test(value) && callback(new Error(tip))
          }
        } else {
          callback(new Error(tip))
        }
      } else {
        !value && callback(new Error('请输入'))
      }

      callback()
    }
  }
]

export {
  valid
}
