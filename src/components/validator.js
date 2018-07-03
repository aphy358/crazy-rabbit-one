
/**
 * 验证器
 * @param {vue} _com 表示当前组件，一般传 this 进来
 * @param {string} _key 表示被验证的键值
 * @param {object} options 表示验证规则的操作项
 */
export const validator = (_com, _key, options) => {

  // 提取错误信息的前缀，比如 '企业名称'、'用户名' 等
  let preset = Array.isArray(options) ? '' : options.preset

  // 提取验证规则，rules 应该是一个数组
  let rules = Array.isArray(options) ? options : options.rules

  // 待验证的值
  let value = _com[_key]

  for (let i = 0; i < rules.length; i++) {
    const element = rules[i]
    let rule
    let msg
    let callback2
    let valid

    if(typeof element === 'object'){
      if(element.callback){
        // 说明该验证规则是一个自定义函数，
        // 可能是普通函数，也可能是异步验证函数，如果是异步验证函数，则应该把 callback2 传进来
        rule = element.callback
        callback2 = element.callback2
        msg = element.msg
      }else{
        // 说明该验证规则包含在一个普通对象里，用一个键值对表示
        // 一般会明确指定错误信息 msg 该怎么显示
        for (const key in element) {
          rule = key
          msg = element[key]
        }
      }
    }else{
      // 说明该验证规则是一个比较常规的验证规则，错误信息按默认显示即可
      rule = element
    }
    
    if(typeof rule === 'function'){
      _func1(rule(), _com, _key, msg, 'coustom', callback2)
    }else{
      switch(rule){
        case 'required':
          valid = value !== ''
          msg = msg || preset + '不能为空'
          _func1(valid, _com, _key, msg, 'required')
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

/**
 * 验证器内部函数1
 * @param {bool} valid 表示当前这条验证通过与否
 * @param {vue} _com 表示当前组件
 * @param {string} _key 表示被验证的键值
 * @param {string} msg 表示验证不通过时显示的信息
 * @param {string} type 表示错误类型，如 'required'、'email'、'min' 等
 * @param {function} callback2 表示异步验证的回调函数，可为空
 */
const _func1 = (valid, _com, _key, msg, type, callback2) => {
  let errors = _com.errors
  errors[_key] = errors[_key] || []

  if(Object.prototype.toString.call(valid) === '[object Promise]' && callback2){
    // 如果有第二个回调函数 callback2，则说明验证类型是异步验证
    type = 'remote'

    valid.then(function(res) {
      console.log(res);
      
      _func2(callback2(res), errors, _key, type, msg)
      _com.errors = Object.assign({}, _com.errors)
    })
  }else{
    _func2(valid, errors, _key, type, msg)
  }
}

/**
 * 验证器内部函数2
 * @param {bool} valid 表示当前这条验证通过与否
 * @param {object} errors 包含了该组件所有的错误信息
 * @param {string} _key 表示被验证的键值
 * @param {string} type 表示错误类型，如 'required'、'email'、'min' 等
 * @param {string} msg 表示验证不通过时显示的信息
 */
const _func2 = (valid, errors, _key, type, msg) => {
  errors[_key] = errors[_key].filter(n => n.type !== type)

  if(!valid){
    errors[_key].push({type: type, msg: msg})
  }

  if(errors[_key].length < 1){
    delete errors[_key + 'Msg']
  }else{
    errors[_key + 'Msg'] = errors[_key][0].msg
  }
}
