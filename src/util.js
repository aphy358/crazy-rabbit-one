import Velocity from 'velocity-animate';

//判断是否是IE浏览器
export const isIE = function () {
  return !!window.ActiveXObject || "ActiveXObject" in window;
}

//判断浏览器版本是否低于IE9
export const ltIE9 = function () {
  var
    b_version = navigator.appVersion,
    version = b_version.split(";");

  if (version.length > 1) {
    var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
    if (trim_Version < 9) {
      return true;
    }
  }

  return false;
}

/**
 * 获取指定的url参数值
 * @param {指定的url参数名} name
 */
export const queryString = function (name, targetStr) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r;
  if (!targetStr) {
    if(window.location.search){
      r = window.location.search.substr(1).match(reg);
    }else if(window.location.hash){
      if (window.location.hash.indexOf('?') !== -1){
        r = window.location.hash.split('?')[1].match(reg);
      }
    }
  } else {
    r = targetStr.match(reg);
  }
  return r != null ? unescape(r[2]) : null;
}

// 在给定的日期基础上加上若干天，并格式化成 '2017-10-01' 的字符串返回
export const addDays = function (d1, num, sep) {
  sep = sep || '-';
  num = num || 0;
  if (typeof d1 === 'string') d1 = new Date(d1.replace(/-/g, '/'));
  return new Date(+d1 + num * 24 * 60 * 60 * 1000).Format('yyyy' + sep + 'MM' + sep + 'dd');
}


/**
 * 节流阀，可以使目标函数在连续的同一操作之后间隔一定时间间隔再执行
 * @param {*} func 表示传入的目标函数
 * @param {*} option 表示传入回调函数的参数
 * @param {*} timeGap 表示时间间隔，单位毫秒
 */
export const throttle = function (func, option, timeGap) {
  timeGap = timeGap || 300;

  clearTimeout(func.tId);

  func.tId = setTimeout(function () {
    func(option)
    // option
    //   ? func.call(context, ...option)
    //   : func.call(context);
  }, timeGap);
}

// 登录
export const login = function () {
  location.href = '/user/home.do';
}

// 将字符串中所有 '/' 换成 '-'
export const formatOne = function (str) {
  return str.replace(/\//g, '-');
}

// 深拷贝
export const deepCopy = function (p) {
  let i;
  let c = Array.isArray(p) ? [] : {}

  if(typeof p === 'object'){
    if(Array.isArray(p)){
      for (let i = 0; i < p.length; i++) {
        c[i] = typeof (p[i]) === "object" 
          ? deepCopy(p[i]) 
          : p[i]
      }
    }else{
      for (i in p) {
        if (p.hasOwnProperty(i)) {
          c[i] = typeof (p[i]) === "object" 
            ? deepCopy(p[i]) 
            : p[i]
        }
      }
    }
  }else{
    c = p
  }
  
  return c;
}

// 关闭窗口（兼容各个浏览器）
export const CloseWebPage = function () {
  if (navigator.userAgent.indexOf("MSIE") > 0) {
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
      window.opener = null;
      window.close();
    } else {
      window.open('', '_top');
      window.top.close();
    }
  } else if (navigator.userAgent.indexOf("Firefox") > 0) {
    // 火狐默认状态非window.open的页面window.close是无效的
    window.location.href = 'about:blank ';
  } else {
    window.opener = null;
    window.open('', '_self', '');
    window.close();
  }
}

// 重新查询酒店列表后，触发页面滚动到顶部
export const _scrollTop = () => {
  let elem = document.querySelector('.el-scrollbar__view')
  if(!elem) return;
  let container = document.querySelector('.el-scrollbar__wrap')
  
  if(elem && container){
    document.querySelector('.search-line-outer.fix-top')
      ? Velocity(elem, 'scroll', {container: container, offset: '205px'})
      : Velocity(elem, 'scroll', {container: container})
    
    Velocity(elem, 'finish')
  }
}

