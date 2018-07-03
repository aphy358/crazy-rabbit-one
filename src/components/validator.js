
/**
 * 验证器
 * @param {*} _com 表示当前组件，一般传 this 进来
 * @param {*} _key 表示被验证的键值
 * @param {*} options 表示验证规则的操作项
 */
export const validator = (_com, _key, options) => {

  // 提取错误信息的前缀，比如 '企业名称'、'用户名' 等
  let preset = Array.isArray(options) ? '' : options.preset

  // 提取验证规则，rules 应该是一个数组
  let rules = Array.isArray(options) ? options : options.rules

  // 待验证的值
  let value = _com[_key]

  let $errors = _com.$errors

  for (let i = 0; i < rules.length; i++) {
    const element = rules[i]
    let rule
    let msg
    let cb_promise

    if(typeof element === 'object'){
      if(element.callback){
        rule = element.callback
        cb_promise = element.cb_promise
        msg = element.msg
      }else{
        for (const key in element) {
          rule = key
          msg = element[key]
        }
      }
    }else{
      rule = element
    }
    
    if(typeof rule === 'function'){
      _func1(rule(), $errors, _key, msg, cb_promise, _com)
    }else{
      switch(rule){
        case 'required':
          _func1(value, $errors, _key, (msg || preset + '不能为空'))
          break;
        case 'email':
          break;
        case 'max':
          break;
        case 'min':
          break;
        default:
          break;
      }
    }
  }
}

const _func1 = (valid, $errors, _key, msg, cb_promise, _com) => {
  if(Object.prototype.toString.call(valid) === '[object Promise]' && cb_promise){
    valid.then(function(res) {
      cb_promise(res)
        ? delete $errors[_key]
        : $errors[_key] = msg

        _com.$errors = Object.assign({}, _com.$errors)
        console.log(_com.$errors);
        
        
    })
  }else{
    valid
      ? delete $errors[_key]
      : $errors[_key] = msg
  }
}
