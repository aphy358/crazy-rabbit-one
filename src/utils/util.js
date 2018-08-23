import Velocity from 'velocity-animate';

/*
  * 对Date的扩展，将 Date 转化为指定格式的String
  * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
  * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  * 例子： 
  * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
  * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  */
Date.prototype.Format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}}return fmt};

//判断是否是IE浏览器
export const isIE = function () {
  return !!window.ActiveXObject || "ActiveXObject" in window;
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


/**
 * 防抖函数，可以使目标函数在连续的同一操作之后，最后一次操作结束之后再执行
 * @param {*} func 表示传入的目标函数
 * @param {*} wait 表示时间间隔，单位毫秒
 */
export const debounce = function(func, wait){
  wait = wait || 300;

  return function(){
    var args = arguments
    var context = this
    clearTimeout(func.tid)
    func.tid = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
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
  let c

  if(typeof p === 'object'){
    var str = Object.prototype.toString.call(p)

    if(~str.indexOf('Null')){
      c = null
    }else if(~str.indexOf('Array')){
      c = []
      for (var i = 0; i < p.length; i++) {
        c.push(deepCopy(p[i]))
      }
    }else{
      c = {}
      for (var j in p) {
        c[j] = deepCopy(p[j])
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





// 将被点击的城市设置到历史记录里
export const setHistory = (citytype, cityid, cityname) => {
  let kwcHistory = localStorage.getItem('kwcHistory')

  if( kwcHistory ){
    kwcHistory = window.JSON.parse(kwcHistory);
    let _thisTypeHistory = kwcHistory[citytype];

    if( _thisTypeHistory ){
      for (let i = 0; i < _thisTypeHistory.length; i++) {
        let o = _thisTypeHistory[i];
        if( o.cityid == cityid ){
          _thisTypeHistory.splice(i, 1);
          break;
        }
      }

      // 在数组首部插入一个元素，也可以用 unshift() 函数实现，但是 IE8 不兼容...
      _thisTypeHistory.splice(0, 0, {
        cityname: cityname,
        cityid: cityid,
        citytype: citytype
      });

      // 删除数组中超过6位的元素
      _thisTypeHistory.splice(6);
    }else{
      kwcHistory[citytype] = [{
        cityname: cityname,
        cityid: cityid,
        citytype: citytype
      }];
    }
  }else{
    kwcHistory = {};
    kwcHistory[citytype] = [{
      cityname: cityname,
      cityid: cityid,
      citytype: citytype
    }];
  }

  localStorage.setItem('kwcHistory', window.JSON.stringify(kwcHistory));
}


// 先登录
export const loginFirst = (_this) => {
  _this.$store.commit('setCommonState', {t: 'showLoginDialog', v: true})
}


function addScript(src) {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = src
  document.body.appendChild(s);
}


// 远程加载 js，比如需要在页面加载完之后再加载 js 资源
export const remoteJS = (srcs) => {
  let scripts = Array.prototype.slice.call(document.scripts)

  if(typeof srcs === 'object' && Array.isArray(srcs)){
    srcs.forEach(src => {
      // 避免重复加载同一资源
      if(scripts.filter(n => n.src === src).length < 1){
        addScript(src)
      }
    })
  }else{
    // 避免重复加载同一资源
    if(scripts.filter(n => n.src === srcs).length < 1){
      addScript(srcs)
    }
  }
}


// 打开地图
export const openMap = (hotel) => {
  sessionStorage.setItem('hotelMap', JSON.stringify(hotel))

  let iTop = (window.screen.availHeight - 30 - 500) / 2
  let iLeft = (window.screen.availWidth - 10 - 650) / 2
  let _link = hotel.countryType == 0
    ? '/baiduMap.html'
    : '/googleMap.html'

  window.open(_link, hotel.infoName, 'height=500,innerHeight=500,width=650,innerWidth=650,top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

