/**
 * 验证器使用要点：
 * 1、必须在组件 data 里定义属性 errors: {validated: false,}，该属性将包含所有验证返回的错误信息，初始值 validated: false 表示第一次进页面不显示错误信息，直到将 validated 设置为 true 才显示。
 * 2、所有被验证的 key 值，都需要在组件 data 里定义好，比如要验证用户名 userName，则组件 data 必须定义好属性 userName
 * 3、由于每个被验证的项都会返回一个错误数组（而不是单个错误），所以在设计上又给对象 errors[key] 新增一个属性 key + 'Msg'，即 errors[key + 'Msg']，值设置为数组第一个元素的 msg 属性
 * 4、所以基于第3点，在显示验证返回的错误信息时，显示的其实是 errors[key + 'Msg'] 的值，如 'errors.companyNameMsg'，而不是显示 'errors.companyName'
 */


import { debounce } from "../utils/util"

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
    let param   // 附带参数

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
        if(element.rule){
          // 如果该验证规则里明确定义了 'rule' 键，且有多个键值对，如 {'rule': 'range', param: [4,16], msg: '字符长度必须在4-16位之间'}
          rule = element.rule
          msg = element.msg
          param = element.param
        }else{
          // 如果该验证规则里没有明确定义 'rule' 键，且只有一对键值对，如 {'range': [4,16]}，则默认 key 为规则，value 为错误信息
          for (const key in element) {
            rule = key
            param = element[key]
          }
        }
      }
    }else{
      // 说明该验证规则是一个比较常规的验证规则，错误信息按默认显示即可
      rule = element
    }
    
    if(typeof rule === 'function'){
      if(!_com.errors.validated && !callback2)  continue;

      callback2
        ? debounce(_func1)(rule(), _com, _key, msg, 'coustom', callback2)
        : _func1(rule(), _com, _key, msg, 'coustom', callback2)
    }else{
      if(!_com.errors.validated)  continue;

      switch(rule){
        case 'required':
          valid = value !== ''
          msg = msg || preset + '不能为空'
          _func1(valid, _com, _key, msg, 'required')
          break;

        case 'email':
          valid = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value) || value === ''
          msg = msg || preset + '邮箱格式不正确'
          _func1(valid, _com, _key, msg, 'email')
          break;

        case 'max':
          break;

        case 'min':
          break;

        case 'range':
          valid = ( value.length >= param[0] && value.length <= param[1] ) || value === ''
          msg = msg || preset + `字符长度必须为${param[0]}-${param[1]}位`
          _func1(valid, _com, _key, msg, 'range')
          break;

        case 'mobile':
          valid = /^[1][3,4,5,7,8][0-9]{9}$/.test(value) || value === ''
          msg = msg || preset + '手机格式不正确'
          _func1(valid, _com, _key, msg, 'mobile')
          break;

        case 'telephone':
          valid = /^(\(\d{1,5}\)|\d{1,5}-|\s)?\d{3,14}$/.test(value) || value === ''
          msg = msg || preset + '电话号码格式不正确'
          _func1(valid, _com, _key, msg, 'telephone')
          break;

        case 'fax':
          valid = /^(\(\d{1,5}\)|\d{1,5}-|\s)?\d{3,14}$/.test(value) || value === ''
          msg = msg || preset + '传真号码格式不正确'
          _func1(valid, _com, _key, msg, 'fax')
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
  if(Array.isArray(valid)){
    callback2 = valid[5]
    type = valid[4]
    msg = valid[3]
    _key = valid[2]
    _com = valid[1]
    valid = valid[0]
  }
  
  if(Object.prototype.toString.call(valid) === '[object Promise]' && callback2){
    // 如果有第二个回调函数 callback2，则说明验证类型是异步验证
    type = 'remote'

    valid.then(function(res) {
      _func2(callback2(res), _com, _key, type, msg)
    })
  }else{
    _func2(valid, _com, _key, type, msg)
  }
}

/**
 * 验证器内部函数2
 * @param {bool} valid 表示当前这条验证通过与否
 * @param {vue} _com 表示当前组件
 * @param {string} _key 表示被验证的键值
 * @param {string} type 表示错误类型，如 'required'、'email'、'min' 等
 * @param {string} msg 表示验证不通过时显示的信息
 */
const _func2 = (valid, _com, _key, type, msg) => {
  let errors = _com.errors
  errors[_key] = errors[_key] || []
  
  errors[_key] = errors[_key].filter(n => n.type !== type)

  if(!valid){
    errors[_key].push({type: type, msg: msg})
  }

  if(errors[_key].length < 1){
    delete errors[_key + 'Msg']
  }else{
    errors[_key + 'Msg'] = errors[_key][0].msg
  }

  _func3(errors)

  _com.errors = Object.assign({}, _com.errors)
}

// 计算 errors 最终验证结果，并以属性值 isValid 的形式体现，true 为通过，false 为不通过
const _func3 = (errors) => {
  let tmpValid = true

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      // 只要包含带有 Msg 的属性，就说明验证有错误
      if(~key.indexOf('Msg')){
        tmpValid = false
        break;
      }
    }
  }

  errors.isValid = tmpValid
}
